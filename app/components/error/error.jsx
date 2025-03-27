import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React, { useCallback } from "react";

const Error = ({ errorMessage = [], onErrorMessage = () => {}, style = {} }) => {
    const handleClose = useCallback(() => {
        onErrorMessage([]);
    }, [onErrorMessage]);

    if (!errorMessage.length) return null;

    return (
        <View style={[styles.error, style]}>
            <View style={styles.error_messages}>
                {errorMessage.map((message, index) => (
                    <Text key={index} style={styles.error_messages_text}>
                        {message}
                    </Text>
                ))}
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.error_icon}>
                <Icon name="close" color="#fae5e5" size={20} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    error: {
        flexDirection: "row",
        direction: "rtl",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fae5e5",
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 20,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    error_icon: {
        backgroundColor: "#b30000",
        borderRadius: 12,
        height: 24,
        width: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    error_messages: {
        flex: 1,
        flexDirection: "column",
        gap: 3,
    },
    error_messages_text: {
        fontSize: 13,
        fontWeight: "400",
        color: "#e02b27",
    },
});

export default Error;
