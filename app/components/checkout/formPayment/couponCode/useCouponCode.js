import {Alert} from "react-native";
import {useState} from "react";

const useCouponCode = () => {

    const [isCouponOpen, setCouponOpen] = useState(false);
    const initialValues = {
        code: ''
    }

    const handleSubmit = async (values, resetForm) => {
        Alert.alert(JSON.stringify(initialValues))
    }

    const handleToggle = () => {
        setCouponOpen(!isCouponOpen);
    }
    return {
        initialValues,
        isCouponOpen,
        handleToggle,
        handleSubmit
    }
}

export default useCouponCode;