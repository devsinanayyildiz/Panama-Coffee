import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import Header from '../../layout/Header';
import { getAuth, signOut, User } from 'firebase/auth';

// Sayfa parametreleri
type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ navigation }: ProfileScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = auth.currentUser;
        setUser(currentUser);
    }, []);

    // Çıkış yapma fonksiyonu
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.replace('SingIn'); // Kullanıcıyı giriş ekranına yönlendir
        } catch (error) {
            console.error('Çıkış yaparken hata oluştu:', error);
        }
    };

    return (
        <View style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
                title="Profil"
                leftIcon={'back'}
                rightIcon2={'Edit'}
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                <View style={[GlobalStyleSheet.container, { alignItems: 'center', marginTop: 50, padding: 0 }]}>
                    <View style={styles.sectionimg}>
                        <Image style={{ height: 104, width: 104 }} source={IMAGES.small6} />
                    </View>

                    {user ? (
                        <>
                            <Text style={{ ...FONTS.fontSemiBold, fontSize: 24, color: colors.title }}>
                                {user.displayName || 'Bilinmeyen Kullanıcı'}
                            </Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 16, color: COLORS.primary }}>
                                {user.email}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={{ ...FONTS.fontSemiBold, fontSize: 24, color: colors.title }}>
                                Giriş Yapılmadı
                            </Text>
                        </>
                    )}
                </View>

                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 40, marginTop: 20 }]}>
                    <TouchableOpacity
                        style={[styles.logoutButton, { backgroundColor: COLORS.primary }]}
                        onPress={handleLogout}
                    >
                        <Text style={{ color: COLORS.card, fontSize: 16, ...FONTS.fontMedium }}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionimg: {
        height: 104,
        width: 104,
        borderRadius: 150,
        backgroundColor: COLORS.primary,
        overflow: 'hidden',
        marginBottom: 25,
    },
    logoutButton: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
});

export default Profile;
