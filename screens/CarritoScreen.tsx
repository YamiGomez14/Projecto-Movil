import faker from '@faker-js/faker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, ScrollView, TextArea } from 'native-base';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
	DataTable,
	Paragraph,
	TextInput,
	ThemeProvider,
	DefaultTheme,
} from 'react-native-paper';
import { Background } from '../components/Background';
import AppTheme from '../theme';

// Uso las props del Login para usar el Navigator
interface Props extends DrawerScreenProps<any, any> {}

export const LoginStyles = StyleSheet.create({});
const compras = [...Array(60)].map((t, i) => ({
	id: i,
	producto: faker.commerce.product(),
	precio: faker.commerce.price(),
}));
const total = compras.reduce((_total, compra) => _total + +compra.precio, 0);

const theme: Partial<typeof DefaultTheme> = {
	...AppTheme,
	colors: { ...AppTheme.colors, text: 'black' },
};
export const CarritoScreen = ({ navigation }: Props) => {
	return (
		<View style={{ flex: 1 }}>
			<ThemeProvider theme={theme as any}>
				<Background />
				<DataTable style={{ flex: 1 }}>
					<DataTable.Header>
						<DataTable.Title>
							<Text style={{ fontSize: 24 }}>Producto</Text>
						</DataTable.Title>
						<DataTable.Title numeric>
							<Text style={{ fontSize: 24 }}>Precio</Text>
						</DataTable.Title>
					</DataTable.Header>
					<ScrollView style={{ flex: 1 }}>
						{compras.map(t => (
							<DataTable.Row key={t.id}>
								<DataTable.Cell>
									<Text style={{ fontSize: 18 }}>
										{t.producto}
									</Text>
								</DataTable.Cell>
								<DataTable.Cell numeric>
									<Text style={{ fontSize: 18 }}>
										{t.precio}
									</Text>
								</DataTable.Cell>
							</DataTable.Row>
						))}
					</ScrollView>
					<DataTable.Header>
						<DataTable.Title>
							{/* <Text style={{ fontSize: 24 }}>Total:</Text> */}
						</DataTable.Title>
						<DataTable.Title numeric>
							<Text style={{ fontSize: 24 }}>Total: {total}</Text>
						</DataTable.Title>
					</DataTable.Header>
				</DataTable>
				<View style={{}}>
					<TextInput
						multiline
						label={
							<Text
								style={{
									fontSize: 24,
								}}
							>
								Especificaciones del pedido
							</Text>
						}
						autoComplete={false}
						style={{
							height: 200,
							fontSize: 18,
						}}
					/>
				</View>
				<Button>Prueba</Button>
			</ThemeProvider>
		</View>
	);
};
