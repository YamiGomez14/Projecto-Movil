import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import {
	extendTheme,
	NativeBaseProvider,
	Theme as NativeThemeType,
} from 'native-base';
import { Button, ThemeProvider } from 'react-native-elements';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AppTheme from './theme';

const NativeBaseTheme: Partial<NativeThemeType['colors']> = {
	primary: {
		50: '#e4f6fc',
		100: '#c9dee7',
		200: '#aac6d4',
		300: '#8bafc2',
		400: '#6b98b0',
		500: '#517f96',
		600: '#3e6275',
		700: '#2b4655',
		800: '#172a35',
		900: '#000f17',
	},
	secondary: {
		50: '#ffe3f2',
		100: '#ffb5d3',
		200: '#f986b4',
		300: '#f55697',
		400: '#f12779',
		500: '#d80e5f',
		600: '#a9074a',
		700: '#7a0335',
		800: '#4b0020',
		900: '#1f000c',
	},
	tertiary: {
		50: '#ffe7e7',
		100: '#f5bcbc',
		200: '#ed9090',
		300: '#e66565',
		400: '#df3b38',
		500: '#c62420',
		600: '#9a1b18',
		700: '#6f1311',
		800: '#430a0a',
		900: '#1a0101',
	},
};

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	const nativeTheme = extendTheme({
		colors: NativeBaseTheme,
	});
	if (!isLoadingComplete) {
		return null;
	}
	return (
		<SafeAreaProvider>
			<ThemeProvider theme={AppTheme.colors}>
				<NativeBaseProvider theme={nativeTheme}>
					<PaperProvider theme={AppTheme}>
						<Navigation />
						<StatusBar />
					</PaperProvider>
				</NativeBaseProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
