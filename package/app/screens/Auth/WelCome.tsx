import { View, Text, Image, ScrollView, Alert, StyleSheet, Button } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import SocialBtn from '../../components/Socials/SocialBtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { signInWithGoogle } from '../../firebase/googleAuth';

type WelComeScreenProps = StackScreenProps<RootStackParamList, 'WelCome'>;

const WelCome = ({ navigation }: WelComeScreenProps) => {

  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  // 📌 Google ile giriş
  const handleGoogleLogin = async () => {
    const response = await signInWithGoogle();

    if (response?.error) {
      Alert.alert("Hata", "Google ile giriş başarısız: " + response.error);
    } else {
      console.log("✅ Google ile giriş başarılı:", response.user);
      navigation.replace('Home');  // Kullanıcı giriş yaptıysa Home ekranına yönlendir
    }
  };

  return (
      <View style={{ flex: 1, backgroundColor: colors.card }}>
        {/* 📌 Arka Plan Görseli */}
        <Image
            style={styles.welcomeImage}
            source={IMAGES.welcome}
        />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[GlobalStyleSheet.container, { padding: 0, marginTop: 60, flex: 1 }]}>
            <Image
                style={{ height: undefined, width: '100%', aspectRatio: 1 / 1, zIndex: 99 }}
                source={IMAGES.welcome2}
            />
          </View>

          <LinearGradient colors={['rgba(4,118,78,0)', 'rgba(4,118,78,.5)']}>
            <View style={[GlobalStyleSheet.container, { paddingHorizontal: 35, paddingBottom: 50 }]}>
              {/* Başlık */}
              <Text style={[styles.title, { color: colors.title }]}>

              </Text>

              {/* 📌 Google ile giriş */}
              <View style={{ marginBottom: 10 }}>
                <SocialBtn
                    text="Google ile giriş yap."
                    color={COLORS.card}
                    textcolor={COLORS.title}
                    rounded
                    icon={<Image source={IMAGES.google2} style={{ resizeMode: 'contain', height: 22, width: 22 }} />}
                    onpress={handleGoogleLogin}
                />
              </View>

              {/* 📌 E-posta ile giriş */}
              <View style={{ marginBottom: 10 }}>
                <SocialBtn
                    text="Email ile giriş yap."
                    color={COLORS.primary}
                    textcolor={COLORS.card}
                    rounded
                    icon={<FontAwesome name="envelope" size={22} color={COLORS.card} />}
                    border={COLORS.primary}
                    onpress={() => navigation.navigate('SingIn')}
                />
              </View>
              {/* 📌 Kayıt Ol */}
              <View>
                <SocialBtn
                    text="Kayıt ol."
                    color={COLORS.primary}
                    textcolor={COLORS.card}
                    rounded
                    icon={<FontAwesome name="user-plus" size={22} color={COLORS.card} />}
                    border={COLORS.primary}
                    onpress={() => navigation.navigate('SignUp')}
                />
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  welcomeImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  title: {
    ...FONTS.fontSemiBold,
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20
  }
});

export default WelCome;
