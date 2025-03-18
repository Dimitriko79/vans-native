import React, { useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useCategory from "./components/category/useCategory";
import Gallery from "./components/gallery/gallery";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import FilterSidebar from "./components/filterSidebar/filterSidebar";
import SortSideBar from "./components/sortSideBar/sortSideBar";
import Icon from "react-native-vector-icons/AntDesign";
import useDropdownSideBar from "./components/sortSideBar/useDropdownSideBar";
import RichContent from "./components/richContent/richContent";
import LoadingIndicator from "./components/loadingIndicator/loadingIndicator";

const { height, width } = Dimensions.get("window");

const Category = () => {
    const { ids } = useLocalSearchParams();
    const {
        categoryData = { name: "", description: "" },
        products = [],
        aggregations = [],
        sortFields = [],
        description,
        loading,
        error,
        handlePress,
        currentFilter,
        setCurrentFilter,
        isFetching, setIsFetching,
        sortProps
    } = useCategory(ids);

    const { isOpenFilter, isOpenSort, onToggle } = useDropdownSideBar({ isFetching, setIsFetching });

    const clearFilters = useCallback(() => setCurrentFilter(new Map()), [setCurrentFilter]);

    let content;
    if (loading) {
        content = (
            <View style={styles.loaderContainer}>
                <LoadingIndicator/>
            </View>
        );
    } else if (error) {
        content = (
            <View style={styles.loaderContainer}>
                <Text style={styles.errorText}>Error: Unable to load category data.</Text>
            </View>
        );
    } else if (!products.length) {
        content = (
            <View style={styles.noProductsContainer}>
                <Text style={styles.noProductsText}>No products found(</Text>
            </View>
        )
    } else {
        content = (
            <View style={styles.container}>
                <View style={styles.breadcrumbs}>
                    <Breadcrumbs categoryIds={ids} onPress={handlePress} />
                </View>
                {description ? (
                    <RichContent html={description} />
                ) : null}
                <Text style={styles.category_name}>{categoryData.name}</Text>
                <View style={styles.choosen_section}>
                    <View style={styles.choosen_section_top}>
                        <FilterSidebar
                            filters={aggregations}
                            setCurrentFilter={setCurrentFilter}
                            currentFilter={currentFilter}
                            isOpenFilter={isOpenFilter}
                            onToggle={onToggle}
                        />
                        <SortSideBar sort={sortFields} sortProps={sortProps} isOpenSort={isOpenSort} onToggle={onToggle} />
                    </View>
                    {currentFilter.size > 0 && (
                        <View style={styles.filter_actions}>
                            <TouchableOpacity style={styles.filter_action} onPress={clearFilters}>
                                <Icon name="close" size={10} color="#000" />
                                <Text style={styles.filter_actions_text}>נקה הכל</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <Gallery items={products} />
            </View>
        )
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
            {content}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    noProductsContainer: {
        height: height / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    noProductsText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "flex-start",
        backgroundColor: "#f1f2ed",
    },
    container: {
        flex: 1,
        minHeight: height,
        position: "relative",
        backgroundColor: "#f1f2ed",
    },
    breadcrumbs: {
        width: width - 10,
    },
    category_name: {
        fontSize: 20,
        fontWeight: "900",
        paddingRight: 10,
        textAlign: "right",
        marginBottom: 20,
        fontFamily: "Heebo"
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
    filter_actions: {
        flexDirection: "row",
        direction: "rtl",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    filter_action: {
        flexDirection: "row",
        alignItems: "center",
    },
    filter_actions_text: {
        fontSize: 10,
        marginLeft: 5,
    },
    loaderContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "#d41921",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Category;
