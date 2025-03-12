import RadioButton from "../formDetails/radioButton";
import { Image, Text, View, StyleSheet } from "react-native";
import { images } from "../../../../constants";
import React, { useMemo } from "react";

const ShippingMethods = ({
                             methods = [],
                             values = {},
                             setFieldValue = () => {},
                             touched = {},
                             errors = {}
                         }) => {
    if (!methods.length) return null;

    const methodItems = useMemo(() =>
            methods.map((method, index) => (
                <RadioButton
                    key={method.method_code || index}
                    index={index}
                    handleChange={setFieldValue}
                    values={values}
                    name="delivery"
                    option={{
                        id: method.method_code,
                        price: { value: 0.00, currencyCode: "ILS" },
                        label: method.method_title
                    }}
                />
            )),
        [methods, setFieldValue, values]);

    return (
        <View style={styles.checkout_form_delivery_method}>
            {methodItems}
            {touched.delivery && errors.delivery && (
                <View style={styles.checkout_form_delivery_method_error}>
                    <Text style={styles.checkout_form_delivery_method_error_text}>
                        שיטת המשלוח חסרה. בחר שיטת משלוח ונסה שוב.
                    </Text>
                    <Image style={styles.checkout_form_delivery_method_error_image} source={images.warning} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    checkout_form_shipping_method: {
        backgroundColor: "#f1f2ed",
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#d8d9d5"
    },
    checkout_form_shipping_method_title: {
        textAlign: "right",
        fontSize: 16,
        fontWeight: "700",
    },
    checkout_form_delivery_method: {
        marginTop: 40,
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 20
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
});

export default React.memo(ShippingMethods);
