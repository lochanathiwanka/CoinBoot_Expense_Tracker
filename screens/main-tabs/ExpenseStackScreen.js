import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Platform, RefreshControl} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native'
import ProgressChart from 'react-native-chart-kit/dist/ProgressChart';
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import * as Animatable from 'react-native-animatable';
import {PieChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Device from 'react-native-paper/src/components/TextInput/TextInputFlat';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ExpenseScreen = () => {

    let today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    let month = monthNames[today.getMonth()];
    let year = today.getFullYear().toString();

    const [refreshing, setRefreshing] = React.useState(false);

    const [expense, setExpense] = React.useState({
        value: '',
        isTyped: false
    });

    //expense details
    const [expenseDetails, setExpenseDetails] = React.useState({});

    const [isFoodClicked, setFoodClicked] = React.useState(false);
    const [isTransportClicked, setTransportClicked] = React.useState(false);
    const [isHealthClicked, setHealthClicked] = React.useState(false);
    const [isEducationClicked, setEducationClicked] = React.useState(false);
    const [isElectricityClicked, setElectricityClicked] = React.useState(false);
    const [isWaterClicked, setWaterClicked] = React.useState(false);
    const [isTelephoneClicked, setTelephoneClicked] = React.useState(false);
    const [isHomeClicked, setHomeClicked] = React.useState(false);
    const [isOtherClicked, setOtherClicked] = React.useState(false);
    let selected_category = '';

    const [userName, setUserName] = React.useState('');

    const [isExpenseDetailViewClicked, setExpenseDetailViewClicked] = React.useState({
        foodDetailView: false,
        transportDetailView: false,
        healthDetailView: false,
        educationDetailView: false,
        electricityDetailView: false,
        waterDetailView: false,
        telephoneDetailView: false,
        homeDetailView: false,
        otherDetailView: false,
    });

    //component is focused
    const isFocused = useIsFocused();

    //change categories status
    function changeStatus(list) {
        setFoodClicked(list[0]);
        setTransportClicked(list[1]);
        setHealthClicked(list[2]);
        setEducationClicked(list[3]);
        setElectricityClicked(list[4]);
        setWaterClicked(list[5]);
        setTelephoneClicked(list[6]);
        setHomeClicked(list[7]);
        setOtherClicked(list[8]);
    }

    function resetExpenseDetailViews(value){
        setExpenseDetailViewClicked({
            ...isExpenseDetailViewClicked,
            foodDetailView: value[0],
            transportDetailView: value[1],
            healthDetailView: value[2],
            educationDetailView: value[3],
            electricityDetailView: value[4],
            waterDetailView: value[5],
            telephoneDetailView: value[6],
            homeDetailView: value[7],
            otherDetailView: value[8],
        });
    }

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
            //get expense details
            getExpenseDetails(name);
        });

    }, [refreshing]);

    //get expense details
    function getExpenseDetails(name) {
        fetch('https://coin-boot.herokuapp.com/api/user/expense?user_name=' + name + '&month=' + month + '&year=' + year)
            .then(response => response.json())
            .then(json => {
                setExpenseDetails(json);
            })
            .catch((error) => {
                let obj = {
                    food: 0,
                    transport: 0,
                    health: 0,
                    education: 0,
                    electricity: 0,
                    water: 0,
                    telephone: 0,
                    home: 0,
                    other: 0,
                };
                setExpenseDetails(obj);
            });
    }

    //re render component every time when navigate to it
    useEffect(() => {
        changeStatus([false,false, false, false, false, false, false, false, false]);
        setExpense({
            ...expense,
            value: '',
            isTyped: false
        });
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
        selected_category = 'food';
    }, [isFocused]);

    const onFoodClick = () => {
        changeStatus([true,false, false, false, false, false, false, false, false]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onTransportClick = () => {
        changeStatus([false,true, false, false, false, false, false, false, false]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onHealthClick = () => {
        changeStatus([false,false, true, false, false, false, false, false, false]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onEducationClick = () => {
        changeStatus([false,false, false, true, false, false, false, false, false]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onElectricityClick = () => {
        changeStatus([false,false, false, false, true, false, false, false, false]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onWaterClick = () => {
        changeStatus([false,false, false, false, false, true, false, false, false]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onTelephoneClick = () => {
        changeStatus([false,false, false, false, false, false, true, false, false]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onHomeClick = () => {
        changeStatus([false,false, false, false, false, false, false, true, false]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onOtherClick = () => {
        changeStatus([false,false, false, false, false, false, false, false, true]);
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
    }

    const onSaveClick = () => {
        //check if one of detail view is selected
        if (isExpenseDetailViewClicked.foodDetailView || isExpenseDetailViewClicked.transportDetailView || isExpenseDetailViewClicked.healthDetailView
            || isExpenseDetailViewClicked.educationDetailView || isExpenseDetailViewClicked.electricityDetailView || isExpenseDetailViewClicked.waterDetailView
            || isExpenseDetailViewClicked.telephoneDetailView || isExpenseDetailViewClicked.homeDetailView || isExpenseDetailViewClicked.otherDetailView) {

            let source;
            if (isExpenseDetailViewClicked.foodDetailView) {
                source = 'food'
            } else if (isExpenseDetailViewClicked.transportDetailView) {
                source = 'transport'
            } else if (isExpenseDetailViewClicked.healthDetailView) {
                source = 'health'
            } else if (isExpenseDetailViewClicked.educationDetailView) {
                source = 'education'
            } else if (isExpenseDetailViewClicked.electricityDetailView) {
                source = 'electricity'
            } else if (isExpenseDetailViewClicked.waterDetailView) {
                source = 'water'
            } else if (isExpenseDetailViewClicked.telephoneDetailView) {
                source = 'telephone'
            } else if (isExpenseDetailViewClicked.homeDetailView) {
                source = 'home'
            } else if (isExpenseDetailViewClicked.otherDetailView) {
                source = 'other'
            }

            let obj = {
                user_name: userName,
                year: year,
                month: month,
                source: source,
                food: expense.value,
                transport: expense.value,
                health: expense.value,
                education: expense.value,
                electricity: expense.value,
                water: expense.value,
                telephone: expense.value,
                home: expense.value,
                other: expense.value,
            }

            //save income details
            fetch('https://coin-boot.herokuapp.com/api/user/expense/', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            }).then((response) => {
                alert('Data updated!');
                getExpenseDetails(userName);
                resetExpenseDetailViews([false,false, false, false, false, false, false, false, false]);
                setExpense({
                    ...expense,
                    value: '',
                    isTyped: false,
                });
                selected_category = 'food';
            })
                .catch((error) => console.log(error));

        }
        else {
            //check if one of category is selected
            if (isFoodClicked || isTransportClicked || isHealthClicked || isEducationClicked || isElectricityClicked || isWaterClicked || isTelephoneClicked
                || isHomeClicked || isOtherClicked) {
                //check if input field is not empty
                if (expense.value.length > 0 && expense.value.length !== 'undefined') {
                    if (isFoodClicked) {
                        selected_category = 'food';
                    } else if (isTransportClicked) {
                        selected_category = 'transport';
                    } else if (isHealthClicked) {
                        selected_category = 'health';
                    } else if (isEducationClicked) {
                        selected_category = 'education';
                    } else if (isElectricityClicked) {
                        selected_category = 'electricity';
                    } else if (isWaterClicked) {
                        selected_category = 'water';
                    } else if (isTelephoneClicked) {
                        selected_category = 'telephone';
                    } else if (isHomeClicked) {
                        selected_category = 'home';
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
                                                food: isFoodClicked ? parseInt(expense.value) : 0,
                                                transport: isTransportClicked ? parseInt(expense.value) : 0,
                                                health: isHealthClicked ? parseInt(expense.value) : 0,
                                                education: isEducationClicked ? parseInt(expense.value) : 0,
                                                electricity: isElectricityClicked ? parseInt(expense.value) : 0,
                                                water: isWaterClicked ? parseInt(expense.value) : 0,
                                                telephone: isTelephoneClicked ? parseInt(expense.value) : 0,
                                                home: isHomeClicked ? parseInt(expense.value) : 0,
                                                other: isOtherClicked ? parseInt(expense.value) : 0,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    };

                    //save income details
                    fetch('https://coin-boot.herokuapp.com/api/user/expense/', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj),
                    }).then((response) => {
                        alert('Data saved!');
                        getExpenseDetails(userName);
                        changeStatus([false,false, false, false, false, false, false, false, false]);
                        setExpense({
                            ...expense,
                            value: '',
                            isTyped: false,
                        });
                        selected_category = 'food';
                    })
                        .catch((error) => console.log(error));

                } else {
                    alert('Expense value is empty');
                }
            } else {
                alert('Select a category');
            }
        }
    };

    const expenseOnTyping = (text) => {
        setExpense({
            ...expense,
            value: text,
            isTyped: true
        });
    }

    const onFoodViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.food + '',
        });
        resetExpenseDetailViews([true,false, false, false, false, false, false, false, false]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };

    const onTransportViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.transport + '',
        });
        resetExpenseDetailViews([false,true, false, false, false, false, false, false, false]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };

    const onHealthViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.health + '',
        });
        resetExpenseDetailViews([false,false, true, false, false, false, false, false, false]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };

    const onEducationViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.education + '',
        });
        resetExpenseDetailViews([false,false, false, true, false, false, false, false, false]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };

    const onElectricityViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.electricity + '',
        });
        resetExpenseDetailViews([false,false, false, false, true, false, false, false, false]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };

    const onWaterViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.water + '',
        });
        resetExpenseDetailViews([false,false, false, false, false, true, false, false, false]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };

    const onTelephoneViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.telephone + '',
        });
        resetExpenseDetailViews([false,false, false, false, false, false, true, false, false]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };

    const onHomeViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.home + '',
        });
        resetExpenseDetailViews([false,false, false, false, false, false, false, true, false]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };

    const onOtherViewClick = () => {
        setExpense({
            ...expense,
            value: expenseDetails.other + '',
        });
        resetExpenseDetailViews([false,false, false, false, false, false, false, false, true]);
        changeStatus([false,false, false, false, false, false, false, false, false]);
    };


    // each value represents a goal ring in Progress chart
    const data = [
        {
            name: "Food",
            value: expenseDetails.food ? expenseDetails.food : 0,
            color: "#8155BA",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Transport",
            value: expenseDetails.transport ? expenseDetails.transport : 0,
            color: "#0F7C4F",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Health",
            value: expenseDetails.health ? expenseDetails.health : 0,
            color: "#6482FC",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Education",
            value: expenseDetails.education ? expenseDetails.education : 0,
            color: "#B96350",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Electricity",
            value: expenseDetails.electricity ? expenseDetails.electricity : 0,
            color: "#D95980",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Water",
            value: expenseDetails.water ? expenseDetails.water : 0,
            color: "#3C3431",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Telephone",
            value: expenseDetails.telephone ? expenseDetails.telephone : 0,
            color: "#B7AC44",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Home",
            value: expenseDetails.home ? expenseDetails.home : 0,
            color: "#E1C340",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Other",
            value: expenseDetails.other ? expenseDetails.other : 0,
            color: "#6A8CB8",
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


    return (
        <View style={style.container} >
            <FocusAwareStatusBar backgroundColor='#63A15F' barStyle="light-content"/>
            <View style={style.headerContainer}>
                <Text style={style.expenseTitle}>Expense</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={style.footerContainer}>
                    <View style={style.expenseTextFieldContainer}>
                        <TextInput
                            onChangeText={text => expenseOnTyping(text)}
                            value={expense.value} label='Expense'
                            theme={{ colors: {primary: '#384c96'} }}
                            style={style.expenseTextField}
                            placeholder="Type input"
                            keyboardType={Device.isAndroid ? "numeric" : "number-pad"}
                        />
                    </View>
                    <View style={style.categoryContainer}>
                        <View style={style.categoryTitleContainer}>
                            <Text style={style.categoryTitle}>Category</Text>
                        </View>
                        <Animatable.View animation='fadeIn' duration={1500} style={style.detailsContainer}>
                            <TouchableOpacity onPress={onFoodClick}>
                                <View style={[style.foodContainer, {backgroundColor: isFoodClicked ? '#ffffff' : '#8155BA'}]}>
                                    <FontAwesome5 name='hamburger' size={35} color={ isFoodClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.foodTitle, {color: isFoodClicked ? '#27231F' : '#ffffff'}]}>Food</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onTransportClick}>
                                <View style={[style.transportContainer, {backgroundColor: isTransportClicked ? '#ffffff' : '#0F7C4F'}]}>
                                    <FontAwesome5 name='car' size={35} color={ isTransportClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.transportTitle, {color: isTransportClicked ? '#27231F' : '#ffffff'}]}>Transp</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onHealthClick}>
                                <View style={[style.healthContainer, {backgroundColor: isHealthClicked ? '#ffffff' : '#6482FC'}]}>
                                    <Fontisto name='injection-syringe' size={35} color={ isHealthClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.healthTitle, {color: isHealthClicked ? '#27231F' : '#ffffff'}]}>Health</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onEducationClick}>
                                <View style={[style.educationContainer, {backgroundColor: isEducationClicked ? '#ffffff' : '#B96350'}]}>
                                    <FontAwesome5 name='book-open' size={35} color={ isEducationClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.educationTitle, {color: isEducationClicked ? '#27231F' : '#ffffff'}]}>Edu</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View animation='fadeIn' duration={1500} style={style.detailsContainer}>
                            <TouchableOpacity onPress={onElectricityClick}>
                                <View style={[style.electricityContainer, {backgroundColor: isElectricityClicked ? '#ffffff' : '#D95980'}]}>
                                    <Ionicons name='logo-electron' size={35} color={ isElectricityClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.electricityTitle, {color: isElectricityClicked ? '#27231F' : '#ffffff'}]}>Electric</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onWaterClick}>
                                <View style={[style.waterContainer, {backgroundColor: isWaterClicked ? '#ffffff' : '#3C3431'}]}>
                                    <Ionicons name='water' size={35} color={ isWaterClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.waterTitle, {color: isWaterClicked ? '#27231F' : '#ffffff'}]}>Water</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onTelephoneClick}>
                                <View style={[style.telephoneContainer, {backgroundColor: isTelephoneClicked ? '#ffffff' : '#B7AC44'}]}>
                                    <Entypo name='old-phone' size={35} color={ isTelephoneClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.telephoneTitle, {color: isTelephoneClicked ? '#27231F' : '#ffffff'}]}>Phone</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onHomeClick}>
                                <View style={[style.homeContainer, {backgroundColor: isHomeClicked ? '#ffffff' : '#E1C340'}]}>
                                    <Ionicons name='home' size={35} color={ isHomeClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.homeTitle, {color: isHomeClicked ? '#27231F' : '#ffffff'}]}>Home</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View animation='fadeIn' duration={1500} style={style.detailsContainer}>
                            <TouchableOpacity onPress={onOtherClick}>
                                <View style={[style.otherContainer, {backgroundColor: isOtherClicked ? '#ffffff' : '#6A8CB8'}]}>
                                    <AntDesign name='question' size={35} color={ isOtherClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.otherTitle, {color: isOtherClicked ? '#27231F' : '#ffffff'}]}>Other</Text>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View style={style.saveButtonContainer} animation='fadeIn' duration={1500}>
                            <TouchableOpacity style={style.saveButton} onPress={onSaveClick}>
                                <AntDesign name='plus' color='white' size={20}/>
                            </TouchableOpacity>
                        </Animatable.View>
                        <View style={{flex: 0.1, borderBottomColor: '#B1B1B1', borderBottomWidth: 1, top: 8}}/>
                        <Animatable.View style={style.pieChartContainer} animation='bounceIn' duration={2500}>
                            <PieChart
                                data={data}
                                width={screenWidth}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={"value"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                absolute
                                style={{top: 10}}
                            />
                        </Animatable.View>
                        <View style={{flex: 0.1, borderBottomColor: '#B1B1B1', borderBottomWidth: 1,}}/>
                        <Animatable.View animation='pulse' duration={1500} style={style.monthlyExpenseDetailViewContainer}>
                            <TouchableOpacity style={style.foodDetailView} onPress={onFoodViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#8155BA', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Food</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.food}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#8155BA', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.transportDetailView} onPress={onTransportViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#0F7C4F', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Transport</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.transport}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#0F7C4F', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.healthDetailView} onPress={onHealthViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#6482FC', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Health</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.health}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#6482FC', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.educationDetailView} onPress={onEducationViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#B96350', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Education</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.education}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#B96350', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.electricityDetailView} onPress={onElectricityViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#D95980', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Electricity</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.electricity}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#D95980', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.waterDetailView} onPress={onWaterViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#3C3431', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Water</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.water}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#3C3431', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.telephoneDetailView} onPress={onTelephoneViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#B7AC44', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Telephone</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.telephone}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#B7AC44', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.homeDetailView} onPress={onHomeViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#E1C340', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Home</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.home}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#E1C340', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.otherDetailView} onPress={onOtherViewClick}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#6A8CB8', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Other</Text>
                                <Text style={{color: 'grey'}}>{expenseDetails.other}.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#6A8CB8', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
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
        backgroundColor: '#63A15F',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        /*elevation: 10,*/
        justifyContent: 'center',
        alignItems: 'center',
    },
    expenseTitle: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    footerContainer: {
    },
    expenseTextFieldContainer: {
        flex: 1,
    },
    expenseTextField: {
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
    foodContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        /*elevation: 10,*/
    },
    foodTitle: {
        fontSize: 12,
    },
    transportContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        /*elevation: 10,*/
    },
    transportTitle: {
        fontSize: 12,
    },
    healthContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        /*elevation: 10,*/
    },
    healthTitle: {
        fontSize: 12,
    },
    educationContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        /*elevation: 10,*/
    },
    educationTitle: {
        fontSize: 12,
    },
    electricityContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        /*elevation: 10,*/
    },
    electricityTitle: {
        fontSize: 12,
    },
    waterContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        /*elevation: 10,*/
    },
    waterTitle: {
        fontSize: 12,
    },
    telephoneContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        /*elevation: 10,*/
    },
    telephoneTitle: {
        fontSize: 12,
    },
    homeContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        /*elevation: 10,*/
    },
    homeTitle: {
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
        backgroundColor: '#647C90'
    },
    pieChartContainer: {
        height: 230,
    },
    monthlyExpenseDetailViewContainer: {
        width: width,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    foodDetailView: {
        width: '60%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    transportDetailView: {
        width: '65%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    healthDetailView: {
        width: '70%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    educationDetailView: {
        width: '80%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    electricityDetailView: {
        width: '90%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    waterDetailView: {
        width: '80%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    telephoneDetailView: {
        width: '70%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    homeDetailView: {
        width: '65%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25
    },
    otherDetailView: {
        width: '60%',
        height: 40,
        borderRadius: 15,
        /*elevation: 10,*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF2F3',
        marginTop: 25,
        marginBottom: 25
    },
});

const ExpenseStack = createStackNavigator();

const ExpenseStackScreen = () => (
    <ExpenseStack.Navigator headerMode='none'>
        <ExpenseStack.Screen name='Expense' component={ExpenseScreen}/>
    </ExpenseStack.Navigator>
);

export default ExpenseStackScreen;
