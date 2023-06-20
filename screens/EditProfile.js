import React, { useState, 
                useEffect } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         TextInput, 
         ImageBackground,
         SafeAreaView,
         TouchableOpacity } from 'react-native';
import { auth, 
         firebase } from '../firebase';
import { doc, 
         getDoc,onSnapshot, updateDoc } from 'firebase/firestore';
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

        const userRef = doc(db, "users", uid);
        const unsubscribe = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo(data);
          } else {
            console.log("No such document!");
          }
        });

        return () => unsubscribe();
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
        await updateDoc(userRef, updatedData);
        alert('Profile updated successfully');
        console.log('Profile updated successfully');
      } catch (error) {
        alert('Error updating profile:', error);
        console.error('Error updating profile:', error);
      }
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <ImageBackground
        source={require('../assets/background1.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentContainer}>
          <View style={styles.idContainer}>
            <View style={styles.userInfo}>
              <Text style={styles.userId}>
                Here is your Unique ID: {uids}
              </Text>
            </View>
          </View>

          <Text style={styles.balance}>
            Current Balance: <Text style={{fontWeight: 'bold',}}>${userInfo.wallet}</Text>
          </Text>
          <Text style={styles.balance}>
            Full Name: <Text style={{fontWeight: 'bold',}}>{userInfo.fullname}</Text>
          </Text>
          <Text style={styles.balance}>
            Contact number: <Text style={{fontWeight: 'bold',}}>{userInfo.contact}</Text>
          </Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Juan DelaCruz"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              value={fullname}
              onChangeText={text => setName(text.replace(/[^a-zA-Z ]/g, ''))}
            />
            <TextInput
              style={styles.input}
              placeholder="09xxxxxxxxx"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              value={contact}
              maxLength={11}
              keyboardType="numeric"
               onChangeText={text => setContact(text.replace(/[^0-9]/g, ''))}
            />
            <TouchableOpacity
          style={styles.button}
          onPress={editProfile}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  idContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    flex: 1,
  },
  button:{
    marginHorizontal: 80,
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  balance: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  formContainer: {
    marginTop: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    margin: 10,
    fontFamily: 'Arial',
  },
});