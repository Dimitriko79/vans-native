import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Dimensions, FlatList, Image,
} from 'react-native';
import useSideBarMenu from "./useSideBarMenu";
import Icon from 'react-native-vector-icons/AntDesign';
import {images} from "../../../constants";
import useUserContext from "../../context/user/userProvider";

const { width, height } = Dimensions.get('window');

const SideBarMenu = props => {
    const {onPress, onToggle, translateX, isSidebarOpen} = props;
    const {isSignedIn, signOut} = useUserContext();
    const {
        history,
        setHistory,
        childCategories,
        setCategoryId,
        handleGoBack,
        handleChosenCategory,
        handlePress,
        handleSignOut
    } = useSideBarMenu({onPress, onToggle, isSidebarOpen, signOut});

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.sidebar,
                    { transform: [{ translateX: translateX }] },
                ]}
            >
                {history.length >= 1 && (
                    <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: "flex-end"}}>
                            <Text style={styles.goBackText}>
                                חזרה
                            </Text>
                            <Icon name="right" color="#fff"/>
                        </View>
                    </TouchableOpacity>
                )}
                <FlatList
                    data={Array.from(childCategories) || []}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const [id, { category, isLeaf }] = item;
                        return isLeaf ? (
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => handleChosenCategory(id)}
                                >
                                    <Text style={styles.sidebarItem}>{category.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                setHistory([...history, id]);
                                setCategoryId(id);
                            }}>
                                <View>
                                    <Text style={[styles.sidebarItem, styles.branch]}>{category.name}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    contentContainerStyle={{gap: 15}}
                    ListFooterComponent={() => (
                        <View style={{gap: 15}}>
                            <TouchableOpacity  onPress={handlePress}>
                                <View style={{ flexDirection: "row", alignItems: 'baseline', gap: 5, justifyContent: "flex-end" }}>
                                    <Text style={[styles.sidebarItem, styles.branch]}>{isSignedIn ? 'איזור אישי': 'התחברות'}</Text>
                                    <Image source={images.customer} style={{ width: 16, height: 16 }} />
                                </View>
                            </TouchableOpacity>
                            {isSignedIn && (
                                <TouchableOpacity onPress={handleSignOut}>
                                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 5, justifyContent: "flex-end" }}>
                                        <Text style={[styles.sidebarItem]}>התנתק</Text>
                                        <Image source={images.exit} style={{ width: 16, height: 18 }} />
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
        backgroundColor: '#fff',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: '#333',
        padding: 20,
        zIndex: 20,
    },
    sidebarTitle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
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
        borderRadius: 5,
        marginBottom: 15,
    },
    goBackText: {
        color: '#fff',
        fontSize: 16,
        textAlign: "right",
    },
});

export default SideBarMenu;