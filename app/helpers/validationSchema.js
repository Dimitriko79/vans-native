import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
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
        // password: Yup.string()
        //     .min(6, "הסיסמה חייבת להיות באורך של לפחות 6 תווים")
        //     .required("נדרשת סיסמה"),
        confirm_terms: Yup.boolean().oneOf([true], "עליך לקבל את תנאי השימוש"),
});

export function validateMobilePhone(value) {
    const preparedValue = value.replace('-', '');

    if (preparedValue.length !== 10 && preparedValue.length !== 12 && preparedValue.length !== 13) {
        return false;
    }

    if (!preparedValue.length) {
        return true;
    }
    return /^\+?(972[-]?)?0?5[01234578]-?[0-9]{7}$/.test(preparedValue);
}