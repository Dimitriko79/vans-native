import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
    Dimensions,
} from "react-native";
import { Link } from "expo-router";
import he from "he";
import Icon from "react-native-vector-icons/AntDesign";

const { width: screenWidth } = Dimensions.get("window");

const HorizontalSlider = ({ data = { content: "" } }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const matches = useMemo(() => {
        return Array.from(
            data.content.matchAll(/<div class="service-bar-tab[^>]*>([\s\S]*?)<\/div>/gi)
        ).map((match, index) => {
            const linkMatch = match[1].match(/<a[^>]*href=["'](.*?)["'][^>]*>(.*?)<\/a>/i);
            const cleanText = (html) => he.decode(html).replace(/<[^>]+>/g, "").trim();

            return {
                id: index + 1,
                link: linkMatch ? linkMatch[1] : null,
                text: cleanText(linkMatch ? linkMatch[2] : match[1]),
            };
        });
    }, [data]);

    const scrollToIndex = useCallback((direction) => {
        if (matches.length === 0) return;

        let nextIndex;
        if (direction === "left") {
            nextIndex = currentIndex === 0 ? matches.length - 1 : currentIndex - 1;
        } else {
            nextIndex = currentIndex === matches.length - 1 ? 0 : currentIndex + 1;
        }

        setCurrentIndex(nextIndex);

        flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
        });
    }, [currentIndex, matches.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            scrollToIndex("right");
        }, 7000);

        return () => clearInterval(interval);
    }, [scrollToIndex]);

    return (
        <View style={styles.slider}>
            <TouchableOpacity
                style={styles.slider_arrowContainer}
                onPress={() => scrollToIndex("left")}
                disabled={matches.length <= 1}
            >
                <Icon name="left" color={matches.length > 1 ? "#ccc" : "#999"} size={20} />
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={matches}
                keyExtractor={(item) => `${item.link}_${item.text}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.slider_itemContainer}>
                        <Link href={item.link}>
                            <Text style={styles.slider_item_link_text}>{item.text}</Text>
                        </Link>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.slider_arrowContainer}
                onPress={() => scrollToIndex("right")}
                disabled={matches.length <= 1}
            >
                <Icon name="right" color={matches.length > 1 ? "#ccc" : "#999"} size={20} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    slider: {
        flexDirection: "row",
        alignItems: "center",
    },
    slider_arrowContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    slider_itemContainer: {
        width: screenWidth * 0.8,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    slider_item_link_text: {
        fontSize: 12,
        fontFamily: "Heebo",
        fontWeight: "400",
        color: "#fff",
    },
});

export default HorizontalSlider;
