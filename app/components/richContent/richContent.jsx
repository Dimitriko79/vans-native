import React from "react";
import { View, StyleSheet } from "react-native";
import HTMLView from "react-native-htmlview";

const RichContent = ({html = null}) => {

    if (!html) return null;

    return (
        <View style={styles.container}>
            <HTMLView
                value={html}
                stylesheet={styles}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginBottom: 50
    },
    p: {
        fontSize: 14,
        textAlign: "center",
        direction: "rtl",
        lineHeight: 14,
        marginBottom: -35
    },
});

export default RichContent;
