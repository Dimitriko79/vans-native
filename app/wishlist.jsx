import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import useWishlist from "./components/wishlist/useWishlist";
import React, {useMemo} from "react";
import Item from "./components/wishlist/item";



const { height } = Dimensions.get("window");

const Wishlist = () => {
    const {items} = useWishlist();

    const renderItem = useMemo(
        () => ({ item }) => <Item item={item.product} />,
        []
    );

    return (
        <View style={styles.container}>
            <View style={styles.wishlist}>
                <Text style={styles.wishlist_title}>הרשימה שלי</Text>
            </View>
            <View style={styles.wishlist_content}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => String(item.id)}
                    numColumns={2}
                    renderItem={renderItem}
                    contentContainerStyle={styles.wishlist_gallery}
                    scrollEnabled={false}
                    nestedScrollEnabled={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: height,
        backgroundColor: "#f1f2ed"
    },
    wishlist: {
        padding: 25
    },
    wishlist_title: {
        fontSize: 22,
        fontFamily: "Heebo",
        fontWeight: "900",
        textAlign: "right",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c6",
    },
    gallery: {
        paddingHorizontal: 4,
    },
})

export default Wishlist