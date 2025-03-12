import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React, { useCallback, useMemo } from "react";
import DEFAULT_SORT_METHODS from "../../helpers/defaultSortMetods";

const { width } = Dimensions.get("window");

const SortSideBar = ({
                         sort = { options: [] },
                         sortProps = [DEFAULT_SORT_METHODS.get("position"), () => {}],
                         isOpenSort = false,
                         onToggle = () => {}
                     }) => {
    const [currentSort, setSort] = sortProps;
    const { options } = sort;

    const handleSortChange = useCallback(
        (item) => {
            setSort(DEFAULT_SORT_METHODS.get(item.value) || item);
            onToggle("sort");
        },
        [setSort, onToggle]
    );

    const renderItem = useMemo(
        () => ({ item }) => {
            const isActive = currentSort.value === item.value;
            return (
                <TouchableOpacity onPress={() => handleSortChange(item)} style={[styles.sort_item, isActive && styles.activeItem]}>
                    <Text style={styles.sort_item_name}>
                        {item.label} {isActive && <Icon name="check" size={16} color="#000" />}
                    </Text>
                </TouchableOpacity>
            );
        },
        [currentSort, handleSortChange]
    );

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle("sort")} style={styles.trigger}>
                <Text style={styles.title}>{` הצג לפי: ${currentSort.label}`}</Text>
                <Icon name={isOpenSort ? "up" : "down"} color="#fff" />
            </TouchableOpacity>
            {isOpenSort && (
                <View style={styles.sort}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.value}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={false}
                        renderItem={renderItem}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        marginBottom: 20,
    },
    trigger: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2b2b2b",
        width: width - 150,
        paddingHorizontal: 8,
    },
    title: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        paddingVertical: 8,
    },
    sort: {
        top: 40,
        position: "absolute",
        left: 0,
        width: width,
        backgroundColor: "#f1f2ed",
        zIndex: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    sort_item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
    },
    activeItem: {
        backgroundColor: "#d3d3d3",
    },
    sort_item_name: {
        fontSize: 17,
        textAlign: "left",
    },
});

export default SortSideBar;
