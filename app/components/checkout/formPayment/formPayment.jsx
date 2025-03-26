import {StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions} from 'react-native';
import CouponCode from "./couponCode/couponCode";
import useFormPayment from "./useFormPayment";
import PaymentsWrapper from "./paymentsWrapper";
import React, { useCallback } from "react";
import { images } from "../../../../constants";
import LoadingIndicator from "../../loadingIndicator/loadingIndicator";

const { height } = Dimensions.get('window');

const FormPayment = ({
                         payments = [],
                         handleStep = () => {},
                         step = 1
                     }) => {
    const {
        selectedPayment,
        setSelectedPayment,
        handlePlaceOrder,
        loading
    } = useFormPayment({ handleStep, step });

    const getPaymentImage = useCallback((code) => {
        const paymentImages = {
            multipass_payment: images.buyMe,
            paypal_express: images.payPal
        };
        return paymentImages[code] || null;
    }, []);

    return (
        <View>
            <Modal
                visible={loading}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
            >
                <LoadingIndicator style={styles.loaderContainerOverlay}/>
            </Modal>
            <CouponCode />
            {payments && payments.length && payments.map((payment) => (
                <PaymentsWrapper
                    key={payment.code}
                    title={payment.title}
                    selected={selectedPayment === payment.code}
                    onSelectedPayment={() => setSelectedPayment(payment.code)}
                    image={getPaymentImage(payment.code)}
                >
                    {payment.code === 'cashondelivery' ? (
                        <View style={styles.form_payment_container}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                disabled={loading}
                                style={styles.form_payment_submit}
                                onPress={handlePlaceOrder}
                            >
                                <Text style={styles.form_payment_submit_text}>לסיום הזמנה</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text>{payment.title}</Text>
                    )}
                </PaymentsWrapper>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    form_payment_container: {
        paddingVertical: 20,
    },
    form_payment_submit: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d41921",
        height: 52,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    form_payment_submit_text: {
        color: "#fefefe",
        fontSize: 18,
        fontWeight: "600",
    },
    loaderContainerOverlay: {
        flex: 1,
        minHeight: height,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default FormPayment;
