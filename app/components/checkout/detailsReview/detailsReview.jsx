import {Text, View, StyleSheet} from "react-native";
import useStoreContext from "../../../context/store/storeProvider";

const DetailsReview = ({ details }) => {
    const {country} = useStoreContext();

    return (
        <View style={styles.checkout_details}>
            <View style={styles.checkout_details_section}>
                <Text>{details.firstname}</Text>
                <Text>&nbsp;</Text>
                <Text>{details.lastname}</Text>
            </View>
            <View style={styles.checkout_details_section}>
                <Text>{details.street}</Text>
                <Text>{' ,'}</Text>
                <Text>{details.building}</Text>
                <Text>{' ,'}</Text>
                <Text>{details.apartment}</Text>
            </View>
            <View style={styles.checkout_details_section}>
                <Text>{details.city}</Text>
            </View>
            <View style={styles.checkout_details_section}>
                <Text>{country?.full_name_locale}</Text>
            </View>
            <View style={styles.checkout_details_section}>
                <Text>{details.telephone}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkout_details: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20
    },
    checkout_details_section: {
        flexDirection: "row",
        direction: "rtl"
    },
})

export default DetailsReview;