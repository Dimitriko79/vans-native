import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    FlatList
} from 'react-native';
import useSideBarMenu from "./useSideBarMenu";
import Icon from 'react-native-vector-icons/AntDesign';
import IconAwesome from "react-native-vector-icons/FontAwesome";
import Svg, {G, Path} from "react-native-svg";
import {router} from "expo-router";

const { width, height } = Dimensions.get('window');

const SideBarMenu = ({
                         onPress = () => {},
                         onToggle = () => {},
                         translateX = new Animated.Value(0),
                         isSidebarOpen = false
                     }) => {

    const {
        history,
        setHistory,
        childCategories,
        setCategoryId,
        handleGoBack,
        handleChosenCategory,
        handlePress,
        handleSignOut,
        isSignedIn, signOut
    } = useSideBarMenu({ onPress, onToggle, isSidebarOpen });

    return (
        <View style={styles.container}>
            {isSidebarOpen && (
                <TouchableWithoutFeedback onPress={onToggle}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            <Animated.View
                style={[
                    styles.sidebar,
                    { transform: [{ translateX }] },
                ]}
            >
                {history.length >= 1 && (
                    <TouchableOpacity onPress={handleGoBack} style={styles.go_back_button}>
                        <View style={styles.sidebar_wrapper}>
                            <Text style={styles.go_back_text}>חזרה</Text>
                            <Icon name="right" color="#fff" size={16} />
                        </View>
                    </TouchableOpacity>
                )}
                <FlatList
                    data={Array.from(childCategories) || []}
                    keyExtractor={(item, index) => item.id || `footer-item-${index}`}
                    renderItem={({ item }) => {
                        const [id, { category, isLeaf }] = item;
                        return isLeaf ? (
                            <TouchableOpacity activeOpacity={0.7} onPress={() => handleChosenCategory(id)}>
                                <Text style={styles.sidebar_item_text}>{category.name}</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                setHistory([...history, id]);
                                setCategoryId(id);
                            }}>
                                <Text style={[styles.sidebar_item_text, styles.sidebar_item_branch]}>{category.name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    contentContainerStyle={styles.sidebar_content_container}
                    ListFooterComponent={() => (
                        <View style={styles.sidebar_list_footer_component}>
                            <TouchableOpacity onPress={handlePress}>
                                <View style={styles.sidebar_wrapper}>
                                    <Text style={[styles.sidebar_item_text, styles.sidebar_item_branch]}>{isSignedIn ? 'איזור אישי' : 'התחברות'}</Text>
                                    <View style={{width: 18, flexDirection: 'row', justifyContent: 'center'}}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             viewBox="0 0 33.414 33.414">
                                            <G transform="translate(0)">
                                                <Path
                                                    d="M28.521,21.6a16.643,16.643,0,0,0-6.349-3.982,9.659,9.659,0,1,0-10.93,0A16.734,16.734,0,0,0,0,33.414H2.61a14.1,14.1,0,0,1,28.193,0h2.61A16.6,16.6,0,0,0,28.521,21.6ZM16.707,16.707a7.048,7.048,0,1,1,7.048-7.048A7.056,7.056,0,0,1,16.707,16.707Z"
                                                    transform="translate(0)" fill="#ffffff"></Path>
                                            </G>
                                        </Svg>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {isSignedIn && (
                                <TouchableOpacity onPress={handleSignOut}>
                                    <View style={styles.sidebar_wrapper}>
                                        <Text style={[styles.sidebar_item_text]}>התנתק</Text>
                                        <View style={{width: 18, flexDirection: 'row', justifyContent: 'center'}}>
                                            <Svg width={16} height={16} viewBox="0 0 256 256">
                                                <G transform="translate(1.406 1.406) scale(2.81 2.81)">
                                                    <Path
                                                        d="M 83.37 45.677 c 0.012 -0.035 0.022 -0.068 0.032 -0.103 c 0.055 -0.183 0.094 -0.373 0.094 -0.574 c 0 -0.201 -0.039 -0.391 -0.094 -0.574 c -0.01 -0.035 -0.02 -0.068 -0.032 -0.103 c -0.066 -0.183 -0.156 -0.353 -0.27 -0.507 c -0.008 -0.011 -0.01 -0.024 -0.018 -0.035 L 71.094 28.176 c -0.673 -0.876 -1.93 -1.04 -2.805 -0.368 c -0.876 0.673 -1.04 1.928 -0.367 2.804 L 77.437 43 H 27.497 c -1.104 0 -2 0.896 -2 2 s 0.896 2 2 2 h 49.941 l -9.515 12.387 c -0.673 0.876 -0.509 2.132 0.367 2.805 c 0.363 0.279 0.792 0.414 1.218 0.414 c 0.6 0 1.193 -0.269 1.587 -0.781 l 11.988 -15.605 c 0.008 -0.011 0.011 -0.025 0.019 -0.036 C 83.215 46.029 83.304 45.86 83.37 45.677 z"
                                                        fill="#ffffff"
                                                        stroke="#ffffff"
                                                        strokeWidth={4}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <Path
                                                        d="M 60.811 90 H 8.504 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 h 52.306 c 1.104 0 2 0.896 2 2 v 34.423 c 0 1.104 -0.896 2 -2 2 s -2 -0.896 -2 -2 V 4 H 10.504 v 82 h 48.306 V 53.513 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 62.811 89.104 61.915 90 60.811 90 z"
                                                        fill="#ffffff"
                                                        stroke="#ffffff"
                                                        strokeWidth={4}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </G>
                                            </Svg>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => {
                                router.navigate('/wishlist');
                                onToggle();
                            }}>
                                <View style={styles.sidebar_wrapper}>
                                    <Text style={[styles.sidebar_item_text]}>המועדפים שלי</Text>
                                    <View style={{width: 18, flexDirection: 'row', justifyContent: 'center'}}>
                                        <IconAwesome name='heart-o' size={18} color='#ffffff'/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                router.navigate('/stores');
                                onToggle();
                            }}>
                                <View style={styles.sidebar_wrapper}>
                                    <Text style={[styles.sidebar_item_text]}>איתור חנות</Text>
                                    <View style={{width: 18, flexDirection: 'row', justifyContent: 'center'}}>
                                        <IconAwesome name='map-marker' size={18} color='#ffffff'/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: width * 0.8,
        height: height,
        backgroundColor: '#333',
        padding: 20,
        zIndex: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    sidebar_item_text: {
        color: '#fff',
        fontSize: 18,
        fontFamily: "Heebo",
        textAlign: 'right',
    },
    sidebar_item_branch: {
        fontWeight: "bold",
    },
    go_back_button: {
        padding: 10,
        backgroundColor: '#555',
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 15,
    },
    go_back_text: {
        color: '#fff',
        fontSize: 16,
        textAlign: "right",
    },
    sidebar_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        gap: 5,
    },
    sidebar_content_container: {
        gap: 15,
    },
    sidebar_list_footer_component: {
        gap: 15,
    },
    icon: {
        width: 16,
        height: 16,
    },
});

export default SideBarMenu;
