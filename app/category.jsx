import {View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useCategory} from "./components/category/useCategory";
import Gallery from "./components/gallery/gallery";
import CustomActivityIndicator from "./components/customActivityIndicator";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import FilterSidebar from "./components/filterSidebar/filterSidebar";


const { height } = Dimensions.get("window");

const Category = () => {
    const { ids } = useLocalSearchParams();
    const talonProps = useCategory(ids);
    const {
        categoryData,
        products,
        aggregations,
        loading,
        error,
        handlePress,
        currentFilter,
        setCurrentFilter,
        isFetching, setIsFetching
    } = talonProps;

    if (loading) return <ActivityIndicator style={{height: height / 1.2}}/>;
    if(error) return <Text>Error</Text>;

    return (
        <ScrollView>
            <View style={styles.container}>
                <Breadcrumbs categoryIds={ids} onPress={handlePress}/>
                <Text style={styles.category_name}>{categoryData.name}</Text>
                <View style={styles.choosen_section}>
                    <FilterSidebar filters={aggregations} setCurrentFilter={setCurrentFilter} currentFilter={currentFilter} isFetching={isFetching} setIsFetching={setIsFetching}/>
                </View>
                <Gallery items={products}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#f1f2ed",

    },
    category_name: {
        fontSize: 20,
        fontWeight: 700,
        paddingRight: 10,
        textAlign: "right",
        marginBottom: 20,
    },
    choosen_section: {
        flexDirection: "row",
        justifyContent: "space-between",
        direction: "rtl"
    }
});

export default Category;


