import React from 'react';

import {StatusBar, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const ExpenseScreen = () => {
    return (
        <View>
            <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content"/>
            <Text>Expense Screen</Text>
        </View>
    );
};

const ExpenseStack = createStackNavigator();

const ExpenseStackScreen = () => (
    <ExpenseStack.Navigator headerMode='none'>
        <ExpenseStack.Screen name='Expense' component={ExpenseScreen}/>
    </ExpenseStack.Navigator>
);

export default ExpenseStackScreen;
