import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export const updateLoyaltyPoints = async () => {
  const user = auth().currentUser;

  if (!user) {
    console.warn("⚠️ Kullanıcı oturum açmamış!");
    return { error: "Kullanıcı oturum açmamış." };
  }

  try {
    const userRef = firestore().collection("users").doc(user.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { error: "Kullanıcı Firestore'da bulunamadı!" };
    }

    let currentPoints = userDoc.data().loyaltyPoints || 0;

    // Kullanıcı 15 puana ulaştıysa bedava kahve almalı
    if (currentPoints >= 15) {
      await userRef.update({ loyaltyPoints: 0 }); // Puan sıfırla (Bedava kahve verildi)
      return { success: "Tebrikler! Ücretsiz kahvenizi aldınız. Puanlar sıfırlandı." };
    } else {
      await userRef.update({ loyaltyPoints: currentPoints + 1 });
      return { success: "Sadakat puanı güncellendi. Yeni puan: " + (currentPoints + 1) };
    }
  } catch (error) {
    console.error("🚨 Sadakat puanı güncellenirken hata oluştu:", error);
    return { error: "Puan güncellenirken hata oluştu." };
  }
};

// 📌 Email ve Şifre ile Kayıt Olma + Firestore'a Kullanıcı Ekleme
export const signUpWithEmail = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Kullanıcıyı Firestore'a ekleyelim
    await firestore().collection("users").doc(user.uid).set({
      id: user.uid, // Kullanıcının benzersiz Firebase ID'si
      firstName: firstName,
      lastName: lastName,
      email: email,
      loyaltyPoints: 0, // Sadakat puanı başlangıç değeri
      freeCoffee: 0, // Ücretsiz kahve başlangıç değeri
      createdAt: firestore.FieldValue.serverTimestamp() // Kayıt tarihi
    });

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
