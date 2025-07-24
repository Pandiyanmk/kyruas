/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { StackNavigation } from '../../Navigations/StackNavigation';
import { Appearance, useColorScheme, AppState, SafeAreaView, StatusBar } from 'react-native';
import { colorScheme } from '../../Values/AppStyles';
import { DrawerNavigation } from '../../Navigations/DrawerNavigation';
import crashlytics from '@react-native-firebase/crashlytics';
import { GestureHandlerRootView, State } from 'react-native-gesture-handler';
import { colors } from '../../Values/AppColores';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../reduxStore/actions/appActions';

// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings

function LaunchScreen(): JSX.Element {

    const [appTheme, setAppTheme] = useState(Appearance.getColorScheme())
    const theme = useSelector(state => state.appState.theme)
    const dispatch = useDispatch();
    console.log("redux theme", theme)

    const handleAppearanceChange = ({ colorScheme }) => {
        console.log('Appearance changed:', colorScheme);
        if (appTheme != colorScheme) {
            console.log("appTheme", colorScheme)
            dispatch(setTheme(colorScheme))
            setAppTheme(colorScheme)
        }
    };

   useEffect(() => {
        const subscription = Appearance.addChangeListener(handleAppearanceChange);
        return () => subscription.remove();
    }, [handleAppearanceChange]);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active') {
                const colorScheme = Appearance.getColorScheme();
                console.log('App returned to foreground, Appearance:', colorScheme);
            }
        };

        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

        return () => appStateSubscription.remove();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.lightBlue }}>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: colors.lightBlue
            }}>
                <StatusBar
                    backgroundColor={colors.lightBlue}
                    barStyle={'dark-content'}
                />
                <NavigationContainer>
                    <StackNavigation />
                </NavigationContainer>


            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
export default LaunchScreen;
