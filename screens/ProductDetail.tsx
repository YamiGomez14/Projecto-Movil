import { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, Center, Heading } from 'native-base';
import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Avatar, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import useSWR from 'swr';
import AppTheme from '../theme';
import { HomeStackParamList, Item, ItemContext } from './HomeScreen';
import Background from '../components/Background';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

function ProductScreen({
	route,
}: DrawerScreenProps<HomeStackParamList, 'Product'>) {
	const items = React.useContext(ItemContext);
	const { data } = useSWR(route.params.id, param => {
		return new Promise<Item>(resolve => {
			setTimeout(() => {
				resolve(items.find(t => t.id.toString() === param)!);
			}, 4000);
		});
	});
	if (!data)
		return (
			<View style={{ flex: 1 }}>
				<Background />

				<Center>
					<Paragraph>Loading...</Paragraph>
				</Center>
			</View>
		);
	return (
		<View style={styles.container}>
			<Background />
			<Center>
				<Avatar.Image
					source={{
						uri: data.src,
					}}
					size={300}
					style={{
						marginHorizontal: -10,
						...Platform.select({
							ios: {
								marginTop: 30,
							},
							android: {
								marginTop: 10,
							},
							default: {
								marginTop: 5,
							},
						}),
					}}
				/>
			</Center>
			<View
				style={[
					styles.container,
					{
						padding: 50,
					},
				]}
			>
				<Heading
					style={[
						{
							fontSize: 32,
						},
						Platform.OS === 'ios' && {
							fontSize: 28,
						},
						Platform.OS === 'android' && {
							fontSize: 32,
						},
					]}
				>
					Pastel Dominicano de Frambrueza {data.id}
				</Heading>
				<Text
					style={{
						fontWeight: '400',
						color: 'gray',
					}}
				>
					${data.price}
				</Text>
				<Paragraph>
					Biscocho dominicano. Pastel tipo Marmol cubierta de
					buttercream de frambrueza y frutos rojos
				</Paragraph>
				<Button background={AppTheme.colors.accent}>Add</Button>
			</View>
		</View>
	);
}

export default ProductScreen;
