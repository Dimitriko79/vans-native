import {Text, View, StyleSheet, Dimensions} from "react-native";
import {CHECKOUT_STEP} from "../useCheckout";
import React from "react";

const { width } = Dimensions.get("window");

const ProgressBar = ({step}) => {

    return (
        <View style={styles.checkout_progress_bar}>
            <View style={styles.step_wrapper}>
                <View style={styles.step}>
                    <View style={[styles.step_inner, {backgroundColor: CHECKOUT_STEP[step].id === 1 || CHECKOUT_STEP[step].id === 2 || CHECKOUT_STEP[step].id === 3 ? "#00a228" : "#64686b"}]}>
                        <Text style={{color: "#fff"}}>1</Text>
                    </View>
                    <Text style={{color: CHECKOUT_STEP[step].id === 1 || CHECKOUT_STEP[step].id === 2 || CHECKOUT_STEP[step].id === 3 ? "#00a228" : "#64686b"}}>ברוך הבא</Text>
                </View>
            </View>
            <View style={styles.step_wrapper}>
                <Text style={[styles.step_before, {backgroundColor: CHECKOUT_STEP[step].id === 2 || CHECKOUT_STEP[step].id === 3 ? "#00a228" : "#64686b"}]}/>
                <View style={styles.step}>
                    <View style={[styles.step_inner, {backgroundColor: CHECKOUT_STEP[step].id === 2 || CHECKOUT_STEP[step].id === 3 ? "#00a228" : "#64686b"}]}>
                        <Text style={{color: "#fff"}}>2</Text>
                    </View>
                    <Text style={{color: CHECKOUT_STEP[step].id === 2 || CHECKOUT_STEP[step].id === 3 ? "#00a228" : "#64686b"}}>משלוח</Text>
                </View>
                <Text style={[styles.step_after, {backgroundColor: CHECKOUT_STEP[step].id === 3 ? "#00a228" : "#64686b"}]}/>
            </View>
            <View style={styles.step_wrapper}>
                <View style={styles.step}>
                    <View
                        style={
                            [styles.step_inner,
                                {
                                    backgroundColor: CHECKOUT_STEP[step].id === 3 ? "#00a228" : "none",
                                    borderColor: CHECKOUT_STEP[step].id === 3 ? "#00a228" : "#64686b",
                                    borderWidth: 2
                                }
                            ]
                        }
                    >
                        <Text style={{color: CHECKOUT_STEP[step].id === 3 ? "#fff" : "#64686b"}}>3</Text>
                    </View>
                    <Text style={{color: CHECKOUT_STEP[step].id === 3 ? "#00a228" : "#64686b"}}>סיכום ותשלום</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkout_progress_bar: {
        width: width,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        direction: 'rtl',
        marginTop: 40
    },
    step_wrapper:{
        width: width / 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    step: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 3

    },
    step_inner: {
        width: 34,
        height: 34,
        borderRadius: 17,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    step_after: {
        position: "absolute",
        width: 50,
        height: 2,
        top: 16,
        left: "-50%",
        transform: "translateX(42%)",
    },
    step_before: {
        position: "absolute",
        width: 50,
        height: 2,
        top: 16,
        right: "-50%",
        transform: "translateX(-42%)",
    },
})

export default ProgressBar