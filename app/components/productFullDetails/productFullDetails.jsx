import {Dimensions, Text, View, StyleSheet} from "react-native";
import Price from "../price/price";
import ProductOptions from "../product/ProductOptions";
import SizeChart from "../product/SizeChart";
import AddToCart from "../cart/addToCart";
import useProductFullDetails from "./useProductFullDetails";
import {router} from "expo-router";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import React from "react";
import ImageCarousel from "../carousel/imageCarousel";
import Social from "../social/social";
import ProductInfo from "../productInfo/productInfo";
import PopularyProduct from "../popularyProduct/popularyProduct";

const { width } = Dimensions.get("window");

const ProductFullDetails = ({ product = {}, popularProducts = [] }) => {
    const {
        showError,
        setShowError,
        optionSelections,
        handleSelectionChange,
        handlePress,
        calcPoints,
        isAddToCartDisabled,
        breadcrumbCategoryId,
        mediaGalleryEntries = [],
        stateAddToCartButton
    } = useProductFullDetails({ product });

    const images = mediaGalleryEntries.map(({ url, label }) => ({ url, label }));

    return (
        <View style={styles.product_top_details}>
            <View style={styles.breadcrumbs}>
                <Breadcrumbs
                    categoryIds={breadcrumbCategoryId}
                    currentProduct={product.name || "Неизвестный товар"}
                    onPress={id => router.push({ pathname: "/category", params: { ids: id } })}
                />
            </View>
            <Text style={styles.product_name}>{product.name || "Название отсутствует"}</Text>
            <View style={styles.product_sku}>
                <Text style={styles.product_attribute_label}>מק״ט: </Text>
                <Text style={styles.product_attribute_value}>{`${product.sku} `}</Text>
            </View>
            <View style={styles.item_price_wrapper}>
                <Text style={styles.item_price}>
                    <Price
                        value={product.price_range?.maximum_price?.regular_price?.value || 0}
                        currencyCode={product.price_range?.maximum_price?.regular_price?.currency || "USD"}
                        style={styles}
                    />
                </Text>
            </View>
            <Text style={styles.product_gender}>
                <Text style={styles.product_attribute_label}>מגדר:  </Text>
                {product.gender_filter_val}
            </Text>
            <Text style={styles.membership_points}>
                חברי VANS CLAB תוכלו לצבור
                {calcPoints(product.price_range?.maximum_price?.regular_price?.value || 0)}
                נקודות*
            </Text>
            <ImageCarousel images={images} />
            <Text style={styles.choose_color}>
                <Text style={styles.product_attribute_label}>צבע:  </Text>
                {product.color_val}
            </Text>
            <ProductOptions
                configurableOptions={product.configurable_options || []}
                handleSelectionChange={handleSelectionChange}
                setShowError={setShowError}
                product={product}
            />
            {showError && <Text style={styles.showError}>יש לבחור מידה</Text>}
            <SizeChart />
            <AddToCart
                onPress={handlePress}
                disabled={isAddToCartDisabled}
                stateAddToCartButton={stateAddToCartButton}
            />
            <Social product={product} />
            <ProductInfo product={product}/>
            <PopularyProduct data={popularProducts}/>
        </View>
    );
};

const styles = StyleSheet.create({
    product_top_details: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
    },
    breadcrumbs: {
        width: width - 20,

    },
    product_attribute_label: {
        fontSize: 16,
        textAlign: "right",
        fontWeight: 700,
    },
    product_attribute_value: {
        fontSize: 16,
        textAlign: "right",
    },
    product_name: {
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 20,
        textTransform: "uppercase",
        textAlign: "right"
    },
    product_sku: {
        flexDirection: "row",
        direction: "rtl",
        marginBottom: 20,
    },
    product_gender: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 20,
        marginTop: 20,
    },
    item_price: {
        fontSize: 16,
        color: "#c9192e",
        textAlign: "right"
    },
    membership_points: {
        fontSize: 16,
        letterSpacing: 0.8,
        color: '#000',
        textShadowColor: '#f7f84c',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "right"
//         marginTop: 20,
    },
    item_image: {
        height: width - 20,
        width: width - 20,
        backgroundColor: "#ffffff",
        paddingBottom: 30,
        borderBottom: 1
    },
    choose_color: {
        paddingTop: 20,
        paddingBottom: 10,
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        fontSize: 16,
    },
    showError: {
        color: "red",
        fontSize: 16,
        marginBottom: 5,
        textAlign: "right",
    }
})
export default ProductFullDetails;