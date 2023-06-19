import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/core'
import { auth, firebase } from '../firebase';
import { onSnapshot} from 'firebase/firestore'


const Logs = () => {
  const [logInfo, setLogs] = useState([]);
  //const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate("receiveLogs")
  }

  useEffect(() => {
    const user = auth.currentUser.uid;
    if (user) {
      const uid = user;
      const todoRef = firebase.firestore().collection("users").doc(uid).collection("history").doc("DUgVrFDJhas4wAuX07re").collection("Sent");
      const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
        const logs = querySnapshot.docs.map((doc) => {
          const { ReceiverUid, Timestamp, transactions, Sender } = doc.data();
          let formattedTimestamp = "";
          if (Timestamp && Timestamp.toDate) {
            formattedTimestamp = Timestamp.toDate().toLocaleString();
          }
          return {
            id: doc.id,
            ReceiverUid,
            Timestamp: formattedTimestamp,
            transactions,
            
          };
        });
        setLogs(logs);
        console.log(logs);
      });

      return () => unsubscribe();
    }
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={logInfo}
        renderItem={({ item, index }) => (
          <View style={[styles.logItem, index === 0 && styles.highlightedLog]}>

            <Text key={index}>
          You have just sent ${item.transactions} to {item.ReceiverUid}
            </Text>

            <Text style={styles.timestampText}>{item.Timestamp}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
        <View style={styles.receivedButton}>
          <TouchableOpacity style={styles.ButtonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>Recieved History</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Logs;

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
