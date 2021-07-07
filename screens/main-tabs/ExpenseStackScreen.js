import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Platform} from 'react-native';
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

const ExpenseScreen = () => {

    const [expense, setExpense] = React.useState({
        value: '',
        isTyped: false
    });
    const [isFoodClicked, setFoodClicked] = React.useState(false);
    const [isTransportClicked, setTransportClicked] = React.useState(false);
    const [isHealthClicked, setHealthClicked] = React.useState(false);
    const [isEducationClicked, setEducationClicked] = React.useState(false);
    const [isElectricityClicked, setElectricityClicked] = React.useState(false);
    const [isWaterClicked, setWaterClicked] = React.useState(false);
    const [isTelephoneClicked, setTelephoneClicked] = React.useState(false);
    const [isHomeClicked, setHomeClicked] = React.useState(false);
    const [isOtherClicked, setOtherClicked] = React.useState(false);

    //component is focused
    const isFocused = useIsFocused();

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

    //re render component every time when navigate to it
    useEffect(() => {
        changeStatus([false,false, false, false, false, false, false, false, false]);
        setExpense({
            ...expense,
            value: '',
            isTyped: false
        });
    }, [isFocused]);

    const onFoodClick = () => {
        changeStatus([true,false, false, false, false, false, false, false, false]);
    }

    const onTransportClick = () => {
        changeStatus([false,true, false, false, false, false, false, false, false]);
    }

    const onHealthClick = () => {
        changeStatus([false,false, true, false, false, false, false, false, false]);
    }

    const onEducationClick = () => {
        changeStatus([false,false, false, true, false, false, false, false, false]);
    }

    const onElectricityClick = () => {
        changeStatus([false,false, false, false, true, false, false, false, false]);
    }

    const onWaterClick = () => {
        changeStatus([false,false, false, false, false, true, false, false, false]);
    }

    const onTelephoneClick = () => {
        changeStatus([false,false, false, false, false, false, true, false, false]);
    }

    const onHomeClick = () => {
        changeStatus([false,false, false, false, false, false, false, true, false]);
    }

    const onOtherClick = () => {
        changeStatus([false,false, false, false, false, false, false, false, true]);
    }

    const expenseOnTyping = (text) => {
        setExpense({
            ...expense,
            value: text,
            isTyped: true
        });
    }

    // each value represents a goal ring in Progress chart
    const data = [
        {
            name: "Food",
            value: 30000,
            color: "#5E44D0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Transport",
            value: 10000,
            color: "#B68DCA",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Health",
            value: 5000,
            color: "#6482FC",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Education",
            value: 3000,
            color: "#B96350",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Electricity",
            value: 2000,
            color: "#D95980",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Water",
            value: 20000,
            color: "#3C3431",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Telephone",
            value: 15000,
            color: "#F99B45",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Home",
            value: 7500,
            color: "#E1C340",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Other",
            value: 7500,
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
            <ScrollView>
                <View style={style.footerContainer}>
                    <View style={style.expenseTextFieldContainer}>
                        <TextInput onChangeText={text => expenseOnTyping(text)} value={expense.value} label='Expense' theme={{ colors: {primary: '#384c96'} }} style={style.expenseTextField} placeholder="Type input"/>
                    </View>
                    <View style={style.categoryContainer}>
                        <View style={style.categoryTitleContainer}>
                            <Text style={style.categoryTitle}>Category</Text>
                        </View>
                        <Animatable.View animation='fadeIn' duration={1500} style={style.detailsContainer}>
                            <TouchableOpacity onPress={onFoodClick}>
                                <View style={[style.foodContainer, {backgroundColor: isFoodClicked ? '#ffffff' : '#5E44D0'}]}>
                                    <FontAwesome5 name='hamburger' size={35} color={ isFoodClicked ? '#27231F' : '#ffffff'}/>
                                    <Text style={[style.foodTitle, {color: isFoodClicked ? '#27231F' : '#ffffff'}]}>Food</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onTransportClick}>
                                <View style={[style.transportContainer, {backgroundColor: isTransportClicked ? '#ffffff' : '#B68DCA'}]}>
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
                                <View style={[style.telephoneContainer, {backgroundColor: isTelephoneClicked ? '#ffffff' : '#F99B45'}]}>
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
                            <TouchableOpacity style={style.saveButton}>
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
                        <Animatable.View animation='pulse' duration={1500} style={style.monthlyIncomeDetailViewContainer}>
                            <TouchableOpacity style={style.foodDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#5E44D0', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Food</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#5E44D0', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.transportDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#B68DCA', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Transport</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#B68DCA', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.healthDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#6482FC', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Health</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#6482FC', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.educationDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#B96350', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Education</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#B96350', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.electricityDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#D95980', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Electricity</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#D95980', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.waterDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#3C3431', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Water</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#3C3431', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.telephoneDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#F99B45', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Telephone</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#F99B45', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.homeDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#E1C340', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Home</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
                                <View style={{height: '100%', width: 40, backgroundColor: '#E1C340', borderTopRightRadius: 15, borderBottomRightRadius: 15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.otherDetailView}>
                                <View style={{height: '100%', width: 40, backgroundColor: '#6A8CB8', borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}/>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Other</Text>
                                <Text style={{color: 'grey'}}>100000.00</Text>
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
    pieChartContainer: {
        height: 230,
    },
    monthlyIncomeDetailViewContainer: {
        width: width,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    foodDetailView: {
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
    transportDetailView: {
        width: '65%',
        height: 40,
        borderRadius: 15,
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
        elevation: 10,
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
