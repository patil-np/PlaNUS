import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'; 
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import InformationScreen from './screens/InformationScreen';

const Stack = createNativeStackNavigator(); 

function App() {

  //to use external font 
  const [fontsLoaded, setFontsLoaded] = useState(false); 
  
  //function to load fonts 
  const loadFonts = async () => {
    await Font.loadAsync({
      'Ubuntu-Regular': require('./assets/Fonts/Ubuntu/Ubuntu-Regular.ttf'),
      'Ubuntu-Bold': require('./assets/Fonts/Ubuntu/Ubuntu-Bold.ttf'),
      'Ubuntu-Medium': require('./assets/Fonts/Ubuntu/Ubuntu-Medium.ttf')
    });
    setFontsLoaded(true); 
  }; 

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync().catch(() => { });

    // Load fonts and any other async tasks
    loadFonts().then(() => {
      // Hide the splash screen after fonts have been loaded
      SplashScreen.hideAsync().catch(() => { });
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Information" component={InformationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
