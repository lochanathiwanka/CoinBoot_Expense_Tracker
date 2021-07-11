import React, {useEffect, useState} from 'react';
import {StatusBar, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PieChart} from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable';
import {useIsFocused} from '@react-navigation/native';
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import {AuthContext} from '../../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {log} from 'react-native-reanimated';

const HomeScreen = () => {

    let today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    let month = monthNames[today.getMonth()];
    let year = today.getFullYear();

    const [user, setUser] = React.useState({});

    const [income, setIncome] = React.useState({});
    const [expense, setExpense] = React.useState({});
    const [revenue, setRevenue] = React.useState({});

    const isFocused = useIsFocused();

    //re render component every time when navigate to it
    useEffect(() => {
        //get userName from Async Storage
        let userName;
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('userName');
                if (value !== null) {
                    userName = value;
                }
            } catch (e) {
                console.log(e);
            }
        };
        getData().then(r => {
            fetch('https://coin-boot.herokuapp.com/api/user/details?user_name=' + userName)
                .then((response) => response.json())
                .then((json) => {
                    setUser(json);

                    //get income details
                    fetch('https://coin-boot.herokuapp.com/api/user/income?user_name=' + userName + '&month=' + month + '&year=' + year)
                        .then(response => response.json())
                        .then(json => {
                            let obj = {
                                value: json.salary + json.interest + json.other,
                            };
                            setIncome(obj);
                        })
                        .catch((error) => {
                            let obj = {
                                value: 0,
                            };
                            setIncome(obj);
                        });

                    //get expense details
                    fetch('https://coin-boot.herokuapp.com/api/user/expense?user_name=' + userName + '&month=' + month + '&year=' + year)
                        .then(response => response.json())
                        .then(json => {
                            let obj = {
                                value: json.food + json.transport + json.health + json.education + json.electricity + json.water + json.telephone + json.home + json.other,
                            };
                            setExpense(obj);
                        })
                        .catch((error) => {
                            let obj = {
                                value: 0,
                            };
                            setExpense(obj);
                        });

                })
                .catch((error) => console.log('User Not Found!'));
        });

    }, [isFocused]);
    //set revenue
    useEffect(async () => {
        setRevenue({
            value: income.value - expense.value
        });
    }, [isFocused]);


    //pie chart data
    const data = [
        {
            name: 'Income',
            value: income.value ? income.value : 0,
            color: '#44403F',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Expense',
            value: expense.value ? expense.value : 0,
            color: '#63A15F',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Revenue',
            value: income.value - expense.value ? income.value - expense.value : 0,
            color: '#CBCDCB',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };

    return (
        <View style={style.container}>
            <FocusAwareStatusBar backgroundColor='#E3E7F1' barStyle="dark-content"/>
            <Animatable.View style={style.headerContainer} animation='bounceIn' duration={1500}>
                <Image style={style.userImage} source={require('../../assets/user_1.png')}/>
                <Text style={style.fullName}>{user.name}</Text>
                <Text style={style.userName}>@{user.user_name}</Text>
                <View style={style.monthlyOverviewContainer}>
                    <View style={style.monthContainer}>
                        <TouchableOpacity>
                            <AntDesign name='left' color='white' size={20}/>
                        </TouchableOpacity>
                        <Text style={style.monthName}>{month}</Text>
                        <TouchableOpacity>
                            <AntDesign name='right' color='white' size={20}/>
                        </TouchableOpacity>
                    </View>
                    <View style={style.detailsContainer}>
                        <View style={style.monthlyIncomeContainer}>
                            <Text style={style.incomeValue}>{income.value ? income.value : 0}</Text>
                            <Text style={style.incomeTitle}>Income</Text>
                        </View>
                        <View style={style.monthlyRevenueContainer}>
                            <Text style={style.revenueValue}>{income.value - expense.value ? income.value - expense.value : 0}</Text>
                            <Text style={style.revenueTitle}>Revenue</Text>
                        </View>
                        <View style={style.monthlyExpenseContainer}>
                            <Text style={style.expenseValue}>{expense.value ? expense.value : 0}</Text>
                            <Text style={style.expenseTitle}>Expense</Text>
                        </View>
                    </View>
                </View>
            </Animatable.View>
            <Animatable.View style={style.footerContainer} animation='fadeInUpBig'>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#414754', left: 20, top: 20}}>Overview</Text>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={'value'}
                    backgroundColor={'transparent'}
                    paddingLeft={'15'}
                    absolute
                    style={{top: 50}}
                />
            </Animatable.View>
        </View>
    );
};

const {width, height} = Dimensions.get('screen');

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E3E7F1',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    headerContainer: {
        backgroundColor: '#ffffff',
        width: 350,
        height: 350,
        marginTop: 10,
        borderRadius: 30,
        /*elevation: 5,
        shadowColor: '#4949a3',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,*/
    },
    userImage: {
        alignSelf: 'center',
        top: 20,
    },
    fullName: {
        alignSelf: 'center',
        top: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    userName: {
        alignSelf: 'center',
        top: 20,
        color: 'grey',
    },
    monthlyOverviewContainer: {
        width: '100%',
        height: 173,
        backgroundColor: '#7391C8',
        alignItems: 'center',
        top: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    monthContainer: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    monthName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    detailsContainer: {
        position: 'absolute',
        width: '100%',
        height: 100,
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    monthlyIncomeContainer: {
        width: 100,
        height: '60%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    incomeValue: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#323432',
    },
    incomeTitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: '100',
    },
    monthlyRevenueContainer: {
        width: 120,
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    revenueValue: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#323432',
    },
    revenueTitle: {
        color: 'white',
        fontSize: 15,
    },
    monthlyExpenseContainer: {
        width: 100,
        height: '60%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    expenseValue: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#323432',
    },
    expenseTitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: '100',
    },
    footerContainer: {
        width: width,
        height: 400,
    },

});

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator headerMode='none'>
        <HomeStack.Screen name='Home' component={HomeScreen}/>
    </HomeStack.Navigator>
);

export default HomeStackScreen;
