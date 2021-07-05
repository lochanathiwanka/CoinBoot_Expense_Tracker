import React from 'react';
import {StatusBar, Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const IncomeScreen = () => {
    return (
        <View style={style.container}>
            <StatusBar backgroundColor="#E3E7F1" barStyle="dark-content"/>
            <View style={style.headerContainer}>
                <Text style={style.incomeTitle}>Income</Text>
            </View>
            <View style={style.footerContainer}>

            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E7F1',
    },
    headerContainer: {
        flex: .5,
        backgroundColor: '#44403F',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incomeTitle: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    footerContainer: {
        flex: 2,
    }
});


const IncomeStack = createStackNavigator();

const IncomeStackScreen = () => (
    <IncomeStack.Navigator headerMode='none'>
        <IncomeStack.Screen name='Income' component={IncomeScreen}/>
    </IncomeStack.Navigator>
);

export default IncomeStackScreen;
