import { DefaultTheme } from 'react-native-paper';

export const AppTheme: typeof DefaultTheme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		text: 'white',
		primary: '#243B47',
		accent: '#E70F66',
		background: '#F3ABAB',
		surface: '#F3F3F3',
	},
};

export default AppTheme;
