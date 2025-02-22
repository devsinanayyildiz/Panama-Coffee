import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import QRCode from 'react-native-qrcode-svg';
import { ProgressBar } from 'react-native-paper';
import { COLORS, FONTS } from "../../constants/theme";
import FeatherIcon from 'react-native-vector-icons/Feather';

const MAX_POINTS = 15; // 15 Panama Point'te ücretsiz kahve

const Home = ({ navigation }: { navigation: any }) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth().currentUser;
                if (!user) {
                    console.warn("⚠️ Kullanıcı oturum açmamış.");
                    setLoading(false);
                    return;
                }

                console.log("🔍 Kullanıcı ID:", user.uid);
                const userRef = firestore().collection("users").doc(user.uid);
                const docSnapshot = await userRef.get();

                if (docSnapshot.exists) {
                    console.log("✅ Kullanıcı verisi bulundu!");
                    const userData = docSnapshot.data();
                    setCurrentUser(userData);
                    setLoyaltyPoints(userData?.loyaltyPoints || 0);
                } else {
                    console.warn("⚠️ Kullanıcı Firestore'da bulunamadı!");
                }
            } catch (error) {
                console.error("🚨 Kullanıcı verisi çekme hatası:", error);
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text>Veriler yükleniyor...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>

            {/* 🔥 Üst Bar */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.openDrawer()} // 🔥 Menüyü aç
                >
                    <FeatherIcon name="menu" size={28} color={COLORS.title} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ana Sayfa</Text>
                <Image source={{ uri: currentUser?.profilePicture || "https://via.placeholder.com/50" }} style={styles.profileImage} />
            </View>

            {/* 🔥 Hoş Geldin Mesajı */}
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Merhaba, {currentUser?.firstName || "Kullanıcı"}! ☕</Text>
                <Text style={styles.subText}>QR kodunuzu kasada okutarak puan kazanın.</Text>
            </View>

            {/* 🔥 QR Kod */}
            <View style={styles.qrContainer}>
                <QRCode value={currentUser?.id || "Kullanıcı"} size={150} />
                <Text style={styles.qrText}>QR Kodunuzu Kasada Okutun</Text>
            </View>

            {/* 🔥 Panama Point (Sadakat Programı) */}
            <View style={styles.loyaltyContainer}>
                <Text style={styles.pointsText}>Panama Point: {loyaltyPoints} / {MAX_POINTS}</Text>
                <ProgressBar
                    progress={loyaltyPoints / MAX_POINTS}
                    color={COLORS.primary}
                    style={styles.progressBar}
                />
                {loyaltyPoints >= MAX_POINTS && (
                    <Text style={styles.rewardText}>Tebrikler! Ücretsiz kahvenizi almak için kasaya QR kodunuzu okutun.</Text>
                )}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 15 },

    /* 🔥 Üst Bar */
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    menuButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.card, // 🔥 Uygulama temasına uygun renk
        justifyContent: "center",
        alignItems: "center"
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: COLORS.title
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50
    },

    /* 🔥 Hoş Geldin */
    welcomeContainer: {
        alignItems: "center",
        marginVertical: 10
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.title
    },
    subText: {
        fontSize: 16,
        color: COLORS.subtitle
    },

    /* 🔥 QR Kodu */
    qrContainer: {
        alignItems: "center",
        padding: 20,
        backgroundColor: COLORS.card,
        borderRadius: 10,
        marginVertical: 20
    },
    qrText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        color: COLORS.primary
    },

    /* 🔥 Sadakat Puanı */
    loyaltyContainer: {
        padding: 20,
        backgroundColor: COLORS.card,
        borderRadius: 10,
        alignItems: "center"
    },
    pointsText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
        color: COLORS.title
    },
    progressBar: {
        height: 12,
        width: "90%",
        borderRadius: 10,
        backgroundColor: "#ddd"
    },
    rewardText: {
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.primary,
        marginTop: 10
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Home;
