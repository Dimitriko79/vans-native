import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

const Checkbox = ({
                      option = { id: '', label: '' },
                      values = {},
                      handleChange = () => {},
                      touched = {},
                      errors = {}
                  }) => {
    const { id, label } = option;

    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.checkboxContainer,
                    values[id] && styles.checkboxCheckedContainer
                ]}
                onPress={handleChange}
                activeOpacity={0.8}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: values[id] }}
            >
                <Text style={styles.checkboxLabel}>{label}</Text>
                <View style={[styles.checkbox, values[id] && styles.checkboxChecked]}>
                    {values[id] && <Icon name="check" color="#d41921" size={10} />}
                </View>
            </TouchableOpacity>
            {touched?.[id] && errors?.[id] && <Text style={styles.errorText}>{errors[id]}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 8,
        gap: 14,
    },
    checkboxCheckedContainer: {
        borderColor: "#d41921",
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: "#64686b",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        borderColor: "#d41921",
        backgroundColor: "#fff",
    },
    checkboxLabel: {
        fontSize: 14,
        color: "#64686b",
        flexShrink: 1,
        textAlign: "right"
    },
    errorText: {
        fontSize: 13,
        color: "#d41921",
        marginTop: 4,
    },
});

export default Checkbox;
