import {View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useSocial from "./useSocial";
import {router} from "expo-router";
import LoadingIndicator from "../loadingIndicator/loadingIndicator";
import React from "react";
import Error from "../error/error";

const { height } = Dimensions.get("window");

const Social = props => {
    const {handleWishlistItem, onShare, loading, errorMessage, onErrorMessage } = useSocial(props);

    return (
        <>
            <View style={styles.container}>
                <Modal
                    visible={loading}
                    transparent={true}
                    animationType="fade"
                    statusBarTranslucent={true}
                >
                    <LoadingIndicator style={styles.loaderContainerOverlay}/>
                </Modal>
                <TouchableOpacity style={styles.social} onPress={handleWishlistItem}>
                    <Icon name='heart' size={16} color='#589bc6'/>
                    <Text style={styles.social_text}>הוספה למועדפים</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.social} onPress={onShare}>
                    <Icon name='share-alt' size={16} color='#589bc6'/>
                    <Text style={styles.social_text}>שתף זאת</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.social} onPress={() => router.navigate('/stores')}>
                    <Icon name='map-marker' size={16} color='#589bc6'/>
                    <Text style={styles.social_text}>אתר חנות</Text>
                </TouchableOpacity>
            </View>
            <Error errorMessage={errorMessage} onErrorMessage={onErrorMessage} style={{ marginHorizontal: 0}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 15,
        flexDirection: 'row',
        direction: "rtl",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    social: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 4
    },
    social_text: {
        fontSize: 16,
        fontFamily: "Heebo",
        fontWeight: '500',
        color: '#589bc6'
    },
    loaderContainerOverlay: {
        flex: 1,
        minHeight: height,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    }
})
export default Social