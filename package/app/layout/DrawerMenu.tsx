import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../constants/Images';
import { COLORS, FONTS } from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ThemeBtn from '../components/ThemeBtn';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../redux/actions/drawerAction';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// PDF Menüsü sayfasına yönlendirme için
const MenuItems = [
    {
        id: '0',
        icon: IMAGES.home,
        name: 'Ana Sayfa',
        navigate: 'Home',
    },
    {
        id: '1',
        icon: require('../assets/images/icons/store.png'),
        name: 'Mağazalar',
        navigate: 'Stores',
    },
    {
        id: '2',
        icon: IMAGES.user3,
        name: 'Profil',
        navigate: 'Profile', // Burada action yerine navigation kullandık.
    },
    {
        id: '4',
        icon: IMAGES.logout,
        name: 'Çıkış Yap',
        navigate: 'SingIn',
    },
];

const DrawerMenu = ({ navigation }: { navigation: DrawerNavigationProp<any> }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { colors }: { colors: any } = theme;
    const [active, setActive] = useState(MenuItems[0]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
                {/* Logo */}
                <View style={{ alignItems: 'flex-end', paddingVertical: 30, paddingRight: 10 }}>
                    <Image
                        style={{ height: 35 }}
                        source={theme.dark ? IMAGES.appnamedark : IMAGES.appname}
                    />
                </View>

                {/* Başlık ve Kapatma Butonu */}
                <View style={[GlobalStyleSheet.flex, { paddingHorizontal: 15, paddingBottom: 20 }]}>
                    <Text style={{ ...FONTS.fontSemiBold, fontSize: 20, color: colors.title }}>Ana Menü</Text>
                    <TouchableOpacity onPress={() => navigation.closeDrawer()} activeOpacity={0.5}>
                        <FeatherIcon size={24} color={colors.title} name="x" />
                    </TouchableOpacity>
                </View>

                {/* Menü Butonları */}
                <View style={{ paddingBottom: 10 }}>
                    {MenuItems.map((data: any, index: any) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                onPress={() => {
                                    dispatch(closeDrawer());
                                    navigation.navigate(data.navigate);
                                }}
                                style={[GlobalStyleSheet.flex, { paddingVertical: 10, marginBottom: 5 }]}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                    <View style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Image
                                            source={data.icon}
                                            style={{
                                                height: 24,
                                                width: 24,
                                                tintColor: data.id === '4' ? '#FF8484' : COLORS.primary,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </View>
                                    <Text style={[
                                        FONTS.fontRegular,
                                        { color: colors.title, fontSize: 16, opacity: 0.8 },
                                        data.id === '0' && { ...FONTS.fontSemiBold, fontSize: 16, color: COLORS.primary }
                                    ]}>
                                        {data.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Tema Değiştirme Butonu */}
                <View style={{ paddingHorizontal: 10 }}>
                    <ThemeBtn />
                </View>

                {/* Alt Bilgi */}
                <View style={{ paddingVertical: 180, paddingHorizontal: 3 }}>
                    <Text style={{ ...FONTS.fontMedium, fontSize: 12, color: '#868686' }}>Panama Coffee App</Text>
                    <Text style={{ ...FONTS.fontMedium, fontSize: 11, color: '#B1B1C3' }}>Version 1.0.0</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default DrawerMenu;
