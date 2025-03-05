import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Keyboard
} from "react-native";
import useMiniCart from "./useMiniCart";
import React from "react";
import Price from "../price/price";
import ProductList from "./productList/productList";

const { height, width } = Dimensions.get("window");

const MiniCart = ({ isOpen, setIsOpen }) => {

    const {
        closeMiniCart,
        handleEditCart,
        handleProceedToCheckout,
        loading,
        productList,
        subTotal,
        totalQuantity,
        handlePress
    } = useMiniCart({ isOpen, setIsOpen });

    const handleOutsidePress = () => {
        Keyboard.dismiss();
        closeMiniCart();
    };

    if (!isOpen) return null;

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress} accessible={false}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.container}>
                            <View style={styles.minicart}>
                                <View style={styles.minicart_header}>
                                    <Text style={styles.minicart_title_total}>{`${totalQuantity} פריטים בסל`}</Text>
                                    <Text style={styles.minicart_title_title}>עגלת קניות</Text>
                                </View>
                                <View style={styles.minicart_items_wrapper}>
                                    <ProductList products={productList} onPress={handlePress}/>
                                </View>
                                <View style={styles.minicart_total_prices}>
                                    <Price value={subTotal.value} currencyCode={subTotal.currency} style={styles} />
                                    <Text style={styles.minicart_total_prices_title}>סה"כ</Text>
                                </View>
                                <View style={styles.minicart_footer}>
                                    <TouchableOpacity onPress={handleProceedToCheckout} style={styles.minicart_footer_secondary_button}>
                                        <Text style={styles.minicart_footer_button_text}>לרכישה עכשיו</Text>
                                    </TouchableOpacity>
                                    {/*<TouchableOpacity onPress={handleEditCart} style={styles.minicart_footer_secondary_button}>*/}
                                    {/*    <Text style={styles.minicart_footer_button_text}>צפייה בעגלה</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                </View>
                            </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height,
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    container: {
        flex: 1,
        position: "absolute",
        top: 52,
        left: 14,
        backgroundColor: '#eee',
        width: width * 0.93,
        borderTopWidth: 3,
        borderTopColor: '#c9192e',
        borderWidth: 1,
        borderColor: '#bbb',

        //iOS
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,

        //Android
        elevation: 3,
    },
    minicart:{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 20,
    },
    minicart_header: {
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a'

    },
    minicart_title_total: {
        fontWeight: 700,
        color: '#2a2a2a',
        fontSize: 13,
        textAlign: 'center',

    },
    minicart_title_title: {
        textAlign: 'center',
        color: '#2a2a2a',
        fontsize: 19,
        lineHeight: 19,
        marginBottom: 12,
        fontWeight: 700
    },
    minicart_items_wrapper: {
        maxHeight: 300,
        marginTop: 10
    },
    minicart_total_prices: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    minicart_total_prices_title: {
        fontWeight: 700,
        fontSize: 14,
        color: '#1c1c1c',
    },
    minicart_footer: {
        flexDirection: 'column',
        gap: 16,
    },
    minicart_footer_primary_button: {
        flex: 1,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c9192e',
    },
    minicart_footer_secondary_button: {
        flex: 1,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
    },
    minicart_footer_button_text:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
    }
});

export default MiniCart;
