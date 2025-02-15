import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// 📌 Google Sign-In Yapılandırması
GoogleSignin.configure({
  webClientId: '409055452730-7njbetm27pccr821n8h5l5al1fbeuta0.apps.googleusercontent.com',
});

// 📌 Google ile Giriş Yapma
export const signInWithGoogle = async () => {
  try {
    // Google Play Services kontrolü
    await GoogleSignin.hasPlayServices();

    // Google ile giriş yap
    const { idToken } = await GoogleSignin.signIn();

    if (!idToken) {
      return { error: 'Google kimlik doğrulama başarısız oldu.' };
    }

    // Google kimlik bilgisini Firebase'e gönder
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);

    return { user: userCredential.user };
  } catch (error) {
    return handleGoogleAuthError(error);
  }
};

// 📌 Google Sign-Out (Çıkış)
export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await auth().signOut();
    return { message: 'Başarıyla çıkış yapıldı.' };
  } catch (error) {
    return { error: 'Çıkış yaparken bir hata oluştu.' };
  }
};

// 📌 Google Hata Yönetimi
const handleGoogleAuthError = (error) => {
  let errorMessage = 'Google ile giriş sırasında bir hata oluştu.';

  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    errorMessage = 'Google girişi iptal edildi.';
  } else if (error.code === statusCodes.IN_PROGRESS) {
    errorMessage = 'Google girişi zaten başlatılmış durumda.';
  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    errorMessage = 'Google Play Hizmetleri kullanılabilir değil.';
  } else if (error.code === 'auth/network-request-failed') {
    errorMessage = 'Ağ bağlantısı hatası. Lütfen internetinizi kontrol edin.';
  } else {
    console.error('Google Auth Error:', error);
  }

  return { error: errorMessage };
};
