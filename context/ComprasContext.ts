import React from 'react';
import { Item } from '../screens/HomeScreen';

export const ComprasContext = React.createContext<{
	data: Item[];
	addCompra: (item: Item) => void;
}>({} as any);

export default ComprasContext;
