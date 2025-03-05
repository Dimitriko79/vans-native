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

    const onSubmit = values => {
        handleCustomerDetails({...values});
        handleStep("SENDING");
    }

    return {
        initialValues,
        onSubmit
    }
}

export default useForm