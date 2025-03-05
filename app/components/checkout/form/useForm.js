import * as Yup from "yup";

const useForm = ({handleStep, handleCustomerDetails}) => {
    const initialValues = {
        email: '',
        firstname: '',
        lastname: '',
        city: '',
        street: '',
        house: '',
        apartment: '',
        telephone: '',
        joining_club: false,
        confirm_terms: false,
        receive_announcements: false,
        delivery: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("נא להזין אימייל חוקי")
            .required("שדה דוא\"ל נדרש"),
        firstname: Yup.string().required("שדה השם הפרטי נדרש"),
        lastname: Yup.string().required("שדה השם משפחה נדרש"),
        house: Yup.string().required("שדה המספר בניין נדרש"),
    });

    const onSubmit = values => {
        handleCustomerDetails({...values});
        handleStep("SENDING");
    }

    return {
        initialValues,
        validationSchema,
        onSubmit
    }
}

export default useForm