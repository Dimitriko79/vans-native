import {View, StyleSheet, Text, Image} from "react-native";
import {images} from "../../../constants";

const Espot = () => {

    return (
        <View style={styles.container}>
            <View style={styles.espot_item}>
                <Image style={styles.espot_item_image} source={images.vDelivery} />
                <Text style={styles.espot_item_text}>משלוח חינם בקניה מעל 99 ש"ח</Text>
            </View>
            <View style={styles.espot_item}>
                <Image style={styles.espot_item_image} source={images.vReturn} />
                <Text style={styles.espot_item_text}>מתלבטים מה לקנות? תזמינו , תמדדו... אפשרויות החזרה נוחות ומגוונות</Text>
            </View>
            <View style={styles.espot_item}>
                <Text style={styles.espot_item_text}>*בכפוף לתנאי תקנון מועדון לקוחות האתר</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        gap: 16
    },
    espot_item: {
        height: 47,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        direction: "rtl",
        gap: 20
    },
    espot_item_image: {
        height: 47,
        width: 47,
        resizeMode: "contain",
    },
    espot_item_text: {
        fontSize: 15,
        fontWeight: '700',
        fontFamily: "Heebo",
        textAlign: "left",
        width: "88%"
    }
})

export default Espot;