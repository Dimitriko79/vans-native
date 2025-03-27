import {Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {Card} from "./components/address/card/card";
import useAddress from "./components/address/useAddress";
import Icon from "react-native-vector-icons/AntDesign";
import Error from "./components/error/error";
import Form from "./components/address/form/form";
import {useScrollContext} from "./context/scroll/scrollContext";

const { height, width } = Dimensions.get("window");

const Address = () => {
    const { setResetScroll } = useScrollContext();
    const {
        shippingAddressDefault,
        billingAddressDefault,
        customAddresses,
        errorMessage,
        handleRemoveAddress,
        onErrorMessage,
        isOpenModal, setIsOpenModal,
        setAddressId,
        isAddingAddress, setIsAddingAddress,
        updateAddress, setUpdateAddress
    } = useAddress();

    useEffect(() => {
        setResetScroll(true);
    }, []);

    return (
        <View style={styles.container}>
            <Error errorMessage={errorMessage} onErrorMessage={onErrorMessage}/>
            {isAddingAddress || updateAddress ? (
                <Form onErrorMessage={onErrorMessage} setIsAddingAddress={setIsAddingAddress} address={updateAddress} setUpdateAddress={setUpdateAddress} setResetScroll={setResetScroll}/>
            ) : (
                <>
                    <View style={styles.addresses}>
                        <Text style={styles.addresses_title}>כתובות ברירת מחדל</Text>
                        <View style={styles.addresses_content}>
                            <Card
                                isBillingAddress={true}
                                address={billingAddressDefault}
                                isCustomAddress={false}
                                setAddressId={setAddressId}
                                setIsOpenModal={setIsOpenModal}
                                setUpdateAddress={setUpdateAddress}
                                setResetScroll={setResetScroll}
                            />
                            <Card
                                isBillingAddress={false}
                                address={shippingAddressDefault}
                                isCustomAddress={false}
                                setAddressId={setAddressId}
                                setIsOpenModal={setIsOpenModal}
                                setUpdateAddress={setUpdateAddress}
                                setResetScroll={setResetScroll}
                            />
                            {customAddresses.map((address, index) => (
                                <Card
                                    key={index}
                                    isBillingAddress={false}
                                    address={address}
                                    isCustomAddress={true}
                                    setAddressId={setAddressId}
                                    setIsOpenModal={setIsOpenModal}
                                    setUpdateAddress={setUpdateAddress}
                                    setResetScroll={setResetScroll}
                                />
                            ))}
                            {!customAddresses.length && (
                                <Text style={styles.no_custom_addresses}>אין לך כתובות אחרות בספר הכתובות שלך.</Text>
                            )}
                        </View>
                    </View>
                    <TouchableOpacity style={styles.new_address_button} onPress={() => setIsAddingAddress(true)}>
                        <Text style={styles.new_address_button_text}>הוסף כתובת חדשה</Text>
                        <Icon name="plus" color='#c9192e' size={16} style={{fontWeight: '600'}}/>
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={isOpenModal} onRequestClose={() => setIsOpenModal(false)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modal_view}>
                                <TouchableOpacity style={styles.modal_view_close} onPress={() => setIsOpenModal(false)}>
                                    <Icon name="close" size={20} color="#fff" />
                                </TouchableOpacity>
                                <Text style={styles.modal_view_title}>האם אתה בטוח שברצונך למחוק את הכתובת הזו?</Text>
                                <View style={styles.modal_view_actions}>
                                    <Pressable style={styles.modal_view_action_primary} onPress={() => handleRemoveAddress()}>
                                        <Text style={styles.modal_action_text}>אישור</Text>
                                    </Pressable>
                                    <Pressable style={styles.modal_view_action_secondary} onPress={() => setIsOpenModal(false)}>
                                        <Text style={styles.modal_action_text}>ביטול</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#f1f2ed",
        minHeight: height,
        paddingBottom: 25
    },
    addresses: {
        paddingVertical: 25,
        paddingHorizontal: 10
    },
    addresses_title: {
        fontSize: 22,
        fontFamily: "Heebo",
        fontWeight: "900",
        textAlign: "right",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c6",
    },
    addresses_content: {
        marginVertical: 20,
        gap: 20
    },
    new_address_button: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    new_address_button_text: {
        fontSize: 16,
        color: '#c9192e',
        fontFamily: "Heebo",
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal_view: {
        width: 300,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modal_view_close: {
        position: "absolute",
        backgroundColor: "#d41921",
        left: 10,
        top: 10,
    },
    modal_view_title: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        marginBottom: 20,
    },
    modal_view_actions: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        gap: 10,
        marginTop: 20,
    },
    modal_view_action_primary: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#d41921",
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modal_view_action_secondary: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#64686b",
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modal_action_text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    no_custom_addresses: {
        textAlign: "right",
        fontSize: 14,
        fontFamily: "Heebo",
        fontWeight: "400",
    }
})

export default Address;