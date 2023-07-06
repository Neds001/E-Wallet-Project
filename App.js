import { StyleSheet} from 'react-native';
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
import ReceiveLogs from './screens/ReceiveLogs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options = {{headerShown: false}}name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainDashboard}/>
        <Stack.Screen name="Send" component={SendCash}/>
        <Stack.Screen name="ScanQR" component={ScanQR}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="Currency" component={Currency}/>
        <Stack.Screen name="Registrationpage" component={Registrationpage}/>
        <Stack.Screen name="Logs" component={Logs}/>
        <Stack.Screen name="ReceiveLogs" component={ReceiveLogs}/>
      </Stack.Navigator>
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
