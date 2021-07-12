/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';
import MainTabScreen from './screens/MainTabScreen';
import {ActivityIndicator, View} from 'react-native';
import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {log} from 'react-native-reanimated';

const App = () => {

    const initialState = {
        isLoading: true,
        userName: null
    }

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    isLoading: false
                }
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    isLoading: false
                }
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    isLoading: false
                }
            case 'OPTION':
                return {
                    ...prevState,
                    userName: null,
                    isLoading: false
                }
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialState);

    const userAuthorize = React.useMemo(() => ({
        signIn: async (userName, password) => {
            if (userName.length > 0 && password.length) {
                let name = null;
                fetch('https://coin-boot.herokuapp.com/api/user?user_name='+userName+'&password='+password)
                    .then((response) => response.json())
                    .then((json) => {
                        name = json.user_name
                        dispatch({type: 'LOGIN', id: name});
                    })
                    .catch((error) => {
                        alert('User Not Found!');
                        dispatch({type: 'OPTION'});
                        const removeValue = async () => {
                            try {
                                await AsyncStorage.removeItem('userName');
                            } catch(e) {
                                console.log(e);
                            }
                        }
                        removeValue();
                    });

                try {
                    await AsyncStorage.setItem('userName', userName);
                } catch (e) {
                    console.log(e);
                }
            } else {
                alert('User Name & Password is empty!');
            }
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userName');
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGOUT'});
        },
        signUp: async (data) => {

            if (data.name && data.address && data.contact && data.userName && data.password) {
                fetch('https://coin-boot.herokuapp.com/api/user', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'  },
                    body: JSON.stringify({
                        name: data.name,
                        address: data.address,
                        contact: data.contact,
                        user_name: data.userName,
                        password: data.password
                    })
                })
                    .then((response) =>  dispatch({type: 'REGISTER', id: data.userName}))
                    .catch((error) => console.error(error));

                try {
                    await AsyncStorage.setItem('userName', data.userName);
                } catch (e) {
                    console.log(e);
                }
            } else {
                alert('All fields should be filled!');
            }
        }
    }), []);

    useEffect(() => {
       setTimeout(async () => {
           let userName = null;
           try {
               userName = await AsyncStorage.getItem('userName');
           } catch (e) {
               console.log(e);
           }
           dispatch({type: 'LOGIN', id: userName});
       }, 1000)
    }, []);

    if (loginState.isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color='grey' size='large'/>
            </View>
        )
    }

    return (
        <AuthContext.Provider value={userAuthorize} >
            <NavigationContainer>
                { loginState.userName !== null ? <MainTabScreen/> : <RootStackScreen/> }
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default App;
