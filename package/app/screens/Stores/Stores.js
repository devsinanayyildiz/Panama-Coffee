import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import firestore from "@react-native-firebase/firestore";

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const snapshot = await firestore().collection("stores").get();
                const storeList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setStores(storeList);
            } catch (error) {
                console.error("🚨 Mağazalar çekilemedi:", error);
            }
            setLoading(false);
        };

        fetchStores();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Mağazalar yükleniyor...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: stores[0]?.latitude || 37.7749,
                longitude: stores[0]?.longitude || -122.4194,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}>
                {stores.map(store => (
                    <Marker
                        key={store.id}
                        coordinate={{ latitude: store.latitude, longitude: store.longitude }}
                        title={store.name}
                        description={store.address}
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    map: { flex: 1 }
});

export default Stores;
