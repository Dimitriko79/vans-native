import {View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";
import FilterBlock from "./filterBlock";

const { width } = Dimensions.get("window");

const FilterSidebar = props => {
    const {filters, setCurrentFilter, currentFilter, isOpenFilter, onToggle } = props;

    if (!filters || !filters.length) return null;

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onToggle('filter')}
                style={styles.trigger}>
                <Text style={styles.title}>סנן לפי</Text>
                <Icon name={isOpenFilter ? "up" : "down"} color="#fff"/>
            </TouchableOpacity>
            {isOpenFilter && (
                <View style={[styles.filter]}>
                    <FlatList
                        data={filters}
                        keyExtractor={(item) => item.label}
                        renderItem={({ item }) => (
                            <FilterBlock blockItem={item} setCurrentFilter={setCurrentFilter} currentFilter={currentFilter}/>
                        )}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    sidebar: {
        position: "relative",
        marginBottom: 20
    },
    trigger: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#2b2b2b',
        width: 130,
        paddingHorizontal: 8,
    },
    title: {
        color: '#fff',
        fontSize: 12,
        fontWeight: "bold",
        paddingVertical: 8,
    },
    filter: {
        position: 'absolute',
        right: 0,
        top: 40,
        width: width,
        height: "auto",
        backgroundColor: "#f1f2ed",
        paddingBottom: 10,
        zIndex: 10,
    },
})

export default FilterSidebar;