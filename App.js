import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/store/index'
import Home from './src/screen/Home'

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>SUDOKU</Text>
        <StatusBar style="auto" />
        <Home></Home>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
