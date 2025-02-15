import auth from '@react-native-firebase/auth';

// 📌 Email ve Şifre ile Kayıt Olma + E-posta Doğrulama
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Kullanıcıya e-posta doğrulama linki gönder
    await user.sendEmailVerification();

    return { user, message: 'Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.' };
  } catch (error) {
    return handleAuthError(error);
  }
};

// 📌 Email ve Şifre ile Giriş Yapma
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Kullanıcının e-postası doğrulanmış mı kontrol et
    if (!user.emailVerified) {
      await auth().signOut(); // Kullanıcı doğrulanmadıysa çıkış yap
      return { error: 'Lütfen e-posta adresinizi doğrulayın.' };
    }

    return { user };
  } catch (error) {
    return handleAuthError(error);
  }
};

// 📌 Çıkış Yapma
export const signOut = async () => {
  try {
    await auth().signOut();
    return { message: 'Başarıyla çıkış yapıldı.' };
  } catch (error) {
    return { error: 'Çıkış yaparken bir hata oluştu.' };
  }
};

// 📌 Parola Sıfırlama
export const resetPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return { message: 'Şifre sıfırlama e-postası gönderildi.' };
  } catch (error) {
    return handleAuthError(error);
  }
};

// 📌 Firebase Hata Yönetimi
const handleAuthError = (error) => {
  let errorMessage = 'Bilinmeyen bir hata oluştu.';

  if (error.code === 'auth/email-already-in-use') {
    errorMessage = 'Bu e-posta adresi zaten kullanılıyor.';
  } else if (error.code === 'auth/invalid-email') {
    errorMessage = 'Geçersiz e-posta adresi.';
  } else if (error.code === 'auth/user-not-found') {
    errorMessage = 'Böyle bir kullanıcı bulunamadı.';
  } else if (error.code === 'auth/wrong-password') {
    errorMessage = 'Yanlış şifre girdiniz.';
  } else if (error.code === 'auth/weak-password') {
    errorMessage = 'Şifre çok zayıf. En az 6 karakter olmalı.';
  } else if (error.code === 'auth/network-request-failed') {
    errorMessage = 'Ağ bağlantısı hatası. İnternetinizi kontrol edin.';
  }

  return { error: errorMessage };
};
