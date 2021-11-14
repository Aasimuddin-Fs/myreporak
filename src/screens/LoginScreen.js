import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import {
  getDeviceName,
  getMacAddress,
  getIpAddress,
} from 'react-native-device-info';
import BackgroundShade from '../components/BackgroundShade';
import AnimatedInput from '../components/AnimatedInput';
import Button from '../components/Button';
import {Login} from '../services/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import Loader from '../components/Loader';
import {setUserInfo} from '../redux/UserInfo/UserInfo-actions';
import {USER_INFO_CONST} from '../redux/UserInfo/UserInfo-constants.js';

let focused = false;
const {height} = Dimensions.get('screen');
const LoginScreen = () => {
  const [isLoginButtoVisible, setIsLoginButtoVisible] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginApiRes = useSelector(state => state.Auth);

  useEffect(() => {
    headerSlideInDown();
  }, []);

  useEffect(() => {
    if (loginApiRes.GetLoginSuccess) {
      setIsLoaderVisible(false);
      handleNavigation();
    }
    if (loginApiRes.GetLoginFail) {
      setIsLoaderVisible(false);
      alert(loginApiRes?.GetLoginFail?.error?.statusText);
    }
  }, [loginApiRes]);

  const animation = useRef(new Animated.Value(1)).current;
  const InputAnimation = useRef(new Animated.Value(0)).current;

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [80, -200],
  });

  const translateInputY = InputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2000, 100],
  });

  const headerSlideInDown = e => {
    if (focused) return;
    inputSlideIn();
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
      delay: 200,
    }).start();
    setTimeout(() => {
      setIsLoginButtoVisible(true);
    }, 250);
  };

  const headerSlideOutUp = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
      delay: 200,
    }).start();
    headerVisible = true;
  };

  const inputSlideIn = e => {
    if (focused) return;
    Animated.spring(InputAnimation, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
      delay: 200,
    }).start();
  };

  const inputSlideOut = () => {
    setIsLoginButtoVisible(false);
    headerSlideOutUp();
    Animated.spring(InputAnimation, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const handleSubmit = async () => {
    const IPAddress = await getIpAddress();
    const macAddress = await getMacAddress();
    const deviceName = await getDeviceName();
    const platform = Platform.OS;
    if (email && password) {
      setIsLoaderVisible(true);
      // "email": "eve.holt@reqres.in",
      // "password": "cityslicka"
      const reqBody = {
        email: email,
        password: password,
        IPAddress: IPAddress,
        macAddress: macAddress,
        deviceName: deviceName,
        platform: platform,
      };
      dispatch(Login(reqBody));
    }
  };

  const handleNavigation = async () => {
    const IPAddress = await getIpAddress();
    const macAddress = await getMacAddress();
    const deviceName = await getDeviceName();
    const platform = Platform.OS;
    const reqBody = {
      email: email,
      password: password,
      IPAddress: IPAddress,
      macAddress: macAddress,
      deviceName: deviceName,
      platform: platform,
      lastLogin: new Date(),
    };
    dispatch(setUserInfo(USER_INFO_CONST.SET_USER_INFO_SUCCESS, reqBody));
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 500);
  };

  return (
    <>
      <View>
        <BackgroundShade />
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={headerSlideInDown}>
              {!isLoginButtoVisible && (
                <Text style={{color: '#FFFFFF'}}>Back</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[styles.headingTextContainer, {transform: [{translateY}]}]}>
            <Text style={styles.mainHeadingText}>RAKBANK</Text>
            <Text style={styles.subHeadingText}>
              Everything you love about Digital Banking in a smarter, simpler
              design
            </Text>
          </Animated.View>
          {!isLoginButtoVisible && (
            <Animated.View
              style={[
                {alignItems: 'center'},
                {transform: [{translateY: translateInputY}]},
              ]}>
              <View style={styles.animatedInputContainer}>
                <AnimatedInput
                  autoFocus={true}
                  placeholder={'Enter User ID'}
                  heading={'User ID'}
                  value={email}
                  onChange={setEmail}
                />
              </View>
              <View style={styles.animatedInputContainer}>
                <AnimatedInput
                  placeholder={'Enter Password'}
                  heading={'Password'}
                  value={password}
                  secureTextEntry={true}
                  onChange={setPassword}
                />
              </View>
              <View style={{width: '90%'}}>
                <Button
                  title="Submit"
                  disabled={!email || !password}
                  onPress={handleSubmit}
                />
              </View>
            </Animated.View>
          )}
        </View>
        {isLoginButtoVisible && (
          <View style={styles.loginBtnContainer}>
            <Button title={'Login with user ID'} onPress={inputSlideOut} />
            <TouchableOpacity>
              <Text style={styles.quickBalanceText}>Quick Balance</Text>
            </TouchableOpacity>
          </View>
        )}
        <Modal
          visible={isLoaderVisible}
          transparent={true}
          statusBarTranslucent={true}>
          <Loader />
        </Modal>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  animatedInputContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 8,
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    marginBottom: '5%',
  },

  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    marginTop: '2%',
  },
  registerButton: {
    borderWidth: 1,
    backgroundColor: '#F92F3F',
    borderRadius: 15,
    borderColor: 'white',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  registerText: {color: 'white', fontSize: 14},
  headingTextContainer: {
    height: 200,
    backgroundColor: 'transparent',
    width: '100%',
    position: 'absolute',
    elevation: 2,
    padding: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  mainHeadingText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  subHeadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    maxWidth: '70%',
    marginTop: '5%',
  },
  loginBtnContainer: {
    // marginTop: '80%',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.6,
  },
  quickBalanceText: {marginTop: '3%', fontWeight: '700', color: '#383838'},
});
