import {View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";
import {useFilterSidebar} from "./useFilterSidebar";
import FilterBlock from "./filterBlock";

const { width } = Dimensions.get("window");

const FilterSidebar = props => {
    const {filters, setCurrentFilter, currentFilter} = props;
    const { isOpen, onToggle } = useFilterSidebar(props);
    if (!filters || !filters.length) return null;

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onToggle}
                style={styles.trigger}>
                <Text style={styles.title}>סנן לפי</Text>
                <Icon name={isOpen ? "up" : "down"} color="#fff"/>
            </TouchableOpacity>
            {currentFilter.size > 0 && (
                <View style={styles.filter_actions}>
                    <TouchableOpacity style={styles.filter_action} onPress={() => setCurrentFilter(new Map())}>
                        <Icon name="close" size={10} color="#000"/>
                        <Text style={styles.filter_actions_text}>נקה הכל </Text>
                    </TouchableOpacity>
                </View>
            )}
            {isOpen && (
                <View style={[styles.filter, {top: currentFilter.size > 0 ? 82 : 40}]}>
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
        marginBottom: 20,
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
        width: width,
        height: "auto",
        backgroundColor: "#f1f2ed",
        zIndex: 10
    },
    filter_actions: {
        display: "flex",
        flexDirection: "row",
        width: width - 20,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginLeft: 10,
        marginRight: 10
    },
    filter_action: {
      display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    filter_actions_text: {
        fontSize: 10,
    }
})

export default FilterSidebar;