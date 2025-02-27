import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { IMAGES } from '../../constants/Images';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import auth from '@react-native-firebase/auth'; // Firebase authentication import

type NewPasswordScreenProps = StackScreenProps<RootStackParamList, 'NewPassword'>;

const NewPassword = ({navigation} : NewPasswordScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors : any} = theme;

    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Şifre sıfırlama işlemi
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Hata', 'Şifreler uyuşmuyor!');
            return;
        }

        try {
            const user = auth().currentUser;
            if (user) {
                await user.updatePassword(newPassword); // Firebase ile şifreyi güncelle
                Alert.alert('Başarılı', 'Şifreniz başarıyla güncellendi!');
                navigation.navigate('SingIn'); // Başarılı işlem sonrası SignIn ekranına yönlendir
            }
        } catch (error) {
            console.error('Şifre değiştirme hatası:', error);
            Alert.alert('Hata', 'Şifre değiştirme işlemi sırasında bir hata oluştu.');
        }
    };

    return (
        <SafeAreaView style={{flex:1,backgroundColor: colors.card}}>
            <View style={[GlobalStyleSheet.container,GlobalStyleSheet.flexcenter,{paddingVertical:50}]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.5}
                    style={[styles.imagebackground, { backgroundColor: '#F6F6F6' }]}
                >
                    <FeatherIcon name="arrow-left" size={24} color={COLORS.title} />
                </TouchableOpacity>
                <View style={{flex:1,alignItems:'center',marginLeft:-40}}>
                    <Image
                        style={{height:36}}
                        source={theme.dark ? IMAGES.appnamedark : IMAGES.appname}
                    />
                </View>
            </View>

            <View style={{flex:1}}>
                <View style={[GlobalStyleSheet.container, {flexGrow:1, paddingBottom:0, paddingHorizontal:30, paddingTop:0}]}>
                    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                        <View style={{marginBottom:30}}>
                            <Text style={[styles.title1, {color: colors.title}]}>Yeni şifre girin!</Text>
                            <Text style={[styles.title2, {color: colors.title}]}>Yeni şifre, eski şifreden farklı olmak zorunda!</Text>
                        </View>

                        <View style={[GlobalStyleSheet.container, {padding: 0}]}>
                            <Text style={[styles.title3, {color: '#8A8A8A'}]}>Şifre</Text>
                        </View>
                        <View style={{ marginBottom: 20, marginTop: 10 }}>
                            <Input
                                onFocus={() => setisFocused(true)}
                                onBlur={() => setisFocused(false)}
                                backround={colors.card}
                                onChangeText={setNewPassword}
                                isFocused={isFocused}
                                type={'password'}
                                inputBorder
                                placeholder="Yeni şifrenizi girin"
                            />
                        </View>

                        <View style={[GlobalStyleSheet.container, {padding: 0}]}>
                            <Text style={[styles.title3, {color: '#8A8A8A'}]}>Şifreyi Onaylayın!</Text>
                        </View>
                        <View style={{ marginBottom: 10, marginTop: 10 }}>
                            <Input
                                onFocus={() => setisFocused2(true)}
                                onBlur={() => setisFocused2(false)}
                                backround={colors.card}
                                onChangeText={setConfirmPassword}
                                isFocused={isFocused2}
                                type={'password'}
                                inputBorder
                                placeholder="Şifrenizi tekrar girin"
                            />
                        </View>
                    </ScrollView>

                    <View style={[GlobalStyleSheet.container, {paddingTop: 0, paddingHorizontal: 0}]}>
                        <Button
                            title={'Devam Et'}
                            onPress={handleChangePassword} // Şifreyi değiştir
                            style={{borderRadius: 48}}
                        />
                        <View style={[GlobalStyleSheet.bottombtn]}>
                            <Text style={[FONTS.fontRegular, {fontSize: 14, color: colors.title}]}>Back To</Text>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SingIn')}>
                                <Text style={styles.title4}>Giriş Yap</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imagebackground: {
        height: 46,
        width: 46,
        borderRadius: 50,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...FONTS.fontLight,
        fontSize: 14,
        color: COLORS.title,
        textDecorationLine: 'underline',
    },
    title1: {
        ...FONTS.fontSemiBold,
        fontSize: 25,
        color: COLORS.title,
        marginBottom: 5,
    },
    title2: {
        ...FONTS.fontLight,
        fontSize: 14,
        color: COLORS.title,
    },
    title3: {
        ...FONTS.fontMedium,
        fontSize: 14,
        color: '#8A8A8A',
    },
    title4: {
        ...FONTS.fontRegular,
        fontSize: 14,
        color: COLORS.primary,
        textDecorationLine: 'underline',
        textDecorationColor: COLORS.primary,
    },
    icon: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
    },
});

export default NewPassword;
