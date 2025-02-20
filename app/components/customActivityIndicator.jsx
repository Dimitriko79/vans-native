import {View, Image, Text, StyleSheet, Dimensions} from "react-native";
import {images} from '../../constants';

const { width } = Dimensions.get("window");

const CustomActivityIndicator = () => {

    return (
        <View style={styles.container}>
            <Image
                source={images.loading}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: width,
        zIndex: 999
    },
    image: {
        height: 30,
        width: 200,
        resizeMode: "contain",
    },
});

export default CustomActivityIndicator;