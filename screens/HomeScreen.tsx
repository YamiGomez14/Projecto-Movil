import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';
import * as React from 'react';
import {
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-elements';
import { List, Paragraph, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button, Center, View } from 'native-base';

import ProductScreen from './ProductDetail';
import AppTheme from '../theme';
import ComprasContext from '../context/ComprasContext';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	imageThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
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
export type HomeStackParamList = {
	Home: undefined;
	Product: { id: string };
};
type Props = DrawerScreenProps<HomeStackParamList, 'Home'>;
export type Item = {
	id: number;
	src: string;
	price: number;
	desc: string;
};

export const ItemContext = React.createContext<Item[]>([]);
const itemExamples = [
	{
		id: 1,
		src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
		price: 20,
		desc: 'hola mundo',
	},
	{
		id: 1,
		src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
		price: 20,
		desc: 'hola mundo',
	},
	{
		id: 1,
		src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
		price: 20,
		desc: 'hola mundo',
	},
	{
		id: 1,
		src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
		price: 20,
		desc: 'hola mundo',
	},
	{
		id: 1,
		src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
		price: 20,
		desc: 'hola mundo',
	},
	{
		id: 1,
		src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
		price: 20,
		desc: 'hola mundo',
	},
	{
		id: 1,
		src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
		price: 20,
		desc: 'hola mundo',
	},
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
	// 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/raspberry-pink-velvet-cake-1574437052.jpg?crop=1xw:0.8333333333333334xh;center,top&resize=480:*',
];

function CategoryButton({ name, image }: { name: string; image: string }) {
	return (
		<TouchableOpacity
			onPress={() => {
				Alert.alert('Categoria', name);
			}}
			style={{ flex: 1, height: 140, width: 220 }}
		>
			<View
				style={{
					backgroundColor: AppTheme.colors.primary,
					opacity: 0.9,
					margin: 5,
					justifyContent: 'center',
					borderRadius: 50,
					flex: 1,
				}}
			>
				<Image
					style={{
						flexGrow: 1,
						borderRadius: 50,
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
					}}
					source={{ uri: image }}
				/>
				<Center style={{ flexGrow: 1, maxHeight: 40 }}>
					<Paragraph>{name}</Paragraph>
				</Center>
			</View>
		</TouchableOpacity>
	);
}
function ProductItemComponent({ item }: { item: Item }) {
	const nav = useNavigation<Props['navigation']>();
	const compras = React.useContext(ComprasContext);
	return (
		<TouchableOpacity
			style={{
				flex: 1,
			}}
			onPress={() => {
				nav.navigate('Product', {
					id: item.id.toString(),
				});
			}}
		>
			<Card>
				<Card.Image
					source={{
						uri: item.src,
					}}
				/>
				<Card.Divider />
				<Card.Title>{item.desc}</Card.Title>
				<Card.Title>Precio: {item.price}</Card.Title>
				<Button
					onPress={() => {
						compras.addCompra(item);
					}}
				>
					<Paragraph
						style={{
							flex: 1,
							fontSize: 20,
							alignContent: 'center',
							alignItems: 'center',
							alignSelf: 'center',
						}}
					>
						Agregar al{' '}
						<List.Icon
							icon="cart-outline"
							style={{
								alignSelf: 'center',
								alignContent: 'center',
								alignItems: 'center',
								height: 20,
							}}
						/>
					</Paragraph>
				</Button>
			</Card>
		</TouchableOpacity>
	);
}
type Category = {
	name: string;
	image: string;
};
const categorias: Category[] = [
	{
		name: 'cookies',
		image: 'https://images.squarespace-cdn.com/content/v1/5b049ae0e2ccd1d3e8f8cbca/1622426699929-4E46O214GUI03H0W5Q8G/emandskyecakeco1.jpg',
	},
	{
		name: 'pasteles',
		image: 'https://i.pinimg.com/550x/7d/64/ec/7d64ecbbbc40762347c4490668d5d578.jpg',
	},
	{
		name: 'shots',
		image: 'https://scontent.fhex4-2.fna.fbcdn.net/v/t1.6435-9/66376218_2893620974013968_8852730889084338176_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=9267fe&_nc_eui2=AeHSaitBpV9F2TZJeA1OvyarIyHHefP7baIjIcd58_ttomV48rtlpue0AM5hW0xMNoz5gFojuiztTdpMxicX4oVu&_nc_ohc=yU5bFzPcltYAX8sh_yZ&_nc_ht=scontent.fhex4-2.fna&oh=00_AT-NjO6P_gQC2ryrnghjTG67jn1LcqDbmWmeOCG_KowRnQ&oe=622EF07B',
	},
	{
		name: 'postres',
		image: 'https://i.ytimg.com/vi/2_FUW8y2J1M/maxresdefault.jpg',
	},
];
function HomeScreen({ navigation }: Props) {
	const [searchQuery, onChangeSearch] = React.useState<string>('');
	const items = React.useContext(ItemContext);
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['#fce9e9', '#f4b4b4', '#e6a2a2']}
				style={styles.background}
			/>
			<Searchbar
				placeholder="Search"
				onChangeText={e => onChangeSearch(e as any)}
				value={searchQuery}
				autoComplete={false}
				style={{
					backgroundColor: '#E0E0E0',
				}}
			/>
			<View style={{ flex: 1 }}>
				<View
					style={{
						alignItems: 'center',
					}}
				>
					<FlatList
						data={categorias}
						renderItem={({ item }) => (
							<CategoryButton
								name={item.name}
								image={item.image}
							/>
						)}
						horizontal
						keyExtractor={(item, index) => item.name}
					/>
				</View>

				<FlatList
					data={items}
					renderItem={({ item }) => (
						<ProductItemComponent item={item} />
					)}
					// Setting the number of column
					numColumns={2}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</View>
	);
}
const Stack = createNativeStackNavigator<HomeStackParamList>();
function HomeController() {
	const [items, setItems] = React.useState<Item[]>([]);
	React.useEffect(() => {
		const parsedItems = itemExamples.map((data, i) => {
			return {
				id: data.id,
				src: data.src,
				desc: data.desc,
				price: data.price,
			};
		});
		setItems(parsedItems);
	}, []);
	return (
		<ItemContext.Provider value={items}>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						// backgroundColor: 'yellow',
					},
				}}
			>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Product" component={ProductScreen} />
			</Stack.Navigator>
		</ItemContext.Provider>
	);
}

export default HomeController;
