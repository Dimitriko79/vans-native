import {Dimensions, StyleSheet, Text, View} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

const Address = () => {

    return (
        <View style={styles.container}>
            <View style={styles.addresses}>
                <Text style={styles.addresses_title}>ספר כתובות</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#f1f2ed",
        minHeight: height
    },
    addresses: {
        padding: 25,
    },
    addresses_title: {
        fontSize: 22,
        fontFamily: "Heebo",
        fontWeight: "900",
        textAlign: "right",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c6",
    },
})

export default Address;