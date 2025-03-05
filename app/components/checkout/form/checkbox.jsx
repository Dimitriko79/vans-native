import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {useState} from "react";
import Icon from "react-native-vector-icons/AntDesign";

const Checkbox = props => {
    const { option, values, handleChange } = props;
    const {id, label} = option;

    const [focusedCheckbox, setFocusedCheckbox] = useState(null);

    return (
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
    }
})

export default Checkbox;