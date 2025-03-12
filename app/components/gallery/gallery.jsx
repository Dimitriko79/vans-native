import {FlatList, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import Item from "./item";

const Gallery = ({ items = [] }) => {
    const renderItem = useMemo(
        () => ({ item }) => <Item item={item} />,
        []
    );

    return (
        <View style={styles.category}>
            <FlatList
                data={items}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                renderItem={renderItem}
                contentContainerStyle={styles.gallery}
                scrollEnabled={false}
                nestedScrollEnabled={false}
            />
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
});

export default Gallery;
