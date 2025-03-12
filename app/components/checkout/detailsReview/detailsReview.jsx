import { Text, View, StyleSheet } from "react-native";
import useStoreContext from "../../../context/store/storeProvider";

const DetailsReview = ({ details = {} }) => {
    const { country } = useStoreContext();

    return (
        <View style={styles.checkout_details}>
            {details.firstname || details.lastname ? (
                <View style={styles.checkout_details_section}>
                    <Text>{details.firstname ?? ''} {details.lastname ?? ''}</Text>
                </View>
            ) : null}

            {details.street || details.building || details.apartment ? (
                <View style={styles.checkout_details_section}>
                    <Text>{[details.street, details.building, details.apartment].filter(Boolean).join(', ')}</Text>
                </View>
            ) : null}

            {details.city && (
                <View style={styles.checkout_details_section}>
                    <Text>{details.city}</Text>
                </View>
            )}

            {country?.full_name_locale && (
                <View style={styles.checkout_details_section}>
                    <Text>{country.full_name_locale}</Text>
                </View>
            )}

            {details.telephone && (
                <View style={styles.checkout_details_section}>
                    <Text>{details.telephone}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    checkout_details: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20
    },
    checkout_details_section: {
        flexDirection: "row",
        direction: "rtl",
        marginBottom: 5,
    },
});

export default DetailsReview;
