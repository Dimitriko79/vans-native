import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import * as Yup from "yup";
import {validateMobilePhone} from "./helpers/validationSchema";
import React from "react";
import {TextInput} from "react-native-element-textinput";
import Checkbox from "./components/checkout/formDetails/checkbox";
import {Formik} from "formik";
import useCustomer from "./components/customer/useCustomer";
import Error from "./components/error/error";

const { height } = Dimensions.get("window");

const Customer = () => {

    const {
        user,
        initialValues,
        onSubmit,
        loading,
        isUpdateEmail, setUpdateEmail,
        isUpdatePassword, setUpdatePassword,
        errorMessage,
        onErrorMessage
    } = useCustomer();

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .matches(/^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s]+$/, "רק אותיות")
            .min(3, "השם הפרטי חייב להיות באורך של 3 תווים לפחות")
            .required("שדה השם הפרטי נדרש"),
        lastname: Yup.string()
            .matches(/^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s]+$/, "רק אותיות")
            .min(3, "השם משפחה חייב להיות באורך של 3 תווים לפחות")
            .required("שדה השם משפחה נדרש"),
        telephone: Yup.string()
            .test("is-valid-phone", "מספר טלפון שגוי", value => {
                if (!value) return true;
                return validateMobilePhone(value);
            }),
        email: !isUpdateEmail ? Yup.mixed().notRequired() : Yup.string()
            .email("נא להזין אימייל חוקי")
            .required("שדה דוא\"ל נדרש"),
        password: !isUpdatePassword ? Yup.mixed().notRequired() : Yup.string()
            .min(8, "הסיסמה חייבת להיות באורך של לפחות 6 תווים")
            .required("נדרשת סיסמה"),
        approve_password: !isUpdatePassword ? Yup.mixed().notRequired() : Yup.string()
            .oneOf([Yup.ref('password')], "הסיסמאות חייבות להיות תואמות")
            .required("אשר סיסמה נדרש")
    });

    return (
        <View style={styles.container}>
            <Error errorMessage={errorMessage} onErrorMessage={onErrorMessage}/>
            <View style={styles.customer}>
                <Text style={styles.customer_title}>
                    פרטי חשבון
                </Text>
            </View>
            <View style={styles.customer_form}>
                <Formik
                    key={JSON.stringify(initialValues)}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, {resetForm}) => {
                        onSubmit(values, resetForm);
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, resetForm , setFieldTouched}) => (
                        <React.Fragment>
                            <View style={styles.customer_form_content}>
                                <View style={styles.customer_form_field}>
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
                                        value={values.firstname}
                                        onChangeText={handleChange("firstname")}
                                        onBlur={handleBlur("firstname")}
                                    />
                                    {touched.firstname && errors.firstname && <Text style={styles.errorText}>{errors.firstname}</Text>}
                                </View>
                                <View style={styles.customer_form_field}>
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
                                        value={values.lastname}
                                        onChangeText={handleChange("lastname")}
                                        onBlur={handleBlur("lastname")}
                                    />
                                    {touched.lastname && errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}
                                </View>
                                <View style={styles.customer_form_field}>
                                    <TextInput
                                        name="date_birth"
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="תאריך לידה"
                                        placeholderTextColor="#64686b"
                                        focusColor="#00699d"
                                        value={values.date_birth ? new Date(values.date_birth).toLocaleDateString() : ''}
                                        editable={false}
                                        pointerEvents="none"
                                        clearButtonMode="never"
                                        selectTextOnFocus={false}
                                        showIcon={false}
                                    />
                                </View>
                                <View style={styles.customer_form_field}>
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
                                {/*<View style={styles.customer_form_field}>*/}
                                {/*    <View style={styles.customer_form_field_checkboxes}>*/}
                                {/*        <Checkbox*/}
                                {/*            handleChange={() => {*/}
                                {/*                if(isUpdateEmail) {*/}
                                {/*                    setFieldValue('email', user.email)*/}
                                {/*                }*/}
                                {/*                setUpdateEmail(!isUpdateEmail);*/}
                                {/*                setFieldValue('update_email', !values['update_email']);*/}
                                {/*            }}*/}
                                {/*            values={values}*/}
                                {/*            option={{id: 'update_email', label: 'שנה כתובת דואר אלקטרוני'}}*/}
                                {/*            touched={touched}*/}
                                {/*            errors={errors}*/}
                                {/*        />*/}
                                {/*        <Checkbox*/}
                                {/*            handleChange={() => {*/}
                                {/*                if(values.update_password) {*/}
                                {/*                    setFieldValue('password', '');*/}
                                {/*                    setFieldValue('approve_password', '')*/}
                                {/*                }*/}
                                {/*                setUpdatePassword(!values.update_password)*/}
                                {/*                setFieldValue('update_password', !values['update_password']);*/}
                                {/*            }}*/}
                                {/*            values={values}*/}
                                {/*            option={{id: 'update_password', label: 'שינוי סיסמה'}}*/}
                                {/*            touched={touched}*/}
                                {/*            errors={errors}*/}
                                {/*        />*/}
                                {/*    </View>*/}
                                {/*</View>*/}
                                {/*{isUpdateEmail && (*/}
                                {/*    <View style={styles.customer_form_field}>*/}
                                {/*        <TextInput*/}
                                {/*            keyboardType="email-address"*/}
                                {/*            name="email"*/}
                                {/*            style={styles.input}*/}
                                {/*            inputStyle={styles.inputStyle}*/}
                                {/*            labelStyle={styles.labelStyle}*/}
                                {/*            placeholderStyle={styles.placeholderStyle}*/}
                                {/*            textErrorStyle={styles.textErrorStyle}*/}
                                {/*            label="דואר אלקטרוני"*/}
                                {/*            placeholderTextColor="#64686b"*/}
                                {/*            focusColor="#00699d"*/}
                                {/*            value={values.email}*/}
                                {/*            onChangeText={handleChange("email")}*/}
                                {/*            onBlur={handleBlur("email")}*/}
                                {/*        />*/}
                                {/*        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}*/}
                                {/*    </View>*/}
                                {/*)}*/}
                                {/*{isUpdatePassword && (*/}
                                {/*    <>*/}
                                {/*        <View style={styles.customer_form_field}>*/}
                                {/*            <TextInput*/}
                                {/*                keyboardType="default"*/}
                                {/*                name="password"*/}
                                {/*                style={styles.input}*/}
                                {/*                inputStyle={styles.inputStyle}*/}
                                {/*                labelStyle={styles.labelStyle}*/}
                                {/*                placeholderStyle={styles.placeholderStyle}*/}
                                {/*                textErrorStyle={styles.textErrorStyle}*/}
                                {/*                label="סיסמה"*/}
                                {/*                placeholderTextColor="#64686b"*/}
                                {/*                focusColor="#00699d"*/}
                                {/*                value={values.password}*/}
                                {/*                onChangeText={handleChange("password")}*/}
                                {/*                onBlur={handleBlur("password")}*/}
                                {/*                secureTextEntry={true}*/}
                                {/*                autoCapitalize="none"*/}
                                {/*                autoCorrect={false}*/}
                                {/*            />*/}
                                {/*            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}*/}
                                {/*        </View>*/}
                                {/*        <View style={styles.customer_form_field}>*/}
                                {/*            <TextInput*/}
                                {/*                keyboardType="default"*/}
                                {/*                name="approve_password"*/}
                                {/*                style={styles.input}*/}
                                {/*                inputStyle={styles.inputStyle}*/}
                                {/*                labelStyle={styles.labelStyle}*/}
                                {/*                placeholderStyle={styles.placeholderStyle}*/}
                                {/*                textErrorStyle={styles.textErrorStyle}*/}
                                {/*                label="אשר סיסמה"*/}
                                {/*                placeholderTextColor="#64686b"*/}
                                {/*                focusColor="#00699d"*/}
                                {/*                value={values.approve_password}*/}
                                {/*                onChangeText={handleChange("approve_password")}*/}
                                {/*                onBlur={handleBlur("approve_password")}*/}
                                {/*                secureTextEntry={true}*/}
                                {/*                autoCapitalize="none"*/}
                                {/*                autoCorrect={false}*/}
                                {/*            />*/}
                                {/*            {touched.approve_password && errors.approve_password && <Text style={styles.errorText}>{errors.approve_password}</Text>}*/}
                                {/*        </View>*/}
                                {/*    </>*/}
                                {/*)}*/}
                                <TouchableOpacity activeOpacity={0.5} disabled={loading} style={[styles.customer_form_submit, loading && styles.disabled]} onPress={() => handleSubmit()}>
                                    <Text style={styles.customer_form_submit_text}>שמור</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    )}
                </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: "#f1f2ed"
    },
    customer: {
        padding: 25
    },
    customer_title: {
        fontSize: 22,
        fontFamily: "Heebo",
        fontWeight: "900",
        textAlign: "right",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c6",
    },
    customer_form: {
        backgroundColor: "#fff",
        marginLeft: 25,
        marginRight: 25,
    },
    customer_form_content: {
        flexDirection: "column",
        gap: 20,

        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    customer_form_field: {
        position: "relative"
    },
    customer_form_field_checkboxes: {

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
    placeholderStyle: {fontSize: 14, textAlign: "right", fontFamily: "Heebo", fontWeight: '400', color: "#6a6a6a" },
    inputStyle: { fontSize: 14, textAlign: "right", fontFamily: "Heebo", fontWeight: '400'  },
    labelStyle: {
        fontSize: 14,
        position: 'absolute',
        top: -10,
        backgroundColor: '#ffffff',
        paddingHorizontal: 4,
        marginLeft: -4,
    },
    errorText: { fontSize: 13, textAlign: "right", color: "#d41921", marginTop: 5 },
    customer_form_submit: {
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
    customer_form_submit_text: {
        color: "#fefefe",
        fontSize: 18,
        fontWeight: 600,
    },
    disabled: {
        opacity: 0.5
    },
})

export default Customer;