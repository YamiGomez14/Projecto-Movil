import React from 'react';

import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import IndexScreen from '../screens/IndexScreen';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();
export const Navigator = () => {
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
        <Stack.Screen name="IndexScreen" component={IndexScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;