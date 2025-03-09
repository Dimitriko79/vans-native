import React from "react";
import {Text, TouchableOpacity, View, StyleSheet, Image} from "react-native";

const PaymentsWrapper = ({children, title, selected, onSelectedPayment, image}) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onSelectedPayment()} style={styles.payment_wrapper_trigger}>
                <View style={[
                    styles.radiobox,
                    selected && styles.radioboxChecked
                ]}>
                    {selected && <View style={styles.checkmark}/>}
                </View>
                <View style={styles.payment_wrapper_trigger_inner}>
                    {image && <Image source={image} style={styles.payment_wrapper_trigger_image}/>}
                    <Text style={styles.payment_wrapper_trigger_text}>{title}</Text>
                </View>
            </TouchableOpacity>
            {selected && children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 20
    },
    payment_wrapper_trigger: {
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        height: 56
    },
    payment_wrapper_trigger_inner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    payment_wrapper_trigger_image: {
        height: 30,
        width: 30
    },
    payment_wrapper_trigger_text: {
        flex: 1,
        textAlign: "left",
        fontSize: 16,
        fontWeight: 700
    },
    radiobox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: "#64686b",
        borderRadius: 8,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    radioboxChecked: {
        borderColor: "#d41921",
        backgroundColor: "#fff",
    },
    checkmark: {
        backgroundColor: "#d41921",
        borderRadius: 5,
        width: 10,
        height: 10,
    },
});

export default PaymentsWrapper;