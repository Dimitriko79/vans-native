import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CouponCode from "./couponCode/couponCode";
import useFormPayment from "./useFormPayment";
import PaymentsWrapper from "./paymentsWrapper";
import React from "react";
import {images} from "../../../../constants";

const FormPayment = ({payments, handleStep, step}) => {
    const {
        selectedPayment,
        setSelectedPayment,
        handlePlaceOrder,
        loading
    } = useFormPayment({handleStep, step});

    const methods = payments.map((payment, index) => {
        let image;
        if(payment.code === 'multipass_payment') {
            image = images.buyMe;
        } else if(payment.code === 'paypal_express') {
            image = images.payPal;
        } else {
            image = null;
        }

        return (
            <PaymentsWrapper
                key={index}
                title={payment.title}
                selected={selectedPayment === payment.code}
                onSelectedPayment={() => setSelectedPayment(payment.code)}
                image={image}
            >
                {payment.code === 'cashondelivery' ? (
                    <View style={styles.form_payment_container}>
                        <TouchableOpacity activeOpacity={0.5} disabled={loading} style={[styles.form_payment_submit, loading && styles.disabled]} onPress={handlePlaceOrder}>
                            <Text style={styles.form_payment_submit_text}>לסיום הזמנה</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text>{payment.title}</Text>
                )}
            </PaymentsWrapper>
        )
    })
    return (
        <View>
            <CouponCode/>
            {methods}
        </View>
    )
}

const styles = StyleSheet.create({
    form_payment_container: {
        paddingVertical: 20,
    },
    form_payment_submit: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d41921",
        height: 52
    },
    form_payment_submit_text: {
        color: "#fefefe",
        fontSize: 18,
        fontWeight: 600,
    },
    disabled: {
        opacity: 0.5
    }
})

export default FormPayment;