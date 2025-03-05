import {View, Text, StyleSheet, Dimensions} from "react-native";
import useCheckout, {CHECKOUT_STEP} from "./components/checkout/useCheckout";
import Icon from "react-native-vector-icons/AntDesign";
import RichContent from "./components/richContent/richContent";
import React from "react";
import {TextInput} from "react-native-element-textinput";
import ProgressBar from "./components/checkout/progressBar/progressBar";
import Form from "./components/checkout/form/form";

const { width } = Dimensions.get("window");

const Checkout = () => {
    const STEP = "WELCOME";

    const {
        cmsBlockData
    } = useCheckout();
    let content;

    if(CHECKOUT_STEP[STEP].id === 1) {
        content = (
            <View style={styles.checkout_content}>
                <View style={styles.checkout_content_title}>
                    <Text style={styles.checkout_content_title_text}>{CHECKOUT_STEP[STEP].title}</Text>
                </View>
                <Form/>
            </View>
        )
    } else if(CHECKOUT_STEP[STEP].id === 2) {
        content = (
            <View style={styles.checkout_content}>
                <View style={styles.checkout_content_title}>
                    <Text style={styles.checkout_content_title_text}>{CHECKOUT_STEP[STEP].title}</Text>
                </View>
            </View>
        )
    } else if (CHECKOUT_STEP[STEP].id === 3) {
        content = (
            <View style={styles.checkout_content}>

            </View>
        )
    } else {
        content = null;
    }

    return (
            <View style={styles.container}>
                {cmsBlockData && cmsBlockData.length && cmsBlockData.map((item, index) =><View key={index}><RichContent html={item.content}/></View> )}
                <ProgressBar step={STEP}/>
                {content}
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "auto",
        position: "relative",
        backgroundColor: "#f1f2ed",
    },
    checkout_content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 25,
    },
    checkout_content_title: {
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "flex-start",
        marginBottom: 15
    },
    checkout_content_title_text: {
        fontSize: 16,
        fontWeight: 600,
        color: '#333'
    },
})

export default Checkout;