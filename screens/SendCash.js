import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  query,
  where,
  onSnapshot,
  writeBatch,
  runTransaction,
  doc,
  getDocs,
  setDoc,
  addDoc,
  Timestamp,
  deducttran
} from "firebase/firestore";
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

  // Save data to AsyncStorage
  const saveDataToStorage = async (recipientEmail, recentContacts) => {
    try {
      const data = JSON.stringify({ recipientEmail, recentContacts });
      await AsyncStorage.setItem('userData', data);
      console.log('Data saved to AsyncStorage');
    } catch (error) {
      console.log('Error saving data to AsyncStorage:', error);
    }
  };

  // Load data from AsyncStorage
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
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const recipient = querySnapshot.docs[0];
      return recipient.id;
    }
    throw new Error("Recipient not found");
  };

  const transferFunds = async () => {
    try {
      const recipientUid = await getRecipientUid(recipientEmail);

      const sfDocRef = doc(db, "users", recipientUid);
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        const newWallet = sfDoc.data().wallet + Number(amount);
        transaction.update(sfDocRef, { wallet: newWallet });
      });
      console.log("Transaction successfully committed!: " + Number(amount) + " " + recipientUid);

      const deduct = async () => {
        const user = auth.currentUser.uid;
        if (user) {
          const uid = user;
          try {
            await runTransaction(db, async (transaction) => {
              const userRef = firebase.firestore().collection("users").doc(uid);
              const sf = await transaction.get(userRef);
              if (!sf.exists) {
                throw "Document does not exist!";
              }
              const deductedWallet = sf.data().wallet - Number(amount);
              transaction.update(userRef, {
                wallet: deductedWallet
              });
              console.log("Wallet updated successfully");
            });
          } catch (error) {
            console.error("Error updating wallet:", error);
          }
        }
      };
      deduct();

      const user = auth.currentUser.uid;
      if (user) {
        const uid = user;
        const SenderEmail = auth.currentUser.email
        const newTransactions = async () => {
          await addDoc(collection(db, "users", uid, "history", "DUgVrFDJhas4wAuX07re", "Sent"), {
            transactions: amount,
            Timestamp: new Date(),
            ReceiverUid: recipientUid,
            ReceiverEmail: recipientEmail
          });
        };
        newTransactions();

        const recievedHis = async () => {
          await addDoc(collection(db, "users", recipientUid, "history", "DUgVrFDJhas4wAuX07re", "Recieved"), {
            transactions: amount,
            Timestamp: new Date(),
            Sender: uid,  
            SenderEmail: SenderEmail
          });
        };
        recievedHis();

        // Save recipientEmail to recent contacts
        const updatedContacts = [recipientEmail, ...recentContacts.slice(0, 4)]; // Keep only the most recent 5 contacts
        setRecentContacts(updatedContacts);

        // Save recipientEmail and recent contacts to AsyncStorage
        saveDataToStorage(recipientEmail, updatedContacts);
      }
    } catch (error) {
      console.error("Error transferring funds:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setEmail(user.email);

        const getWallet = async () => {
          const docRef = doc(db, "users", uid);
          const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              const data = docSnap.data();
              setUserInfo(data);
            } else {
              console.log("No such document!");
            }
          });

          return unsubscribe;
        };

        const unsubscribe = getWallet();

        return () => {
          unsubscribe();
        };
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  const handleTransferFunds = () => {
    setBalance(balance - 100);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ImageBackground source={require('../assets/background1.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Current Balance</Text>
          <View style={styles.currentBalanceContainer}>
            <Text style={styles.amountText}>₱ {userInfo.wallet}</Text>
          </View>
          <View style={styles.recentContactsContainer}>
            <Text style={styles.recentContactsText}>Recent Contacts:</Text>
            {recentContacts.map((contact, index) => (
              <Text key={index} style={styles.recentContactText}>{contact}</Text>
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
    justifyContent: "center",
  },
  balanceContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  currentBalanceContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recentContactsContainer: {
    alignItems: "center",
  },
  recentContactsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  recentContactText: {
    fontSize: 14,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  transferButton: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  transferButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Dashboard;