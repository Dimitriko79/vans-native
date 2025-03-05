import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Error from "../error/error";
import React from "react";
import {TextInput} from "react-native-element-textinput";
import {Formik} from "formik";
import useSignin from "./useSignin";
import {validationSchema} from "../../helpers/validationSchema";

const Signin = () => {

    const {
        errorMessage,
        onErrorMessage,
        initialValuesPhone,
        initialValuesMail,
        onSubmit
    } = useSignin();

    return (
        <View style={styles.container}>
            <Error errorMessage={errorMessage} onErrorMessage={onErrorMessage}/>
            <View style={styles.inner}>
                <View style={styles.sign_in_content_phone}>
                    <Formik
                        initialValues={initialValuesPhone}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            onSubmit(values);
                            resetForm();
                        }}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, resetForm }) => (
                            <React.Fragment>
                                <View style={styles.sign_in_content_form}>
                                    <Text style={styles.sign_in_content_title}>כניסה עם קוד חד פעמי ב SMS</Text>
                                    <View style={styles.sign_in_content_form_field}>
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
                                            value={values.telephone}
                                            onChangeText={handleChange("telephone")}
                                            onBlur={handleBlur("telephone")}
                                        />
                                        {touched.telephone && errors.telephone && <Text style={styles.errorText}>{errors.telephone}</Text>}
                                    </View>
                                    <TouchableOpacity style={styles.sign_in_content_form_submit} onPress={() => handleSubmit()}>
                                        <Text style={styles.sign_in_content_form_submit_text}>כניסה</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        )}
                    </Formik>
                </View>
                <View style={styles.sign_spacer}>
                    <View style={styles.sign_spacer_before}/>
                    <Text style={styles.sign_spacer_text}>OR</Text>
                    <View style={styles.sign_spacer_after}/>
                </View>
                <View style={styles.sign_in_content_mail}>
                    <Formik
                        initialValues={initialValuesMail}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            onSubmit(values);
                            resetForm();
                        }}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, resetForm }) => (
                            <React.Fragment>
                                <View style={styles.sign_in_content_form}>
                                    <Text style={styles.sign_in_content_title}>SIGN IN</Text>
                                    <View style={styles.sign_in_content_form_field}>
                                        <TextInput
                                            keyboardType="email-address"
                                            name="email"
                                            style={styles.input}
                                            inputStyle={styles.inputStyle}
                                            labelStyle={styles.labelStyle}
                                            placeholderStyle={styles.placeholderStyle}
                                            textErrorStyle={styles.textErrorStyle}
                                            label="דואר אלקטרוני"
                                            placeholderTextColor="#64686b"
                                            focusColor="#00699d"
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            onBlur={handleBlur("email")}
                                        />
                                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                                    </View>
                                    <View style={styles.sign_in_content_form_field}>
                                        <TextInput
                                            keyboardType="default"
                                            name="password"
                                            style={styles.input}
                                            inputStyle={styles.inputStyle}
                                            labelStyle={styles.labelStyle}
                                            placeholderStyle={styles.placeholderStyle}
                                            textErrorStyle={styles.textErrorStyle}
                                            label="סיסמה"
                                            placeholderTextColor="#64686b"
                                            focusColor="#00699d"
                                            value={values.password}
                                            onChangeText={handleChange("password")}
                                            onBlur={handleBlur("password")}
                                            secureTextEntry={true}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                    </View>
                                    <TouchableOpacity style={styles.sign_in_content_form_submit} onPress={() => handleSubmit()}>
                                        <Text style={styles.sign_in_content_form_submit_text}>התחברות</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        )}
                    </Formik>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "auto",
        position: "relative",
        backgroundColor: "#f1f2ed"
    },
    inner: {
        marginTop: 25,
        marginBottom: 25,
        marginLeft: 25,
        marginRight: 25,
        backgroundColor: "#fff",
    },
    sign_in_content_phone: {
        flex: 1,
    },
    sign_in_content_title: {
        color: '#2b2b2b',
        fontSize: 22,
        fontWeight: 700,
        textTransform: 'uppercase',
        textAlign: 'center',
        paddingTop: 20,
        fontFamily: 'Poppins-Bold'
    },
    sign_in_content_form: {
        flexDirection: "column",
        gap: 20,

        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    sign_in_content_form_field: {
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
    errorText: { fontSize: 13, textAlign: "right", color: "#d41921", marginTop: 5 },
    sign_in_content_form_submit: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d41921",
        height: 52
    },
    sign_in_content_form_submit_text: {
        color: "#fefefe",
        fontSize: 18,
        fontWeight: 600,
    },
    sign_spacer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 25,
        gap: 30
    },
    sign_spacer_text: {
        fontSize: 11,
        fontWeight: 400,
        color: '#b2b2b2'
    },
    sign_spacer_after: {
        backgroundColor: '#e5e2e2',
        height: 1,
        flex: 1,
        marginRight: 25
    },
    sign_spacer_before: {
        backgroundColor: '#e5e2e2',
        height: 1,
        flex: 1,
        marginLeft: 25
    },
    sign_in_content_mail: {
        flex: 1,
    },
})

export default Signin;