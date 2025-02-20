import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import React from "react";
import Item from "./item";

const { height } = Dimensions.get("window");

const Gallery = ({items}) => {

    return  (
        <View style={styles.category}>
            {!items.length ? (
                <Text style={{height: height}}>No products found(</Text>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => <Item item={item} />}
                    contentContainerStyle={styles.gallery}
                    scrollEnabled={false}
                    nestedScrollEnabled={false}
                />
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    category: {
        flex: 1,
        marginTop: 30,
        position: 'relative'

    },
    gallery: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        zIndex: 1,
        top: height / 6
    }
});


export default Gallery;