import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useProduct from "./components/product/useProduct";
import ProductFullDetails from "./components/productFullDetails/productFullDetails";
import LoadingIndicator from "./components/loadingIndicator/loadingIndicator";

const { height } = Dimensions.get("window");

const Product = () => {
    const { urlKey } = useLocalSearchParams();

    const talonProps = useProduct(urlKey);

    const { productData, loading, error } = talonProps;

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <LoadingIndicator/>
            </View>
        );
    }

    if (error || !productData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>An error has occurred. Please try again later.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <ProductFullDetails product={productData} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#f1f2ed",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: height,
    },
    errorText: {
        fontSize: 16,
        color: "#d41921",
        fontWeight: "bold",
    },
});

export default Product;
