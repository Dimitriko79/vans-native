import React, {useCallback, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    ScrollView, Modal
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
import {useScrollContext} from "./context/scroll/scrollContext";

const { height, width } = Dimensions.get("window");

const Category = () => {
    const { ids } = useLocalSearchParams();
    const { setResetScroll } = useScrollContext();
    const {
        categoryData = { name: "", description: "" },
        products = [],
        aggregations = [],
        sortFields = [],
        description,
        loading,
        productLoading,
        isLoadMore,
        pageInfo,
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
    if (loading || !categoryData) {
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
                <Gallery items={products}/>
                {isLoadMore && pageInfo.current_page < pageInfo.total_pages && <ActivityIndicator size={40} style={{marginBottom: 20}}/>}
            </View>
        )
    };

    useEffect(() => {
        setResetScroll(true);
    }, []);

    return content;
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: "flex-start",
        backgroundColor: "#f1f2ed",
    },
    container: {
        flex: 1,
        position: "relative",
        minHeight: height,
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "#d41921",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    loaderContainerOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Category;
