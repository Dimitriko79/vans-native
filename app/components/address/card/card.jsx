import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";
import useStoreContext from "../../../context/store/storeProvider";

export const Card = ({
                         address = {},
                         isBillingAddress = false,
                         isCustomAddress = false,
                         setAddressId = () => {},
                         setIsOpenModal = () => {},
                         setUpdateAddress = () => {}
}) => {
    const {country} = useStoreContext();

    if (!address) return null;

    const onPress = id => {
        setAddressId(id);
        setIsOpenModal(true);
    }

    return (
        <View style={[styles.container, !isCustomAddress && {borderTopWidth: 2, borderTopColor: "#332b28",}]}>
            {!isCustomAddress && (
                <View style={styles.card_header}>
                    <Text style={styles.card_title}>{isBillingAddress ? 'כתובת ברירת המחדל לחיוב' : 'כתובת ברירת המחדל למשלוח'}</Text>
                    <Icon name="left" color="#000000" size={20} />
                </View>
            )}
            <View style={styles.card_content}>
                <Text style={[styles.card_content_item, styles.name]}>{address.firstname} {address.lastname}</Text>
                <Text style={styles.card_content_item}>{address.city}</Text>
                {[...address.street].reverse().map((item, index) => (
                    <Text key={index} style={styles.card_content_item}>
                        {item}
                    </Text>
                ))}
                <Text style={styles.card_content_item}>{country?.full_name_locale || 'ישראל'}</Text>
                <Text style={styles.card_content_item}>{address.telephone}</Text>
            </View>
            <View style={styles.card_actions}>
                {isCustomAddress && (
                    <TouchableOpacity style={styles.card_actions_button} onPress={() => onPress(address.id)}>
                        <Text style={styles.card_actions_text}>מחק</Text>
                        <Icon name="delete" size={16}/>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.card_actions_button} onPress={() => setUpdateAddress(address)}>
                    <Text style={styles.card_actions_text}>ערוך</Text>
                    <Icon name="edit" size={16}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    },
    card_header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    card_title: {
        fontSize: 20,
        fontWeight: "700",
        fontFamily: 'Heebo',
        textAlign: 'right',
    },
    card_content: {
        paddingVertical: 15,
        paddingHorizontal: 20,

    },
    card_content_item:{
        fontSize: 14,
        fontFamily: 'Heebo',
        fontWeight: '400',
        textAlign: "right",
    },
    name: {
        fontSize: 16,
        fontFamily: 'Heebo',
        fontWeight: '600',
    },
    card_actions: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    card_actions_button: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 6,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    card_actions_text: {
        color: '#589bc6',
        fontSize: 16,
        fontFamily: 'Heebo',
        fontWeight: '400',

    }
})