/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';




const App = () => {
    return (
        <NavigationContainer>
            <RootStackScreen/>
        </NavigationContainer>
    );
};

export default App;
