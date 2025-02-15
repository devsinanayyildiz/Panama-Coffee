import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { signUpWithEmail } from '../../firebase/auth'; // Firebase auth fonksiyonlarını import edin

type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: SignUpScreenProps) => {
    const theme = useTheme();
    const { colors } = theme;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // 📌 Kayıt Ol Fonksiyonu
    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin!');
            return;
        }

        setLoading(true);
        try {
            await signUpWithEmail(email, password);
            Alert.alert('Başarılı', 'Hesap oluşturuldu! Lütfen e-postanızı doğrulayın.');
            navigation.navigate('SingIn');  // Kullanıcı başarılı bir şekilde kayıt olduktan sonra SignIn ekranına yönlendirme
        } catch (error: any) {
            Alert.alert('Kayıt Başarısız', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 30 }}>
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <Text style={{ color: colors.text }}>Hesap Oluştur</Text>
                    <Text style={[styles.subtitle, { color: colors.text }]}>Lütfen bilgilerinizi girin</Text>
                </View>

                {/* 📌 E-posta Girişi */}
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                    <Input
                        placeholder="E-posta adresiniz"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        inputBorder
                    />
                </View>

                {/* 📌 Şifre Girişi */}
                <View style={{ marginBottom: 20, marginTop: 10 }}>
                    <Input
                        placeholder="Şifreniz"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        inputBorder
                    />
                </View>

                {/* 📌 Kayıt Ol Butonu */}
                <Button
                    title={loading ? 'Kayıt yapılıyor...' : 'KAYIT OL'}
                    onPress={handleSignUp}
                    style={{ borderRadius: 52, marginTop: 20 }}
                    disabled={loading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.7,
    },
});

export default SignUp;
