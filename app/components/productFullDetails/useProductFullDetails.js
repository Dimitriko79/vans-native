import {useCallback, useMemo, useState} from "react";
import {isProductConfigurable} from "../../helpers/isProductConfigurable";
import {findMatchingVariant} from "../../helpers/findMatchingProductVariant";
import { isSupportedProductType as isSupported } from '../../helpers/isSupportedProductType';
import {useCartProvider} from "../../context/cart/cartProvider";
import {useMutation} from "@apollo/client";
import {ADD_CONFIGURABLE_MUTATION, ADD_SIMPLE_MUTATION} from "./productFullDetails.gql";
import {appendOptionsToPayload} from "../../helpers/appendOptionsToPayload";

const INITIAL_OPTION_CODES = new Map();
const INITIAL_OPTION_SELECTIONS = new Map();
const OUT_OF_STOCK_CODE = 'OUT_OF_STOCK';
const IN_STOCK_CODE = 'IN_STOCK';

const deriveOptionCodesFromProduct = product => {
    // If this is a simple product it has no option codes.
    if (!isProductConfigurable(product)) {
        return INITIAL_OPTION_CODES;
    }

    // Initialize optionCodes based on the options of the product.
    const initialOptionCodes = new Map();
    for (const {
        attribute_id,
        attribute_code
    } of product.configurable_options) {
        initialOptionCodes.set(attribute_id, attribute_code);
    }

    return initialOptionCodes;
};

const deriveOptionSelectionsFromProduct = product => {
    if (!isProductConfigurable(product)) {
        return INITIAL_OPTION_SELECTIONS;
    }

    const initialOptionSelections = new Map();
    for (const { attribute_id } of product.configurable_options) {
        initialOptionSelections.set(attribute_id, undefined);
    }

    return initialOptionSelections;
};

const getMediaGalleryEntries = (product, optionCodes, optionSelections) => {
    let value = [];

    const { media_gallery, variants } = product;
    const isConfigurable = isProductConfigurable(product);

    // Selections are initialized to "code => undefined". Once we select a value, like color, the selections change. This filters out unselected options.
    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (!isConfigurable || !optionsSelected) {
        value = media_gallery;
    } else {
        // If any of the possible variants matches the selection add that
        // variant's image to the media gallery. NOTE: This _can_, and does,
        // include variants such as size. If Magento is configured to display
        // an image for a size attribute, it will render that image.
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        value = item
            ? [...item.product.media_gallery, ...media_gallery]
            : media_gallery;
    }

    return value;
};

const getIsMissingOptions = (product, optionSelections) => {
    // Non-configurable products can't be missing options.
    if (!isProductConfigurable(product)) {
        return false;
    }

    // Configurable products are missing options if we have fewer
    // option selections than the product has options.
    const { configurable_options } = product;
    const numProductOptions = configurable_options.length;
    const numProductSelections = Array.from(optionSelections.values()).filter(
        value => !!value
    ).length;

    return numProductSelections < numProductOptions;
};

const getIsOutOfStock = (product, optionCodes, optionSelections) => {
    const { stock_status, variants } = product;
    const isConfigurable = isProductConfigurable(product);
    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (isConfigurable && optionsSelected) {
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });
        const stockStatus = item?.product?.stock_status;

        return stockStatus === OUT_OF_STOCK_CODE || !stockStatus;
    }
    return stock_status === OUT_OF_STOCK_CODE;
};

const getIsAllOutOfStock = product => {
    const { stock_status, variants } = product;
    const isConfigurable = isProductConfigurable(product);

    if (isConfigurable) {
        const inStockItem = variants.find(item => {
            return item.product.stock_status === IN_STOCK_CODE;
        });
        return !inStockItem;
    }

    return stock_status === OUT_OF_STOCK_CODE;
};

const getBreadcrumbCategoryId = categories => {
    // Exit if there are no categories for this product.
    if (!categories || !categories.length) {
        return;
    }
    const breadcrumbSet = new Set();
    categories.forEach(({ breadcrumbs }) => {
        // breadcrumbs can be `null`...
        (breadcrumbs || []).forEach(({ category_id }) =>
            breadcrumbSet.add(category_id)
        );
    });

    // Until we can get the single canonical breadcrumb path to a product we
    // will just return the first category id of the potential leaf categories.
    const leafCategory = categories.find(
        category => !breadcrumbSet.has(category.uid)
    );

    // If we couldn't find a leaf category then just use the first category
    // in the list for this product.
    return leafCategory.uid || categories[0].uid;
};

const getConfigPrice = (product, optionCodes, optionSelections) => {
    let value;

    const { variants } = product;
    const isConfigurable = isProductConfigurable(product);

    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (!isConfigurable || !optionsSelected) {
        value = product.price_range?.maximum_price;
    } else {
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        value = item
            ? item.product.price_range?.maximum_price
            : product.price_range?.maximum_price;
    }

    return value;
};

export  const useProductFullDetails = ({product}) => {

    const {cartId, startFetchCart} = useCartProvider();
    const productType = product.__typename;
    const isSupportedProductType = isSupported(productType);
    const derivedOptionSelections = useMemo(
        () => deriveOptionSelectionsFromProduct(product),
        [product]
    );

    const [
        addConfigurableProductToCart,
        {
            error: errorAddingConfigurableProduct,
            loading: isAddConfigurableLoading
        }
    ] = useMutation(ADD_CONFIGURABLE_MUTATION);

    const [
        addSimpleProductToCart,
        { error: errorAddingSimpleProduct, loading: isAddSimpleLoading }
    ] = useMutation(ADD_SIMPLE_MUTATION);

    const derivedOptionCodes = useMemo(
        () => deriveOptionCodesFromProduct(product),
        [product]
    );

    const [optionSelections, setOptionSelections] = useState(
        derivedOptionSelections
    );
    const [singleOptionSelection, setSingleOptionSelection] = useState();
    const [showError, setShowError] = useState(false);

    const breadcrumbCategoryId = useMemo(
        () => getBreadcrumbCategoryId(product.categories),
        [product.categories]
    );

    const handleValueChange = (attributeCode, value) => {
        setOptionSelections( {...optionSelections, [attributeCode]: value});
    };

    const handleSelectionChange = useCallback(
        (optionId, selection) => {
            // We must create a new Map here so that React knows that the value
            // of optionSelections has changed.
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
            // Create a new Map to keep track of single selections with key as String
            const nextSingleOptionSelection = new Map();
            nextSingleOptionSelection.set(optionId, selection);
            setSingleOptionSelection(nextSingleOptionSelection);
        },
        [optionSelections]
    );

    const [optionCodes] = useState(derivedOptionCodes);

    const isMissingOptions = useMemo(
        () => getIsMissingOptions(product, optionSelections),
        [product, optionSelections]
    );

    const isOutOfStock = useMemo(
        () => getIsOutOfStock(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    // Check if display out of stock products option is selected in the Admin Dashboard
    const isOutOfStockProductDisplayed = useMemo(() => {
        let totalVariants = 1;
        const isConfigurable = isProductConfigurable(product);
        if (product.configurable_options && isConfigurable) {
            for (const option of product.configurable_options) {
                const length = option.values.length;
                totalVariants = totalVariants * length;
            }
            return product.variants.length === totalVariants;
        }
    }, [product]);

    const isEverythingOutOfStock = useMemo(() => getIsAllOutOfStock(product), [
        product
    ]);

    const mediaGalleryEntries = useMemo(
        () => getMediaGalleryEntries(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    const productPrice = useMemo(
        () => getConfigPrice(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    const attributeIdToValuesMap = useMemo(() => {
        const map = new Map();
        // For simple items, this will be an empty map.
        const options = product.configurable_options || [];
        for (const { attribute_id, values } of options) {
            map.set(attribute_id, values);
        }
        return map;
    }, [product.configurable_options]);

    const selectedOptionsArray = useMemo(() => {
        const selectedOptions = [];

        optionSelections.forEach((value, key) => {
            const values = attributeIdToValuesMap.get(key);

            const selectedValue = values?.find(
                item => item.value_index === value
            );

            if (selectedValue) {
                selectedOptions.push(selectedValue.uid);
            }
        });
        return selectedOptions;
    }, [attributeIdToValuesMap, optionSelections]);

    const handleAddToCart = useCallback(
        async () => {
            const quantity  = 1;

            const payload = {
                item: product,
                productType,
                quantity
            };

            if (isProductConfigurable(product)) {
                appendOptionsToPayload(
                    payload,
                    optionSelections,
                    optionCodes
                );
            }

            if (isSupportedProductType) {
                const variables = {
                    cartId,
                    parentSku: product.sku,
                    product: payload.item,
                    quantity: payload.quantity,
                    sku: payload.item.sku
                };

                // Use the proper mutation for the type.
                if (productType === 'SimpleProduct') {
                    try {
                        await addSimpleProductToCart({
                            variables
                        });
                    } catch {
                        return;
                    }
                } else if (productType === 'ConfigurableProduct') {
                    try {
                        await addConfigurableProductToCart({
                            variables
                        });
                    } catch {
                        return;
                    }
                }
                await startFetchCart();
            } else {
                console.error(
                    'Unsupported product type. Cannot add to cart.'
                );
            }
        },
        [
            addConfigurableProductToCart,
            addSimpleProductToCart,
            cartId,
            isSupportedProductType,
            optionCodes,
            optionSelections,
            product,
            productPrice,
            productType,
            selectedOptionsArray
        ]
    );

    const handlePress = () => {
        if (Object.keys(optionSelections).length === 0)
            setShowError(true);
        else
            setShowError(false);
            handleAddToCart();
    };

    const calcPoints = price => {
        return " " + price/10 + " ";
    }
    return {
        showError,
        optionSelections,
        handleValueChange,
        handleSelectionChange,
        handlePress,
        calcPoints
    }
}