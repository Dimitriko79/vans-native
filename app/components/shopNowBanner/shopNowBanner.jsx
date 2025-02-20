import {Dimensions, Image, Text, View, StyleSheet, Linking} from "react-native";
import CustomButton from "../customButton";
import React from "react";
import {formatImageUrl} from "../../helpers/formatImageUrl";
import RenderHTML from 'react-native-render-html';

const { width } = Dimensions.get("window");

const ShopNowBanner = ({data}) => {

    if (!data || !data.length) return null;

    const items = data.map((item) => {
       const {image, title, description, handlePress, text, index, link} = item;
       const cleanText = description.replace(/<br\s*\/?>/gi, "");

       return (
           <View style={styles.shopnow} key={`${index}_${link}`}>
               <Image
                   style={styles.shopnow_image}
                   source={{uri: formatImageUrl(image)}}
                   resizeMode="contain"
               />
               <Text style={styles.shopnow_title}>{title}</Text>
               {description && (
                   <Text style={{
                       textAlign: 'center',
                       fontSize: 14,
                       marginTop: 12,
                   }}>
                       {cleanText}
                   </Text>
               )}
               <CustomButton
                   title={text}
                   isLoading={false}
                   containerStyles={styles.shopNow_button}
                   textStyles={styles.shopNow_button_text}
                   handlePress={() => Linking.openURL(link)}
               />
           </View>
       )
    })
    return (
        <View style={styles.container}>
            {items}
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
        width: width - 20,
        height: width,
    },
    shopnow_title: {
        fontSize: 36,
        fontWeight: "bold",
        letterSpacing: -1.5
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