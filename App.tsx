import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import { Button, ThemeProvider } from 'react-native-elements';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <NativeBaseProvider>
            <PaperProvider theme={theme}>
              <Navigation />
              <StatusBar />
            </PaperProvider>
          </NativeBaseProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
