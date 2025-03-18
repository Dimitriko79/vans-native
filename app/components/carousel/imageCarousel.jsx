import React, { useState, useRef } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const ImageCarousel = ({ images = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const carouselRef = useRef(null);

    const handlePress = (index) => {
        setActiveIndex(index);
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ index, animated: true });
        }
    };

    return (
        <View>
            <Carousel
                ref={carouselRef}
                loop
                width={width}
                height={width}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={setActiveIndex}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.url }}
                            style={[styles.image, !imageLoaded && { opacity: 0 }]}
                            resizeMode="cover"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </View>
                )}
            />
            <View style={styles.paginationContainer}>
                {images.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dot, activeIndex === index && styles.activeDot]}
                        onPress={() => handlePress(index)}
                    />
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
        width: 12,
        height: 12,
        borderRadius: 6,
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