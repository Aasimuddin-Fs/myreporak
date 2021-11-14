import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';

import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 800);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F32424'}}>
      <StatusBar backgroundColor="#F32424" />
      <RootNavigation />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
