import {View, Text, StyleSheet, ScrollView} from "react-native";
import useCheckout, {CHECKOUT_STEP} from "./components/checkout/useCheckout";
import RichContent from "./components/richContent/richContent";
import React from "react";
import ProgressBar from "./components/checkout/progressBar/progressBar";
import Form from "./components/checkout/form/form";
import ItemReview from "./components/checkout/itemsReview/itemsReview";
import Error from "./components/error/error";

const Checkout = () => {

    const {
        step,
        productList,
        totalPrice,
        cmsBlockData,
        handleCustomerDetails,
        handleStep,
        errorMessage,
        onErrorMessage
    } = useCheckout();
    let content;

    if(CHECKOUT_STEP[step].id === 1) {
        content = (
            <View style={styles.checkout_content}>
                <View style={styles.checkout_content_title}>
                    <Text style={styles.checkout_content_title_text}>{CHECKOUT_STEP[step].title}</Text>
                </View>
                <Form handleStep={handleStep} handleCustomerDetails={handleCustomerDetails}/>
            </View>
        )
    } else if(CHECKOUT_STEP[step].id === 2) {
        content = (
            <View style={styles.checkout_content}>
                <View style={styles.checkout_content_title}>
                    <Text style={styles.checkout_content_title_text}>{CHECKOUT_STEP[step].title}</Text>
                </View>
            </View>
        )
    } else if (CHECKOUT_STEP[step].id === 3) {
        content = (
            <View style={styles.checkout_content}>

            </View>
        )
    } else {
        content = null;
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Error errorMessage={errorMessage} onErrorMessage={onErrorMessage}/>
                {cmsBlockData && cmsBlockData.length && cmsBlockData.map((item, index) =><View key={index}><RichContent html={item?.content || ''}/></View> )}
                <ProgressBar step={step}/>
                {content}
                <ItemReview totalPrice={totalPrice} productList={productList}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "auto",
        position: "relative",
        backgroundColor: "#f1f2ed",
    },
    checkout_content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 25,
    },
    checkout_content_title: {
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "flex-start",
        marginBottom: 15
    },
    checkout_content_title_text: {
        fontSize: 16,
        fontWeight: 600,
        color: '#333'
    },
})

export default Checkout;