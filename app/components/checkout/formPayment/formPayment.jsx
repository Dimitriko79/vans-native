import {StyleSheet, View, Text} from 'react-native';
import CouponCode from "./couponCode/couponCode";

const FormPayment = ({payments}) => {
    console.log(555, payments)

    const methods = payments.map((payment, index) => {
        return (
            <View key={index}>
                <Text>{payment.title}</Text>
            </View>
        )
    })
    return (
        <View>
            <Text>Payment Information</Text>
            <CouponCode/>
            {methods}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default FormPayment;