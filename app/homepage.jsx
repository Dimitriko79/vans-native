import React from "react";
import {View, StyleSheet, Text, ActivityIndicator, Dimensions, ScrollView} from "react-native";
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
        handlePress
    } = useHomepage();

    let content = null;

    if (loading) {
        content = (
            <View style={{height: height}}>
                <ActivityIndicator color style={{height: height / 1.4}}/>
            </View>
        )
    } else if (error) {
        content = (
            <View style={{height: height}}>
                <Text style={{height: height / 1.4}}>Error</Text>
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
        <ScrollView keyboardShouldPersistTaps="handled">
            {content}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    homepage: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
    }
});

export default Homepage;