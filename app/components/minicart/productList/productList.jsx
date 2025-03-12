import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useCallback } from "react";
import Item from "./item";

const ProductList = ({ products = [], onPress = () => {}, isCheckout = false }) => {
    const renderProductItem = useCallback(({ item }) => (
        <Item item={item} isCheckout={isCheckout} onPress={onPress} />
    ), [isCheckout]);

    return products?.length > 0 ? (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id?.toString() || item.name}
            numColumns={1}
            renderItem={renderProductItem}
            contentContainerStyle={styles.product_list}
            scrollEnabled={!isCheckout}
            nestedScrollEnabled={false}
        />
    ) : (
        <View style={styles.emptyList}>
            <Text style={styles.emptyListText}>אין מוצרים בסל</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    product_list: {
        flexGrow: 1,
    },
    emptyList: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    emptyListText: {
        fontSize: 16,
        color: "#64686b",
    },
});

export default ProductList;
