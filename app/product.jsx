import {View, Text, StyleSheet, ActivityIndicator, Dimensions} from "react-native";
import {useLocalSearchParams} from "expo-router";
import useProduct from "./components/product/useProduct";
import ProductFullDetails from "./components/productFullDetails/productFullDetails";
import React from "react";

const { height } = Dimensions.get("window");

const Product = () => {
    const { urlKey } = useLocalSearchParams();
    const talonProps = useProduct(urlKey);
    const {
        productData,
        loading,
        error
    } = talonProps;


    if (loading) {
        return (
            <View style={{height: height}}>
                <ActivityIndicator style={{height: height / 1.4}}/>
            </View>
        );
    }

    if(error) {
        return (
            <View style={{height: height}}>
                <Text style={{height: height / 1.4}}>Error</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ProductFullDetails product={productData}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#f1f2ed",

    }
});

export default Product;


