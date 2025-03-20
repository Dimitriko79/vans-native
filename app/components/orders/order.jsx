import {View, StyleSheet, Dimensions} from "react-native";
import React from "react";
import ItemReview from "../checkout/itemsReview/itemsReview";

const { height, width } = Dimensions.get("window");

const Order = ({ order }) => {
    return (
        <View style={styles.container}>
            <ItemReview totalPrice={{ value: order.grand_total, currency: "ILS" }} productList={order.products} isPlacingOrder={true} isCustomerOrders={true} isShowRemove={false}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingHorizontal: 25
    }
})

export default Order;