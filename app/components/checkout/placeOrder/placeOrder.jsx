import {Image, Text, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import {images} from "../../../../constants";
import {EXCLUSIVES} from "../useCheckout";
import ItemReview from "../itemsReview/itemsReview";
import DetailsReview from "../detailsReview/detailsReview";
import React from "react";
import useCheckoutContext from "../../../context/checkout/checkoutProvider";

const { width } = Dimensions.get("window");

const PlaceOrder = () => {
    const {
        order_number,
        amount, products,
        shippingDetails,
        shipping,
        payment
    } = useCheckoutContext();

    return (
        <React.Fragment>
            <View style={styles.checkout_content_top_success}>
                <Text style={styles.checkout_content_top_success_text}>ההזמנה שלך בוצעה</Text>
            </View>
            <Text style={styles.checkout_content_top_success_thanks}>תודה</Text>
            <View style={styles.checkout_content_top_success_order_number}>
                <Text style={styles.checkout_content_top_success_order_number_order_text}>מספר ההזמנה שלך: </Text>
                <Text style={styles.checkout_content_top_success_order_number_order}>{order_number} </Text>
            </View>
            <View style={styles.new_customer_success_wrapper}>
                <Image source={images.vansMain} style={styles.new_customer_success_join_us_image} />
                <View style={styles.new_customer_success_join_us_content}>
                    <Text style={styles.new_customer_success_join_rewards_text}>הירשם עכשיו וקבל תגמולים</Text>
                    <View style={styles.new_customer_success_join_us_content_list}>
                        {EXCLUSIVES.map((item, index) => (
                            <View key={index} style={styles.new_customer_success_join_us_content_list_item}>
                                <Text style={styles.new_customer_success_join_us_content_list_item_text}>{item}</Text>
                                <Image source={images.listStar}/>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.new_customer_success_button}>
                    <TouchableOpacity style={styles.new_customer_success_button_primary}>
                        <Text style={styles.new_customer_success_button_primary_text}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ItemReview totalPrice={amount?.grand_total} productList={products} isPlacingOrder={true}/>
            <View style={styles.general}>
                <Text style={styles.general_title}>כתובת למשלוח</Text>
                <View style={styles.shipping}>
                    <View style={styles.shipping_address}>
                        <Text style={styles.title}>כתובת למשלוח</Text>
                        <DetailsReview details={shippingDetails}/>
                    </View>
                    <View style={styles.shipping_method}>
                        <Text style={styles.title}>שיטת משלוח</Text>
                        <Text style={styles.method}>{shipping && shipping.length > 0 ? shipping[0].method_title : ''}</Text>
                    </View>
                </View>
                <View style={styles.shipping}>
                    <View style={styles.shipping_address}>
                        <Text style={styles.title}>כתובת חיוב</Text>
                        <DetailsReview details={shippingDetails}/>
                    </View>
                    <View style={styles.shipping_method}>
                        <Text style={styles.title}>שיטת התשלום</Text>
                        <Text style={styles.method}>{payment.title}</Text>
                    </View>
                </View>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    checkout_content_top_success: {
        backgroundColor: '#d8d9d5'
    },
    checkout_content_top_success_text: {
        padding: 11,
        textAlign: "center",
        color: '#333',
        fontSize: 16,
        fontWeight: 400,
    },
    checkout_content_top_success_thanks: {
        marginTop: 5,
        marginBottom: 15,
        fontSize: 40,
        fontWeight: 700,
        textAlign: "center",
        color: '#333',
    },
    checkout_content_top_success_order_number: {
        marginBottom: 10,
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "center",
    },
    checkout_content_top_success_order_number_order_text: {
        fontSize: 16,
        fontWeight: 600,
    },
    checkout_content_top_success_order_number_order: {
        fontSize: 16,
        fontWeight: 300,
    },
    new_customer_success_wrapper: {
        marginTop: 50,
        paddingVertical: 40,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: "center",
    },
    new_customer_success_join_us_image: {
        width: width * 0.6,
    },
    new_customer_success_join_us_content: {
        flexDirection: 'column',
        maxWidth: 250
    },
    new_customer_success_join_rewards_text: {
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 700
    },
    new_customer_success_join_us_content_list: {
        flexDirection: 'column',
        gap: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    new_customer_success_join_us_content_list_item: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12
    },
    new_customer_success_join_us_content_list_item_text: {
        fontSize: 13,
        fontWeight: 400,
    },
    new_customer_success_button_primary: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d41921",
        height: 36,
        width: 250,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    new_customer_success_button_primary_text: {
        color: "#fefefe",
        fontSize: 14,
        fontWeight: 600,
    },
    general_title: {
        marginTop: 25,
        marginBottom: 20,
        paddingBottom: 20,
        fontSize: 24,
        fontWeight: 700,
        textAlign: "right",
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(128, 128, 128)'
    },
    shipping: {
        flexDirection: 'row',
        direction: "rtl",
    },
    shipping_address: {
        width: (width - 50) / 2,
    },
    shipping_method: {
        width:  (width - 50) / 2,
    },
    title:{
        fontSize: 14,
        fontWeight: 700,
        textAlign: "left",
        marginBottom: 15
    },
    method: {
        textAlign: "left",
        fontSize: 14,
        fontWeight: 400,
    }
})

export default PlaceOrder;