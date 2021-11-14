/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
const RootNavigation = props => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  //Stack
  const Stack = createStackNavigator();

  useEffect(() => {
    CheckingNavigation();
  }, [isLogged]);

  useEffect(() => {}, [isLoader]);

  const CheckingNavigation = () => {
    AsyncStorage.getItem('accessToken').then(value => {
      if (value !== null) {
        setIsLogged(true);
        setIsLoader(true);
      } else {
        setIsLogged(false);
        setIsLoader(true);
      }
    });
  };

  return (
    <>
      {isLoader && (
        <>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isLogged ? 'HomeScreen' : 'LoginScreen'}>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
};

export default RootNavigation;
