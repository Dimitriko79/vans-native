import { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { gql, useQuery } from "@apollo/client";
import CustomActivityIndicator from "./components/customActivityIndicator";

const Cart = () => {
    const { loading, error, data } = useQuery(GET_MEGA_MENU, {
        fetchPolicy: "no-cache",
        context: {
            headers: { Store: "he" },
        }
    });

    const shouldRenderMegaMenuItem = (category) => {
        return !!category.include_in_menu;
    };
    const processData = useCallback(
        (category, path = [], isRoot = true) => {
            if (!category) {
                return;
            }
            const megaMenuCategory = { ...category };
            if (!isRoot) {
                megaMenuCategory.path = [...path, category.id];
            }

            if (megaMenuCategory.children) {
                megaMenuCategory.children = [...megaMenuCategory.children]
                    .filter((category) => shouldRenderMegaMenuItem(category))
                    .sort((a, b) => (a.position > b.position ? 1 : -1))
                    .map((child) => processData(child, megaMenuCategory.path, false));
            }
            return megaMenuCategory;
        },
        [shouldRenderMegaMenuItem]
    );

    const megaMenuData = useMemo(() => {
        if (!data || !data.categoryList || data.categoryList.length === 0) {
            return {};
        }
        return processData(data.categoryList[0]);
    }, [data, processData]);

    if (loading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error loading data: {error.message}</Text>;
    }

    if (!megaMenuData.children || megaMenuData.children.length === 0) {
        return <Text>No categories available</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={megaMenuData.children || []}
                renderItem={({ item }) => (
                    <Text style={styles.text}>{item.name}</Text>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    text: {
        color: "black",
        fontSize: 16,
        marginVertical: 8,
    },
});

export default Cart;

export const GET_MEGA_MENU = gql`
  query getMegaMenu {
    categoryList {
      id
      name
      children {
        id
        include_in_menu
        name
        position
        children {
          id
          include_in_menu
          name
          position
        }
      }
    }
  }
`;