import { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, Center, Heading } from 'native-base';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import useSWR from 'swr';
import AppTheme from '../theme';
import { HomeStackParamList, Item, ItemContext } from './HomeScreen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
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
				<LinearGradient
					colors={['#fce9e9', '#f4b4b4', '#e6a2a2']}
					style={styles.background}
				/>
				<Center>
					<Paragraph>Loading...</Paragraph>
				</Center>
			</View>
		);
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['#fce9e9', '#f4b4b4', '#e6a2a2']}
				style={styles.background}
			/>
			<Center>
				<Avatar.Image
					source={{
						uri: data.src,
					}}
					size={400}
					style={{
						marginHorizontal: -10,
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
				<Heading>Pastel Dominicano de Frambrueza {data.id}</Heading>
				<Text style={{ fontWeight: '100', color: 'gray' }}>
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
