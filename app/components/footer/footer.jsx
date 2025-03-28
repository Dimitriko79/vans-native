import { View, Text, StyleSheet, Dimensions, FlatList, Pressable } from "react-native";
import useFooter from "./useFooter";
import { useState } from "react";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const Footer = () => {
    const { cmsBlockData, loading, error } = useFooter();
    const [openSections, setOpenSections] = useState({});
    const [hoveredLink, setHoveredLink] = useState(null);

    if (!cmsBlockData || !cmsBlockData.length) return null;

    const parseFooterHTML = (htmlString) => {
        const footerCols = htmlString.match(/<div class="footer-col[^>]*">([\s\S]*?)<\/div>/g) || [];
        let parsedData = [];

        footerCols.forEach((col, index) => {
            const headingMatch = col.match(/<h3 class="heading">(.*?)<\/h3>/);
            const subheadingMatch = col.match(/<h4 class="subheading">(.*?)<\/h4>/);
            const itemsMatch = col.match(/<li role="menuitem">([\s\S]*?)<\/li>/g) || [];

            const cleanText = (text) => {
                return text
                    .replace(/&nbsp;/g, " ")
                    .replace(/<[^>]+>/g, "")
                    .replace(/\s+/g, " ")
                    .trim();
            };

            const heading = headingMatch ? cleanText(headingMatch[1]) : "";
            const subheading = subheadingMatch ? cleanText(subheadingMatch[1]) : "";
            const items = itemsMatch.map(item => {
                const linkMatch = item.match(/<a.*?href="(.*?)".*?>([\s\S]*?)<\/a>/);
                if (linkMatch) {
                    return {
                        text: cleanText(linkMatch[2]),
                        link: linkMatch[1].trim()
                    };
                }
                return null;
            }).filter(Boolean);

            if (!heading && parsedData.length > 0) {
                parsedData[parsedData.length - 1].items.push(...items);
            } else {
                parsedData.push({ id: index, heading, subheading, items });
            }
        });

        return parsedData;
    };

    const parsedData = parseFooterHTML(cmsBlockData[0].content);

    const toggleSection = (id) => {
        setOpenSections((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <View style={styles.footer}>
            {parsedData.map((item) => (
                <View key={item.id} style={styles.footer_item}>
                    <Pressable onPress={() => toggleSection(item.id)} style={styles.footer_item_heading_wrapper}>
                        <Text style={styles.footer_item_heading}>{item.heading}</Text>
                        <Icon name={openSections[item.id] ? "minus" : "plus"} color="#ffffff" size={12} />
                    </Pressable>
                    {item.subheading ? <Text style={styles.footer_item_subheading}>{item.subheading}</Text> : null}

                    {openSections[item.id] && (
                        <FlatList
                            data={item.items}
                            keyExtractor={(item) => item.link}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    onPress={() => item.link}
                                    onPressIn={() => setHoveredLink(index)}
                                    onPressOut={() => setHoveredLink(null)}
                                >
                                    <View style={styles.footer_item_link_wrapper}>
                                        <Link href={item.link}>
                                            <Text style={[
                                                styles.footer_item_link_text,
                                                hoveredLink === index && styles.footer_item_link_hover // Меняем цвет при нажатии
                                            ]}>
                                                {item.text}
                                            </Text>
                                        </Link>
                                    </View>
                                </Pressable>
                            )}
                            contentContainerStyle={styles.footer_items}
                            scrollEnabled={false}
                            nestedScrollEnabled={true}
                        />
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        width,
        backgroundColor: "#1c1c1c",
        paddingTop: 20,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    footer_items: {},
    footer_item: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    footer_item_heading_wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        direction: "rtl",
        alignItems: "center"
    },
    footer_item_heading: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
        fontFamily: "Heebo",
        textAlign: "right",
    },
    footer_item_subheading: {
        color: "#bbb",
        fontSize: 16,
        fontFamily: "Heebo",
        marginBottom: 5,
    },
    footer_item_link_wrapper: {
        marginTop: 8,
        marginBottom: 8,
    },
    footer_item_link_text: {
        color: "#ffffffcc",
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Heebo",
        textAlign: "right",
    },
    footer_item_link_hover: {
        color: "red",
    },
});

export default Footer;