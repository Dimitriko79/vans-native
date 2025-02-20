import {View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, FlatList} from "react-native";
import {Link} from "expo-router";
import {formatImageUrl} from "../../helpers/formatImageUrl";
import React from "react";

const { width } = Dimensions.get("window");

const PopularyProduct = ({data}) => {

    if (!data) return null;

    const {title, popular_products} = data;

    return (
        <View style={styles.popylary}>
            <View style={styles.popylary_title_wrapper}>
                <Text style={styles.popylary_title_before}/>
                <Text style={styles.popylary_title}>{title}</Text>
                <Text style={styles.popylary_title_after}/>
            </View>
            <FlatList
                data={popular_products}
                keyExtractor={(item, index) => index}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.populary_product}>
                        <Link href={item.url} style={styles.populary_product_link} target="_blank">
                            <Image style={styles.populary_product_image} resizeMode="cover" source={{uri: formatImageUrl(item.image)}} />
                            <View style={styles.populary_product_text_wrapper}>
                                <Text style={styles.populary_product_text}>{item.title}</Text>
                                <Text style={styles.populary_product_price}>{item.price}</Text>
                            </View>
                        </Link>
                    </View>
                )}
                contentContainerStyle={styles.populary_products}
                scrollEnabled={false}
                nestedScrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    popylary: {
        flex: 1,
        backgroundColor: '#f1f2ed',
        marginTop: 40,
        paddingBottom: 40,
        marginRight: 10,
        marginLeft: 10
    },
    popylary_title_wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 50,
        paddingRight: 10,
        paddingLeft: 10
    },
    popylary_title: {
        textAlign: "center",
        fontSize: 26,
        letterSpacing: -1.5,
        fontWeight: "bold",
    },
    popylary_title_before: {
        height: 5,
        width:50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: '#c1c2bd'
    },
    popylary_title_after: {
        height: 5,
        width:60,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: '#c1c2bd'
    },
    populary_products: {
        marginTop: 20
    },
    populary_product: {
        flex: 1,
        margin: 5,
        width: width / 2,
    },
    populary_product_link: {
        flex: 1,
        display: "flex",
        width: width / 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    populary_product_image: {
        width: (width / 2) - 20,
        height: width / 2,
        aspectRatio: 1
    },
    populary_product_text_wrapper: {
        width: (width / 2) - 20,
        flexDirection: "column",
        paddingTop: 10
    },
    populary_product_text: {
        color: "#000",
        fontSize: 14,
        height: 40,
        fontWeight: "normal",
        textAlign: "center",
    },
    populary_product_price: {
        color: "#000",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        display: "flex",
    }
})

export default PopularyProduct;