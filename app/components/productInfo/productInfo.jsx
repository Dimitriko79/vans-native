import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {useState} from "react";

const ProductInfo = ({product = null}) => {
    const descriptions = product ? [product.description_1, product.description_2, product.description_3].filter(item => !!item) : [];

    if (!descriptions.length) return null;

    const [isShowDetail, setShowDetail] = useState(false);
    const content = descriptions.map((item, index) => (
        <Text key={index} style={styles.product_info_content_text}>{item}</Text>
    ))
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.product_info_trigger} onPress={() => setShowDetail(!isShowDetail)}>
                <Text style={styles.product_info_trigger_text}>תיאור המוצר</Text>
                <Icon name={isShowDetail ? 'up' : 'down'} size={16} color='#000000'/>
            </TouchableOpacity>
            {isShowDetail && (
                <View style={styles.product_info_content}>
                    {content}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        backgroundColor: '#ffffff',
        marginTop: 30,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    product_info_trigger: {
        paddingHorizontal: 20,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    product_info_trigger_text: {
        fontSize: 16,
        fontFamily: "Heebo",
        fontWeight: '600',
    },
    product_info_content: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        flexDirection: "column",
        gap: 20
    },
    product_info_content_text: {
        fontSize: 16,
        fontFamily: "Heebo",
        fontWeight: '400',
        textAlign: "right"
    }
})

export default ProductInfo;