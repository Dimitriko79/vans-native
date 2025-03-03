import {StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, Linking} from "react-native";
import formatImageUrl from "../../helpers/formatImageUrl";
import React from "react";

const { width  } = Dimensions.get("window");

const ShopBy = ({data, handlePress}) => {

    if(!data || !data.length) return null;

    const items = data.map((item, index) => {
        const {image, url, title, sub_links} = item;
        return (
            <View key={index}>
                <ImageBackground style={styles.shopby_img} source={{uri: formatImageUrl(image)}}>
                    <View style={styles.shopby_overlay}/>
                </ImageBackground>
                <View style={styles.shopby_content}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(url)}
                        activeOpacity={0.7}
                        style={styles.shopby_title_link}
                    >
                        <Text style={styles.shopby_name}>
                            {title}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.shopby_links}>
                        {sub_links.map(({title, url}, ind) => (
                            <TouchableOpacity
                                key={`${ind}-${title}`}
                                onPress={() => Linking.openURL(url)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.shopby_link_name}>{title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        )
    })

    return (
        <View style={styles.shopby}>
            <Text style={styles.shopby_title}>SHOP BY</Text>
            {items}
        </View>
    )
}

const styles =  StyleSheet.create({
    shopby: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
        flexDirection: "column",
        gap: 40
    },
    shopby_title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
        letterSpacing: -1.5
    },
    shopby_img: {
        width: width,
        height: 250,
    },
    shopby_overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(31,19,19,0.55)',
    },
    shopby_content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        alignItems: "center",
    },
    shopby_name: {
        width: width,
        marginBottom: 5,
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        textTransform: "uppercase",
    },
    shopby_links: {
        flexDirection: "column",
        gap: 2
    },
    shopby_link_name: {
        width: width,
        fontSize: 15,
        fontWeight: "800",
        color: "#ffffff",
        textAlign: "center",
        textTransform: "uppercase"
    }
})

export default ShopBy