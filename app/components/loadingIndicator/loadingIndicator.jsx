import { View, StyleSheet, useWindowDimensions, Image } from "react-native";
import { images } from "../../../constants";

const LoadingIndicator = ({style = {}}) => {
    const { height, width } = useWindowDimensions();

    return (
        <View style={[styles.container, { height: height - 150, width }, style]}>
            <View style={styles.inner}>
                <Image source={images.loading} style={[styles.image, { width: width / 3, height: width / 3 }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    inner: {
        width: 200,
        height: 150,
        backgroundColor: "#656565",
        opacity: 0.9,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        resizeMode: "contain",
    },
});

export default LoadingIndicator;