import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';  // StatusBar'ı doğru import ettik
import { Provider } from 'react-redux';
import Route from './app/navigation/Route';  // Route.tsx'i import ediyoruz
import store from './app/redux/store';  // Redux store'u import ediyoruz

export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();  // Splash ekranını gizle
    }

    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar barStyle="dark-content" />
                    <Provider store={store}>
                        <Route />
                    </Provider>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
}
