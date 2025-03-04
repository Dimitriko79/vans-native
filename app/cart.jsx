import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

const Cart = () => {

    return (
        <View style={styles.container}>
            <Text>Cart</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    text: {
        color: "black",
        fontSize: 16,
        marginVertical: 8,
    },
});

export default Cart;