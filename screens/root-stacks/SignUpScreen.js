import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform, ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable'
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {AuthContext} from '../../components/context';
import Device from 'react-native-paper/src/components/TextInput/TextInputFlat';

const SignUpScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        name: '',
        address: '',
        contact: '',
        userName: '',
        password: '',
        showPassword: false
    });

    const showPassword = () => {
        setData({
            ...data,
            showPassword: !data.showPassword
        });
    }

    const {signUp} = React.useContext(AuthContext);

    const nameOnChange = (val) => {
        setData({
            ...data,
            name: val
        });
    }

    const addressOnChange = (val) => {
        setData({
            ...data,
            address: val
        });
    }

    const contactOnChange = (val) => {
        setData({
            ...data,
            contact: val
        });
    }

    const userNameOnChange = (val) => {
        setData({
            ...data,
            userName: val
        });
    }

    const passwordOnChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    return (
        <KeyboardAwareScrollView behavior={Platform.OS === "ios" ? "padding" : null}>
            <ScrollView>
                <Animatable.View style={style.container} animation='fadeInUpBig'>
                    <View style={style.headerContainer}>
                        <Text style={style.title}>Register Now!</Text>
                        <TouchableOpacity style={style.loginButtonContainer} onPress={() => navigation.navigate('SignInScreen')}>
                            <LinearGradient colors={['#384c96', '#384c96']} style={style.loginButton}>
                                <AntDesign
                                    name='left'
                                    color="white"
                                    size={20}
                                />
                                <Text style={style.loginText}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={style.nameContainer}>
                        <Text style={style.formLabel}>Name</Text>
                        <AntDesign name='leftcircleo' color="black" size={20} style={style.formIcon}/>
                        <TextInput placeholder='User' style={style.formInput} onChangeText={(val) => nameOnChange(val)}/>
                    </View>
                    <View style={style.addressContainer}>
                        <Text style={style.formLabel}>Address</Text>
                        <AntDesign name='leftcircleo' color="black" size={20} style={style.formIcon}/>
                        <TextInput placeholder='Sri Lanka, Panadura' style={style.formInput} onChangeText={(val) => addressOnChange(val)}/>
                    </View>
                    <View style={style.contactContainer}>
                        <Text style={style.formLabel}>Contact</Text>
                        <AntDesign name='leftcircleo' color="black" size={20} style={style.formIcon}/>
                        <TextInput placeholder='+94111111111' style={style.formInput} onChangeText={(val) => contactOnChange(val)} keyboardType={Device.isAndroid ? "numeric" : "number-pad"}/>
                    </View>
                    <View style={style.userNameContainer}>
                        <Text style={style.formLabel}>User Name</Text>
                        <AntDesign name='leftcircleo' color="black" size={20} style={style.formIcon}/>
                        <TextInput placeholder='user123@gmail.com' style={style.formInput} onChangeText={(val) => userNameOnChange(val)}/>
                    </View>
                    <View style={style.passwordContainer}>
                        <Text style={style.formLabel}>Password</Text>
                        <FontAwesome name='lock' color="black" size={20} style={style.formIcon}/>
                        <TextInput
                            placeholder='********'
                            style={style.formInput}
                            autoCapitalize='none'
                            secureTextEntry={!data.showPassword}
                            onChangeText={(val) => passwordOnChange(val)}
                        />
                        <TouchableOpacity style={{position:'absolute', top:'50%', right: 30}} onPress={showPassword}>
                            {data.showPassword?
                                <Feather name='eye' color='gray' size={18}/> :
                                <Feather name='eye-off' color='gray' size={18}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={style.signUpButtonContainer} onPress={() => signUp(data)}>
                        <LinearGradient colors={['#4C7D60', '#4C7D60']} style={style.signUpButton}>
                            <Text style={style.signUpText}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default SignUpScreen;

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 30
    },
    headerContainer: {
        height: 200,
        width: width,
        backgroundColor: '#384c96',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'flex-start',
        top: '50%',
        left: 10
    },
    loginButtonContainer: {
        position: 'absolute',
        height: 40,
        top: 20,
        right: 10,
        width: width * 0.25,
    },
    loginButton: {
        position: 'absolute',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        borderRadius: 30,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nameContainer: {
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: width * 0.9,
        marginBottom: 20,
        marginTop: 20,
        elevation: 10
    },
    addressContainer: {
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: width * 0.9,
        marginBottom: 20,
        elevation: 10
    },
    contactContainer: {
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: width * 0.9,
        marginBottom: 20,
        elevation: 10
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
