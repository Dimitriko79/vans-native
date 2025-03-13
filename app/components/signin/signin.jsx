import {View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image} from "react-native";
import Error from "../error/error";
import React from "react";
import {TextInput} from "react-native-element-textinput";
import {Formik} from "formik";
import useSignin, {JOIN_REWARDS} from "./useSignin";
import {validateMobilePhone} from "../../helpers/validationSchema";
import * as Yup from "yup";
import {images} from "../../../constants";

export const validationSchemaOTP = Yup.object().shape({
    telephone: Yup.string()
        .test("is-valid-phone", "מספר טלפון שגוי", validateMobilePhone)
        .required("שדה זה הוא חובה"),
});
export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("נא להזין אימייל חוקי")
        .required("שדה דוא\"ל נדרש"),
    password: Yup.string()
        .min(6, "הסיסמה חייבת להיות באורך של לפחות 6 תווים")
        .required("נדרשת סיסמה"),
});

const { width } = Dimensions.get('window');

const Signin = () => {

    const {
        loading = false,
        errorMessage = "",
        onErrorMessage = () => {},
        initialValues = { email: "", password: "", telephone: "" },
        onSubmit = () => {},
    } = useSignin();

    return (
        <View style={styles.container}>
            <Error errorMessage={errorMessage} onErrorMessage={onErrorMessage}/>
            <View style={styles.inner}>
                <View style={styles.sign_in_content_phone}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchemaOTP}
                        onSubmit={(values, {resetForm}) => {
                            onSubmit(values, 'otp', resetForm);
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
                                    <TouchableOpacity activeOpacity={0.5} disabled={loading} style={[styles.sign_in_content_form_submit, loading && styles.disabled]} onPress={() => handleSubmit()}>
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
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            onSubmit(values, 'default', resetForm);
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
                                    <TouchableOpacity activeOpacity={0.5} disabled={loading} style={[styles.sign_in_content_form_submit, loading && styles.disabled]} onPress={() => handleSubmit()}>
                                        <Text style={styles.sign_in_content_form_submit_text}>התחברות</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        )}
                    </Formik>
                </View>
            </View>
            <View style={styles.create_account_spacer}>
                <View style={styles.create_account_spacer_before}/>
                <Text style={styles.create_account_spacer_text}>או</Text>
                <View style={styles.create_account_spacer_after}/>
            </View>
            <View style={styles.create_account_wrapper}>
                <View style={styles.create_account_inner}>
                    <Image style={styles.create_account_image} source={images.vansJoin}/>
                    <View style={styles.new_customer_success_join_us_content_list}>
                        <Text style={styles.new_customer_success_join_us_content_text}>
                            הצטרפו עוד היום ותיהנו מעדכונים שוטפים
                        </Text>
                        <Text style={styles.new_customer_success_join_us_content_text}>
                            לפני כולם ומעקב אחרי הזמנות קיימות!
                        </Text>
                        {JOIN_REWARDS.map((item, index) => (
                            <View key={index} style={styles.new_customer_success_join_us_content_list_item}>
                                <Text style={styles.new_customer_success_join_us_content_list_item_text}>{item}</Text>
                                <Image source={images.listStar}/>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={styles.create_account_button} onPress={() => {}}>
                        <Text style={styles.create_account_button_text}>הצטרפו עכשיו!</Text>
                    </TouchableOpacity>
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
        backgroundColor: "#f1f2ed",
        paddingBottom: 10
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
        borderRadius: 0,
        paddingVertical: 15,
        marginTop: 10,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
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
    disabled: {
        opacity: 0.5
    },
    create_account_spacer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
        gap: 30
    },
    create_account_spacer_text: {
        fontSize: 14,
        fontWeight: 400,
        color: '#2b2b2b',
    },
    create_account_spacer_after: {
        backgroundColor: '#2b2b2b',
        height: 1,
        width: width * 0.15,
        marginRight: 25
    },
    create_account_spacer_before: {
        backgroundColor: '#2b2b2b',
        height: 1,
        width: width * 0.15,
        marginLeft: 25,
    },
    create_account_wrapper: {
        flex: 1,
        width: width - 50,
        height: (width - 50) * 1.8,
        justifyContent: "center",
        marginLeft: 25,
        marginRight: 25,
        marginTop: 50,
        marginBottom: 10
    },
    create_account_inner: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative"
    },
    create_account_image: {
        width: "100%",
        resizeMode: "cover",

    },
    new_customer_success_join_us_content_text: {
        textAlign: "center",
        width : "100%",
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: 500,
    },
    new_customer_success_join_us_content_list: {
        flexDirection: 'column',
        position: "absolute",
        paddingHorizontal: 30,
        top: "45%",
        width: "100%",
        alignItems: "flex-end",
        gap: 10,
    },
    new_customer_success_join_us_content_list_item: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        width: '45%',
        marginTop: 16
    },
    new_customer_success_join_us_content_list_item_text: {
        fontSize: 13,
        fontWeight: 400,
    },
    create_account_button: {
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d41921",
        borderRadius: 0,
        paddingVertical: 15,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        width: width - 100,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    create_account_button_text: {
        color: "#fefefe",
        fontSize: 18,
        fontWeight: 600,
    },
})

export default Signin;