import {Dimensions, StyleSheet, Text, View} from "react-native";
import useUserContext from "./context/user/userProvider";

const { height, width } = Dimensions.get("window");

const Orders = () => {
const {orders} = useUserContext();
console.log(9999, orders)
    return (
        <View style={styles.container}>
            <Text>Orders</Text>
            <Text>{orders.length}</Text>
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