import {View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useSocial from "./useSocial";

const Social = props => {
    const {handleWishlistItem, onShare } = useSocial(props);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.social} onPress={handleWishlistItem}>
                <Icon name='heart' size={16} color='#589bc6'/>
                <Text style={styles.social_text}>הוספה למועדפים</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.social} onPress={onShare}>
                <Icon name='share-alt' size={16} color='#589bc6'/>
                <Text style={styles.social_text}>שתף זאת</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.social} onPress={() => {}}>
                <Icon name='map-marker' size={16} color='#589bc6'/>
                <Text style={styles.social_text}>אתר חנות</Text>
            </TouchableOpacity>
        </View>
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
    }
})
export default Social