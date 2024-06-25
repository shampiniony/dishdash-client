import { MainHeader, SimpleHeader, UsersHeader } from '@/entities/header';
import { HomePage } from '@/pages/home.page';
import { SwipePage } from '@/pages/swipes.page';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { ToastProvider } from '@/entities/toast/toast-provider';
import { VotingPage } from '@/pages/vote.page';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { ResultPage } from '@/pages/result.page';
import { RootStackParamList } from '@/app/navigation.interface';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'FormaDJRCyrillicText': require('./assets/fonts/FormaDJRCyrillicText.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ToastProvider>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: 'white',
            },
          }}
        >
          <Stack.Navigator
            screenOptions={{
              animationEnabled: false,              
              cardStyle: { backgroundColor: '#fff' }
            }}
          >
            {/* <Stack.Screen
              options={{ header: MainHeader }}
              name='home'
              component={HomePage}
            />
            <Stack.Screen
              options={{ header: SimpleHeader }}
              name='profile'
              component={ProfilePage}
            /> */}
            {/* <Stack.Screen
              options={{ header: UsersHeader }}
              name='lobby'
              component={LobbyPage}
            /> */}
            {/* <Stack.Screen
              options={{ header: UsersHeader }}
              name='swipes'
              component={SwipePage}
            /> */}
            <Stack.Screen
              options={{ header: UsersHeader }}
              name='voting'
              component={VotingPage}
            />
            <Stack.Screen
              options={{ header: UsersHeader }}
              name='result'
              component={ResultPage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
