import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Image } from 'native-base';
import React from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../components/Background';
import { useForm } from '../hooks/useForm';
import supabase from '../libs/supabase';

// Uso las props del Login para usar el Navigator
interface Props extends NativeStackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
	// Usar el hook para poder utilizar la info
	const { email, password, onChange } = useForm({
		email: '',
		password: '',
	});
	const onLogin = async () => {
		const { data, error } = await supabase
			.from('usuario')
			.select()

		console.log({data,error, email, password });
		Keyboard.dismiss(); // ocultar el teclado
	};

	return (
		<SafeAreaView style={{flex:1}}>
			<Background />

			{/* Keyboard avoid view , controlar el teclado no cambie la info */}

			<KeyboardAvoidingView
				style={{ flex: 1 }}
				// controlar si estamos en ios o android
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<View style={LoginStyles.formContainer}>
					<Center
						style={{
							flex: 1,
							justifyContent: 'center',
							alignContent: 'center',
						}}
					>
						<Image
							style={{
								width: 250,
								height: 250,
								borderRadius: 100000,
								
							}}
							source={require('../assets/images/logo.png')}
						/>
					</Center>
					<Text style={LoginStyles.title}>Login</Text>

					<Text style={LoginStyles.label}>Email:</Text>
					<TextInput
						placeholder="Email:"
						placeholderTextColor="rgba(255,255,255,0.4)"
						keyboardType="email-address"
						underlineColorAndroid="white"
						// To apply custom style for iOS
						style={{ color: 'white' }}
						selectionColor="white"
						onChangeText={value => onChange(value, 'email')}
						value={email} // manejando como se cambia
						onSubmitEditing={onLogin}
						autoCapitalize="none"
						autoCorrect={false}
						autoComplete={false}
					/>

					<Text style={LoginStyles.label}>Password:</Text>
					<TextInput
						placeholder="******"
						placeholderTextColor="rgba(255,255,255,0.4)"
						underlineColorAndroid="white"
						secureTextEntry
						style={[
							LoginStyles.inputField,
							Platform.OS === 'ios' && LoginStyles.inputFieldIOS,
						]}
						selectionColor="white"
						onChangeText={value => onChange(value, 'password')}
						value={password}
						onSubmitEditing={onLogin}
						autoCapitalize="none"
						autoCorrect={false}
						autoComplete={false}
					/>
					{/* Bton login */}
					<View style={LoginStyles.buttonContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={LoginStyles.button}
							onPress={
								/* onLogin */ () =>
									navigation.replace('IndexScreen')
							}
						>
							<Text style={LoginStyles.buttonText}>Ingresar</Text>
						</TouchableOpacity>
					</View>

					{/* New Account */}

					<View style={LoginStyles.newUserContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							// Llamo la otra pantalla
							onPress={() => navigation.replace('RegisterScreen')}
						>
							<Text style={LoginStyles.buttonText}>
								Nueva Cuenta{' '}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
			
		</SafeAreaView>
	);
};

export const LoginStyles = StyleSheet.create({
	formContainer: {
		flex: 1,
		paddingHorizontal: 30,
		justifyContent: 'center',
		height: 600,
		marginBottom: 50,
	},
	title: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 20,
	},
	label: {
		marginTop: 25,
		color: 'white',
		fontWeight: 'bold',
	},
	inputField: {
		color: 'white',
		fontSize: 15,
	},
	inputFieldIOS: {
		borderBottomColor: 'white',
		borderBottomWidth: 2,
		paddingBottom: 4,
	},
	buttonContainer: {
		alignItems: 'center',
		marginTop: 50,
	},
	button: {
		backgroundColor: '#243b47',

		paddingHorizontal: 50,
		paddingVertical: 10,
		borderRadius: 100,
	},
	buttonText: {
		fontSize: 15,
		color: 'white',
	},
	newUserContainer: {
		alignItems: 'flex-end',
		marginTop: 10,
	},
	buttonReturn: {
		position: 'absolute',
		top: 50,
		left: 20,
		borderWidth: 1,
		borderColor: 'white',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 100,
	},
});
