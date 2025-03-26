import {Dimensions, FlatList, Image, Modal, StyleSheet, Text, View} from "react-native";
import useWishlist from "./components/wishlist/useWishlist";
import React, {useMemo} from "react";
import Item from "./components/wishlist/item";
import LoadingIndicator from "./components/loadingIndicator/loadingIndicator";
import {images} from "../constants";



const { height } = Dimensions.get("window");

const Wishlist = () => {
    const {items, handleWishlist, loading} = useWishlist();

    const renderItem = useMemo(
        () => ({ item }) => <Item item={item} handleWishlist={handleWishlist}/>,
        []
    );

    if (!items.length){
        return (
            <View style={styles.container}>
                <View style={styles.wishlist}>
                    <View style={styles.empty_block}>
                        <Text style={styles.empty_block_text}>
                            אין לך פריטים ב Wish List.
                        </Text>
                        <Image style={styles.empty_block_image} source={images.warning} />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/*<NavigationTabs/>*/}
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
        paddingVertical: 25,
        paddingHorizontal: 10
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
    wishlist_gallery: {
        paddingHorizontal: 4,
    },
    loaderContainerOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    empty_block: {
        backgroundColor: "#fdf0d5",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 15,
        direction: "rtl"
    },
    empty_block_text: {
        fontSize: 13,
        color: "#6f4400",
        width: "80%",
        textAlign: "left",
    },
    empty_block_image: {
        width: 24,
        height: 24,
    }
})

export default Wishlist