import {Text, View, StyleSheet, TouchableOpacity, Alert, Dimensions} from "react-native";
import useBreadcrumbs from "./useBreadcrumbs";
import { useMemo} from "react";
import {router} from "expo-router";

const DELIMITER = '/';

const Breadcrumbs = ({ categoryIds = [], currentProduct = "", onPress = () => {} }) => {

    const {
        currentCategory,
        isLoading,
        hasError,
        normalizedData,
    } = useBreadcrumbs({ids: categoryIds})

    const links = useMemo(() => {
        return normalizedData.map(({ text, category_id }) => {
            return (
                <View style={styles.inner} key={text}>
                    <Text style={styles.delimiter}>{DELIMITER}</Text>
                    <Text style={styles.link} onPress={() => onPress(category_id)}>{text}</Text>
                </View>
            );
        });
    }, [normalizedData]);

    if (isLoading) {
        return null;
    }

    if (hasError) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        );
    }

    const currentCategoryLink = currentProduct ? (
        <Text style={styles.link} onPress={() => onPress(categoryIds)}>{currentCategory}</Text>
    ) : (
        <Text style={styles.currentLink}>{currentCategory}</Text>
    );

    const currentProductNode = currentProduct ? (
        // <View style={styles.container}>

            <Text style={styles.text}>{currentProduct}</Text>
        // </View>
    ) : null;

    return (
        <View style={styles.breadcrumbs}>
            <Text style={styles.link} onPress={() => router.replace("/homepage")}>דף הבית</Text>
            {links}
            <Text style={styles.delimiter}>{DELIMITER}</Text>
            {currentCategoryLink}
            {currentProductNode && (
                <Text style={styles.delimiter}>{DELIMITER}</Text>
            )}
            {currentProductNode}
        </View>
    )
}

const styles = StyleSheet.create({
    breadcrumbs: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        direction: "rtl",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,

    },
    link: {
        fontSize: 11,
        fontWeight: 500,
        color: '#589bc6',
    },
    text: {
        fontSize: 11,
        fontWeight: 500,
        color: '#000000',
    },
    currentLink: {
        fontSize: 11,
    },
    inner: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        direction: "rtl",
    },
    delimiter: {
        marginRight: 5,
        marginLeft: 5,
        opacity: 0.5
    }
});

export default Breadcrumbs;