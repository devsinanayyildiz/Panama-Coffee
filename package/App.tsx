import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Route from './app/navigation/Route';  // Route içinde NavigationContainer varsa eklemene gerek yok
import store from './app/redux/store';

export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
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
