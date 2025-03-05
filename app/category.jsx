import {View, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import {useLocalSearchParams} from "expo-router";
import useCategory from "./components/category/useCategory";
import Gallery from "./components/gallery/gallery";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import FilterSidebar from "./components/filterSidebar/filterSidebar";
import React from "react";
import SortSideBar from "./components/sortSideBar/sortSideBar";
import Icon from "react-native-vector-icons/AntDesign";
import useDropdownSideBar from "./components/sortSideBar/useDropdownSideBar";
import RichContent from "./components/richContent/richContent";


const { height, width } = Dimensions.get("window");

const Category = () => {
    const { ids } = useLocalSearchParams();

    const talonProps = useCategory(ids);
    const {
        categoryData,
        products,
        aggregations,
        sortFields,
        loading,
        error,
        handlePress,
        currentFilter,
        setCurrentFilter,
        isFetching, setIsFetching,
        sortProps
    } = talonProps;

    const { isOpenFilter, isOpenSort, onToggle } = useDropdownSideBar({isFetching, setIsFetching});

    let content;

    if (loading) {
        content = (
            <View style={{height: height}}>
                <ActivityIndicator style={{height: height / 1.4}}/>
            </View>
        )
    } else if (error) {
        content = (
            <View style={{height: height}}>
                <Text style={{height: height / 1.4}}>Error</Text>
            </View>
        )
    } else {
        content = (
            <View style={styles.container}>
                <View style={styles.breadcrumbs}>
                    <Breadcrumbs categoryIds={ids} onPress={handlePress}/>
                </View>
                <RichContent html={categoryData?.description || ''} />
                <Text style={styles.category_name}>{categoryData.name}</Text>
                <View style={styles.choosen_section}>
                    <View style={styles.choosen_section_top}>
                        <FilterSidebar filters={aggregations} setCurrentFilter={setCurrentFilter} currentFilter={currentFilter} isOpenFilter={isOpenFilter} onToggle={onToggle}/>
                        <SortSideBar sort={sortFields} sortProps={sortProps} isOpenSort={isOpenSort} onToggle={onToggle}/>
                    </View>
                    <View style={styles.choosen_section_bottom}>
                        {currentFilter.size > 0 && (
                            <View style={styles.filter_actions}>
                                <TouchableOpacity style={styles.filter_action} onPress={() => setCurrentFilter(new Map())}>
                                    <Icon name="close" size={10} color="#000"/>
                                    <Text style={styles.filter_actions_text}>נקה הכל </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                <Gallery items={products}/>
            </View>
        )
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            {content}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#f1f2ed",

    },
    breadcrumbs: {
        width: width - 10,

    },
    category_name: {
        fontSize: 20,
        fontWeight: 700,
        paddingRight: 10,
        textAlign: "right",
        marginBottom: 20,
    },
    choosen_section: {
        flexDirection: "column",
    },
    choosen_section_top: {
        flexDirection: "row",
        justifyContent: "space-between",
        direction: "rtl",
        position: "relative",
    },
    choosen_section_bottom:{
        flexDirection: "row",
        direction: "rtl",
        position: "relative",
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
});

export default Category;


