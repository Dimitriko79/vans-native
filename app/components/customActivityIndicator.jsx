import { Image, View, StyleSheet, Dimensions } from "react-native";
import {images} from "../../constants";

const { width, height } = Dimensions.get("window");

const CustomLoader = () => {
    return (
        <View style={styles.loaderContainer}>
            <Image
                source={images.loading} // Укажи путь к картинке
                style={styles.loader}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Фон с прозрачностью
    },
    loader: {
        width: 100, // Размер картинки
        height: 100,
        resizeMode: "contain",
    },
});

export default CustomLoader;
