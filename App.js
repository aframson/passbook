import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './pages/login';
import Auth from './pages/home';







const Stack = createStackNavigator();

export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Passbook" component={Auth}  />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }


}

