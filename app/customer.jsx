import {Text, View, StyleSheet, Dimensions} from "react-native";

const { height, width } = Dimensions.get("window");

const Customer = props => {

    return (
        <View style={styles.container}>
            <Text>Customer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: "#f1f2ed"
    }
})

export default Customer;