import React, { useState } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import {Link} from "expo-router";
import {newsData} from "../../mockdata/mockdata";

const { width } = Dimensions.get("window");

const News = () => {
    const [visibleData, setVisibleData] = useState(newsData.slice(0, 4));

    const showMore = () => {
        const currentLength = visibleData.length;
        const nextLength = currentLength + 4;
        setVisibleData(newsData.slice(0, nextLength));
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper_title}>
                <Text style={styles.title}>
                    LATEST VANS NEWS
                </Text>
            </View>
            <FlatList
                data={visibleData}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Link href={item.image} style={styles.card_link} target="_blank">
                            <Image style={styles.card_image} source={item.image} resizeMode="cover" />
                            <View style={styles.card_text_wrapper}>
                                <Text style={styles.card_text}>{item.title}</Text>
                            </View>
                            <View style={styles.card_link_bottom}>
                                <Text style={styles.link_bottom}>קראו עוד</Text>
                            </View>

                        </Link>
                    </View>
                )}
                contentContainerStyle={styles.cards}
                ListFooterComponent={
                    visibleData.length < newsData.length && (
                        <View style={styles.card_button_wrapper}>
                            <TouchableOpacity style={styles.card_button} onPress={showMore}>
                                <Text style={styles.card_button_text}>ראה עוד</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                scrollEnabled={false}
                nestedScrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    wrapper_title: {
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30,
    },
    title: {
        fontSize: 38,
        fontWeight: "bold"
    },
    card: {
        flex: 1,
        margin: 5,
        marginBottom: 8,
        width: width / 2,
    },
    card_link: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    card_image: {
        height: width / 2,
    },
    card_text_wrapper: {
        width: "100%",
    },
    card_text: {
        color: "#000",
        height: 60,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
        marginTop: 20,
    },
    card_link_bottom: {
        width: "100%",
    },
    link_bottom: {
        marginTop: 20,
        fontSize: 12,
        fontWeight: "light",
        color: "#006bb4",
        textDecorationLine: "underline",
        textAlign: "right",
        cursor: "pointer",
    },
    card_button_wrapper: {
        flex: 1,
        display: "flex",
        margin: "auto",
    },
    card_button: {
        width: 325,
        height: 42,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        marginTop: 10
    },
    card_button_text: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "normal",
    },
});

export default News;