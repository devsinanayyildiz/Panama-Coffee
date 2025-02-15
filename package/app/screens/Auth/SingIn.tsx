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
import { signInWithEmail } from '../../firebase/auth';  // Firebase email auth fonksiyonları
import { signInWithGoogle } from '../../firebase/googleAuth';  // Google auth fonksiyonları

type SingInScreenProps = StackScreenProps<RootStackParamList, 'SingIn'>;

const SingIn = ({ navigation }: SingInScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setisFocused] = useState(false);
    const [isFocused2, setisFocused2] = useState(false);

    const handleEmailSignIn = async () => {
        const response = await signInWithEmail(email, password);

        if ('error' in response) {
            Alert.alert("Giriş Başarısız", response.error);
        } else {
            console.log("✅ Email ile giriş yapıldı:", response.user);
            // Kullanıcı giriş yaptıktan sonra Home ekranına yönlendir
            navigation.navigate('DrawerNavigation', { screen: 'Home' });
        }
    };

    const handleGoogleLogin = async () => {
        const response = await signInWithGoogle();

        if (response?.error) {
            Alert.alert("Giriş Başarısız", response.error);
        } else {
            console.log("✅ Google ile giriş yapıldı:", response.user);
            // Google ile giriş yaptıktan sonra Home ekranına yönlendir
            navigation.navigate('DrawerNavigation', { screen: 'Home' });
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
                        <Text style={[styles.title1, { color: colors.title }]}>Sign In</Text>
                        <Text style={[styles.title2, { color: colors.title }]}>
                            Lütfen bilgilerinizi giriniz.
                        </Text>
                    </View>

                    {/* Username Input */}
                    <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                        <Text style={[styles.title3, { color: '#8A8A8A' }]}>Username</Text>
                    </View>
                    <View style={{ marginBottom: 20, marginTop: 10 }}>
                        <Input
                            onFocus={() => setisFocused(true)}
                            onBlur={() => setisFocused(false)}
                            onChangeText={setEmail}
                            isFocused={isFocused}
                            inputBorder
                            defaultValue={email}
                            placeholder="Emaili adresinizi giriniz"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                        <Text style={[styles.title3, { color: '#8A8A8A' }]}>Password</Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Input
                            onFocus={() => setisFocused2(true)}
                            onBlur={() => setisFocused2(false)}
                            style={{ backgroundColor: colors.card }}
                            onChangeText={setPassword}
                            isFocused={isFocused2}
                            type="password"
                            inputBorder
                            defaultValue={password}
                            placeholder="Şifrenizi giriniz"
                        />
                    </View>

                    {/* Email Sign-In Button */}
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            title="Giriş yap."
                            onPress={handleEmailSignIn}
                            style={{ borderRadius: 100, backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}
                        />
                    </View>

                    {/* Google Sign-In Button */}
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            title="Google ile devam et."
                            onPress={handleGoogleLogin}
                            style={{ borderRadius: 100, backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}
                        />
                    </View>



                    {/* Forgot Password */}
                    <View style={[GlobalStyleSheet.flex, { marginBottom: 20, marginTop: 10, paddingHorizontal: 10, justifyContent: 'flex-start', gap: 5 }]}>
                        <Text style={[styles.text, { color: colors.title }]}>Şifreni mi unuttun?</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.primary }}>Buraya tıkla.</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Create Account Button */}
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[styles.title2, { color: colors.title, textAlign: 'center', opacity: 0.5 }]}>Hesabınız yok mu?</Text>
                    </View>
                    <Button
                        title="Hesap oluşturun."
                        onPress={() => navigation.navigate('SignUp')}
                        text={COLORS.title}
                        color={COLORS.secondary}
                        style={{ borderRadius: 100, backgroundColor: COLORS.secondary, paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}
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

export default SingIn;
