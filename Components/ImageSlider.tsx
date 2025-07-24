import { Image, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { colorScheme, style as getStyles, width } from "../Values/AppStyles";
import { strings } from "../Localization";
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export const ImageSlider = ({ images, text }) => {
    let style = getStyles();
    const theme = useSelector(state => state.appState.theme);

    useEffect(() => {
        colorScheme(theme);
        style = getStyles();
    }, [theme]);

    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            let newIndex = activeIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0;
            }
            setActiveIndex(newIndex);
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
            }
        }, 3000);

        return () => clearInterval(timer);
    }, [activeIndex]);

    const handleDotPress = (index) => {
        setActiveIndex(index);
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ animated: true, index });
        }
    };

    const windowWidth = Dimensions.get('window').width;
    const isSmallDevice = windowWidth < 375; // Adjust as needed based on your design
    const colors = ['white', 'black'];
    let thiru = text[0];
    const [firstFourWords, setFirstFourWords] = useState("");
    const [nextThreeWords, setNextThreeWords] = useState("");

    useEffect(() => {
        if (thiru && typeof thiru[0] === 'string') {
            const words = thiru[0].split(' ');
            setFirstFourWords(words.slice(0, 4).join(' '));
            setNextThreeWords(words.slice(4, 7).join(' '));
        }
    }, [thiru]);

    return (
        <View style={[style.topContainer, { marginTop: 10 }]}>
            <Image
                source={images[activeIndex]}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 4
                }}
                resizeMode="cover"
            />
            <View style={[style.absulate, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text  style={{
                    color: colors[activeIndex],
                    fontFamily: 'Roboto Medium',
                    textAlign: 'center',
                    fontSize: 15,
                }}>
                    {activeIndex === 0 ? (
                        <>
                            {firstFourWords}
                            {'\n'}
                            {nextThreeWords}
                        </>
                    ) : (
                        text && text[activeIndex] // English translation
                    )}
                </Text>
            </View>
            <View style={style.dotsContainer}>
                {images.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onLongPress={() => handleDotPress(index)}
                        onPress={() => handleDotPress(index)}
                        style={[style.dot, index === activeIndex && style.activeDot]}
                    />
                ))}
            </View>
        </View>
    );
};
