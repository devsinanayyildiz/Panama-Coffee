import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';

const CampaignDetails = ({ route }: { route: any }) => {
    const { campaign } = route.params;
    const { colors } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Image source={campaign.imageUrl} style={styles.image} />
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>{campaign.title}</Text>
                <Text style={[styles.description, { color: colors.text }]}>{campaign.description}</Text>
                {campaign.validUntil && (
                    <Text style={[styles.validity, { color: colors.primary }]}>
                        Valid until: {new Date(campaign.validUntil).toLocaleDateString()}
                    </Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 240,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    title: {
        ...FONTS.fontSemiBold,
        fontSize: 24,
        marginBottom: 15,
    },
    description: {
        ...FONTS.fontRegular,
        fontSize: 16,
        marginBottom: 10,
    },
    validity: {
        ...FONTS.fontRegular,
        fontSize: 14,
    },
});

export default CampaignDetails;
