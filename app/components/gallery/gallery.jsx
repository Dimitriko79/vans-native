import { Dimensions, FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useMemo } from "react";
import Item from "./item";

const { height } = Dimensions.get("window");

const Gallery = ({ items = [] }) => {
    const renderItem = useMemo(
        () => ({ item }) => <Item item={item} />,
        []
    );

    return (
        <View style={styles.category}>
            {items.length === 0 ? (
                <View style={styles.noProductsContainer}>
                    <ActivityIndicator size="large" color="#d41921" />
                    <Text style={styles.noProductsText}>No products found(</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => String(item.id)}
                    numColumns={2}
                    renderItem={renderItem}
                    contentContainerStyle={styles.gallery}
                    scrollEnabled={false}
                    nestedScrollEnabled={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    category: {
        flex: 1,
        marginTop: 30,
        position: "relative",
    },
    gallery: {
        paddingHorizontal: 4,
    },
    noProductsContainer: {
        height: height / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    noProductsText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default Gallery;
