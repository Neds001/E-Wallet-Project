import React, { useState, 
                useEffect } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         TextInput, 
         Button } from 'react-native';
import { auth, 
         firebase } from '../firebase';
import { doc, 
         getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

const EditProfile = () => {

  const [userInfo, setUserInfo] = useState([]);
  const [email, setEmail] = useState();
  const [uids, setUid] = useState();
  const [fullname, setName] = useState();
  const [contact, setContact] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        setEmail(user.email);

        const getWallet = async () => {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo(data);
          } else {
            console.log("No such document!");
          }
        }
        getWallet();
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  const editProfile = async () => {
    const user = auth.currentUser.uid;
    if (user) {
      const uid = user;
      try {
        const updatedData = {
          fullname: fullname,
          contact: contact
        };

        const userRef = firebase.firestore().collection('users').doc(uid);
        await userRef.update(updatedData);
        alert('Profile updated successfully');
        console.log('Profile updated successfully');
      } catch (error) {
        alert('Error updating profile:', error);
        console.error('Error updating profile:', error);
      }
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userId}>
          Here is your Unique ID: {uids}
        </Text>
        <Text style={styles.balance}>
          Current Balance: {userInfo.wallet}
        </Text>
        <Text style={styles.balance}>
          Full Name: {userInfo.fullname}
        </Text>
        <Text style={styles.balance}>
          Contact number: {userInfo.contact}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Juan DelaCruz"
          value={fullname}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="09xxxxxxxxx"
          value={contact}
          onChangeText={setContact}
        />
        <Button title="Save" onPress={editProfile} />
      </View>
    </View>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F6',
  },
  userInfo: {
    marginBottom: 20,
  },
  userId: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  balance: {
    fontSize: 18,
    textAlign: 'center',
    color: "black",
  },
  formContainer: {
    marginTop: 20,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
