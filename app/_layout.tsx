import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image, View, StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              header: () => <CustomHeader />,
              statusBarStyle: 'dark',
              statusBarBackgroundColor: 'white',
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>

        <StatusBar style="dark" backgroundColor="#e5e5e5" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

// Custom header component
function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/be-trendy-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 60,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
