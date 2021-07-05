import React from 'react';

import {Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({navigation}) => {
    return (
        <View style={style.container}>
            <StatusBar backgroundColor="#384c96" barStyle="light-content"/>
            <View style={style.header}>
                <Animatable.Image
                    animation='bounceIn'
                    duration={2500}
                    style={style.logo}
                    resizeMode='contain'
                    source={require('../assets/logo.png')}/>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={style.footer}
            >
                <Text style={style.title}>Manage your profit easily!</Text>
                <Text style={style.text}>Sign in with account</Text>
                <View style={style.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                        <LinearGradient
                            colors={['#384c96', '#2d4690']}
                            style={style.signIn}
                        >
                            <Text style={style.textSign}>Get Started</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color='#fff'
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384c96',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: width * 0.28,
        height: height * 0.28,
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        color: 'grey',
        fontSize: 16,
        marginTop: 15,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    },
});
