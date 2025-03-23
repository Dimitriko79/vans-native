import { View, Text, StyleSheet } from "react-native";
import Price from "../../price/price";
import ProductList from "../../minicart/productList/productList";
import React, { useMemo } from "react";

const ItemReview = ({
                        totalPrice = { value: 0.00, currency: "ILS" },
                        productList = [],
                        isPlacingOrder = false,
                        isCustomerOrders = false,
                        isShowRemove = false
                    }) => {
    const totalPriceFormatted = useMemo(() => ({
        value: totalPrice?.value || 0,
        currency: totalPrice?.currency || "ILS"
    }), [totalPrice]);

    return (
        <View style={isPlacingOrder ? styles.placing_order : styles.items_review}>
            <Text style={isPlacingOrder ? styles.placing_order_title : styles.items_review_title}>
                {isCustomerOrders ? 'פריטים שהוזמנו' : 'סיכום הזמנה'}
            </Text>

            <View style={styles.items_review_items}>
                <ProductList products={productList} isShowRemove={isShowRemove}/>
            </View>

            <View style={styles.placing_order_inner_total}>
                <View style={styles.items_review_total_items}>
                    <Text style={styles.items_review_total_text}>סכום ביניים</Text>
                    <Price value={totalPriceFormatted.value} currencyCode={totalPriceFormatted.currency} />
                </View>
                <View style={styles.items_review_total_delivery}>
                    <Text style={styles.items_review_total_text}>משלוח וטיפול</Text>
                    <Price value={0.00} currencyCode="ILS" />
                </View>
                <View style={styles.items_review_subtotal}>
                    <Text style={styles.items_review_subtotal_text}>סה"כ להזמנה</Text>
                    <Price value={totalPriceFormatted.value} currencyCode="ILS" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    items_review: {
        flexDirection: "column",
        backgroundColor: "#fff",
        paddingVertical: 20,
        marginHorizontal: 25,
        marginBottom: 20
    },
    items_review_title: {
        textAlign: "right",
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10
    },
    items_review_total_items: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 10
    },
    items_review_total_delivery: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 10
    },
    items_review_total_text: {
        color: "#333",
        fontSize: 14,
        fontWeight: "600",
    },
    items_review_subtotal: {
        backgroundColor: "#f1f2ed",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        paddingHorizontal: 11,
        paddingVertical: 11,
        marginVertical: 10
    },
    items_review_subtotal_text: {
        color: "#333",
        fontSize: 16,
        fontWeight: "600",
    },
    items_review_items: {
        paddingHorizontal: 20,
    },
    placing_order: {
        flexDirection: "column",
        paddingVertical: 20,
        marginHorizontal: 0,
        marginBottom: 20
    },
    placing_order_title: {
        marginTop: 25,
        marginBottom: 20,
        fontSize: 24,
        fontFamily: 'Heebo',
        fontWeight: "700",
        textAlign: "right",
        borderBottomWidth: 1,
        borderBottomColor: "#e4e4e4",
    },
    placing_order_inner_total: {
        backgroundColor: "#ffffff",
        marginTop: 15,
        direction: "rtl"
    }
});

export default ItemReview;
