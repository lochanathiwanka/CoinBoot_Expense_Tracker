import React from 'react';
import {StatusBar, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PieChart} from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable';

//pie chart data
const data = [
    {
        name: "Income",
        value: 100000,
        color: "#44403F",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Expense",
        value: 30000,
        color: "#63A15F",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Revenue",
        value: 70000,
        color: "#CBCDCB",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const HomeScreen = () => {
    return (
        <View style={style.container}>
            <StatusBar backgroundColor='#E3E7F1' barStyle="dark-content"/>
            <Animatable.View style={style.headerContainer} animation='bounceIn' duration={1500}>
                <Image style={style.userImage} source={require('../../assets/user_1.png')}/>
                <Text style={style.fullName}>Lochana Thiwanka</Text>
                <Text style={style.userName}>@Locha321</Text>
                <View style={style.monthlyOverviewContainer}>
                    <View style={style.monthContainer}>
                        <TouchableOpacity>
                            <AntDesign name='left' color='white' size={20} />
                        </TouchableOpacity>
                        <Text style={style.monthName}>July</Text>
                        <TouchableOpacity>
                            <AntDesign name='right' color='white' size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.detailsContainer}>
                        <View style={style.monthlyIncomeContainer}>
                            <Text style={style.incomeValue}>100000</Text>
                            <Text style={style.incomeTitle}>Income</Text>
                        </View>
                        <View style={style.monthlyRevenueContainer}>
                            <Text style={style.revenueValue}>100000</Text>
                            <Text style={style.revenueTitle}>Revenue</Text>
                        </View>
                        <View style={style.monthlyExpenseContainer}>
                            <Text style={style.expenseValue}>100000</Text>
                            <Text style={style.expenseTitle}>Expense</Text>
                        </View>
                    </View>
                </View>
            </Animatable.View>
            <Animatable.View style={style.footerContainer} animation='fadeInUpBig'>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#414754', left: 20}}>Overview</Text>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"value"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
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
        alignItems: 'center'
    },
    headerContainer: {
        backgroundColor: '#ffffff',
        width: 350,
        height: 350,
        marginTop: 10,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#4949a3',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    userImage: {
        alignSelf: 'center',
        top: 20
    },
    fullName: {
        alignSelf: 'center',
        top: 20,
        fontWeight: 'bold',
        fontSize: 20
    },
    userName: {
        alignSelf: 'center',
        top: 20,
        color: 'grey'
    },
    monthlyOverviewContainer: {
        width: '100%',
        height: 173,
        backgroundColor: '#7391C8',
        alignItems: 'center',
        top: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
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
        color: 'white'
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
        color: '#323432'
    },
    incomeTitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: '100'
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
        color: '#323432'
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
        color: '#323432'
    },
    expenseTitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: '100'
    },
    footerContainer: {
        width: width,
        height: 400,
    },
});

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode='none'>
      <HomeStack.Screen name='Home' component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
