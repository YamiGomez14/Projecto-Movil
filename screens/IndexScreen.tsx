import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

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
function DrawerContent(props: any) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem
				label="Help"
				onPress={() => console.log('https://mywebsite.com/help')}
			/>
		</DrawerContentScrollView>
	)
}

const Drawer = createDrawerNavigator();

export default function IndexScreen() {
	return (


		<Drawer.Navigator
			initialRouteName="Principal"
			drawerContent={props=> <DrawerContent {...props}/>}
			screenOptions={{
				headerRight: () => <IconButton icon="cart-outline" />,
			}}
		>

			<Drawer.Screen
				name="Principal"
				options={{
					headerStyle: {
						// backgroundColor: 'red',
					},
				}}
				component={HomeScreen}
			/>
			<Drawer.Screen
				name="Car"
				component={NotificationsScreen}
			/>
		</Drawer.Navigator>
	);
}
