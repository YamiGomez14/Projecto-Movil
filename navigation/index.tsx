import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import IndexScreen from '../screens/IndexScreen';
import AppTheme from '../theme';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...AppTheme.colors,
		card: AppTheme.colors.background,
		primary: AppTheme.colors.primary,
		text: AppTheme.colors.text,
		// accent: 'white',
		// backdrop: 'white',
		// background: 'white',
		// border: 'white',
		// disabled: 'white',
		// error: 'white',
		// notification: 'white',
		// onSurface: 'white',
		// placeholder: 'white',
		// surface: 'white',

		// border: AppTheme.colors.accent,
		// primary: 'yellow',
		// background: 'yellow',
		// border: 'red',
		// notification: 'red',
	},
};
const Stack = createStackNavigator();
export const Navigator = () => {
	return (
		<NavigationContainer
			theme={theme}
			linking={{
				prefixes: ['https://localhost:19006', 'mychat://'],
				enabled: true,
			}}
		>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					// cardStyle: {
					// backgroundColor: 'white'
					// }
				}}
			>
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen
					name="RegisterScreen"
					component={RegisterScreen}
				/>
				<Stack.Screen name="IndexScreen" component={IndexScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default Navigator;
