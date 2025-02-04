import {Alert, Dimensions, Image, Linking, Text, View, StyleSheet} from "react-native";
import CustomButton from "./customButton";
import React from "react";

const { width: screenWidth } = Dimensions.get("window");

const ShopNowBanner = ({image, title, description, handlePress, text, index}) => {

    return (
        <View style={styles.shopnow} key={index}>
            <Image
                style={styles.shopnow_image}
                source={image}
                resizeMode="contain"
            />
            <Text style={styles.shopnow_title}>{title}</Text>
            {description && (
                <Text style={styles.shopNow_description}>{description}</Text>
            )}
            <CustomButton
                title={text}
                isLoading={false}
                containerStyles={styles.shopNow_button}
                textStyles={styles.shopNow_button_text}
                handlePress={handlePress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    shopnow: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
    },
    shopnow_image: {
        width: screenWidth - 20,
        height: screenWidth,
    },
    shopnow_title: {
        fontSize: 38,
        fontWeight: "bold"
    },
    shopNow_description: {
        fontSize: 14,
        marginTop: 12
    },
    shopNow_button: {
        width: 140,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        marginTop: 25
    },
    shopNow_button_text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
    }
})

export default ShopNowBanner;