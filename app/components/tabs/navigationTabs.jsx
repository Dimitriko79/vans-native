import React from "react";
import {View, Pressable, StyleSheet, Text, FlatList} from "react-native";
import { router} from "expo-router";

const tabs = [
    { name: "ההזמנות שלי", path: "/orders"},
    { name: "המועדפים שלי", path: "/wishlist"},
    { name: "ספר כתובות", path: "/address"},
    { name: "פרטי חשבון", path: "/customer" },
    { name: "הוראות קבע", path: "/"},
    { name: "החזרות שלי", path: "/"},
];

const NavigationTabs = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={tabs}
                keyExtractor={(item, index) => `${item.name}_${index}`}
                numColumns={3}
                renderItem={({ item, index }) => (
                        <Pressable
                        key={index}
                        style={({ pressed }) => [
                            styles.tab,
                            pressed && { backgroundColor: "#ddd" }
                        ]}
                        onPress={() => router.navigate(item.path)}
                    >
                        <Text>{item.name}</Text>
                    </Pressable>
                )}
                scrollEnabled={false}
                nestedScrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    }
});

export default NavigationTabs;