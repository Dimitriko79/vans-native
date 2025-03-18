import { Dimensions, FlatList, StyleSheet, View, Text } from "react-native";
import React, { useMemo, useRef, useEffect } from "react";
import Item from "./item";

const { height } = Dimensions.get("window");

const Gallery = ({ items = [], pageSize = 1 }) => {

    const flatListRef = useRef(null);

    const focusOnFirstItem = () => {
        if (flatListRef.current && items.length > 0) {
            const firstItemIndex = Math.max(items.length - pageSize, 0); // Новый первый элемент страницы
            console.log('firstItemIndex', firstItemIndex)
            // flatListRef.current.scrollToIndex({ index: firstItemIndex, animated: true });
        }
    };

    useEffect(() => {
        focusOnFirstItem();
    }, [items.length]);


    const renderItem = useMemo(() => ({ item }) => <Item item={item} />, []);

    if (!items.length)
        return (
            <View style={styles.noProductsContainer}>
                <Text style={styles.noProductsText}>No products found(</Text>
            </View>
        );

    return (
        <View style={styles.category}>
            <FlatList
                ref={flatListRef}
                data={items}
                keyExtractor={(item, index) => `${item.sku}_${item.name}_${index}`}
                numColumns={2}
                renderItem={renderItem}
                contentContainerStyle={styles.gallery}
                scrollEnabled={true}
                nestedScrollEnabled={false}
                // getItemLayout={(data, index) => ({
                //     length: 200, // Высота элемента (примерная)
                //     offset: 200 * index, // Смещение элемента
                //     index,
                // })}
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