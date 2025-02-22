import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

interface Cardstyle4Props {
    id: string;
    image: string | null;
    title: string;
    price: string;
    countnumber?: string;
    onPress: () => void;
}

const Cardstyle4: React.FC<Cardstyle4Props> = ({ id, image, title, price, countnumber, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image 
                source={{ uri: image || "https://via.placeholder.com/150" }} 
                style={styles.image} 
            />
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{price}</Text>
                {countnumber && <Text style={styles.points}>🎯 {countnumber}</Text>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    title: {
        ...FONTS.fontMedium,
        fontSize: 16,
        color: COLORS.title,
    },
    price: {
        ...FONTS.fontSemiBold,
        fontSize: 14,
        color: COLORS.primary,
    },
    points: {
        ...FONTS.fontRegular,
        fontSize: 12,
        color: COLORS.secondary,
    },
});

export default Cardstyle4;
