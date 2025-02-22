import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { SIZES, COLORS } from '../constants/theme';
import { IMAGES } from '../constants/Images';

const BottomMenu = ({ state, navigation, descriptors }) => {
    const theme = useTheme();
    const { colors } = theme;

    const [tabWidth, setTabWidth] = useState(Dimensions.get('window').width);
    const tabWD = tabWidth / state.routes.length;
    const circlePosition = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(circlePosition, {
            toValue: state.index * tabWD,
            useNativeDriver: true,
        }).start();
    }, [state.index, tabWidth]);

    Dimensions.addEventListener('change', val => {
        setTabWidth(val.window.width);
    });

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <Animated.View style={[styles.circleIndicator, { transform: [{ translateX: circlePosition }] }]} />
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const iconColor = isFocused ? COLORS.card : COLORS.primary;

                const icons = {
                    Home: IMAGES.Home,
                    Stores: IMAGES.Bag,
                    Campaigns: IMAGES.discount,
                    Profile: IMAGES.user3
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => navigation.navigate(route.name)}
                        style={styles.tabButton}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={icons[route.name] || IMAGES.Home}
                            style={[styles.icon, { tintColor: iconColor }]}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 10,
        shadowColor: "rgba(2,81,53,.10)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
    },
    circleIndicator: {
        position: 'absolute',
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        bottom: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    icon: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
});

export default BottomMenu;
