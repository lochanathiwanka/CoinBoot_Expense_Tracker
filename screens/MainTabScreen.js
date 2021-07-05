import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeStackScreen from './main-tabs/HomeStackScreen';
import IncomeStackScreen from './main-tabs/IncomeStackScreen';
import ExpenseStackScreen from './main-tabs/ExpenseStackScreen';
import {View, StyleSheet, TouchableOpacity, Alert, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{backgroundColor: '#F8F8F8'}}
            tabBarOptions={{
                style: style.tabBar
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused}) => {
                        return <View style={[style.bottomIcon, {backgroundColor: focused ? '#384c96' : '#fff'} ]} >
                            <AntDesign name="home" style={{color: focused ? '#fff' : 'gray'}} size={26}/>
                        </View>
                    },
                }}
            />
            <Tab.Screen
                name="Income"
                component={IncomeStackScreen}
                options={{
                    tabBarLabel: 'Income',
                    tabBarIcon: ({focused}) => {
                        return <View style={[style.bottomIcon, {backgroundColor: focused ? '#384c96' : '#fff'} ]} >
                            <MaterialIcons name="attach-money" style={{color: focused ? '#fff' : 'gray'}} size={26}/>
                        </View>
                    },
                }}
            />
            <Tab.Screen
                name="Expense"
                component={ExpenseStackScreen}
                options={{
                    tabBarLabel: ' Expense',
                    tabBarIcon: ({focused}) => {
                        return <View style={[style.bottomIcon, {backgroundColor: focused ? '#384c96' : '#fff'} ]} >
                            <Entypo name="drop" style={{color: focused ? '#fff' : 'gray'}} size={26}/>
                        </View>
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabScreen;

const style = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
        elevation: 5,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        height: 90,
        shadowColor: '#636262',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        paddingBottom: 10
    },
    bottomIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
