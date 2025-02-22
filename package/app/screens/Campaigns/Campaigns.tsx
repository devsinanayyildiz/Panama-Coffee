import React, { useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ImageSourcePropType } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { COLORS, FONTS } from '../../constants/theme'

type Campaign = {
    id: string
    title: string
    description: string
    imageUrl: ImageSourcePropType
    validUntil?: string
}

const dummyCampaigns: Campaign[] = [
    {
        id: '1',
        title: 'Hoşgeldiniz',
        description: 'Dijital şubemiz yakında açılıyor! Uye olup kampanyalardan haberdar olabilirsiniz.',
        imageUrl: require('../../assets/images/slider.png'),
        validUntil: '2025-12-31'
    },
    {
        id: '2',
        title: 'Hediye kahve',
        description: 'Mobil uygulamamıza kayıt olan her müşteriye ilk kahvesi ücretsizdir!',
        imageUrl: require('../../assets/images/banner.png'),
        validUntil: '2025-31-06'
    }
]

const Campaigns = ({ navigation }: { navigation: any }) => {
    const { colors } = useTheme()
    const [campaigns] = useState<Campaign[]>(dummyCampaigns)
    const [loading] = useState(false)

    const renderCampaign = ({ item }: { item: Campaign }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate('CampaignDetails', { campaign: item })}
        >
            <Image source={item.imageUrl} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.cardDescription, { color: colors.text }]} numberOfLines={2}>
                    {item.description}
                </Text>
                {item.validUntil && (
                    <Text style={[styles.cardValidity, { color: colors.primary }]}>
                        Valid until: {new Date(item.validUntil).toLocaleDateString()}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={[styles.loadingText, { color: colors.text }]}>Loading campaigns...</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={campaigns}
                keyExtractor={(item) => item.id}
                renderItem={renderCampaign}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    listContent: {
        paddingBottom: 20
    },
    card: {
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 1,
        overflow: 'hidden'
    },
    cardImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover'
    },
    cardContent: {
        padding: 15
    },
    cardTitle: {
        ...FONTS.fontSemiBold,
        fontSize: 18,
        marginBottom: 8
    },
    cardDescription: {
        ...FONTS.fontRegular,
        fontSize: 14,
        marginBottom: 10
    },
    cardValidity: {
        ...FONTS.fontRegular,
        fontSize: 12
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16
    }
})

export default Campaigns
