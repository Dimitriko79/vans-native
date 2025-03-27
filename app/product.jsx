import React, {useEffect} from "react";
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
import {useScrollContext} from "./context/scroll/scrollContext";

const { height } = Dimensions.get("window");

const Product = () => {
    const { setResetScroll } = useScrollContext();
    const { urlKey } = useLocalSearchParams();

    const talonProps = useProduct(urlKey);

    const { productData, popularProducts, loading, error } = talonProps;

    useEffect(() => {
        setResetScroll(true);
    }, []);

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
            <View style={styles.container}>
                <ProductFullDetails product={productData} popularProducts={popularProducts} />
            </View>
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
