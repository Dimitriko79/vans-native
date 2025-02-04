import React, { useRef, useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const data = [
    { id: "1", title: "עדיין לא הצטרפת למועדון הלקוחות שלנו? לכל הפרטים >>", image: "https://via.placeholder.com/300x150" },
    { id: "2", title: "החלפות והחזרות חינם מכל הארץ", image: "https://via.placeholder.com/300x150" },
    { id: "3", title: "משלוח חינם בקניה מעל 149 ש\"ח עד 3 ימי עסקים", image: "https://via.placeholder.com/300x150" }
];

const HorizontalSlider = () => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            scrollToIndex("right");
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const scrollToIndex = (direction) => {
        let nextIndex;

        if (direction === "left") {
            nextIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;
        } else {
            nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
        }

        setCurrentIndex(nextIndex);

        flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => scrollToIndex("left")}
            >
                <Text style={[styles.arrow, currentIndex === 0 && styles.disabledArrow]}>
                    {"<"}
                </Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => scrollToIndex("right")}
            >
                <Text
                    style={[
                        styles.arrow,
                        currentIndex === data.length - 1 && styles.disabledArrow,
                    ]}
                >
                    {">"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    arrowContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ccc",
    },
    disabledArrow: {
        color: "#ccc",
    },
    itemContainer: {
        width: screenWidth * 0.8, // Элемент занимает 80% ширины экрана
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    title: {
        fontSize: 12,
        fontWeight: "light",
        color: "#fff"
    },
});

export default HorizontalSlider;