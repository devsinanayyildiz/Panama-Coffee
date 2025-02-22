import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootStackParamList";
import { COLORS, FONTS } from "../../constants/theme";
import { IMAGES } from "../../constants/Images";

type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!firstName || !lastName || !email || !password) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;

            await firestore().collection("users").doc(userId).set({
                id: userId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                loyaltyPoints: 0,
                freeCoffee: 0,
                createdAt: firestore.FieldValue.serverTimestamp()
            });

            Alert.alert("Başarılı", "Kayıt tamamlandı! Şimdi giriş yapabilirsiniz.");
            navigation.replace("SingIn"); // Kullanıcıyı giriş ekranına yönlendir
        } catch (error: any) {
            Alert.alert("Kayıt Hatası", error.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* 📌 Üst Logo */}
            <Image source={IMAGES.logo} style={styles.logo} />

            <Text style={styles.title}>Hesap Oluştur</Text>

            {/* 📌 Kullanıcı Bilgileri */}
            <TextInput
                style={styles.input}
                placeholder="Adınız"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor={"gray"}
            />
            <TextInput
                style={styles.input}
                placeholder="Soyadınız"
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor={"gray"}
            />
            <TextInput
                style={styles.input}
                placeholder="E-posta"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={"gray"}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={"gray"}
            />

            {/* 📌 Kayıt Ol Butonu */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Kaydediliyor..." : "Kayıt Ol"}</Text>
            </TouchableOpacity>

            {/* 📌 Zaten hesabın var mı? */}
            <TouchableOpacity onPress={() => navigation.navigate("SingIn")}>
                <Text style={styles.signInText}>Zaten bir hesabın var mı? <Text style={styles.signInLink}>Giriş Yap</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.card,
        padding: 20
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: "contain"
    },
    title: {
        ...FONTS.fontSemiBold,
        fontSize: 24,
        marginBottom: 20,
        color: COLORS.title
    },
    input: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#FFF",
        borderColor: "#ddd",
        color: COLORS.title
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        marginVertical: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    signInText: {
        fontSize: 14,
        color: COLORS.title
    },
    signInLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.primary
    },
});

export default SignUpScreen;
