import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/index'
import Game from './src/screen/Game'
import Home from './src/screen/Home'
import Finish from './src/screen/Finish'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Game" component={Game}/>
            <Stack.Screen name="Finish" component={Finish}/>
            {/* <View style={styles.container}>
              <Text>SUDOKU</Text>
              <StatusBar style="auto" />
              <Game></Game>
            </View> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
