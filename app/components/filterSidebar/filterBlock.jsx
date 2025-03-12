import { FlatList, Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import React, { useMemo, useCallback } from "react";
import useFilterBlock from "./useFilterBlock";
import Icon from "react-native-vector-icons/AntDesign";

const FILTER_LABELS = {
    category_id: "קטגוריה",
    size: "מידה",
    color_family: "צבע",
    gender_filter: "מגדר",
    pattern: "הדפס",
    price: "מחיר"
};

const { width } = Dimensions.get("window");

const FilterBlock = ({
                         blockItem = { label: "", attribute_code: "", options: [] },
                         setCurrentFilter = () => {},
                         currentFilter = new Map()
                     }) => {
    const { label, attribute_code, options } = blockItem;

    const { isOpen, onToggle, handleFilter, checkedForSelected } = useFilterBlock({ setCurrentFilter, currentFilter });

    const handlePress = useCallback(
        (value, action) => {
            handleFilter(attribute_code, value, action);
            onToggle();
        },
        [attribute_code, handleFilter, onToggle]
    );

    const renderItem = useMemo(
        () => ({ item }) => {
            const isSelected = checkedForSelected(attribute_code, item.value);
            return (
                <TouchableOpacity
                    onPress={() => handlePress(item.value, isSelected ? "remove" : "add")}
                    style={isSelected ? styles.subcategory_checked : {}}
                >
                    {isSelected && <Icon name="close" size={10} color="#000" />}
                    <Text style={isSelected ? styles.subcategory_name_checked : styles.subcategory_name}>
                        {item.label} {!isSelected && <Text style={styles.count}>{`(${item.count})`}</Text>}
                    </Text>
                </TouchableOpacity>
            );
        },
        [attribute_code, checkedForSelected, handlePress]
    );

    return (
        <View style={styles.block}>
            <TouchableOpacity onPress={onToggle} style={styles.category}>
                <Text style={styles.name}>{FILTER_LABELS[attribute_code] || label}</Text>
                <Icon name={isOpen ? "minus" : "plus"} color="#000000" />
            </TouchableOpacity>
            {isOpen && (
                <View>
                    <FlatList
                        style={styles.list}
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
    block: {
        width: width - 20,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
    },
    category: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
    },
    list: {
        gap: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    subcategory_checked: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        gap: 6,
        backgroundColor: "#fff",
    },
    subcategory_name_checked: {
        color: "#000000",
        textAlign: "left",
        paddingVertical: 2,
    },
    subcategory_name: {
        color: "#589bc6",
        textAlign: "left",
        paddingVertical: 2,
    },
    count: {
        fontSize: 12,
        color: "#6a6a6a",
    },
});

export default FilterBlock;
