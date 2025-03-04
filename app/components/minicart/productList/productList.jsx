import {FlatList, StyleSheet} from "react-native";
import React from "react";
import Item from "./item";

const ProductList = ({products, onPress}) => {

    return (
        <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={({ item }) => {
                return (
                    <Item item={item} onPress={onPress}/>
                );
            }}
            contentContainerStyle={styles.product_list}
            scrollEnabled={true}
            nestedScrollEnabled={true}
        />
    )
}

const styles= StyleSheet.create({
    product_list: {
        flexGrow: 1
    },
})

export default ProductList;