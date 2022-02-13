import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

// import { createNativeStackNavigator as createDrawerNavigator  } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

function NotificationsScreen({ navigation }: any) {
	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Button onPress={() => navigation.goBack()} title="Go back home" />
		</View>
	);
}

const Drawer = createDrawerNavigator();

export default function IndexScreen() {
	return (
		<Drawer.Navigator
			initialRouteName="Main"
			screenOptions={{
				headerRight: () => <IconButton icon="cart-outline" />,
			}}
		>
			<Drawer.Screen
				name="Main"
				options={{
					headerStyle: {
						// backgroundColor: 'red',
					},
				}}
				component={HomeScreen}
			/>
			<Drawer.Screen
				name="Notifications"
				component={NotificationsScreen}
			/>
		</Drawer.Navigator>
	);
}
