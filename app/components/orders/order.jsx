import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import ItemReview from "../checkout/itemsReview/itemsReview";
import useStoreContext from "../../context/store/storeProvider";
import Icon from "react-native-vector-icons/AntDesign";

const Order = ({ order, onOrder }) => {
    const {payment_method, shipping_method, shipping_address, billing_address} = order;
    const {country} = useStoreContext();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onOrder(null)} style={styles.go_back_button}>
                <View style={styles.go_back_wrapper}>
                    <Text style={styles.go_back_text}>חזרה</Text>
                    <Icon name="right" color="#fff" size={16} />
                </View>
            </TouchableOpacity>
            <ItemReview totalPrice={{ value: order.grand_total, currency: "ILS" }} productList={order.products} isPlacingOrder={true} isCustomerOrders={true} isShowRemove={false}/>
            <View style={styles.order_delivery}>
                <Text style={styles.order_delivery_title}>פרטי ההזמנה</Text>
                <View style={styles.order_delivery_content}>
                    <View style={styles.order_delivery_content_section}>
                        <Text style={styles.order_delivery_content_section_name}>כתובת למשלוח</Text>
                        <View>
                            <Text style={styles.order_delivery_content_section_item}>{shipping_address.firstname}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{shipping_address.lastname}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{shipping_address.city}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{shipping_address.street}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{country.full_name_locale}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{shipping_address.telephone}</Text>
                        </View>
                    </View>
                    <View style={styles.order_delivery_content_section}>
                        <Text style={styles.order_delivery_content_section_name}>שיטת משלוח</Text>
                        <View>
                            <Text style={styles.order_delivery_content_section_item}>{shipping_method}</Text>
                        </View>
                    </View>
                    <View style={styles.order_delivery_content_section}>
                        <Text style={styles.order_delivery_content_section_name}>כתובת חיוב</Text>
                        <View>
                            <Text style={styles.order_delivery_content_section_item}>{billing_address.firstname}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{billing_address.lastname}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{billing_address.city}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{billing_address.street}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{country.full_name_locale}</Text>
                            <Text style={styles.order_delivery_content_section_item}>{billing_address.telephone}</Text>
                        </View>
                    </View>
                    <View style={styles.order_delivery_content_section}>
                        <Text style={styles.order_delivery_content_section_name}>שיטת התשלום</Text>
                        <View>
                            <Text style={styles.order_delivery_content_section_item}>{payment_method}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        marginBottom: 25
    },
    order_delivery: {

    },
    order_delivery_title: {
        marginTop: 25,
        marginBottom: 20,
        fontSize: 24,
        fontFamily: 'Heebo',
        fontWeight: "700",
        textAlign: "right",
        borderBottomWidth: 1,
        borderBottomColor: "#e4e4e4",
    },
    order_delivery_content: {
        backgroundColor: "#fff",
        paddingVertical: 15,

    },
    order_delivery_content_section: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    order_delivery_content_section_name: {
        fontSize: 16,
        fontFamily: 'Heebo',
        fontWeight: '600',
        textAlign: "right",
        marginBottom: 5,
    },
    order_delivery_content_section_item:{
        fontSize: 14,
        fontFamily: 'Heebo',
        fontWeight: '400',
        textAlign: "right",
    },
    go_back_button: {
        padding: 10,
        backgroundColor: '#555',
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 15,
    },
    go_back_text: {
        color: '#fff',
        fontSize: 16,
        textAlign: "right",
    },
    go_back_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        gap: 5,
    },
})

export default Order;