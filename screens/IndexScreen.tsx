import * as React from 'react';
import { Button, View, Text } from 'react-native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import { Avatar, IconButton, Drawer, List } from 'react-native-paper';
import { Center } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from './HomeScreen';
import Background from '../components/Background';
import { CarritoScreen } from './CarritoScreen';



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
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<Background />

			<Center>
				<Avatar.Image
					size={150}
					style={{
						marginTop: 10,
					}}
					source={require('../assets/images/logo.png')}
				/>
			</Center>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
				<DrawerItem
					label="Help"
					onPress={() => console.log('https://mywebsite.com/help')}
					icon={({ size }) => (
						<List.Icon
							icon="help"
							style={{
								width: size,
								height: size,
							}}
						/>
					)}
				/>
			</DrawerContentScrollView>
			<View>
				<DrawerItem
					label="Logout"
					onPress={() => console.log('https://mywebsite.com/help')}
					icon={({ size }) => (
						<List.Icon
							icon="exit-to-app"
							style={{
								width: size,
								height: size,
							}}
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}

const DrawerController = createDrawerNavigator();

export default function IndexScreen() {
	return (
		<DrawerController.Navigator
			initialRouteName="Principal"
			drawerContent={props => <DrawerContent {...props} />}
			screenOptions={{
				headerRight: () => <IconButton icon="cart-outline" />,
				drawerLabelStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<DrawerController.Screen
				name="Principal"
				options={{
					drawerIcon: ({ size }) => (
						<List.Icon
							icon="home"
							style={{
								width: size,
								height: size,
							}}
						/>
					),
					headerStyle: {
						// backgroundColor: 'red',
					},
				}}
				component={HomeScreen}
			/>
			<DrawerController.Screen
				name="Car"
				options={{
					drawerIcon: ({ size }) => (
						<List.Icon
							icon="cart-outline"
							style={{
								width: size,
								height: size,
							}}
						/>
					),
				}}
				component={CarritoScreen}
			/>
		</DrawerController.Navigator>
	);
}
