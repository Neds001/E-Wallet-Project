import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot, writeBatch, runTransaction, doc, getDocs, setDoc, addDoc, Timestamp } from "firebase/firestore";
import { auth, db, firebase } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


const Dashboard = ({ route, navigation }) => {
  const [balance, setBalance] = useState(5000); // Initial balance
  const [email, setEmail] = useState();
  const [userInfo, setUserInfo] = useState([]);
  const [transactions, setTransactions] = useState();
  const [fullname, setName] = useState();
  const [recipientEmail, setRecipientEmail] = useState();
  const [amount, setAmount] = useState();
  const [recentContacts, setRecentContacts] = useState([]);

  const saveDataToStorage = async (recipientEmail, recentContacts) => {
    try {
      const data = JSON.stringify({ recipientEmail, recentContacts });
      await AsyncStorage.setItem('userData', data);
      console.log('Data saved to AsyncStorage');
    } catch (error) {
      console.log('Error saving data to AsyncStorage:', error);
    }
  };

  const loadDataFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const { recipientEmail, recentContacts } = JSON.parse(data);
        setRecipientEmail(recipientEmail);
        setRecentContacts(recentContacts);
        console.log('Data loaded from AsyncStorage');
      }
    } catch (error) {
      console.log('Error loading data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadDataFromStorage();
  }, []);

  useEffect(() => {
    saveDataToStorage(recipientEmail, recentContacts);
  }, [recipientEmail, recentContacts]);

  const getRecipientUid = async (email) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const recipient = querySnapshot.docs[0];
      return recipient.id;
    }
    throw new Error('Recipient not found');
  };

  const transferFunds = async () => {
    try {
      const recipientUid = await getRecipientUid(recipientEmail);

      const sfDocRef = doc(db, 'users', recipientUid);
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw new Error('Document does not exist!');
        }
        const newWallet = sfDoc.data().wallet + Number(amount);
        transaction.update(sfDocRef, { wallet: newWallet });
      });
      console.log('Transaction successfully committed!: ' + Number(amount) + ' ' + recipientUid);

      const deduct = async () => {
        const user = auth.currentUser.uid;
        if (user) {
          const uid = user;
          try {
            await runTransaction(db, async (transaction) => {
              const userRef = firebase.firestore().collection('users').doc(uid);
              const sf = await transaction.get(userRef);
              if (!sf.exists) {
                throw new Error('Document does not exist!');
              }
              const deductedWallet = sf.data().wallet - Number(amount);
              transaction.update(userRef, {
                wallet: deductedWallet,
              });
              console.log('Wallet updated successfully');
            });
          } catch (error) {
            console.error('Error updating wallet:', error);
          }
        }
      };
      await deduct();

      const user = auth.currentUser.uid;
      if (user) {
        const uid = user;
        const SenderEmail = auth.currentUser.email;
        const newTransactions = async () => {
          await addDoc(collection(db, 'users', uid, 'history', 'DUgVrFDJhas4wAuX07re', 'Sent'), {
            transactions: amount,
            Timestamp: new Date(),
            ReceiverUid: recipientUid,
            ReceiverEmail: recipientEmail,
          });
        };
        await newTransactions();

        const recievedHis = async () => {
          await addDoc(collection(db, 'users', recipientUid, 'history', 'DUgVrFDJhas4wAuX07re', 'Recieved'), {
            transactions: amount,
            Timestamp: new Date(),
            Sender: uid,
            SenderEmail: SenderEmail,
          });
        };
        await recievedHis();

        const updatedContacts = [recipientEmail, ...recentContacts.slice(0, 4)];
        setRecentContacts(updatedContacts);
        saveDataToStorage(recipientEmail, updatedContacts);
      }
    } catch (error) {
      console.error('Error transferring funds:', error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setEmail(user.email);

        const getWallet = async () => {
          const docRef = doc(db, 'users', uid);
          const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              console.log('Document data:', docSnap.data());
              const data = docSnap.data();
              setUserInfo(data);
            } else {
              console.log('No such document!');
            }
          });

          return unsubscribe;
        };

        const unsubscribe = getWallet();

        return () => {
          unsubscribe();
        };
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  const handleTransferFunds = () => {
    setBalance(balance - 100);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ImageBackground source={require('../assets/background1.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Current Balance</Text>
          <View style={styles.currentBalanceContainer}>
            <Text style={styles.amountText}>₱ {userInfo.wallet}</Text>
          </View>
          <View style={styles.recentContactsContainer}>
            <Text style={styles.recentContactsText}>Recent Contacts:</Text>
            <View style={styles.recentContactsRow}></View>
            {recentContacts.map((contact, index) => (
             <TouchableOpacity key={index} onPress={() => setRecipientEmail(contact)}>
             <View style={styles.contactIconContainer}>
               <Ionicons name="person-circle-outline" size={24} color="white" />
               <Text style={styles.recentContactText}>{contact}</Text>
             </View>
           </TouchableOpacity>
            ))}
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Input Recipient's Email: "
          value={recipientEmail}
          onChangeText={setRecipientEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Input Amount: "
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity
          style={styles.transferButton}
          onPress={transferFunds}
        >
          <Text style={styles.transferButtonText}>Send Funds</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  currentBalanceContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  recentContactsContainer: {
    alignItems: 'center',
  },
  recentContactsText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  recentContactText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  transferButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  transferButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentContactsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  
});

export default Dashboard;
