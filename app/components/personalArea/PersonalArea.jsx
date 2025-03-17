import {Text, View, StyleSheet, Pressable, Dimensions} from "react-native";
import Svg, {Circle, G, Path} from "react-native-svg";
import React, {useState} from "react";
import {router} from "expo-router";
import useUserContext from "../../context/user/userProvider";
import Icon from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const PersonalArea = () => {

    const [hoveredLink, setHoveredLink] = useState(null);
    const {isUserUpdate} = useUserContext();
    return (
        <View style={styles.container}>
            <View style={styles.personal_area}>
                {isUserUpdate && (
                    <View style={styles.update_customer_succsess}>
                        <Text style={styles.update_customer_succsess_text}>שמרת את פרטי החשבון.</Text>
                        <View style={styles.update_customer_succsess_icon}>
                            <Icon name="check" color="#f1f2ed" size={20}/>
                        </View>
                    </View>
                )}
                <Pressable
                    style={[styles.personal_area_card, hoveredLink === 0 && {borderTopWidth: 2, borderTopColor: '#D10029'}]}
                    onPress={() => router.navigate("/customer")}
                    onPressIn={() => setHoveredLink(0)}
                    onPressOut={() => setHoveredLink(null)}
                >
                    <View>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                             viewBox="0 0 33.414 33.414">
                            <G transform="translate(0)">
                                <Path
                                    d="M28.521,21.6a16.643,16.643,0,0,0-6.349-3.982,9.659,9.659,0,1,0-10.93,0A16.734,16.734,0,0,0,0,33.414H2.61a14.1,14.1,0,0,1,28.193,0h2.61A16.6,16.6,0,0,0,28.521,21.6ZM16.707,16.707a7.048,7.048,0,1,1,7.048-7.048A7.056,7.056,0,0,1,16.707,16.707Z"
                                    transform="translate(0)" fill={hoveredLink === 0 ? "#D10029" : "#000000"}></Path>
                            </G>
                        </Svg>
                    </View>
                    <View style={styles.personal_area_card_content}>
                        <Text style={[styles.personal_area_card_content_title, hoveredLink === 0 && {color: '#D10029'}]}>פרטים אישיים</Text>
                        <Text style={styles.personal_area_card_content_subtitle}>הצג ועדכן פרטים אישיים.</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={[styles.personal_area_card, hoveredLink === 1 && {borderTopWidth: 2, borderTopColor: '#D10029'}]}
                    onPress={() => router.navigate("/orders")}
                    onPressIn={() => setHoveredLink(1)}
                    onPressOut={() => setHoveredLink(null)}
                >
                    <View>
                        <Svg width={35} height={35} viewBox="0 0 256 256">
                            <G transform="translate(1.406 1.406) scale(2.81 2.81)">
                                <Path
                                    d="M 73.231 63.041 H 29.274 c -4.98 0 -9.138 -3.574 -9.886 -8.498 l -5.53 -36.395 c -0.131 -0.864 0.121 -1.743 0.691 -2.406 c 0.57 -0.663 1.4 -1.044 2.275 -1.044 h 66.313 c 2.08 0 4.023 0.927 5.333 2.543 c 1.309 1.617 1.812 3.711 1.379 5.746 l -6.836 32.134 C 82.036 59.71 77.923 63.041 73.231 63.041 z M 20.313 20.698 l 5.006 32.945 c 0.299 1.969 1.962 3.398 3.955 3.398 h 43.958 c 1.877 0 3.521 -1.332 3.912 -3.168 l 6.836 -32.134 c 0.074 -0.35 -0.076 -0.602 -0.173 -0.722 c -0.097 -0.119 -0.313 -0.319 -0.67 -0.319 H 20.313 z"
                                    fill={hoveredLink === 1 ? "#D10029" : "#000000"}
                                    stroke={hoveredLink === 1 ? "#D10029" : "#000000"}
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <Path
                                    d="M 16.819 20.698 c -1.482 0 -2.771 -1.099 -2.97 -2.608 l -0.584 -4.425 c -0.204 -1.548 -1.536 -2.716 -3.097 -2.716 H 3c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 7.168 c 4.561 0 8.449 3.41 9.045 7.931 l 0.584 4.425 c 0.217 1.643 -0.939 3.15 -2.582 3.367 C 17.083 20.689 16.95 20.698 16.819 20.698 z"
                                    fill={hoveredLink === 1 ? "#D10029" : "#000000"}
                                    stroke={hoveredLink === 1 ? "#D10029" : "#000000"}
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <Circle
                                    cx="29.55"
                                    cy="75.05"
                                    r="7"
                                    fill={hoveredLink === 1 ? "#D10029" : "#000000"}
                                    stroke={hoveredLink === 1 ? "#D10029" : "#000000"}
                                    strokeWidth={1}
                                />
                                <Circle
                                    cx="70.73"
                                    cy="75.05"
                                    r="7"
                                    fill={hoveredLink === 1 ? "#D10029" : "#000000"}
                                    stroke={hoveredLink === 1 ? "#D10029" : "#000000"}
                                    strokeWidth={1}
                                />
                            </G>
                        </Svg>
                    </View>
                    <View style={styles.personal_area_card_content}>
                        <Text style={[styles.personal_area_card_content_title, hoveredLink === 1 && {color: '#D10029'}]}>היסטורית הזמנות</Text>
                        <Text style={styles.personal_area_card_content_subtitle}>צפייה בהזמנות עבר וסטטוס הזמנות קיימות.</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={[styles.personal_area_card, hoveredLink === 2 && {borderTopWidth: 2, borderTopColor: '#D10029'}]}
                    onPress={() => router.navigate("/address")}
                    onPressIn={() => setHoveredLink(2)}
                    onPressOut={() => setHoveredLink(null)}
                >
                    <View>
                        <Svg width={35} height={35} viewBox="0 0 256 256">
                            <G transform="translate(1.406 1.406) scale(2.81 2.81)">
                                <Path
                                    d="M 75.51 90 H 23.697 c -6.731 0 -12.207 -5.476 -12.207 -12.207 s 5.476 -12.207 12.207 -12.207 h 39.898 c 1.657 0 3 1.343 3 3 s -1.343 3 -3 3 H 23.697 c -3.422 0 -6.207 2.784 -6.207 6.207 S 20.275 84 23.697 84 H 72.51 v -6.198 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 78.51 88.657 77.167 90 75.51 90 z"
                                    fill={hoveredLink === 2 ? "#D10029" : "#000000"}
                                    stroke={hoveredLink === 2 ? "#D10029" : "#000000"}
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <Path
                                    d="M 14.49 80.793 c -1.657 0 -3 -1.343 -3 -3 v -65.45 C 11.49 5.537 17.027 0 23.833 0 H 75.51 c 1.657 0 3 1.343 3 3 v 65.586 c 0 1.657 -1.343 3 -3 3 H 63.596 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 8.914 V 6 H 23.833 c -3.498 0 -6.343 2.846 -6.343 6.343 v 65.45 C 17.49 79.45 16.147 80.793 14.49 80.793 z"
                                    fill={hoveredLink === 2 ? "#D10029" : "#000000"}
                                    stroke={hoveredLink === 2 ? "#D10029" : "#000000"}
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <Path
                                    d="M 62.248 26.122 H 27.752 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 34.496 c 1.657 0 3 1.343 3 3 S 63.905 26.122 62.248 26.122 z"
                                    fill={hoveredLink === 2 ? "#D10029" : "#000000"}
                                    stroke={hoveredLink === 2 ? "#D10029" : "#000000"}
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </G>
                        </Svg>
                    </View>
                    <View style={styles.personal_area_card_content}>
                        <Text style={[styles.personal_area_card_content_title, hoveredLink === 3 && {color: '#D10029'}]}>ספר כתובות</Text>
                        <Text style={styles.personal_area_card_content_subtitle}>שמור ונהל כתובות.</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={[styles.personal_area_card, hoveredLink === 3 && {borderTopWidth: 2, borderTopColor: '#D10029'}]}
                    onPress={() => router.navigate("/wishlist")}
                    onPressIn={() => setHoveredLink(3)}
                    onPressOut={() => setHoveredLink(null)}
                >
                    <View>
                        <Svg width={35} height={35} viewBox="0 0 256 256">
                            <G transform="translate(1.406 1.406) scale(2.81 2.81)">
                                <Path
                                    d="M 64.44 12.016 c 5.225 0 10.136 2.035 13.831 5.729 c 7.626 7.626 7.626 20.035 0 27.662 l -19.44 19.44 L 45 78.677 L 31.169 64.846 l -19.44 -19.44 c -7.626 -7.626 -7.626 -20.035 0 -27.662 c 3.694 -3.694 8.606 -5.729 13.831 -5.729 c 5.225 0 10.136 2.035 13.831 5.729 l 1.367 1.367 L 45 23.354 l 4.242 -4.242 l 1.367 -1.367 C 54.304 14.05 59.216 12.016 64.44 12.016 M 64.44 6.016 c -6.541 0 -13.083 2.495 -18.073 7.486 L 45 14.869 l 0 0 l 0 0 l -1.367 -1.367 C 38.642 8.511 32.101 6.016 25.56 6.016 S 12.477 8.511 7.486 13.502 c -9.982 9.982 -9.982 26.165 0 36.147 l 19.44 19.44 c 0 0 0 0 0.001 0 L 45 87.163 l 18.073 -18.073 c 0 0 0 0 0 0 l 19.44 -19.44 c 9.982 -9.982 9.982 -26.165 0 -36.147 C 77.523 8.511 70.982 6.016 64.44 6.016 L 64.44 6.016 z"
                                    fill={hoveredLink === 3 ? "#D10029" : "#000000"}
                                    stroke={hoveredLink === 3 ? "#D10029" : "#000000"}
                                    strokeWidth={1}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </G>
                        </Svg>
                    </View>
                    <View style={styles.personal_area_card_content}>
                        <Text style={[styles.personal_area_card_content_title, hoveredLink === 3 && {color: '#D10029'}]}>מועדפים</Text>
                        <Text style={styles.personal_area_card_content_subtitle}>צפייה במוצרים מועדפים.</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f2ed",
    },
    personal_area: {
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingHorizontal: 25,
        marginTop: 25,
        marginBottom: 25,
        gap: 30
    },
    personal_area_card: {
        backgroundColor: "#ffffff",
        height: 110,
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "flex-start",
        alignItems: "center",
        borderTopWidth: 2,
        borderTopColor: "#ffffff",
        paddingHorizontal: 25,
        gap: 25
    },
    personal_area_card_content: {
        direction: "ltr",
        flexDirection: "column",
        justifyContent: "center",
    },
    personal_area_card_content_title: {
        textAlign: "right",
        fontSize: 26,
        fontFamily: "Heebo",
        fontWeight: 700,
    },
    personal_area_card_content_subtitle: {
        textAlign: "right",
        fontSize: 14,
        fontFamily: "Heebo",
        fontWeight: 400,
        width: width / 1.8,
    },
    update_customer_succsess: {
        height: 42,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#e5efe5',
        direction: "rtl"
    },
    update_customer_succsess_icon: {
        height: 24,
        width: 24,
        backgroundColor: '#006400',
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default PersonalArea;