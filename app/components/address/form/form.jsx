import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import {Formik} from "formik";
import React from "react";
import {TextInput} from "react-native-element-textinput";
import Checkbox from "../../checkout/formDetails/checkbox";
import useForm from "./useForm";
import * as Yup from "yup";
import {validateMobilePhone} from "../../../helpers/validationSchema";
import {images} from "../../../../constants";

const { height } = Dimensions.get("window");

const Form = props => {

    const {
        initialValues,
        onSubmit,
        onUpdate,
        loading,
        isUpdateAddress,
        isDefaultBillingAddress,
        isDefaultShippingAddress,
        setIsAddingAddress,
        setUpdateAddress
    } = useForm(props);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .matches(/^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s]+$/, "רק אותיות")
            .min(3, "השם הפרטי חייב להיות באורך של 3 תווים לפחות")
            .required("שדה השם הפרטי נדרש"),
        lastname: Yup.string()
            .matches(/^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s]+$/, "רק אותיות")
            .min(3, "השם משפחה חייב להיות באורך של 3 תווים לפחות")
            .required("שדה השם משפחה נדרש"),
        city: Yup.string().required("שדה העיר מגורים נדרש"),
        street: Yup.string().required("שדה הרחוב נדרש"),
        telephone: Yup.string()
            .test("is-valid-phone", "מספר טלפון שגוי", validateMobilePhone)
            .required("שדה זה הוא חובה"),
    });

    return (
        <View style={styles.container}>
            <View style={styles.address_form}>
                <View style={styles.address_form_title}>
                    <Text style={[styles.address_form_title_text, {paddingHorizontal: 25, paddingTop: 25,}]}>
                        מידע ליצירת קשר
                    </Text>
                </View>
                <Formik
                    key={JSON.stringify(initialValues)}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        isUpdateAddress ? onUpdate(values) : onSubmit(values);
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
                                        keyboardType="default"
                                        name="company"
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="חברה"
                                        placeholderTextColor="#64686b"
                                        focusColor="#00699d"
                                        value={values.company}
                                        onChangeText={handleChange("company")}
                                        onBlur={handleBlur("company")}
                                    />
                                    {touched.company && errors.company && <Text style={styles.errorText}>{errors.company}</Text>}
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
                                <View style={styles.address_form_title}>
                                    <Text style={styles.address_form_title_text}>
                                        כתובת
                                    </Text>
                                </View>
                                <View style={styles.customer_form_field}>
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
                                <View style={styles.customer_form_field}>
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
                                {!isUpdateAddress && (
                                    <View style={styles.customer_form_field}>
                                        <View style={styles.customer_form_field_checkboxes}>
                                            <Checkbox
                                                handleChange={() => {setFieldValue('default_billing', !values['default_billing']);}}
                                                values={values}
                                                option={{id: 'default_billing', label: 'קבע ככתובת ברירת המחדל לחיוב'}}
                                                touched={touched}
                                                errors={errors}
                                            />
                                            <Checkbox
                                                handleChange={() => {setFieldValue('default_shipping', !values['default_shipping']);}}
                                                values={values}
                                                option={{id: 'default_shipping', label: 'קבע ככתובת ברירת המחדל למשלוח'}}
                                                touched={touched}
                                                errors={errors}
                                            />
                                        </View>
                                    </View>
                                )}
                                {isDefaultBillingAddress && (
                                    <View style={styles.checkout_form_delivery_method_error}>
                                        <Text style={styles.checkout_form_delivery_method_error_text}>
                                            זוהי כתובת ברירת המחדל שלך לחיוב.
                                        </Text>
                                        <Image style={styles.checkout_form_delivery_method_error_image} source={images.warning} />
                                    </View>
                                )}
                                {isDefaultShippingAddress && (
                                    <View style={styles.checkout_form_delivery_method_error}>
                                        <Text style={styles.checkout_form_delivery_method_error_text}>
                                            זוהי כתובת ברירת המחדל שלך למשלוח.
                                        </Text>
                                        <Image style={styles.checkout_form_delivery_method_error_image} source={images.warning} />
                                    </View>
                                )}
                                <TouchableOpacity activeOpacity={0.5} disabled={loading} style={[styles.customer_form_submit, loading && styles.disabled]} onPress={() => handleSubmit()}>
                                    <Text style={styles.customer_form_submit_text}>שמור כתובת</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                                    onPress={() => {
                                        setIsAddingAddress(false);
                                        setUpdateAddress(null);
                                    }}
                                >
                                    <Text style={{color: '#006bb4', fontWeight: '400', fontSize: 16, fontFamily: 'Heebo'}}>תחזור</Text>
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
        backgroundColor: "#f1f2ed",
        marginTop: 25
    },
    address_form_title_text: {
        fontSize: 22,
        fontFamily: "Heebo",
        fontWeight: "900",
        textAlign: "right",
    },
    address_form: {
        backgroundColor: "#fff",
        marginLeft: 10,
        marginRight: 10,
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
    checkout_form_delivery_method_error: {
        backgroundColor: "#fdf0d5",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 15,
        direction: "rtl"
    },
    checkout_form_delivery_method_error_text: {
        fontSize: 13,
        color: "#6f4400",
        width: "80%",
        textAlign: "left",
    },
    checkout_form_delivery_method_error_image: {
        width: 24,
        height: 24,
    }
})

export default Form;