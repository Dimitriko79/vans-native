import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/AntDesign";

const Checkbox = props => {
    const { option, values, handleChange, touched, errors } = props;
    const {id, label} = option;
    console.log(3333, errors)
    const [focusedCheckbox, setFocusedCheckbox] = useState(null);

    return (
        <React.Fragment>
            <TouchableOpacity
                key={id}
                style={[
                    styles.checkboxContainer,
                    focusedCheckbox === id && styles.checkboxFocused
                ]}
                onPress={() => handleChange(id, !values[id])}
                onFocus={() => setFocusedCheckbox(id)}
                onBlur={() => setFocusedCheckbox(null)}
                activeOpacity={0.8}
            >
                <View style={[
                    styles.checkbox,
                    values[id] && styles.checkboxChecked
                ]}>
                    {values[id] && <Icon name="check" color="#d41921" size={10}/>}
                </View>
                <Text style={styles.checkboxLabel}>{label}</Text>
            </TouchableOpacity>
            {touched[id] && errors[id] && <Text style={styles.errorText}>{errors[id]}</Text>}
        </React.Fragment>
    )
}

const styles= StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        direction: "rtl",
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 5,
        gap: 14
    },
    checkboxFocused: {
        borderColor: "red",
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: "#64686b",
        borderRadius: 0,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        borderColor: "#d41921",
        backgroundColor: "#fff",
    },
    checkboxLabel: {
        textAlign: "left",
        fontSize: 14,
        fontWeight: 400,
        color: "#64686b",
        width: "90%"
    },
    errorText: { fontSize: 13, textAlign: "right", color: "#d41921" },
})

export default Checkbox;