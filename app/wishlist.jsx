import {Dimensions, FlatList, Modal, StyleSheet, Text, View} from "react-native";
import useWishlist from "./components/wishlist/useWishlist";
import React, {useMemo} from "react";
import Item from "./components/wishlist/item";
import LoadingIndicator from "./components/loadingIndicator/loadingIndicator";



const { height } = Dimensions.get("window");

const Wishlist = () => {
    const {items, handleWishlist, loading} = useWishlist();

    const renderItem = useMemo(
        () => ({ item }) => <Item item={item} handleWishlist={handleWishlist}/>,
        []
    );

    return (
        <View style={styles.container}>
            <View style={styles.wishlist}>
                <Text style={styles.wishlist_title}>הרשימה שלי</Text>
            </View>
            <Modal
                visible={loading}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
            >
                <LoadingIndicator style={styles.loaderContainerOverlay}/>
            </Modal>
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
    loaderContainerOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Wishlist