import {StyleSheet, Image, Text, View, Dimensions, ImageBackground} from "react-native";
import {Link} from "expo-router";

const { width  } = Dimensions.get("window");

const ShopBy = props => {
    const {item, index} = props
    const {title, url, image, children} = item;
    return (
        <View style={styles.shopby} key={index}>
            <ImageBackground style={styles.shopby_img} source={image}>
                <View style={styles.overlay}/>
            </ImageBackground>
            <View style={styles.shopby_content}>
                <Text style={styles.shopby_title}>
                    <Link href={url} style={styles.shopby_title_link} target="_blank">
                        {title}
                    </Link>
                </Text>
                <View style={styles.shopby_links}>
                    {children.map(({name, link}, ind) => (
                        <Link href={link} style={styles.shopby_link} target="_blank">
                            <Text style={styles.shopby_link_name}>{name}</Text>
                        </Link>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    shopby: {
        flex: 1,
        position: "relative",
        background: "rgba(31, 19, 19, 0.55)"
    },
    shopby_img: {
        width: width,
        height: 250,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(31,19,19,0.55)',
    },
    shopby_content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        alignItems: "center",
    },
    shopby_title: {
        marginBottom: 5,
    },
    shopby_title_link: {
        fontSize: 32,
        fontWeight: "800",
        color: "#ffffff"
    },
    shopby_links: {
        flexDirection: "column",
        gap: 2
    },
    shopby_link: {
        fontSize: 15,
        fontWeight: "800",
        color: "#ffffff",
        textAlign: "center"
    }
})

export default ShopBy