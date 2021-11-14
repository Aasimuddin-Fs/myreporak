import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({onPress, title, disabled, ...rest}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: disabled ? '#8C8C8C' : '#191919'}]}
      disabled={disabled}
      onPress={onPress}
      {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: '2%',
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight:50
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
