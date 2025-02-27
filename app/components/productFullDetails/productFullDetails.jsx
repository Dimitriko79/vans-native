import {Dimensions, Image, Text, View, StyleSheet} from "react-native";
import Price from "../price/price";
import ProductOptions from "../product/ProductOptions";
import SizeChart from "../product/SizeChart";
import AddToCart from "../cart/addToCart";
import {useProductFullDetails} from "./useProductFullDetails";

const { width } = Dimensions.get("window");

const ProductFullDetails = ({ product }) => {

    const {
        showError,
        optionSelections,
        handleValueChange,
        handleSelectionChange,
        handlePress,
        calcPoints

    } = useProductFullDetails({product});

    return (
        <View style={styles.product_top_details}>
            <Text style={styles.product_name}>{product.name}</Text>
            <View style={styles.product_sku}>
                <Text style={styles.product_attribute_label}>מק״ט: </Text>
                <Text style={styles.product_attribute_value}>{`${product.sku} `}</Text>
            </View>
            <View style={styles.item_price_wrapper}>
                <Text style={styles.item_price}>
                    <Price value={product.price_range.maximum_price.regular_price.value} currencyCode={product.price_range.maximum_price.regular_price.currency} style={styles} />
                </Text>
            </View>
            <Text style={styles.product_gender}>
                <Text style={styles.product_attribute_label}>מגדר:  </Text>
                נשים
            </Text>
            <Text style={styles.membership_points}>
                חברי VANS CLAB תוכלו לצבור
                {calcPoints(product.price_range.maximum_price.regular_price.value)}
                נקודות*
            </Text>
            <Image style={styles.item_image} source={{uri: product.image.url}} resizeMode="cover" />
            <Text style={styles.choose_color}>
                <Text style={styles.product_attribute_label}>צבע:  </Text>
                {product.color}
            </Text>
            <ProductOptions configurableOptions={product.configurable_options} optionSelections={optionSelections} handleSelectionChange={handleSelectionChange} />
            {showError && <Text style={styles.showError}>יש לבחור מידה</Text>}
            <SizeChart/>
            <AddToCart onPress={handlePress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    product_top_details: {
        paddingRight: 10,
        paddingLeft: 10,

    },
    product_attribute_label: {
        fontSize: 16,
        textAlign: "right",
        fontWeight: 700,
        fontFamily: 'Poppins-Bold',
    },
    product_attribute_value: {
        fontSize: 16,
        textAlign: "right",
        fontFamily: 'Poppins-Regular',
    },
    product_name: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        fontWeight: 700,
        marginBottom: 20,
        marginTop: 20,
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
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        fontSize: 16,
    },
    showError: {
        color: "red",
        fontSize: 16,
        marginBottom: 5,
    }
})
export default ProductFullDetails;