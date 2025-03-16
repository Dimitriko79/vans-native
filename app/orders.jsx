import {Dimensions, StyleSheet, Text, View} from "react-native";

const { height, width } = Dimensions.get("window");

const Orders = () => {

    return (
        <View style={styles.container}>
            <Text>Orders</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: "#f1f2ed"
    }
})

export default Orders;