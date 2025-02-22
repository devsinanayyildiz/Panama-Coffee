import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import Input from '../../components/Input/Input';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../../components/Button/Button';
import { COLORS, FONTS } from '../../constants/theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const EditProfile = () => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const navigation = useNavigation<any>();

    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth().currentUser;
            if (user) {
                setUserId(user.uid);
                setEmail(user.email || '');

                const userDoc = await firestore().collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    setFullName(userData?.firstName + ' ' + userData?.lastName || '');
                    setPhone(userData?.phone || '');
                    setLocation(userData?.location || '');
                    setImageUrl(userData?.profileImage || '');
                }
            }
        };
        fetchUserData();
    }, []);

    const handleImageSelect = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 200,
                height: 200,
                cropping: true,
            });

            const reference = storage().ref(`profile_images/${userId}.jpg`);
            await reference.putFile(image.path);
            const url = await reference.getDownloadURL();

            setImageUrl(url);
            await firestore().collection('users').doc(userId).update({ profileImage: url });

            Alert.alert('Başarılı', 'Profil fotoğrafı güncellendi!');
        } catch (error) {
            console.error('Fotoğraf yükleme hatası:', error);
        }
    };

    const handleUpdateProfile = async () => {
        if (!fullName || !phone || !location) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }

        setIsLoading(true);
        try {
            const nameParts = fullName.split(' ');
            await firestore().collection('users').doc(userId).update({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                phone,
                location,
            });

            Alert.alert('Başarılı', 'Profiliniz güncellendi!');
            navigation.navigate('Profile');
        } catch (error) {
            console.error('Profil güncelleme hatası:', error);
            Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu.');
        }
        setIsLoading(false);
    };

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header title="Profili Düzenle" leftIcon="back" titleRight />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15, marginBottom: 50 }}>
                <View style={[GlobalStyleSheet.container, { backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card, marginTop: 10, borderRadius: 15 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <View>
                            <View style={styles.imageborder}>
                                <Image
                                    style={{ height: 82, width: 82, borderRadius: 50 }}
                                    source={imageUrl ? { uri: imageUrl } : IMAGES.user2}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handleImageSelect}
                                style={[styles.WriteIconBackground, { backgroundColor: colors.card }]}
                            >
                                <View style={styles.WriteIcon}>
                                    <Image
                                        style={{ height: 16, width: 16, resizeMode: 'contain', tintColor: COLORS.card }}
                                        source={IMAGES.write}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={[FONTS.fontMedium, { fontSize: 19, color: colors.title }]}>{fullName || 'Kullanıcı Adı'}</Text>
                            <Text style={[FONTS.fontRegular, { fontSize: 12, color: colors.text }]}>{email}</Text>
                        </View>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container, { backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card, marginTop: 10, paddingVertical: 10, borderRadius: 15 }]}>
                    <View style={{ marginBottom: 15, marginTop: 10 }}>
                        <Input
                            onChangeText={setFullName}
                            value={fullName}
                            placeholder="Ad Soyad"
                            inputicon
                            icon={<Image source={IMAGES.user2} style={[styles.icon, { tintColor: colors.title }]} />}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Input
                            onChangeText={setPhone}
                            value={phone}
                            keyboardType="phone-pad"
                            placeholder="Telefon Numarası"
                            inputicon
                            icon={<Image source={IMAGES.Phoneduotone} style={[styles.icon, { tintColor: colors.title }]} />}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Input
                            onChangeText={setLocation}
                            value={location}
                            placeholder="Konum"
                            inputicon
                            icon={<Image source={IMAGES.Pinduotone} style={[styles.icon, { tintColor: colors.title }]} />}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container]}>
                <Button
                    title="Profili Güncelle"
                    color={COLORS.primary}
                    text={COLORS.card}
                    onPress={handleUpdateProfile}
                    style={{ borderRadius: 50 }}
                    loading={isLoading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
    },
    imageborder: {
        borderWidth: 2,
        borderColor: COLORS.primary,
        height: 90,
        width: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    WriteIconBackground: {
        height: 42,
        width: 42,
        borderRadius: 40,
        position: 'absolute',
        bottom: 0,
        left: 60,
    },
    WriteIcon: {
        height: 36,
        width: 36,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
    },
});

export default EditProfile;
