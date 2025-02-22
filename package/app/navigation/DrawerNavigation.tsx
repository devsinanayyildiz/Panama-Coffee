import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import DrawerMenu from '../layout/DrawerMenu';
import Profile from '../screens/Profile/Profile'; // Profile ekranı

const Drawer = createDrawerNavigator();

const DrawerNavigation: React.FC = () => {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Drawer.Navigator
                initialRouteName="BottomNavigation"
                screenOptions={{
                    headerShown: false,
                    drawerType: 'slide',
                    overlayColor: 'transparent',
                }}
                drawerContent={(props) => <DrawerMenu {...props} />}
            >
                <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
                <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator>
        </SafeAreaView>
    );
};

export default DrawerNavigation;
