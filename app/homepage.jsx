import React from "react";
import {View, StyleSheet, Text, ScrollView, ActivityIndicator, Dimensions} from "react-native";
import ShopNowBanner from "./components/shopNowBanner/shopNowBanner";
import News from "./components/news/news";
import ShopBy from "./components/shopBy/shopBy";
import {useHomepage} from "./components/homepage/useHomepage";
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
            <View style={styles.homepage}>
                <ActivityIndicator style={{height: height - 200}}/>
            </View>
        )
    } else if (error) {
        content = (
            <View style={styles.homepage}>
                <Text style={{height: height - 200}}>Error</Text>
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
        <ScrollView>
            {content}
        </ScrollView>
    );
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