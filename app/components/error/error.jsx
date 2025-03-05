import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Error = ({errorMessage, onErrorMessage}) => {

    if(!errorMessage.length)return null;

    return (
        <View style={styles.error}>
            <View style={styles.error_messages}>
                {errorMessage.map((message, index) => (<Text key={index} style={styles.error_messages_text}>{message}</Text>))}
            </View>
            <TouchableOpacity onPress={() => onErrorMessage([])} style={styles.error_icon}>
                <Icon name="close" color="#fae5e5" size={24}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    error: {
        flexDirection: "row",
        direction: "rtl",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fae5e5",
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 20,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    error_icon: {
        backgroundColor: "#b30000",
        borderRadius: 12,
        height: 24,
        width: 24,
    },
    error_messages: {
      flexDirection: "column",
        gap: 3
    },
    error_messages_text: {
        fontSize: 13,
        fontWeight: 400,
        color: "#e02b27"
    }
})

export default Error;