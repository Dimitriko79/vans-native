import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {TextInput} from "react-native-element-textinput";
import React from "react";
import { Formik } from "formik";
import useFormDetails from "./useFormDetails";
import Checkbox from "./checkbox";
import {validateMobilePhone} from "../../../helpers/validationSchema";
import * as Yup from "yup";
import ShippingMethods from "../shippingMethods/shippingMethods";
import {CHECKOUT_STEP} from "../useCheckout";
import DetailsReview from "../detailsReview/detailsReview";

const FormDetails = ({
        shippingMethods = [],
        isStepOneDone = false,
        step = 1,
        ...props
    }) => {

    const {
        isSignedIn,
        isEmailAvailable,
        initialValues,
        customerDetails,
        handleEmailAvailable,
        onSubmit,
        onLogin,
        setStepOneDone,
        loading,
        loadingLogin
    } = useFormDetails(props);

    const validationSchema = Yup.object().shape({
        email: isSignedIn ? Yup.mixed().notRequired() : Yup.string()
            .email("נא להזין אימייל חוקי")
            .required("שדה דוא\"ל נדרש"),
        password: isEmailAvailable || isSignedIn ? Yup.mixed().notRequired() : Yup.string()
            .min(6, "הסיסמה חייבת להיות באורך של לפחות 6 תווים")
            .required("נדרשת סיסמה"),
        firstname: Yup.string()
            .matches(/^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s]+$/, "רק אותיות")
            .min(3, "השם הפרטי חייב להיות באורך של 3 תווים לפחות")
            .required("שדה השם הפרטי נדרש"),
        lastname: Yup.string()
            .matches(/^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s]+$/, "רק אותיות")
            .min(3, "השם משפחה חייב להיות באורך של 3 תווים לפחות")
            .required("שדה השם משפחה נדרש"),
        city: Yup.string().required("שדה זה הוא חובה"),
        street: Yup.string().required("שדה זה הוא חובה"),
        telephone: Yup.string()
            .test("is-valid-phone", "מספר טלפון שגוי", validateMobilePhone)
            .required("שדה זה הוא חובה"),
        confirm_terms: Yup.boolean().oneOf([true], "עליך לקבל את תנאי השימוש"),
        delivery: Yup.string().required("יש לבחור שיטת משלוח"),
    });

    return (
        <>
            {CHECKOUT_STEP[step].id === 2 && (
                <View>
                    <Text style={{textAlign: "right", fontSize: 24, fontWeight: 700}}>
                        כתובת חיוב
                    </Text>
                    <Checkbox
                        handleChange={() => setStepOneDone(!isStepOneDone)}
                        values={isStepOneDone ? {isStepOneDone: true} : {} }
                        option={{id: 'isStepOneDone', label: 'כתובת החיוב וכתובת המשלוח שלי זהות'}}
                    />
                </View>
            )}
            {
                isStepOneDone ? (
                    <DetailsReview details={customerDetails}/>
                ) : (
                    <Formik
                        key={JSON.stringify(initialValues)}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            onSubmit(values, resetForm);
                        }}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, resetForm }) => (
                            <>
                                <View style={styles.checkout_form}>
                                    <Text style={styles.checkout_form_title}>פרטים אישיים</Text>
                                    {!isSignedIn && (
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
                                                value={values.email}
                                                onChangeText={handleChange("email")}
                                                onBlur={(e) => {
                                                    handleBlur("email")(e);
                                                    handleEmailAvailable(values.email);
                                                }}
                                            />
                                            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                                        </View>
                                    )}
                                    {!isEmailAvailable && !isSignedIn && (
                                        <>
                                            <View style={styles.checkout_form_field}>
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
                                            <Text style={styles.sign_in_content_form_submit_description}>יש לך כבר חשבון אצלנו. היכנס או המשך כאורח.</Text>
                                            <TouchableOpacity activeOpacity={0.5} disabled={loadingLogin} style={[styles.sign_in_content_form_submit, loadingLogin && styles.disabled]} onPress={() => onLogin(values)}>
                                                <Text style={styles.sign_in_content_form_submit_text}>התחברות</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
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
                                            value={values.firstname}
                                            onChangeText={handleChange("firstname")}
                                            onBlur={handleBlur("firstname")}
                                        />
                                        {touched.firstname && errors.firstname && <Text style={styles.errorText}>{errors.firstname}</Text>}
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
                                            value={values.lastname}
                                            onChangeText={handleChange("lastname")}
                                            onBlur={handleBlur("lastname")}
                                        />
                                        {touched.lastname && errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}
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
                                            value={values.city}
                                            onChangeText={handleChange("city")}
                                            onBlur={handleBlur("city")}
                                        />
                                        {touched.city && errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
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
                                            value={values.street}
                                            onChangeText={handleChange("street")}
                                            onBlur={handleBlur("street")}
                                        />
                                        {touched.street && errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
                                    </View>
                                    <View style={styles.checkout_form_field}>
                                        <TextInput
                                            keyboardType="default"
                                            name="building"
                                            style={styles.input}
                                            inputStyle={styles.inputStyle}
                                            labelStyle={styles.labelStyle}
                                            placeholderStyle={styles.placeholderStyle}
                                            textErrorStyle={styles.textErrorStyle}
                                            label="מספר בניין"
                                            placeholderTextColor="#64686b"
                                            focusColor="#00699d"
                                            value={values.building}
                                            onChangeText={handleChange("building")}
                                            onBlur={handleBlur("building")}
                                        />
                                        {touched.building && errors.building && <Text style={styles.errorText}>{errors.building}</Text>}
                                    </View>
                                    <View style={styles.checkout_form_field}>
                                        <TextInput
                                            keyboardType="default"
                                            name="apartment"
                                            style={styles.input}
                                            inputStyle={styles.inputStyle}
                                            labelStyle={styles.labelStyle}
                                            placeholderStyle={styles.placeholderStyle}
                                            textErrorStyle={styles.textErrorStyle}
                                            label="מספר דירה"
                                            placeholderTextColor="#64686b"
                                            focusColor="#00699d"
                                            value={values.apartment}
                                            onChangeText={handleChange("apartment")}
                                            onBlur={handleBlur("apartment")}
                                        />
                                        {touched.apartment && errors.apartment && <Text style={styles.errorText}>{errors.apartment}</Text>}
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
                                            value={values.telephone}
                                            onChangeText={handleChange("telephone")}
                                            onBlur={handleBlur("telephone")}
                                        />
                                        {touched.telephone && errors.telephone && <Text style={styles.errorText}>{errors.telephone}</Text>}
                                    </View>
                                </View>
                                <View style={styles.checkout_form_shipping_method}>
                                    <View style={styles.checkout_form_shipping_method_checkboxes}>
                                        <Checkbox
                                            handleChange={() => setFieldValue('joining_club', !values['joining_club'])}
                                            values={values}
                                            option={{id: 'joining_club', label: 'מעוניין להצטרף למועדון (מאשר את התקנון)'}}
                                            touched={touched}
                                            errors={errors}
                                        />
                                        <Checkbox
                                            handleChange={() => setFieldValue('confirm_terms', !values['confirm_terms'])}
                                            values={values}
                                            option={{id: 'confirm_terms', label: 'מאשר שקראתי את תנאי השימוש ו מדיניות הפרטיות של Vans.'}}
                                            touched={touched}
                                            errors={errors}
                                        />
                                        <Checkbox
                                            handleChange={() => setFieldValue('receive_announcements', !values['receive_announcements'])}
                                            values={values}
                                            option={{id: 'receive_announcements', label: 'אני רוצה לקבל מכם פרסומים על הטבות, שיתופי פעולה ועדכונים באמצעות דוא”ל ו SMS'}}
                                            touched={touched}
                                            errors={errors}
                                        />
                                    </View>
                                </View>
                                <ShippingMethods
                                    methods={shippingMethods}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    touched={touched}
                                    errors={errors}
                                />
                                <View style={styles.checkout_form_submit_container}>
                                    <TouchableOpacity activeOpacity={0.5} disabled={loading} style={[styles.checkout_form_submit, loading && styles.disabled]} onPress={() => handleSubmit()}>
                                        <Text style={styles.checkout_form_submit_text}>הבא</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    checkout_form: {
        flexDirection: "column",
        gap: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 20
    },
    checkout_form_title: {
        textAlign: "right",
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: 700,
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
    placeholderStyle: {
        color: "#6a6a6a"
    },
    errorText: { fontSize: 13, textAlign: "right", color: "#d41921", marginTop: 5 },
    checkout_form_submit_container: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#d8d9d5'
    },
    checkout_form_submit: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d41921",
        height: 52
    },
    checkout_form_submit_text: {
        color: "#fefefe",
        fontSize: 18,
        fontWeight: 600,
    },
    disabled: {
        opacity: 0.5
    },
    sign_in_content_form_submit: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d41921",
        height: 52
    },
    sign_in_content_form_submit_description: {
        fontSize: 14,
        fontWeight: 400,
        color: '#333',
        textAlign: 'right'
    },
    sign_in_content_form_submit_text: {
        color: "#fefefe",
        fontSize: 18,
        fontWeight: 600,
    },
})

export default FormDetails;