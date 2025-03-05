import {Text, View, StyleSheet} from "react-native";
import {TextInput} from "react-native-element-textinput";
import React from "react";

const Form = () => {

    return (
        <View style={styles.checkout_form}>
            <Text style={styles.checkout_form_title}>פרטים אישיים</Text>
            <View style={styles.checkout_form_field}>
                <TextInput
                    keyboardType="email-address"
                    name="email"
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="כתובת אימייל"
                    placeholderTextColor="#64686b"
                    focusColor="#00699d"
                    onChangeText={() => {}}
                />
                {/*<Icon name="star" color="red" size={4} style={styles.required} />*/}
            </View>
            <View style={styles.checkout_form_field}>
                <TextInput
                    keyboardType="default"
                    name="firstname"
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="שם פרטי"
                    placeholderTextColor="#64686b"
                    focusColor="#00699d"
                    onChangeText={() => {}}
                />
                {/*<Icon name="star" color="red" size={4} style={styles.required} />*/}
            </View>
            <View style={styles.checkout_form_field}>
                <TextInput
                    keyboardType="default"
                    name="lastname"
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="שם משפחה"
                    placeholderTextColor="#64686b"
                    focusColor="#00699d"
                    onChangeText={() => {}}
                />
                {/*<Icon name="star" color="red" size={4} style={styles.required} />*/}
            </View>
            <View style={styles.checkout_form_field}>
                <TextInput
                    keyboardType="default"
                    name="city"
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="עיר מגורים"
                    placeholderTextColor="#64686b"
                    focusColor="#00699d"
                    onChangeText={() => {}}
                />
                {/*<Icon name="star" color="red" size={4} style={styles.required} />*/}
            </View>
            <View style={styles.checkout_form_field}>
                <TextInput
                    keyboardType="default"
                    name="street"
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="רחוב"
                    placeholderTextColor="#64686b"
                    focusColor="#00699d"
                    onChangeText={() => {}}
                />
                {/*<Icon name="star" color="red" size={4} style={styles.required} />*/}
            </View>
            <View style={styles.checkout_form_field}>
                <TextInput
                    keyboardType="numeric"
                    name="house"
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="מספר בניין"
                    placeholderTextColor="#64686b"
                    focusColor="#00699d"
                    onChangeText={() => {}}
                />
                {/*<Icon name="star" color="red" size={4} style={styles.required} />*/}
            </View>
            <View style={styles.checkout_form_field}>
                <TextInput
                    keyboardType="numeric"
                    name="apartment"
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="מספר דירה"
                    placeholderTextColor="#64686b"
                    focusColor="#00699d"
                    onChangeText={() => {}}
                />
                {/*<Icon name="star" color="red" size={4} style={styles.required} />*/}
            </View>
            <View style={styles.checkout_form_field}>
                <TextInput
                    keyboardType="phone-pad"
                    name="telephone"
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="מספר טלפון נייד"
                    placeholderTextColor="#64686b"
                    focusColor="#00699d"
                    onChangeText={() => {}}
                />
                {/*<Icon name="star" color="red" size={4} style={styles.required} />*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkout_form: {
        flexDirection: "column",
        gap: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    checkout_form_title: {
        textAlign: "right",
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: 600,
    },
    checkout_form_field: {
        position: "relative"
    },
    input: {
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        fontSize: 14,
        direction: "rtl",
    },
    inputStyle: { fontSize: 14, textAlign: "right" },
    labelStyle: {
        fontSize: 14,
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        marginLeft: -4,
    },
    textErrorStyle: { fontSize: 14 },
    required: {
        position: "absolute",
        top: 15,
        right: 8
    }
})

export default Form;