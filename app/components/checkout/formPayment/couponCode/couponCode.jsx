import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import * as Yup from "yup";
import React from "react";
import {Formik} from "formik";
import useCouponCode from "./useCouponCode";
import {TextInput} from "react-native-element-textinput";
import Icon from "react-native-vector-icons/AntDesign";

const couponCode = () => {

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .min(8, "הקוד קופון חייב להיות באורך של 8 תווים לפחות")
            .required("שדה הקוד קופון נדרש"),
    });

    const {
        initialValues,
        isCouponOpen,
        handleSubmit,
        handleToggle
    } = useCouponCode();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleToggle} style={styles.coupon_trigger}>
                <Text style={styles.coupon_trigger_title}>שימוש בקוד הנחה</Text>
                <Icon name={isCouponOpen ? "up" : "down"} color="#000"/>
            </TouchableOpacity>
            {isCouponOpen && (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, {resetForm}) => {
                        handleSubmit(values, resetForm);
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, resetForm }) => (
                        <React.Fragment>
                            <View style={styles.coupon_form}>
                                <View style={styles.coupon_form_field}>
                                    <TextInput
                                        keyboardType="default"
                                        name="code"
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="הכנס קופון קוד"
                                        placeholderTextColor="#64686b"
                                        focusColor="#00699d"
                                        value={values.code}
                                        onChangeText={handleChange("code")}
                                        onBlur={handleBlur("code")}
                                    />
                                    {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
                                </View>
                                <TouchableOpacity activeOpacity={0.5}  style={[styles.coupon_form_submit]} onPress={() => handleSubmit()}>
                                    <Text style={styles.coupon_form_submit_text}>מימוש</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    )}
                </Formik>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 20
    },
    coupon_trigger: {
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "space-between",
        alignItems: "center",
        height: 56
    },
    coupon_trigger_title: {
        textAlign: "right",
        fontSize: 18,
        fontWeight: 700,
    },
    coupon_form: {
        flexDirection: "row",
        direction: "rtl",
        marginBottom: 30,
        gap: 0,
        height: 39
    },
    coupon_form_field: {
        position: "relative",
        flex: 1
    },
    input: {
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#fff',
        fontSize: 14,
        direction: "rtl",
    },
    placeholderStyle: {fontSize: 14, textAlign: "right", fontFamily: "Heebo", fontWeight: '400', color: "#6a6a6a" },
    inputStyle: { fontSize: 14, textAlign: "right", fontFamily: "Heebo", fontWeight: '400'  },
    labelStyle: {
        fontSize: 14,
        position: 'absolute',
        top: -10,
        backgroundColor: '#f1f2ed',
        paddingHorizontal: 4,
        marginLeft: -4,
    },
    errorText: { fontSize: 13, textAlign: "left", color: "#d41921", marginTop: 5, marginBottom: 10 },
    coupon_form_submit: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d41921",
        height: 40,
        width: "25%"
    },
    coupon_form_submit_text: {
        color: "#fefefe",
        fontSize: 14,
        fontWeight: 600,
    },
    disabled: {
        opacity: 0.5
    }
})

export default couponCode;