import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";
import {DEFAULT_SORT_METHODS} from "../../helpers/defaultSortMetods";

const { width } = Dimensions.get("window");

const SortSideBar = (props) => {
    const {sort, sortProps, isOpenSort, onToggle } = props;
    const [currentSort, setSort] = sortProps;

    if (!sort) return null;

    const { options } = sort;

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onToggle('sort')}
                style={styles.trigger}>
                <Text style={styles.title}>{` הצג לפי: ${currentSort.label}`}</Text>
                <Icon name={isOpenSort ? "up" : "down"} color="#fff"/>
            </TouchableOpacity>
            {isOpenSort && (
                <View style={styles.sort}>
                    <FlatList
                        style={styles.list}
                        data={options}
                        keyExtractor={(item, index) => index.toString()}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={false}
                        renderItem={({ item }) => {
                            const isActive = currentSort.value === item.value;
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSort(DEFAULT_SORT_METHODS.get(item.value))
                                        onToggle('sort')
                                    }}
                                    style={styles.sort_item}
                                >
                                    <Text style={styles.sort_item_name}>
                                        {item.label}
                                        &nbsp;
                                        {isActive && (
                                            <Icon name="check" size={16} color="#000"/>
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            )}

                        }
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    sidebar: {
        marginBottom: 20
    },
    trigger: {
        display: "flex",
        flexDirection: "row",
        direction: "rtl",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#2b2b2b',
        width: width - 150,
        paddingHorizontal: 8,
    },
    title: {
        color: '#fff',
        fontSize: 12,
        fontWeight: "bold",
        paddingVertical: 8,
    },
    sort: {
        top: 40,
        position: 'absolute',
        left: 0,
        width: width,
        height: "auto",
        backgroundColor: "#f1f2ed",
        zIndex: 10
    },
    list: {
        gap: 5,
    },
    sort_item:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        borderBottomStyle: 'dashed'
    },
    sort_item_name: {
        textAlign: 'left',
        fontSize: 17,
        fontFamily: 'Poppins-Regular',
        direction: "rtl"
    },
})

export default SortSideBar;