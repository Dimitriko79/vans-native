import {Dimensions, FlatList, StyleSheet, View, Text, Modal} from "react-native";
import React, { useMemo, useRef, useEffect } from "react";
import Item from "./item";
import useGallery from "./useGallery";
import LoadingIndicator from "../loadingIndicator/loadingIndicator";

const { height } = Dimensions.get("window");

const Gallery = ({ items = [] }) => {

    const {handleWishlistItem, loading} = useGallery();
    const flatListRef = useRef(null);

    const focusOnFirstItem = () => {
        if (flatListRef.current && items.length > 0) {
            const firstItemIndex = Math.max(items.length - 8, 0);
            // flatListRef.current.scrollToIndex({ index: firstItemIndex, animated: true });
        }
    };

    useEffect(() => {
        focusOnFirstItem();
    }, [items.length]);


    const renderItem = useMemo(() => ({ item }) => <Item item={item} onHandleWishlistItem={handleWishlistItem} />, []);

    if (!items.length)
        return (
            <View style={styles.noProductsContainer}>
                <Text style={styles.noProductsText}>No products found(</Text>
            </View>
        );

    return (
        <View style={styles.category}>
            <Modal
                visible={loading}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
            >
                <LoadingIndicator style={styles.loaderContainerOverlay}/>
            </Modal>
            <FlatList
                ref={flatListRef}
                data={items}
                keyExtractor={(item, index) => `${item.sku}_${item.name}_${index}`}
                numColumns={2}
                renderItem={renderItem}
                contentContainerStyle={styles.gallery}
                scrollEnabled={false}
                nestedScrollEnabled={false}
                getItemLayout={(data, index) => ({
                    length: 200,
                    offset: 200 * index,
                    index,
                })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    category: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        position: "relative",
    },
    gallery: {
        paddingHorizontal: 4,
    },
    noProductsContainer: {
        height: height/2,
        justifyContent: "center",
        alignItems: "center",
    },
    noProductsText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    loaderContainerOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Gallery;