import React, { useRef, useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
    Dimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import {Link} from "expo-router";
import he from "he";
import Icon from "react-native-vector-icons/AntDesign";

const { width: screenWidth } = Dimensions.get("window");

const HorizontalSlider = ({data}) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const matches = Array.from(
        data.content.matchAll(/<div class="service-bar-tab[^>]*>([\s\S]*?)<\/div>/gi)
    ).map((match, index) => {
        const linkMatch = match[1].match(/<a[^>]*href=["'](.*?)["'][^>]*>(.*?)<\/a>/i);
        const cleanText = (html) => {
            return he
                .decode(html)
                .replace(/<[^>]+>/g, "")
                .replace(/[^\p{L}\p{N}\p{S} ]/gu, "")
                .trim();
        };

        return {
            id: index + 1,
            link: linkMatch ? linkMatch[1] : null,
            text: cleanText(linkMatch ? linkMatch[2] : match[1])
        };
    });

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slider_itemContainer}>
                <Link href={item.link}>
                    <Text style={styles.slider_item_link_text}>{item.text}</Text>
                </Link>
            </View>
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            scrollToIndex("right");
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const scrollToIndex = (direction) => {
        let nextIndex;

        if (direction === "left") {
            nextIndex = currentIndex === 0 ? matches.length - 1 : currentIndex - 1;
        } else {
            nextIndex = currentIndex === matches.length - 1 ? 0 : currentIndex + 1;
        }

        setCurrentIndex(nextIndex);

        flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true
        });
    };

    return (
        <View style={styles.slider}>
            <TouchableOpacity
                style={styles.slider_arrowContainer}
                onPress={() => scrollToIndex("left")}
            >
                <Text style={styles.slider_arrow}>
                    <Icon name="left" color={currentIndex === 0 ? "#999" : "#ccc"} size={20} />
                </Text>
            </TouchableOpacity>
            <FlatList
                ref={flatListRef}
                data={matches}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
            />
            <TouchableOpacity
                style={styles.slider_arrowContainer}
                onPress={() => scrollToIndex("right")}
            >
                <Text style={styles.slider_arrow}>
                    <Icon name="right" color={currentIndex === matches.length - 1 ? "#999" : "#ccc"} size={20} />
                </Text>
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
        width: 30,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    slider_arrow: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ccc",
    },
    slider_itemContainer: {
        width: screenWidth * 0.8,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    slider_item_link: {
        color: "#ffffff",
        textDecorationLine: "none"
    },
    slider_item_link_text: {
        fontSize: 12,
        fontWeight: "light",
        color: "#fff"
    },
});

export default HorizontalSlider;