import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import {Reset_Login_State} from '../redux/Auth/login-action';
import {Login_Constants} from '../redux/Auth/login-constant';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const UserInfo = useSelector(state => state.UserInfo);

  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    if (UserInfo.userDetails) {
      setuserDetails(UserInfo.userDetails);
    }
  }, [UserInfo]);

  const handleLogOut = async () => {
    await AsyncStorage.clear();
    dispatch(Reset_Login_State(Login_Constants.RESET_LOGIN_STATE));
    navigation.replace('LoginScreen');
  };
  return (
    <View style={styles.mainContainer}>
      <Text>Email : {userDetails.email}</Text>
      <Text>IP Address : {userDetails.IPAddress}</Text>
      <Text>MAC Address : {userDetails.macAddress}</Text>
      <Text>Device Name : {userDetails.deviceName}</Text>
      <Text>Last Login : {userDetails.lastLogin?.toString()}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogOut} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {alignItems: 'center', justifyContent: 'center', flex: 1},
  buttonContainer: {alignItems: 'center', width: '90%', marginTop: '5%'},
});
