import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Collect from './collect'
import SignUp from './signup'
import Search from '../components/search'





const Tab = createMaterialTopTabNavigator();


export default class Auth extends Component {
                  constructor(props){
                    super(props)
                  }
  render() {
     const data = this.props.route.params
    return (
       
        <Tab.Navigator>
          <Tab.Screen name="Collect">
             {()=> <Collect data={data}/>}
          </Tab.Screen>
          <Tab.Screen name="SignUp">
             {()=> <SignUp data={data}/>}
          </Tab.Screen>
          <Tab.Screen name="Search" component={Search} />

        </Tab.Navigator>

    );
  }


}

