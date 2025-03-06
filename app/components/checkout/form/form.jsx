import {Text, View, StyleSheet, Alert, Button, TouchableOpacity} from "react-native";
import {TextInput} from "react-native-element-textinput";
import React from "react";
import { Formik } from "formik";
import useForm from "./useForm";
import Checkbox from "./checkbox";
import RadioButton from "./radioButton";
import {validateMobilePhone} from "../../../helpers/validationSchema";
import * as Yup from "yup";

const Form = props => {

    const {
        initialValues,
        onSubmit
    } = useForm(props);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("נא להזין אימייל חוקי")
            .required("שדה דוא\"ל נדרש"),
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
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm();
            }}
        >
            {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, resetForm }) => (
                <React.Fragment>
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
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                            />
                            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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
                                name="house"
                                style={styles.input}
                                inputStyle={styles.inputStyle}
                                labelStyle={styles.labelStyle}
                                placeholderStyle={styles.placeholderStyle}
                                textErrorStyle={styles.textErrorStyle}
                                label="מספר בניין"
                                placeholderTextColor="#64686b"
                                focusColor="#00699d"
                                value={values.house}
                                onChangeText={handleChange("house")}
                                onBlur={handleBlur("house")}
                            />
                            {touched.house && errors.house && <Text style={styles.errorText}>{errors.house}</Text>}
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
                        <Text style={styles.checkout_form_shipping_method_title}>בחירת שיטת משלוח</Text>
                        <View style={styles.checkout_form_shipping_method_checkboxes}>
                            <Checkbox
                                handleChange={setFieldValue}
                                values={values}
                                option={{id: 'joining_club', label: 'מעוניין להצטרף למועדון (מאשר את התקנון)'}}
                                touched={touched}
                                errors={errors}
                            />
                            <Checkbox
                                handleChange={setFieldValue}
                                values={values}
                                option={{id: 'confirm_terms', label: 'מאשר שקראתי את תנאי השימוש ו מדיניות הפרטיות של Vans.'}}
                                touched={touched}
                                errors={errors}
                            />
                            <Checkbox
                                handleChange={setFieldValue}
                                values={values}
                                option={{id: 'receive_announcements', label: 'אני רוצה לקבל מכם פרסומים על הטבות, שיתופי פעולה ועדכונים באמצעות דוא”ל ו SMS'}}
                                touched={touched}
                                errors={errors}
                            />
                        </View>
                    </View>
                    <View style={styles.checkout_form_delivery_method}>
                        <RadioButton handleChange={setFieldValue} values={values} name="delivery" option={{id: 'pickup', price: {value: 0.00, currencyCode: "ILS"}, label: 'שליח עד הבית'}}/>
                        <RadioButton handleChange={setFieldValue} values={values} name="delivery"  option={{id: 'delivery', price: {value: 0.00, currencyCode: "ILS"}, label: 'איסוף מסניף'}}/>
                    </View>
                    <View style={styles.checkout_form_submit_container}>
                        <TouchableOpacity style={styles.checkout_form_submit} onPress={() => handleSubmit()}>
                            <Text style={styles.checkout_form_submit_text}>הבא</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
            )}
        </Formik>
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
    errorText: { fontSize: 13, textAlign: "right", color: "#d41921", marginTop: 5 },
    checkout_form_shipping_method: {
        backgroundColor: "#f1f2ed",
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#d8d9d5'
    },
    checkout_form_shipping_method_title: {
        textAlign: "right",
        fontSize: 16,
        fontWeight: 700,
    },
    checkout_form_delivery_method: {
        marginTop: 40,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
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
    }
})

export default Form;