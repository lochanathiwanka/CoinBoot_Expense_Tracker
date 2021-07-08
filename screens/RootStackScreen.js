import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './root-stacks/SplashScreen';
import SignInScreen from './root-stacks/SignInScreen';
import SignUpScreen from './root-stacks/SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
    return (
        <RootStack.Navigator
            headerMode='none'
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <RootStack.Screen name='SplashScreen' component={SplashScreen} />
            <RootStack.Screen name='SignInScreen' component={SignInScreen} />
            <RootStack.Screen name='SignUpScreen' component={SignUpScreen} />
        </RootStack.Navigator>
    );
};

export default RootStackScreen;
