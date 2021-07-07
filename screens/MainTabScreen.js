import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeStackScreen from './main-tabs/HomeStackScreen';
import IncomeStackScreen from './main-tabs/IncomeStackScreen';
import ExpenseStackScreen from './main-tabs/ExpenseStackScreen';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{backgroundColor: '#F8F8F8'}}
            tabBarOptions={{
                style: style.tabBar,
                activeTintColor: '#384c96',
                keyboardHidesTabBar: true,
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
                    unmountOnBlur: true,
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
                    unmountOnBlur: true,
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
                    unmountOnBlur: true,
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabScreen;

const style = StyleSheet.create({
    tabBar: {
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: '#E3E7F1',
        height: 75,
        paddingBottom: 5
    },
    bottomIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
