import React from "react";
import {View, StyleSheet, Text, ActivityIndicator, Dimensions, ScrollView, RefreshControl} from "react-native";
import ShopNowBanner from "./components/shopNowBanner/shopNowBanner";
import News from "./components/news/news";
import ShopBy from "./components/shopBy/shopBy";
import useHomepage from "./components/homepage/useHomepage";
import Hero from "./components/hero/hero";
import PopularyProduct from "./components/popularyProduct/popularyProduct";

const { height } = Dimensions.get("window");

const Homepage = () => {
    const {
        loading,
        error,
        homepageData,
        handlePress,
        onRefresh,refreshing
    } = useHomepage();

    let content = null;

    if (loading) {
        content = (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#d41921" />
            </View>
        )
    } else if (error) {
        content = (
            <View style={styles.loaderContainer}>
                <Text style={styles.errorText}>Error: Unable to load homepage data.</Text>
            </View>
        )
    } else {
        content = (
            <View contentContainerStyle={styles.homepage}>
                <Hero data={homepageData.getMainBannerData}/>
                <ShopNowBanner
                    data={homepageData.getShopNowData}
                />
                <News data={homepageData.getNewsData} />
                <ShopBy
                    data={homepageData.getShopByData}
                    handlePress={handlePress}
                />
                <PopularyProduct data={homepageData.getPopularProducts}/>
            </View>
        )
    }
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {content}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff",
    },
    homepage: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    loaderContainer: {
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "#d41921",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Homepage;