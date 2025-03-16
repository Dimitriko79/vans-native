import React, { useState, useCallback, useMemo } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Link } from "expo-router";
import formatImageUrl from "../../helpers/formatImageUrl";

const { width } = Dimensions.get("window");

const News = ({ data = [] }) => {
    if (!data.length) return null;

    const [visibleCount, setVisibleCount] = useState(4);
    const visibleData = useMemo(() => data.slice(0, visibleCount), [data, visibleCount]);

    const showMore = useCallback(() => {
        setVisibleCount((prev) => prev + 4);
    }, []);

    return (
        <View style={styles.news}>
            <View style={styles.news_wrapper_title}>
                <Text style={styles.news_title}>LATEST VANS NEWS</Text>
            </View>
            <FlatList
                data={visibleData}
                keyExtractor={(item) => item.link}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.news_card}>
                        <Link href={item.link} style={styles.news_card_link} target="_blank">
                            <Image
                                style={styles.news_card_image}
                                source={{
                                    uri: item.image
                                        ? formatImageUrl(item.image)
                                        : formatImageUrl("//images.ctfassets.net/zfz8lw2kfnpv/5DDQCyb3ugPLb6mt7RVzmx/27405d6d2a8c89fd4688b3f3ce6bbe60/unnamed.jpg"),
                                }}
                                resizeMode="cover"
                            />
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
        marginTop: 30,
    },
    news_wrapper_title: {
        alignItems: "center",
        marginVertical: 30,
    },
    news_title: {
        fontSize: 36,
        fontFamily: 'Helvetica Neue',
        fontWeight: "900",
    },
    news_card: {
        flex: 1,
        margin: 5,
        width: width / 2 - 10,
    },
    news_card_link: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    news_card_image: {
        width: width / 2 - 10,
        height: width / 2 - 10,
    },
    news_card_text_wrapper: {
        width: "100%",
        paddingHorizontal: 10,
    },
    news_card_text: {
        color: "#000",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: 'Heebo',
        textAlign: "right",
        marginTop: 10,
    },
    news_card_link_bottom: {
        width: "100%",
        paddingHorizontal: 10,
    },
    news_link_bottom: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: "400",
        color: "#006bb4",
        textDecorationLine: "underline",
        textAlign: "right",
    },
    news_card_button_wrapper: {
        alignItems: "center",
        marginTop: 20,
    },
    news_card_button: {
        width: 325,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    news_card_button_text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: 'Heebo',
        textTransform: "uppercase",
    },
});

export default News;
