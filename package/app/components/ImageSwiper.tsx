import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get("window");

interface ImageSwiperProps {
    data: { id: string; image: any }[];
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ data }) => {
    const renderItem = ({ item }: { item: { image: any } }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
        </View>
    );

    return (
        <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width * 0.9}
            autoplay
            loop
            autoplayInterval={4000}
            enableSnap={true}
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
        borderRadius: 10,
    },
});

export default ImageSwiper;
