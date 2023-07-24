import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Modal,StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { auth, firebase } from '../firebase';
import { onSnapshot, orderBy } from 'firebase/firestore';
import {Color, FontFamily} from '../GlobalStyles'

const Receive = () => {
  const [logInfo, setLogs] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  
  const onPress = () => {
    navigation.navigate('Receive');
    
  };
  const onPress2 = () => {
    navigation.navigate('Logs');
    
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setModalVisible(false);
  };

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
    <View style={styles.container}>
        <StatusBar backgroundColor="#141414" />
      <Text style={styles.title}>Transaction History</Text>
      <View style={styles.receivedButton}>
          <TouchableOpacity style={styles.ButtonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>Received</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.ButtonContainer} onPress={onPress2}>
            <Text style={styles.buttonText}>Sent</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatlistContainer}
          data={logInfo}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.logItem, index === 0 && styles.highlightedLog]}
              onPress={() => openModal(item)}
            >
              <Text key={index}></Text><Text style={styles.pesoText}>Received from {item.SenderEmail}</Text>
              <Text style={styles.pesoMoney} >+₱{item.transactions}</Text>
              <Text style={styles.timestampText}>{item.Timestamp}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}  
        />
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            {selectedTransaction && (
              <View style={styles.transactionModal}>
                <Text style={styles.modalText}>Transaction Details</Text>
                <Text>Transaction: ₱{selectedTransaction.transactions}</Text>
                <Text>Sender: {selectedTransaction.Sender}</Text>
                <Text>Timestamp: {selectedTransaction.Timestamp}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      
    </View>
  );
};

export default Receive;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Color.blackModePrimaryDark,
    justifyContent: "center",
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  title:{
    color: 'white',
    fontFamily: FontFamily.poppinsBold,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 45,
    },
    ButtonContainer: {
      justifyContent: 'space-between',
      backgroundColor: "#7B61FF",
      paddingVertical: 10,
      paddingHorizontal:20,
      borderRadius: 5,
      marginTop: 15,
      
    },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  receivedButton: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    padding: 20,
  },
  listContainer: {
    paddingBottom: 16,
  },
  logItem: {
    backgroundColor: '#483D8B',
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
  image: {
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
    color: 'white',
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  transactionModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: FontFamily.poppinsBold,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#111827',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pesoMoney:{
    color: '#7CFC00',
    alignSelf: 'flex-end',
    fontSize: 20,
  },
  pesoText: {
    color: 'white',
    fontFamily: FontFamily.poppinsMedium,
  },
});

