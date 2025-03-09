import {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Price from "../../price/price";

const RadioButton = (props) => {
    const { option, name, values, handleChange, index } = props;

    const {id, label, price} = option;
    const [focusedCheckbox, setFocusedCheckbox] = useState(null);

    return (
        <TouchableOpacity
            key={index}
            style={[
                styles.radioboxContainer,
                focusedCheckbox === id && styles.radioboxFocused
            ]}
            onPress={() => handleChange(name, id)}
            onFocus={() => setFocusedCheckbox(id)}
            onBlur={() => setFocusedCheckbox(null)}
            activeOpacity={0.8}
        >
            <View style={[
                styles.radiobox,
                values[name] === id && styles.radioboxChecked
            ]}>
                {values[name] === id && <View style={styles.checkmark}/>}
            </View>
            <View style={styles.radioboxPrice}>
                <Price value={price.value} currencyCode={price.currencyCode} />
            </View>
            <Text style={styles.radioboxLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    radioboxContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        direction: "rtl",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 5,
        gap: 14
    },
    radioboxFocused: {
        borderColor: "red",
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
        borderColor: "#0075ff",
        backgroundColor: "#fff",
    },
    checkmark: {
        backgroundColor: "#0075ff",
        borderRadius: 5,
        width: 10,
        height: 10,
    },
    radioboxPrice: {
      paddingHorizontal: 10
    },
    radioboxLabel: {
        paddingHorizontal: 20,
        textAlign: "left",
        fontSize: 14,
        fontWeight: 600,
        color: "#333",
        width: "90%"
    }
})

export default RadioButton;