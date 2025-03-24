import { View, StyleSheet, Text, Dimensions, Image, FlatList } from "react-native";
import { Link } from "expo-router";
import formatImageUrl from "../../helpers/formatImageUrl";
import React, { useMemo } from "react";

const { width } = Dimensions.get("window");

const PopularProduct = ({ data = { title: "", popular_products: [] }, isHomepage = false }) => {
    if (!data?.popular_products?.length) return null;

    const { title, popular_products } = data;
    const products = useMemo(() => popular_products, [popular_products]);

    return (
        <View style={[styles.popular, isHomepage && {marginTop: 40, marginHorizontal: 10}]}>
            <View style={styles.popular_title_wrapper}>
                <Text style={styles.popular_title_before} />
                <Text style={styles.popular_title}>{title}</Text>
                <Text style={styles.popular_title_after} />
            </View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.url}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.popular_product}>
                        <Link href={item.url} style={styles.popular_product_link} target="_blank">
                            <Image
                                style={styles.popular_product_image}
                                resizeMode="cover"
                                source={{ uri: formatImageUrl(item.image) }}
                            />
                            <View style={styles.popular_product_text_wrapper}>
                                <Text style={styles.popular_product_text}>{item.title}</Text>
                                <Text style={styles.popular_product_price}>{item.price}</Text>
                            </View>
                        </Link>
                    </View>
                )}
                contentContainerStyle={styles.popular_products}
                scrollEnabled={false}
                nestedScrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    popular: {
        flex: 1,
        backgroundColor: "#f1f2ed",
        marginBottom: 10,
        paddingBottom: 40,
    },
    popular_title_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 50,
        paddingHorizontal: 10,
    },
    popular_title: {
        textAlign: "center",
        fontSize: 26,
        fontFamily: 'Helvetica Neue',
        letterSpacing: -1.5,
        fontWeight: "bold",
    },
    popular_title_before: {
        height: 5,
        width: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#c1c2bd",
    },
    popular_title_after: {
        height: 5,
        width: 60,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#c1c2bd",
    },
    popular_products: {
        marginTop: 20,
    },
    popular_product: {
        flex: 1,
        margin: 5,
        width: width / 2 - 10,
        borderRadius: 0,
        elevation: 3,
    },
    popular_product_link: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
    },
    popular_product_image: {
        width: "100%",
        height: width / 2,
        aspectRatio: 1,
        borderRadius: 0,
    },
    popular_product_text_wrapper: {
        width: "100%",
        flexDirection: "column",
        paddingTop: 10,
        alignItems: "center",
    },
    popular_product_text: {
        color: "#000",
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        marginBottom: 5,
        fontFamily: 'Heebo'
    },
    popular_product_price: {
        color: "#000",
        fontSize: 12,
        fontWeight: "700",
        fontFamily: 'Heebo',
        textAlign: "center",
    },
});

export default PopularProduct;
