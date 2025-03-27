import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Modal} from "react-native";
import {Formik} from "formik";
import React, {useEffect, useState} from "react";
import Error from "../error/error";
import * as Yup from "yup";
import {validateMobilePhone} from "../../helpers/validationSchema";
import useCreateAccount from "./useCreateAccount";
import {TextInput} from "react-native-element-textinput";
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from "../checkout/formDetails/checkbox";
import {images} from "../../../constants";
import {JOIN_REWARDS} from "../signin/useSignin";
import LoadingIndicator from "../loadingIndicator/loadingIndicator";
import {useScrollContext} from "../../context/scroll/scrollContext";

const { width, height } = Dimensions.get('window');

const CreateAccount = props => {
    const { setResetScroll } = useScrollContext();
    const [editable, setEditable] = useState(false);
    const today = new Date();
    const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .matches(/^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s]+$/, "רק אותיות")
            .min(3, "השם הפרטי חייב להיות באורך של 3 תווים לפחות")
            .required("שדה השם הפרטי נדרש"),
        lastname: Yup.string()
            .matches(/^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s]+$/, "רק אותיות")
            .min(3, "השם משפחה חייב להיות באורך של 3 תווים לפחות")
            .required("שדה השם משפחה נדרש"),
        date_birth: Yup.string().required("שדה תאריך לידה נדרש"),
        telephone: Yup.string()
            .test("is-valid-phone", "מספר טלפון שגוי", validateMobilePhone)
            .required("שדה זה הוא חובה"),
        email: Yup.string()
            .email("נא להזין אימייל חוקי")
            .required("שדה דוא\"ל נדרש"),
        password: Yup.string()
            .min(8, "הסיסמה חייבת להיות באורך של לפחות 6 תווים")
            .required("נדרשת סיסמה"),
        approve_password: Yup.string()
            .oneOf([Yup.ref('password')], "הסיסמאות חייבות להיות תואמות")
            .required("אשר סיסמה נדרש"),
        is_subscribed: Yup.boolean().oneOf([true], "עליך לקבל את תנאי השימוש"),
    });

    const {
        isOpenCalendar,
        setOpenCalendar,
        errorMessage,
        onErrorMessage,
        initialValues,
        loading,
        onSubmit
    } = useCreateAccount();

    useEffect(() => {
        setResetScroll(true);
    }, []);

    return (
        <View style={styles.container}>
            <Error errorMessage={errorMessage} onErrorMessage={onErrorMessage}/>
            <Modal
                visible={loading}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
            >
                <LoadingIndicator style={styles.loaderContainerOverlay}/>
            </Modal>
            <View style={styles.inner}>
                <View style={styles.create_account}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            onSubmit(values, resetForm);
                        }}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched, handleBlur, setFieldValue, resetForm , setFieldTouched}) => (
                            <React.Fragment>
                                <View style={styles.create_account_content_form}>
                                    <Text style={styles.create_account_content_title}>שלום ברוך הבא למשפחה.*</Text>
                                    <Text style={styles.create_account_content_subtitle}>עזור לנו להכיר אותך טוב יותר. אתה יודע, כי משפחה נשארת קרובה.</Text>
                                    <View style={styles.create_account_content_form_field}>
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
                                            onFocus={() => setOpenCalendar(false)}
                                        />
                                        {touched.firstname && errors.firstname && <Text style={styles.errorText}>{errors.firstname}</Text>}
                                    </View>
                                    <View style={styles.create_account_content_form_field}>
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
                                            onFocus={() => setOpenCalendar(false)}
                                        />
                                        {touched.lastname && errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}
                                    </View>
                                    <View style={styles.create_account_content_form_field}>
                                        <TextInput
                                            name="date_birth"
                                            style={styles.input}
                                            inputStyle={styles.inputStyle}
                                            labelStyle={styles.labelStyle}
                                            placeholderStyle={styles.placeholderStyle}
                                            textErrorStyle={styles.textErrorStyle}
                                            label="תאריך לידה"
                                            placeholderTextColor="#64686b"
                                            value={values.date_birth ? new Date(values.date_birth).toLocaleDateString() : ''}
                                            readOnly={editable}
                                            clearButtonMode="never"
                                            onBlur={handleBlur("date_birth")}
                                            onPress={() => {
                                                setEditable(true);
                                                setTimeout(() => {
                                                    setEditable(false);
                                                }, 1);
                                                setFieldTouched("date_birth", true);
                                                setOpenCalendar(!isOpenCalendar);
                                            }}
                                            showIcon={false}
                                        />
                                        {touched.date_birth && errors.date_birth && (
                                            <Text style={styles.errorText}>{errors.date_birth}</Text>
                                        )}
                                        {isOpenCalendar && (
                                            <DateTimePicker
                                                textColor="#2b2b2b"
                                                value={values.date_birth !== '' ? new Date(values.date_birth) : new Date()}
                                                mode="date"
                                                maximumDate={eighteenYearsAgo}
                                                display="spinner"
                                                onChange={(event, selectedDate) => {
                                                    if (selectedDate) {
                                                        setFieldValue("date_birth", selectedDate.toISOString());
                                                    }
                                                }}
                                            />
                                        )}
                                    </View>
                                    <View style={styles.create_account_content_form_field}>
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
                                            onFocus={() => setOpenCalendar(false)}
                                        />
                                        {touched.telephone && errors.telephone && <Text style={styles.errorText}>{errors.telephone}</Text>}
                                    </View>
                                    <View style={styles.create_account_content_form_field}>
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
                                            onFocus={() => setOpenCalendar(false)}
                                        />
                                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                                    </View>
                                    <View style={styles.create_account_content_form_field}>
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
                                            onFocus={() => setOpenCalendar(false)}

                                        />
                                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                    </View>
                                    <View style={styles.create_account_content_form_field}>
                                        <TextInput
                                            keyboardType="default"
                                            name="approve_password"
                                            style={styles.input}
                                            inputStyle={styles.inputStyle}
                                            labelStyle={styles.labelStyle}
                                            placeholderStyle={styles.placeholderStyle}
                                            textErrorStyle={styles.textErrorStyle}
                                            label="אשר סיסמה"
                                            placeholderTextColor="#64686b"
                                            focusColor="#00699d"
                                            value={values.approve_password}
                                            onChangeText={handleChange("approve_password")}
                                            onBlur={handleBlur("approve_password")}
                                            secureTextEntry={true}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            onFocus={() => setOpenCalendar(false)}
                                        />
                                        {touched.approve_password && errors.approve_password && <Text style={styles.errorText}>{errors.approve_password}</Text>}
                                    </View>
                                    <View style={styles.checkout_form_shipping_method_checkboxes}>
                                        <Checkbox
                                            handleChange={() => setFieldValue('joining_club', !values['joining_club'])}
                                            values={values}
                                            option={{id: 'joining_club', label: 'מעוניין להצטרף למועדון (מאשר את התקנון)'}}
                                            touched={touched}
                                            errors={errors}
                                        />
                                        <Checkbox
                                            handleChange={() => setFieldValue('is_subscribed', !values['is_subscribed'])}
                                            values={values}
                                            option={{id: 'is_subscribed', label: 'מאשר שקראתי את תנאי השימוש ו מדיניות הפרטיות של Vans.'}}
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
                                    <TouchableOpacity activeOpacity={0.5} disabled={loading} style={styles.create_account_content_form_submit} onPress={() => handleSubmit()}>
                                        <Text style={styles.create_account_content_form_submit_text}>צור חשבון</Text>
                                    </TouchableOpacity>
                                    <Error errorMessage={errorMessage} onErrorMessage={onErrorMessage} style={{marginTop: 0, marginHorizontal: 0}}/>
                                </View>
                            </React.Fragment>
                        )}
                    </Formik>
                </View>
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
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: height,
        height: "auto",
        position: "relative",
        backgroundColor: "#f1f2ed",
        paddingBottom: 10
    },
    inner: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#fff",
    },
    create_account: {
        flex: 1,
    },
    create_account_content_title: {
        color: '#2b2b2b',
        fontSize: 22,
        fontWeight: 700,
        textTransform: 'uppercase',
        textAlign: 'center',
        paddingTop: 20,
    },
    create_account_content_subtitle: {
        textAlign: "center",
        marginTop: -20
    },
    create_account_content_form: {
        flexDirection: "column",
        gap: 20,

        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    create_account_content_form_field: {
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
    placeholderStyle: {fontSize: 14, textAlign: "right", fontFamily: "Heebo", fontWeight: '400', color: "#6a6a6a" },
    inputStyle: { fontSize: 14, textAlign: "right", fontFamily: "Heebo", fontWeight: '400'  },
    labelStyle: {
        fontSize: 14,
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        marginLeft: -4,
    },
    errorText: { fontSize: 13, textAlign: "right", color: "#d41921", marginTop: 5 },
    create_account_content_form_submit: {
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
    create_account_content_form_submit_text: {
        color: "#fefefe",
        fontSize: 18,
        fontWeight: 600,
    },
    create_account_wrapper: {
        flex: 1,
        width: width - 20,
        height: (width - 20) * 1.8,
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
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
        top: "50%",
        width: "100%",
        alignItems: "center",
        gap: 10,
    },
    new_customer_success_join_us_content_list_item: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        width: '80%',
        marginTop: 30
    },
    new_customer_success_join_us_content_list_item_text: {
        fontSize: 13,
        fontWeight: 400,
    },
    loaderContainerOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default CreateAccount;