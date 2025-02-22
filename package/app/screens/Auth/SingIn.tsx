import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import Input from '../../components/Input/Input';
import { IMAGES } from '../../constants/Images';
import Button from '../../components/Button/Button';
import auth from '@react-native-firebase/auth';
import { signInWithGoogle } from '../../firebase/googleAuth';

type SignInScreenProps = StackScreenProps<RootStackParamList, 'SingIn'>;

const SignIn = ({ navigation }: SignInScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEmailSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Hata", "Lütfen e-posta ve şifrenizi girin.");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            console.log("✅ Email ile giriş yapıldı:", userCredential.user);
            navigation.replace('DrawerNavigation', { screen: 'Home' }); // Home ekranına yönlendir
        } catch (error: any) {
            Alert.alert("Giriş Hatası", error.message);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        const response = await signInWithGoogle();

        if (response?.error) {
            Alert.alert("Giriş Başarısız", response.error);
        } else {
            console.log("✅ Google ile giriş yapıldı:", response.user);
            navigation.replace('DrawerNavigation', { screen: 'Home' });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <View style={[GlobalStyleSheet.container, { justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }]}>
                <Image
                    style={{ resizeMode: 'contain', height: 36 }}
                    source={theme.dark ? IMAGES.appnamedark : IMAGES.appname}
                />
            </View>
            <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container, { flexGrow: 1, paddingBottom: 0, paddingHorizontal: 30, paddingTop: 0 }]}>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={[styles.title1, { color: colors.title }]}>Giriş Yap</Text>
                        <Text style={[styles.title2, { color: colors.title }]}>
                            Lütfen bilgilerinizi giriniz.
                        </Text>
                    </View>

                    {/* Email Input */}
                    <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                        <Text style={[styles.title3, { color: '#8A8A8A' }]}>Email</Text>
                    </View>
                    <View style={{ marginBottom: 20, marginTop: 10 }}>
                        <Input
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChangeText={setEmail}
                            isFocused={isFocused}
                            inputBorder
                            defaultValue={email}
                            placeholder="E-posta adresinizi girin"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                        <Text style={[styles.title3, { color: '#8A8A8A' }]}>Şifre</Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Input
                            onFocus={() => setIsFocused2(true)}
                            onBlur={() => setIsFocused2(false)}
                            style={{ backgroundColor: colors.card }}
                            onChangeText={setPassword}
                            isFocused={isFocused2}
                            type="password"
                            inputBorder
                            defaultValue={password}
                            placeholder="Şifrenizi girin"
                        />
                    </View>

                    {/* Giriş Yap Butonu */}
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            title={loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                            onPress={handleEmailSignIn}
                            style={{
                                borderRadius: 100,
                                backgroundColor: COLORS.primary,
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            disabled={loading}
                        />
                    </View>

                    {/* Google ile Giriş Yap */}
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            title="Google ile Giriş Yap"
                            onPress={handleGoogleLogin}
                            style={{
                                borderRadius: 100,
                                backgroundColor: COLORS.primary,
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />
                    </View>

                    {/* Şifremi Unuttum */}
                    <View style={[GlobalStyleSheet.flex, { marginBottom: 20, marginTop: 10, paddingHorizontal: 10, justifyContent: 'flex-start', gap: 5 }]}>
                        <Text style={[styles.text, { color: colors.title }]}>Şifreni mi unuttun?</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.primary }}>Buraya tıkla.</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Hesap Oluştur */}
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[styles.title2, { color: colors.title, textAlign: 'center', opacity: 0.5 }]}>Hesabın yok mu?</Text>
                    </View>
                    <Button
                        title="Hesap Oluştur"
                        onPress={() => navigation.navigate('SignUp')}
                        text={COLORS.title}
                        color={COLORS.secondary}
                        style={{
                            borderRadius: 100,
                            backgroundColor: COLORS.secondary,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    text: {
        ...FONTS.fontRegular,
        fontSize: 14,
        color: COLORS.title,
    },
    title1: {
        ...FONTS.fontSemiBold,
        fontSize: 24,
        color: COLORS.title,
        marginBottom: 5
    },
    title2: {
        ...FONTS.fontRegular,
        fontSize: 14,
        color: COLORS.title,
    },
    title3: {
        ...FONTS.fontMedium,
        fontSize: 14,
        color: '#8A8A8A'
    }
});

export default SignIn;
