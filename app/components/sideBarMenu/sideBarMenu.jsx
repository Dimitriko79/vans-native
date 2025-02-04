import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Dimensions, FlatList,
} from 'react-native';
import {useSideBarMenu} from "./useSideBarMenu";
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const SideBarMenu = ({translateX}) => {

    const {
        history,
        setHistory,
        childCategories,
        setCategoryUid,
        handleGoBack
    } = useSideBarMenu();
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
                    renderItem={({ item }) => {
                        const [uid, { category, isLeaf }] = item;
                        return isLeaf ? (
                            <View>
                                <Text style={styles.sidebarItem}>{category.name}</Text>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                setHistory([...history, uid]);
                                setCategoryUid(uid);
                            }}>
                                <View>
                                    <Text style={[styles.sidebarItem, styles.branch]}>{category.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}/>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // menuIcon: {
    //     padding: 15,
    //     backgroundColor: '#007BFF',
    //     borderRadius: 5,
    //     position: 'absolute',
    //     top: 40,
    //     left: 20,
    //     zIndex: 10,
    // },
    // menuText: {
    //     color: '#fff',
    //     fontSize: 24,
    //     fontWeight: 'bold',
    // },
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
        marginBottom: 15,
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