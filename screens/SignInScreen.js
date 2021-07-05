import React from 'react';

import {Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable'
import Feather from 'react-native-vector-icons/Feather';

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        showPassword: false
    });

    const showPassword = () => {
        setData({
            ...data,
           showPassword: !data.showPassword
        });
    }

    return (
        <View style={style.container}>
            <View style={style.logoContainer}>
                <View style={style.logoCircle}>
                    <FontAwesome5
                        name='suse'
                        color="black"
                        size={80}
                        style={{color: '#fff'}}
                    />
                </View>
            </View>
            <Animatable.View style={style.formContainer} animation='fadeInUpBig'>
                <View style={style.userNameContainer}>
                    <Text style={style.formLabel}>User Name</Text>
                    <FontAwesome
                        name='user-o'
                        color="black"
                        size={20}
                        style={style.formIcon}
                    />
                    <TextInput
                        placeholder='user123@gmail.com'
                        style={style.formInput}
                    />
                </View>
                <View style={style.passwordContainer}>
                    <Text style={style.formLabel}>Password</Text>
                    <FontAwesome
                        name='lock'
                        color="black"
                        size={20}
                        style={style.formIcon}
                    />
                    <TextInput
                        placeholder='********'
                        style={style.formInput}
                        autoCapitalize='none'
                        secureTextEntry={!data.showPassword}
                    />
                    <TouchableOpacity
                        style={{position:'absolute', top:'50%', right: 30}}
                        onPress={showPassword}
                    >
                        {data.showPassword?
                            <Feather
                                name='eye'
                                color='gray'
                                size={18}
                            /> :
                            <Feather
                                name='eye-off'
                                color='gray'
                                size={18}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.loginButtonContainer}>
                    <LinearGradient colors={['#384c96', '#384c96']} style={style.loginButton}>
                        <Text style={style.loginText}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={{marginBottom: 20, color: 'grey'}}>Or</Text>
                <TouchableOpacity style={style.signUpButtonContainer} onPress={() => {navigation.navigate('SignUpScreen')}}>
                    <LinearGradient colors={['#4C7D60', '#4C7D60']} style={style.signUpButton}>
                        <Text style={style.signUpText}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoCircle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#384c96',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20
    },
    formContainer: {
        flex: 2,
        alignItems: 'center',
    },
    userNameContainer: {
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: width * 0.9,
        marginBottom: 20,
        elevation: 10
    },
    passwordContainer: {
        height: 80,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        width: width * 0.9,
        marginBottom: 20,
        elevation: 10,
    },
    loginButtonContainer: {
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
        width: width * 0.9,
        marginBottom: 20,
        elevation: 20
    },
    signUpButtonContainer: {
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
        width: width * 0.9,
        marginBottom: 20,
        elevation: 20
    },
    formLabel: {
        position: 'absolute',
        left: 30,
        top: 5,
        color: 'grey',
    },
    formIcon: {
        position: 'absolute',
        left: 30,
        top: '50%',
    },
    formInput: {
        position: 'absolute',
        width: '70%',
        bottom: 5,
        alignSelf: 'center',
    },
    loginButton: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        color: '#fff',
        fontSize: 16
    },
    signUpButton: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpText: {
        color: '#fff',
        fontSize: 16
    }
});
