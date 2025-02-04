import {View, Image, StyleSheet} from "react-native";
import {images} from '../../constants';


const CustomActivityIndicator = () => {

    return (
        <View style={styles.container}>
            <Image
                source={images.loading}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    image: {
        width: 60,
        height: 45,
        resizeMode: 'contain',
    },
});

export default CustomActivityIndicator;