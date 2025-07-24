/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxStore/Store';
import LaunchScreen from './Screens/authentication/LaunchScreen';

const App = () => {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <LaunchScreen/>
            </PersistGate>
        </Provider>
    );
}
export default App;
