import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
		flex: 1,
	},
});

export const Background = () => {
	return (
		<LinearGradient
			colors={['#fce9e9', '#f4b4b4', '#e6a2a2']}
			style={styles.background}
		/>
	);
};

export default Background;
