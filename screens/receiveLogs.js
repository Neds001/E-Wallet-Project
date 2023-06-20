import { View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  ImageBackground } from 'react-native';
import React ,{useState, 
        useEffect } from 'react';
import { auth, 
  firebase } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import { onSnapshot } from 'firebase/firestore'

const ReceiveLogs = () => {
const [logInfo, setLogs] = useState([]);
const navigation = useNavigation()
const onPress = () => {
navigation.navigate("Main")
}
useEffect(() => {
const user = auth.currentUser.uid;
if (user) {
const uid = user;
const todoRef = firebase
 .firestore()
 .collection('users')
 .doc(uid)
 .collection('history')
 .doc('DUgVrFDJhas4wAuX07re')
 .collection('Recieved')
 .orderBy('Timestamp', 'desc'); // Order the documents by timestamp in descending order

const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
 const logs = querySnapshot.docs.map((doc) => {
   const { ReceiverUid, Timestamp, transactions, Sender, SenderEmail } = doc.data();
   let formattedTimestamp = '';
   if (Timestamp && Timestamp.toDate) {
     formattedTimestamp = Timestamp.toDate().toLocaleString();
   }
   return {
     id: doc.id,
     ReceiverUid,
     Timestamp: formattedTimestamp,
     transactions,
     Sender,
     SenderEmail
   };
 });
 setLogs(logs);
 console.log(logs);
});

return () => unsubscribe();
}
}, []);
return (
<View style={{flex: 1,
      justifyContent: "center",
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
      }}>
<ImageBackground source={require('../assets/background1.jpg')} 
                       resizeMode="cover" 
                       style={styles.image}>
<FlatList
 style={styles.flatlistContainer}
 data={logInfo}
 renderItem={({ item, index }) => (
   <View style={[styles.logItem, index === 0 && styles.highlightedLog]}>

     <Text key={index}>
   You just received ₱{item.transactions} from {item.SenderEmail}
     </Text>

     <Text style={styles.timestampText}>{item.Timestamp}</Text>
   </View>
 )}
 keyExtractor={(item) => item.id}
 contentContainerStyle={styles.listContainer}
/>
 <View style={styles.receivedButton}>
   <TouchableOpacity style={styles.ButtonContainer} onPress={onPress}>
     <Text style={styles.buttonText}>Go Back Home</Text>
   </TouchableOpacity>
 </View>
 </ImageBackground>
</View>
);
};

export default ReceiveLogs;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#F5F5F5',
paddingHorizontal: 16,
paddingTop: 16,
},
ButtonContainer:{
marginHorizontal: 80,
backgroundColor: "black",
paddingVertical: 10,
borderRadius: 5,
marginTop: 15,
},
flatlistContainer:{
  padding: 20,
},
buttonText:{
color: "white",
fontSize: 16,
fontWeight: "bold",
textAlign: "center",
},
receivedButton:{
padding: 10,
marginBottom: 10
},
loadingContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
listContainer: {
paddingBottom: 16,
},
logItem: {
backgroundColor: '#FFFFFF',
padding: 16,
marginBottom: 8,
borderRadius: 8,
elevation: 2,
},
highlightedLog: {
backgroundColor: '#FFD700',
borderWidth: 2,
borderColor: '#FFA500',
},
image:{
  flex: 1,
  justifyContent: 'center',
},
logText: {
fontSize: 16,
marginBottom: 8,
fontWeight: 'bold',
},
timestampText: {
fontSize: 12,
color: '#888888',
},
});