import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import Header from '../../layout/Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Profile = ({ navigation }: StackScreenProps<RootStackParamList, 'Profile'>) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
                setUser(userDoc.exists ? userDoc.data() : null);
            }
        };
        fetchUser();
    }, []);

    return (
        <View style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header title='Profil' leftIcon={'back'} rightIcon2={'Edit'} />
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                <View style={[GlobalStyleSheet.container, { alignItems: 'center', marginTop: 50, padding: 0 }]}>
                    <View style={styles.profileImageContainer}>
                        <Image style={styles.profileImage} source={IMAGES.user2} />
                    </View>
                    <Text style={styles.userName}>{user?.firstName || 'Kullanıcı Adı'}</Text>
                    <Text style={styles.userLocation}>{user?.email || 'example@gmail.com'}</Text>
                </View>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 40, marginTop: 20 }]}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => auth().signOut().then(() => navigation.replace('SingIn'))}>
                        <Text style={styles.logoutText}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    profileImageContainer: {
        height: 104,
        width: 104,
        borderRadius: 150,
        backgroundColor: COLORS.primary,
        overflow: 'hidden',
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        height: 104,
        width: 104,
    },
    userName: {
        ...FONTS.fontSemiBold,
        fontSize: 24,
        color: COLORS.title,
    },
    userLocation: {
        ...FONTS.fontRegular,
        fontSize: 16,
        color: COLORS.primary,
    },
    logoutButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: COLORS.card,
        fontSize: 16,
        ...FONTS.fontMedium,
    },
});

export default Profile;
