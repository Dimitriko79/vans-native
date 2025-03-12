import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    FlatList,
    Image
} from 'react-native';
import useSideBarMenu from "./useSideBarMenu";
import Icon from 'react-native-vector-icons/AntDesign';
import { images } from "../../../constants";
import useUserContext from "../../context/user/userProvider";

const { width, height } = Dimensions.get('window');

const SideBarMenu = ({
                         onPress = () => {},
                         onToggle = () => {},
                         translateX = new Animated.Value(0),
                         isSidebarOpen = false
                     }) => {

    const { isSignedIn, signOut } = useUserContext();
    const {
        history,
        setHistory,
        childCategories,
        setCategoryId,
        handleGoBack,
        handleChosenCategory,
        handlePress,
        handleSignOut
    } = useSideBarMenu({ onPress, onToggle, isSidebarOpen, signOut });

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
                    <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                        <View style={styles.row}>
                            <Text style={styles.goBackText}>חזרה</Text>
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
                                <Text style={styles.sidebarItem}>{category.name}</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                setHistory([...history, id]);
                                setCategoryId(id);
                            }}>
                                <Text style={[styles.sidebarItem, styles.branch]}>{category.name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    contentContainerStyle={styles.listContent}
                    ListFooterComponent={() => (
                        <View style={styles.footerContainer}>
                            <TouchableOpacity onPress={handlePress}>
                                <View style={styles.row}>
                                    <Text style={[styles.sidebarItem, styles.branch]}>{isSignedIn ? 'איזור אישי' : 'התחברות'}</Text>
                                    <Image source={images.customer} style={styles.icon} />
                                </View>
                            </TouchableOpacity>
                            {isSignedIn && (
                                <TouchableOpacity onPress={handleSignOut}>
                                    <View style={styles.row}>
                                        <Text style={[styles.sidebarItem]}>התנתק</Text>
                                        <Image source={images.exit} style={styles.icon} />
                                    </View>
                                </TouchableOpacity>
                            )}
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
    sidebarItem: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'right',
    },
    branch: {
        fontWeight: "bold",
    },
    goBackButton: {
        padding: 10,
        backgroundColor: '#555',
        borderRadius: 8,
        marginBottom: 15,
    },
    goBackText: {
        color: '#fff',
        fontSize: 16,
        textAlign: "right",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        gap: 5,
    },
    listContent: {
        gap: 15,
    },
    footerContainer: {
        gap: 15,
        marginTop: 20,
    },
    icon: {
        width: 16,
        height: 16,
    },
});

export default SideBarMenu;
