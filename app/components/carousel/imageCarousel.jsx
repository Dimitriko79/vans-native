import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const ImageCarousel = ({images}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View>
            <Carousel
                loop
                width={width}
                height={width}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={index => setActiveIndex(index)}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" sourceType="image/png" />
                    </View>
                )}
            />
            <View style={styles.paginationContainer}>
                {images.map((_, index) => (
                    <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: { alignItems: 'center' },
    image: { width: width, height: width, backgroundColor: 'white' },
    paginationContainer: { flexDirection: 'row', justifyContent: 'center', paddingTop: 30 },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#858585',
        backgroundColor: '#f1f2ed',
        marginHorizontal: 5
    },
    activeDot: {
        backgroundColor: '#ff5501',
        borderColor: '#ff5501'
    }
});

export default ImageCarousel;
