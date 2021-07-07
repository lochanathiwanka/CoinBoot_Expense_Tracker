import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import ProgressChart from 'react-native-chart-kit/dist/ProgressChart';
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import * as Animatable from 'react-native-animatable';

const IncomeScreen = () => {

    const [income, setIncome] = React.useState({
        value: '',
        isTyped: false,
    });
    const [isSalaryClicked, setSalaryClicked] = React.useState(false);
    const [isInterestClicked, setInterestClicked] = React.useState(false);
    const [isOtherClicked, setOtherClicked] = React.useState(false);

    //component is focused
    const isFocused = useIsFocused();

    //re render component every time when navigate to it
    useEffect(() => {
        setSalaryClicked(false);
        setInterestClicked(false);
        setOtherClicked(false);
        setIncome({
            ...income,
            value: '',
            isTyped: false,
        });
    }, [isFocused]);

    const onSalaryClick = () => {
        setSalaryClicked(true);
        setInterestClicked(false);
        setOtherClicked(false);
    };

    const onInterestClick = () => {
        setSalaryClicked(false);
        setInterestClicked(true);
        setOtherClicked(false);
    };

    const onOtherClick = () => {
        setSalaryClicked(false);
        setInterestClicked(false);
        setOtherClicked(true);
    };

    const incomeOnTyping = (text) => {
        setIncome({
            ...income,
            value: text,
            isTyped: true,
        });
    };

    // each value represents a goal ring in Progress chart
    const data = {
        labels: ['Other', 'Interest', 'Salary'], // optional
        data: [0.4, 0.6, 0.8],
        colors: ['#BB4440', '#D4B630', '#63A15F'],
    };

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#E3E7F1',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional,
    };


    return (
        <View style={style.container}>
            <FocusAwareStatusBar backgroundColor='#44403F' barStyle="light-content"/>
            <View style={style.headerContainer}>
                <Text style={style.incomeTitle}>Income</Text>
            </View>
            <ScrollView>
                <View style={style.footerContainer}>
                    <View style={style.incomeTextFieldContainer}>
                        <TextInput onChangeText={text => incomeOnTyping(text)} value={income.value} label='Income'
                                   theme={{colors: {primary: '#384c96'}}} style={style.incomeTextField}
                                   placeholder="Type input"/>
                    </View>
                    <View style={style.categoryContainer}>
                        <View style={style.categoryTitleContainer}>
                            <Text style={style.categoryTitle}>Category</Text>
                        </View>
                        <Animatable.View animation='fadeIn' duration={1500} style={style.detailsContainer}>
                            <TouchableOpacity onPress={onSalaryClick}>
                                <View
                                    style={[style.salaryContainer, {backgroundColor: isSalaryClicked ? '#ffffff' : '#63A15F'}]}>
                                    <FontAwesome name='money' size={35} color={isSalaryClicked ? '#27231F' : '#ffffff'}/>
                                    <Text
                                        style={[style.salaryTitle, {color: isSalaryClicked ? '#27231F' : '#ffffff'}]}>Salary</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onInterestClick}>
                                <View
                                    style={[style.interestContainer, {backgroundColor: isInterestClicked ? '#ffffff' : '#D4B630'}]}>
                                    <MaterialCommunityIcons name='bank-outline' size={35}
                                                            color={isInterestClicked ? '#27231F' : '#ffffff'}/>
                                    <Text
                                        style={[style.interestTitle, {color: isInterestClicked ? '#27231F' : '#ffffff'}]}>Interest</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onOtherClick}>
                                <View
                                    style={[style.otherContainer, {backgroundColor: isOtherClicked ? '#ffffff' : '#BB4440'}]}>
                                    <AntDesign name='question' size={35} color={isOtherClicked ? '#27231F' : '#ffffff'}/>
                                    <Text
                                        style={[style.otherTitle, {color: isOtherClicked ? '#27231F' : '#ffffff'}]}>Other</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View style={style.saveButtonContainer} animation='fadeIn' duration={1500}>
                            <TouchableOpacity style={style.saveButton}>
                                <AntDesign name='plus' color='white' size={20}/>
                            </TouchableOpacity>
                        </Animatable.View>
                        <View style={{flex: 0.1, borderBottomColor: '#B1B1B1', borderBottomWidth: 1, top: 8}}/>
                        <Animatable.View style={style.progressChartContainer} animation='bounceIn' duration={2500}>
                            <ProgressChart
                                data={data}
                                width={screenWidth * 0.8}
                                height={130}
                                strokeWidth={8}
                                radius={32}
                                chartConfig={chartConfig}
                                hideLegend={false}
                                withCustomBarColorFromData={true}
                                style={{top: 10}}
                            />
                        </Animatable.View>
                        <View style={{flex: 0.1, borderBottomColor: '#B1B1B1', borderBottomWidth: 1}}/>
                        <Animatable.View animation='pulse' duration={1500} style={style.monthlyIncomeDetailViewContainer}>
                            <TouchableOpacity style={style.salaryDetailView}>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#63A15F',
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                }}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Salary</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#63A15F',
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.interestDetailView}>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#D4B630',
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                }}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Income</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#D4B630',
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.otherDetailView}>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#BB4440',
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                }}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Other</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#BB4440',
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}/>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const {width, height} = Dimensions.get('screen');

const style = StyleSheet.create({
    container: {
        flex: 1,
        /*height: height * 0.9,*/
        backgroundColor: '#E3E7F1',
    },
    headerContainer: {
        height: height * 0.18,
        backgroundColor: '#44403F',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    incomeTitle: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    footerContainer: {
    },
    incomeTextFieldContainer: {
        flex: 1,
    },
    incomeTextField: {
        width: width * 0.8,
        top: 5,
        alignSelf: 'center',
        backgroundColor: '#E3E7F1'
    },
    categoryContainer: {
        marginTop: 15,
    },
    categoryTitleContainer: {
    },
    categoryTitle: {
        color: 'grey',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 25,

    },
    salaryContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 10,
    },
    salaryTitle: {
        fontSize: 12,
    },
    interestContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 10,
    },
    interestTitle: {
        fontSize: 12,
    },
    otherContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 10,
    },
    otherTitle: {
        fontSize: 12,
    },
    saveButtonContainer: {
        height: 55,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    saveButton: {
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        backgroundColor: '#647C90'
    },
    progressChartContainer: {
        height: 150
    },
    monthlyIncomeDetailViewContainer: {
        width: width,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    salaryDetailView: {
        width: '60%',
        height: 40,
        borderRadius: 15,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    interestDetailView: {
        width: '70%',
        height: 40,
        borderRadius: 15,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    otherDetailView: {
        width: '80%',
        height: 40,
        borderRadius: 15,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
});


const IncomeStack = createStackNavigator();

const IncomeStackScreen = () => (
    <IncomeStack.Navigator headerMode='none'>
        <IncomeStack.Screen
            name='Income'
            component={IncomeScreen}
        />
    </IncomeStack.Navigator>
);

export default IncomeStackScreen;
