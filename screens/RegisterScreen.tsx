import React, { useContext, useEffect } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Keyboard,
	Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// import { AuthContext } from '../context/AuthContext';

import { useForm } from '../hooks/useForm';
import { LoginStyles } from './LoginScreen';

interface Props extends NativeStackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {
	/* const { signUp, errorMessage, removeError } = useContext( AuthContext ); */

	//
	const { email, password, name, onChange } = useForm({
		name: '',
		email: '',
		password: '',
	});

	/*    useEffect(() => {
        if( errorMessage.length === 0 ) return;

        Alert.alert( 'Registro incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ]) */

	// Funcion al dar click en el boton de registrar
	const onRegister = () => {
		console.log({ email, password, name });
		Keyboard.dismiss();
		/* signUp({
             nombre: name,
             correo: email,
             password
         }); */
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: '#f3abab' }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={LoginStyles.formContainer}>
				{/* Keyboard avoid view */}
				{/* <WhiteLogo /> */}

				<Text style={LoginStyles.title}>Nueva Cuenta</Text>

				<Text style={LoginStyles.label}>Nombre:</Text>
				<TextInput
					placeholder="Ingrese su nombre:"
					placeholderTextColor="rgba(255,255,255,0.4)"
					underlineColorAndroid="white"
					style={[
						LoginStyles.inputField,
						Platform.OS === 'ios' && LoginStyles.inputFieldIOS,
					]}
					selectionColor="white"
					onChangeText={value => onChange(value, 'name')}
					value={name}
					onSubmitEditing={onRegister}
					autoCapitalize="words"
					autoCorrect={false}
				/>

				<Text style={LoginStyles.label}>Email:</Text>
				<TextInput
					placeholder="Ingrese su email:"
					placeholderTextColor="rgba(255,255,255,0.4)"
					keyboardType="email-address"
					underlineColorAndroid="white"
					style={[
						LoginStyles.inputField,
						Platform.OS === 'ios' && LoginStyles.inputFieldIOS,
					]}
					selectionColor="white"
					onChangeText={value => onChange(value, 'email')}
					value={email}
					onSubmitEditing={onRegister}
					autoCapitalize="none"
					autoCorrect={false}
				/>

				<Text style={LoginStyles.label}>Contraseña:</Text>
				<TextInput
					placeholder="**********"
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
					onSubmitEditing={onRegister}
					autoCapitalize="none"
					autoCorrect={false}
				/>

				{/* Boton login */}
				<View style={LoginStyles.buttonContainer}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={LoginStyles.button}
						onPress={onRegister}
					>
						<Text style={LoginStyles.buttonText}>
							Crear nueva Cuenta
						</Text>
					</TouchableOpacity>
				</View>

				{/* Crear una nueva cuenta */}
				<TouchableOpacity
					onPress={() => navigation.replace('LoginScreen')}
					activeOpacity={0.8}
					style={LoginStyles.buttonReturn}
				>
					<Text style={LoginStyles.buttonText}>Back</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;
