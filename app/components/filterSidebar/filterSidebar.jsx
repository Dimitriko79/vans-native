import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React, { useMemo } from "react";
import FilterBlock from "./filterBlock";

const { width } = Dimensions.get("window");

const FilterSidebar = ({
                           filters = [],
                           setCurrentFilter = () => {},
                           currentFilter = new Map(),
                           isOpenFilter = false,
                           onToggle = () => {}
                       }) => {
    if (!filters.length) return null;

    const renderFilterBlock = useMemo(
        () => ({ item }) => (
            <FilterBlock blockItem={item} setCurrentFilter={setCurrentFilter} currentFilter={currentFilter} onToggle={onToggle} />
        ),
        [setCurrentFilter, currentFilter]
    );

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle("filter")} style={styles.trigger}>
                <Text style={styles.title}>סנן לפי</Text>
                <Icon name={isOpenFilter ? "up" : "down"} color="#fff" />
            </TouchableOpacity>
            {isOpenFilter && (
                <View style={styles.filter}>
                    <FlatList
                        data={filters}
                        keyExtractor={(item) => item.label}
                        renderItem={renderFilterBlock}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: "relative",
        marginBottom: 20,
    },
    trigger: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2b2b2b",
        width: 130,
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    title: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    filter: {
        position: "absolute",
        right: 0,
        top: 40,
        width: width,
        backgroundColor: "#f1f2ed",
        paddingBottom: 10,
        zIndex: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
});

export default FilterSidebar;
