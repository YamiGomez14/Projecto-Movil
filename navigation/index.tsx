import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IndexScreen from '../screens/IndexScreen';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
export const Navigator =()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
      headerShown: false,
      // cardStyle: {
      // backgroundColor: 'white'
      // }
    }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      {/*<Stack.Screen name="ProtectedScreen" component={ProtectedScreen} /> */}
      <Stack.Screen name="IndexScreen" component={IndexScreen} />
      {/*<Stack.Screen name="InfoScreen" component={InfoScreen} />*/}
      
      
    </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;