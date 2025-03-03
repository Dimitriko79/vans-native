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
import formatImageUrl from "../../helpers/formatImageUrl";

const { width } = Dimensions.get("window");

const News = ({data}) => {

    if (!data || !data.length) return null;

    const [visibleData, setVisibleData] = useState(data.slice(0, 4));

    const showMore = () => {
        const currentLength = visibleData.length;
        const nextLength = currentLength + 4;
        setVisibleData(data.slice(0, nextLength));
    };

    return (
        <View style={styles.news}>
            <View style={styles.news_wrapper_title}>
                <Text style={styles.news_title}>
                    LATEST VANS NEWS
                </Text>
            </View>
            <FlatList
                data={visibleData}
                keyExtractor={(item) => item.link}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.news_card}>
                        <Link href={item.link} style={styles.card_link} target="_blank">
                            <Image style={styles.news_card_image} source={{uri: item.image === '' ? formatImageUrl("//images.ctfassets.net/zfz8lw2kfnpv/5DDQCyb3ugPLb6mt7RVzmx/27405d6d2a8c89fd4688b3f3ce6bbe60/unnamed.jpg") : formatImageUrl(item.image)}} resizeMode="cover" />
                            <View style={styles.news_card_text_wrapper}>
                                <Text style={styles.news_card_text}>{item.title}</Text>
                            </View>
                            <View style={styles.news_card_link_bottom}>
                                <Text style={styles.news_link_bottom}>קראו עוד</Text>
                            </View>

                        </Link>
                    </View>
                )}
                contentContainerStyle={styles.news_cards}
                ListFooterComponent={
                    visibleData.length < data.length && (
                        <View style={styles.news_card_button_wrapper}>
                            <TouchableOpacity style={styles.news_card_button} onPress={showMore}>
                                <Text style={styles.news_card_button_text}>ראה עוד</Text>
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
    news: {
        marginTop: 30
    },
    news_wrapper_title: {
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30,
    },
    news_title: {
        fontSize: 36,
        letterSpacing: -1.5,
        fontWeight: "bold",

    },
    news_card: {
        flex: 1,
        margin: 5,
        marginBottom: 8,
        width: width / 2,
    },
    news_card_link: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    news_card_image: {
        width: width / 2,
        height: width / 2,
    },
    news_card_text_wrapper: {
        width: "100%",
    },
    news_card_text: {
        color: "#000",
        height: 60,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
        marginTop: 20,
    },
    news_card_link_bottom: {
        width: "100%",
    },
    news_link_bottom: {
        marginTop: 20,
        fontSize: 12,
        fontWeight: "light",
        color: "#006bb4",
        textDecorationLine: "underline",
        textAlign: "right",
        cursor: "pointer",
    },
    news_card_button_wrapper: {
        flex: 1,
        display: "flex",
        margin: "auto",
    },
    news_card_button: {
        width: 325,
        height: 42,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        marginTop: 10
    },
    news_card_button_text: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "normal",
    },
});

export default News;