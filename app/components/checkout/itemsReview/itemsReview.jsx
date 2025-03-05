import {View, Text, StyleSheet} from "react-native";
import Price from "../../price/price";
import ProductList from "../../minicart/productList/productList";
import React from "react";

const ItemReview = ({totalPrice, productList}) => {

    return (
        <View style={styles.items_review}>
            <Text style={styles.items_review_title}>סיכום הזמנה</Text>
            <View>
                <View style={styles.items_review_total_items}>
                    <Text style={styles.items_review_total_text}>סה"כ</Text>
                    <Price value={totalPrice.value} currencyCode={totalPrice.currency}/>
                </View>
                <View style={styles.items_review_total_delivery}>
                    <Text style={styles.items_review_total_text}>משלוח חינם</Text>
                    <Price value={0.00} currencyCode="ILS"/>
                </View>
                <View style={styles.items_review_subtotal}>
                    <Text style={styles.items_review_subtotal_text}>סה"כ להזמנה</Text>
                    <Price value={totalPrice.value} currencyCode="ILS" style={styles} />
                </View>
            </View>
            <View style={styles.items_review_items}>
                <ProductList products={productList} onPress={() => {}} isCheckout={true}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    items_review: {
        flexDirection: "column",
        backgroundColor: "#fff",
        paddingVertical: 20,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 20
    },
    items_review_title: {
        textAlign: "right",
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 10
    },
    items_review_total_items: {
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10
    },
    items_review_total_delivery: {
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10
    },
    items_review_total_text: {
        color: "#333",
        fontSize: 14,
        fontWeight: 600,
    },
    items_review_subtotal: {
        backgroundColor: "#f1f2ed",
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 20,
        paddingHorizontal: 11,
        paddingVertical: 11,
        marginTop: 10,
        marginBottom: 10
    },
    items_review_subtotal_text: {
        color: "#333",
        fontSize: 16,
        fontWeight: 600,
    },
    currency: {
        fontSize: 16,
        fontWeight: 600,
    },
    value: {
        fontSize: 16,
        fontWeight: 600,
    },
    items_review_items: {
        paddingHorizontal: 20,
    }
})
export default ItemReview;