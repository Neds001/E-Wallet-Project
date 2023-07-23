import { StyleSheet} from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainDashboard from './screens/MainDashboard';
import SendCash from './screens/SendCash';
import ScanQR from './screens/ScanQR';
import EditProfile from './screens/EditProfile';
import Currency from './screens/Currency';
import Registrationpage from './screens/Registrationpage';
import Logs from './screens/Logs';
import Receive from './screens/Receive';
import GetStarted from './screens/GetStarted';
import Profile from './screens/Profile';
import Notifications from './screens/Notifications';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './AppContext';




const Stack = createNativeStackNavigator();

export default function App() {
    const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
    const [fontsLoaded, error] = useFonts({
    Poppins_regular: require("./assets/fonts/Poppins_regular.ttf"),
    Poppins_medium: require("./assets/fonts/Poppins_medium.ttf"),
    Poppins_semibold: require("./assets/fonts/Poppins_semibold.ttf"),
    Poppins_bold: require("./assets/fonts/Poppins_bold.ttf"),
    Lato_regular: require("./assets/fonts/Lato_regular.ttf"),
    Lato_semibold: require("./assets/fonts/Lato_semibold.ttf"),
  });
  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider>
    <NavigationContainer>
    <AppProvider>
      {hideSplashScreen ? ( 
      <Stack.Navigator>
        <Stack.Screen options = {{headerShown: false}} name="GetStarted" component={GetStarted} /> 
        <Stack.Screen options = {{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options = {{headerShown: false}} name="Main" component={MainDashboard}/>
        <Stack.Screen options = {{headerShown: false}} name="Send" component={SendCash}/>
        <Stack.Screen options = {{headerShown: false}} name="ScanQR" component={ScanQR}/>
        <Stack.Screen options = {{headerShown: false}} name="EditProfile" component={EditProfile}/>
        <Stack.Screen options = {{headerShown: false}} name="Currency" component={Currency}/>
        <Stack.Screen options = {{headerShown: false}} name="Registrationpage" component={Registrationpage}/>
        <Stack.Screen name="Logs" component={Logs}/>
        <Stack.Screen name="Receive" component={Receive}/>
        <Stack.Screen options = {{headerShown: false}} name="Profile" component={Profile}/>
        <Stack.Screen options = {{headerShown: false}} name="Notifications" component={Notifications}/>
      </Stack.Navigator>
       ) : null}
        </AppProvider>
    </NavigationContainer>
    </SafeAreaProvider>
  );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
