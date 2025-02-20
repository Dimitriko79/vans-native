import {FlatList, Text, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import React, {useEffect} from "react";
import { useFilterBlock } from "./useFilterBlock";
import Icon from "react-native-vector-icons/AntDesign";

const FILTER_LABELS = {
    "category_id": "קטגוריה",
    "size": "מידה",
    "color_family": "צבע",
    "gender_filter": "מגדר",
    "pattern": "הדפס",
    "price": "מחיר"
};

const { width } = Dimensions.get("window");

const FilterBlock = ({ blockItem, setCurrentFilter, currentFilter}) => {
    const { label, attribute_code, options } = blockItem;
console.log(222, blockItem);
    const {
        isOpen,
        onToggle ,
        handleFilter,
        checkedForSelected
    } = useFilterBlock({setCurrentFilter, currentFilter});



    return (
        <View style={styles.block}>
            <TouchableOpacity onPress={onToggle} style={styles.category}>
                <Text style={styles.name}>{FILTER_LABELS[attribute_code]}</Text>
                <Icon name={isOpen ? "minus" : "plus"} color="#000000"/>
            </TouchableOpacity>
            {isOpen && (
                <View>
                    <FlatList
                        style={styles.list}
                        data={options}
                        keyExtractor={(item, index) => index.toString()}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={false}
                        renderItem={({ item }) => {
                            const isSelected = checkedForSelected(attribute_code, item.value);
                            return !isSelected ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        handleFilter(attribute_code, item.value, "add")
                                        onToggle()
                                    }}
                                >
                                    <Text style={styles.subcategory_name}>
                                        {item.label}
                                        &nbsp;
                                        <Text style={styles.count}>{`(${item.count})`}</Text>
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        handleFilter(attribute_code, item.value, "remove")
                                        onToggle()
                                    }}
                                    style={styles.subcategory_checked}
                                >
                                    <Icon name="close" size={10} color="#000"/>
                                    <Text style={styles.subcategory_name_checked}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        }
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        display: "flex",
        width: width - 20,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        borderBottomStyle: 'dashed',
    },
    category: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingBottom: 15,

    },
    list: {
      gap: 5,
    },
    name: {
        textAlign: 'left',
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },
    subcategory_checked: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        gap: 6,
        backgroundColor: "#fff"
    },
    subcategory_name_checked: {
        color: "#000000",
        textAlign: "left",
        paddingTop: 2,
        paddingBottom: 2
    },
    subcategory_name: {
        color: "#589bc6",
        textAlign: "left",
        paddingTop: 2,
        paddingBottom: 2
    },
    count: {
        fontSize: 12,
        color: "#6a6a6a"
    }
});

export default FilterBlock;