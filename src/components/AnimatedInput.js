import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';

function AnimatedInput({
  heading,
  isFocus,
  placeholder,
  value,
  onChange,
  ...props
}) {
  const theme = useTheme();
  const styles = useStyle(theme);
  useEffect(() => {
    if (value) {
      animate(1);
    }
    if (value === '' && !isFocused) {
      animate(0);
      setplaceholder(value ? heading : placeholder);
      setIsFocused(false);
    }
  }, [value]);

  const [inputHeight, setHeight] = useState(null);
  const [placeHolder, setplaceholder] = useState(placeholder);
  const [isFocused, setIsFocused] = useState(isFocus);
  const [placeholderWidth, setWidth] = useState(null);

  const animation = useRef(new Animated.Value(0)).current;

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 2],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1],
  });

  const onFocus = () => animate(1);
  const onBlur = () => {
    isFocused && onBlueCall();
  };

  const onBlueCall = () => {
    if (!value) {
      animate(0);
      setplaceholder(value ? heading : placeholder);
      setIsFocused(false);
    }
  };

  const animate = val => {
    setplaceholder(heading);
    setIsFocused(true);
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const isFocusedObj = {
    borderColor: isFocused ? '#D1D100' : '#8C8C8C',
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={[styles.inputContainer, isFocusedObj]}
        onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
        <View style={{height: inputHeight, ...styles.placeholderContainer}}>
          <Animated.Text
            style={[
              styles.placeholder,
              {transform: [{translateY}, {translateX}, {scale}]},
              {},
            ]}
            onTextLayout={e => !placeholderWidth && setWidth(20)}>
            {placeHolder}
          </Animated.Text>
        </View>
        <TextInput
          style={styles.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={({nativeEvent}) => {
            onChange(nativeEvent.text);
          }}
          value={value}
          {...props}
        />
      </View>
    </View>
  );
}

export default AnimatedInput;

const useStyle = theme =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
    inputContainer: {
      borderBottomWidth: 2,
      flex: 1,
    },
    input: {
      color: theme.colors.drawerTextColor,
      fontSize: 14,
      fontWeight: '400',
      height: 40,
    },
    placeholderContainer: {
      position: 'absolute',
      justifyContent: 'center',
    },
    placeholder: {
      position: 'absolute',
      fontSize: 13,
      color: '#8C8C8C',
    },
    mainContainer: {
      flexDirection: 'row',
      width: '100%',
    },
    iconContainer: {
      alignItems: 'center',
      borderWidth: 1,
      borderRightWidth: 0,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      justifyContent: 'center',
      paddingHorizontal: 5,
    },
  });
