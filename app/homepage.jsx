import React from "react";
import {View, StyleSheet, Text, ScrollView, ActivityIndicator} from "react-native";
import ShopNowBanner from "./components/shopNowBanner/shopNowBanner";
import News from "./components/news/news";
import ShopBy from "./components/shopBy/shopBy";
import {useHomepage} from "./components/homepage/useHomepage";
import Hero from "./components/hero/hero";
import CustomActivityIndicator from "./components/customActivityIndicator";
import PopularyProduct from "./components/popularyProduct/popularyProduct";

const Homepage = () => {
    const {
        loading,
        error,
        homepageData,
        handlePress
    } = useHomepage();

    if (loading && !homepageData) return <ActivityIndicator/>
    if (error) return <Text>Error</Text>;

    return (
        <ScrollView>
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