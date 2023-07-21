import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { auth, firebase } from '../firebase';
import { onSnapshot, orderBy } from 'firebase/firestore';
import {Color, FontFamily} from '../GlobalStyles'

const Notifications = () => {
  const [logInfo, setLogs] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Main');
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
        .collection('notes')
        .doc('messages')
        .collection('receivedMessages')
        .orderBy('Timestamp', 'desc'); // Order the documents by timestamp in descending order
      const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
        const logs = querySnapshot.docs.map((doc) => {
          const { ReceiverUid, Timestamp, transactions, Sender, SenderEmail, Note } = doc.data();
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
            SenderEmail,
            Note
          };
        });
        setLogs(logs);
      
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatlistContainer}
          data={logInfo}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.logItem, index === 0 && styles.highlightedLog]}
              onPress={() => openModal(item)}
            >
              <Text key={index}></Text><Text style={styles.pesoText}>Received from {item.SenderEmail} 
              {item.Note ? `\n Note:\n ${item.Note}` : ''}</Text>
              <Text style={styles.pesoMoney} >+₱{item.transactions}</Text>
              <Text style={styles.timestampText}>{item.Timestamp}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.receivedButton}>
          <TouchableOpacity style={styles.ButtonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>Dashboard</Text>
          </TouchableOpacity>
        </View>
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
                <Text style= {styles.modTrans}>Transaction: ₱{selectedTransaction.transactions}</Text>
                <Text style= {styles.modTrans}>Sender: {selectedTransaction.SenderEmail}</Text>
                <Text style= {styles.modTrans}>Time: {selectedTransaction.Timestamp}</Text>
                <Text style= {styles.modTrans}>Note: {selectedTransaction.Note}</Text>
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

export default Notifications;

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
  ButtonContainer: {
    marginHorizontal: 80,
    backgroundColor: "#cf9502",
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonText: {
    color: Color.gray_700,
    fontSize: 16,
    fontFamily:FontFamily.poppinsMedium,
    textAlign: "center",
  },
  receivedButton: {
    padding: 10,
    marginBottom: 10
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  highlightedLog: {
    backgroundColor: '#a17403',
    borderWidth: 4,
    borderColor: Color.gray_700,
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
    alignSelf:'flex-end',
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
    backgroundColor: '#cf9502',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontFamily: FontFamily.poppinsMedium,

  },
  pesoText:{
    color: "white",
    fontFamily:FontFamily.poppinsMedium,
  },
  pesoMoney:{
    color: '#77b317',
    alignSelf: 'flex-end',
    fontSize: 20,
    },
    modTrans:{
      fontFamily: FontFamily.poppinsMedium,
      fontSize: 13,
    },
});
