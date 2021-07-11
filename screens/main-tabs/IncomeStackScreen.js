import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Platform, RefreshControl} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import ProgressChart from 'react-native-chart-kit/dist/ProgressChart';
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Device from 'react-native-paper/src/components/TextInput/TextInputFlat';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const IncomeScreen = () => {

    let today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    let month = monthNames[today.getMonth()];
    let year = today.getFullYear().toString();

    const [refreshing, setRefreshing] = React.useState(false);

    //income text field
    const [income, setIncome] = React.useState({
        value: '',
        isTyped: false,
    });

    //income details
    const [incomeDetails, setIncomeDetails] = React.useState({});

    const [isSalaryClicked, setSalaryClicked] = React.useState(false);
    const [isInterestClicked, setInterestClicked] = React.useState(false);
    const [isOtherClicked, setOtherClicked] = React.useState(false);
    let selected_category = '';

    const [isIncomeDetailViewClicked, setIncomeDetailViewClicked] = React.useState({
        salaryDetailView: false,
        interestDetailView: false,
        otherDetailView: false,
    });

    //component is focused
    const isFocused = useIsFocused();

    const [userName, setUserName] = React.useState('');

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        let name = '';
        //get userName from Async Storage
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('userName');
                if (value !== null) {
                    setUserName(value);
                    name = value;
                }
            } catch (e) {
                console.log(e);
            }
        };
        getData().then(r => {
            //get income details
            getIncomeDetails(name);
        });

    }, [refreshing]);

    //get income details
    function getIncomeDetails(name) {
        fetch('https://coin-boot.herokuapp.com/api/user/income?user_name=' + name + '&month=' + month + '&year=' + year)
            .then(response => response.json())
            .then(json => {
                setIncomeDetails(json);
            })
            .catch((error) => {
                let obj = {
                    salary: 0,
                    interest: 0,
                    other: 0,
                };
                setIncomeDetails(obj);
            });
    }

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
        selected_category = 'salary';
        setIncomeDetailViewClicked({
            salaryDetailView: false,
            interestDetailView: false,
            otherDetailView: false,
        });
    }, [isFocused]);

    const onSalaryClick = () => {
        setSalaryClicked(true);
        setInterestClicked(false);
        setOtherClicked(false);
        setIncomeDetailViewClicked({
            ...isIncomeDetailViewClicked,
            salaryDetailView: false,
            interestDetailView: false,
            otherDetailView: false,
        });
    };

    const onInterestClick = () => {
        setSalaryClicked(false);
        setInterestClicked(true);
        setOtherClicked(false);
        setIncomeDetailViewClicked({
            ...isIncomeDetailViewClicked,
            salaryDetailView: false,
            interestDetailView: false,
            otherDetailView: false,
        });
    };

    const onOtherClick = () => {
        setSalaryClicked(false);
        setInterestClicked(false);
        setOtherClicked(true);
        setIncomeDetailViewClicked({
            ...isIncomeDetailViewClicked,
            salaryDetailView: false,
            interestDetailView: false,
            otherDetailView: false,
        });
    };

    const onSaveClick = () => {
        //check if one of detail view is selected
        if (isIncomeDetailViewClicked.salaryDetailView || isIncomeDetailViewClicked.interestDetailView || isIncomeDetailViewClicked.otherDetailView) {

            let source;
            if (isIncomeDetailViewClicked.salaryDetailView) {
                source = 'salary'
            } else if (isIncomeDetailViewClicked.interestDetailView) {
                source = 'interest'
            } else if (isIncomeDetailViewClicked.otherDetailView) {
                source = 'other'
            }

            let obj = {
                user_name: userName,
                year: year,
                month: month,
                source: source,
                salary: income.value,
                interest: income.value,
                other: income.value
            }

            //save income details
            fetch('https://coin-boot.herokuapp.com/api/user/income/', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            }).then((response) => {
                alert('Data updated!');
                getIncomeDetails(userName);
                setIncomeDetailViewClicked({
                    ...isIncomeDetailViewClicked,
                    salaryDetailView: false,
                    interestDetailView: false,
                    otherDetailView: false,
                });
                setIncome({
                    ...income,
                    value: '',
                    isTyped: false,
                });
                selected_category = 'salary';
            })
                .catch((error) => console.log(error));

        }
        else {
            //check if one of category is selected
            if (isSalaryClicked || isInterestClicked || isOtherClicked) {
                //check if input field is not empty
                if (income.value.length > 0 && income.value.length !== 'undefined') {
                    if (isSalaryClicked) {
                        selected_category = 'salary';
                    } else if (isInterestClicked) {
                        selected_category = 'interest';
                    } else if (isOtherClicked) {
                        selected_category = 'other';
                    }

                    //get details
                    let obj = {
                        user_name: userName,
                        year: year,
                        month: month,
                        details: [
                            {
                                user: [
                                    {
                                        user_name: userName,
                                        details: [
                                            {
                                                year: year,
                                                month: month,
                                                salary: isSalaryClicked ? parseInt(income.value) : 0,
                                                interest: isInterestClicked ? parseInt(income.value) : 0,
                                                other: isOtherClicked ? parseInt(income.value) : 0,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    };

                    //save income details
                    fetch('https://coin-boot.herokuapp.com/api/user/income/', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj),
                    }).then((response) => {
                        alert('Data saved!');
                        getIncomeDetails(userName);
                        setSalaryClicked(false);
                        setInterestClicked(false);
                        setOtherClicked(false);
                        setIncome({
                            ...income,
                            value: '',
                            isTyped: false,
                        });
                        selected_category = 'salary';
                    })
                        .catch((error) => console.log(error));

                } else {
                    alert('Income value is empty');
                }
            } else {
                alert('Select a category');
            }
        }

    };

    const incomeOnTyping = (text) => {
        setIncome({
            ...income,
            value: text,
            isTyped: true,
        });
    };

    const onSalaryViewClick = () => {
        setIncome({
            ...income,
            value: incomeDetails.salary + '',
        });
        setIncomeDetailViewClicked({
            ...isIncomeDetailViewClicked,
            salaryDetailView: true,
            interestDetailView: false,
            otherDetailView: false,
        });
        setSalaryClicked(false);
        setInterestClicked(false);
        setOtherClicked(false);
    };

    const onInterestViewClick = () => {
        setIncome({
            ...income,
            value: incomeDetails.interest + '',
        });
        setIncomeDetailViewClicked({
            ...isIncomeDetailViewClicked,
            salaryDetailView: false,
            interestDetailView: true,
            otherDetailView: false,
        });
        setSalaryClicked(false);
        setInterestClicked(false);
        setOtherClicked(false);
    };

    const onOtherViewClick = () => {
        setIncome({
            ...income,
            value: incomeDetails.other + '',
        });
        setIncomeDetailViewClicked({
            ...isIncomeDetailViewClicked,
            salaryDetailView: false,
            interestDetailView: false,
            otherDetailView: true,
        });
        setSalaryClicked(false);
        setInterestClicked(false);
        setOtherClicked(false);
    };


    // each value represents a goal ring in Progress chart
    let totalIncome = incomeDetails.salary + incomeDetails.interest + incomeDetails.other;

    let salaryPercentage = (incomeDetails.salary / totalIncome) ? (incomeDetails.salary / totalIncome) : 0;
    let interestPercentage = (incomeDetails.interest / totalIncome) ? (incomeDetails.interest / totalIncome) : 0;
    let otherPercentage = (incomeDetails.other / totalIncome) ? (incomeDetails.other / totalIncome) : 0;

    const data = {
        labels: ['Other', 'Interest', 'Salary'], // optional
        data: [otherPercentage, interestPercentage, salaryPercentage],
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
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={style.footerContainer}>
                    <View style={style.incomeTextFieldContainer}>
                        <TextInput onChangeText={text => incomeOnTyping(text)} value={income.value} label='Income'
                                   theme={{colors: {primary: '#384c96'}}} style={style.incomeTextField}
                                   placeholder="Type input"
                                   keyboardType={Device.isAndroid ? "numeric" : "number-pad"}
                        />
                    </View>
                    <View style={style.categoryContainer}>
                        <View style={style.categoryTitleContainer}>
                            <Text style={style.categoryTitle}>Category</Text>
                        </View>
                        <Animatable.View animation='fadeIn' duration={1500} style={style.detailsContainer}>
                            <TouchableOpacity onPress={onSalaryClick}>
                                <View
                                    style={[style.salaryContainer, {backgroundColor: isSalaryClicked ? '#ffffff' : '#63A15F'}]}>
                                    <FontAwesome name='money' size={35}
                                                 color={isSalaryClicked ? '#27231F' : '#ffffff'}/>
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
                                    <AntDesign name='question' size={35}
                                               color={isOtherClicked ? '#27231F' : '#ffffff'}/>
                                    <Text
                                        style={[style.otherTitle, {color: isOtherClicked ? '#27231F' : '#ffffff'}]}>Other</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View style={style.saveButtonContainer} animation='fadeIn' duration={1500}>
                            <TouchableOpacity style={style.saveButton} onPress={() => onSaveClick()}>
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
                        <Animatable.View animation='pulse' duration={1500}
                                         style={style.monthlyIncomeDetailViewContainer}>
                            <TouchableOpacity style={style.salaryDetailView} onPress={onSalaryViewClick}>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#63A15F',
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                }}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Salary</Text>
                                <Text style={{color: 'grey'}}>{incomeDetails.salary}.00</Text>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#63A15F',
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.interestDetailView} onPress={onInterestViewClick}>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#D4B630',
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                }}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Interest</Text>
                                <Text style={{color: 'grey'}}>{incomeDetails.interest}.00</Text>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#D4B630',
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.otherDetailView} onPress={onOtherViewClick}>
                                <View style={{
                                    height: '100%',
                                    width: 40,
                                    backgroundColor: '#BB4440',
                                    borderTopLeftRadius: 15,
                                    borderBottomLeftRadius: 15,
                                }}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Other</Text>
                                <Text style={{color: 'grey'}}>{incomeDetails.other}.00</Text>
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
        /*elevation: 10,*/
        justifyContent: 'center',
        alignItems: 'center',
    },
    incomeTitle: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    footerContainer: {},
    incomeTextFieldContainer: {
        flex: 1,
    },
    incomeTextField: {
        width: width * 0.8,
        top: 5,
        alignSelf: 'center',
        backgroundColor: '#E3E7F1',
    },
    categoryContainer: {
        marginTop: 15,
    },
    categoryTitleContainer: {},
    categoryTitle: {
        color: 'grey',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
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
        /*elevation: 10,*/
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
        /*elevation: 10,*/
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
        /*elevation: 10,*/
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
        /*elevation: 10,*/
        backgroundColor: '#647C90',
    },
    progressChartContainer: {
        height: 150,
    },
    monthlyIncomeDetailViewContainer: {
        width: width,
        height: 210,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    salaryDetailView: {
        width: '60%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25,
    },
    interestDetailView: {
        width: '70%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25,
    },
    otherDetailView: {
        width: '80%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25,
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
