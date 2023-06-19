import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity,
         ImageBackground,
         SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { doc,
         onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { Ionicons, AntDesign} from "@expo/vector-icons"
import { onAuthStateChanged, 
         signOut } from "firebase/auth";

const MainDashboard = () => {
  const [userInfo, setUserInfo] = useState([]);
    const navigation = useNavigation()
    
 const sendButton = () =>{
    navigation.navigate("Send")
 }
 const logOutButton = () =>{
  auth
    .signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
}
const ScanQRButton = () => {
  navigation.navigate("ScanQR")
}
const editProfileButton = () => {
  navigation.navigate("EditProfile")
}
const currencyButton = () => {
  navigation.navigate("Currency")
}
const historyLogsButton = () => {
  navigation.navigate("Logs")
}

  const [email, setEmail] = useState();
  const [uids, setUid] = useState();
  const [uid2, setUid2] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUid(uid);
        setEmail(user.email);

        const getWallet = async() => {
          const docRef = doc(db, "users", uid);
          const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              const data = docSnap.data();
              setUserInfo(data);
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
          });

          return unsubscribe; // Cleanup function to unsubscribe from the snapshot
        }
        const unsubscribe = getWallet();

        return () => {
          // Clean up the snapshot subscription when the component unmounts
          unsubscribe();
        };
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <SafeAreaView style={{flex: 1,
      justifyContent: "center",
      }}>
      <ImageBackground source={require('../assets/background1.jpg')} resizeMode="cover" style={styles.image}>
     
      {/*balance tab*/}
      <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', padding: 10}]}>
        <View>
          <Text style={{ fontWeight: 'bold', color: 'white', }}>
            Balance
          </Text>
          <Text style={[styles.regularText, { color: "white" }]}>{userInfo.wallet}</Text>
        </View>
        <TouchableOpacity >
          <Ionicons name="reload-outline" size={15} color="white" />
        </TouchableOpacity>
      </View>
      {/*balance tab*/}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {email}</Text>
      </View>
      <View
        style={{
          borderBottomColor: 'lightgray',
          borderBottomWidth: StyleSheet.hairlineWidth,
          margin: 20,
        }}></View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.mediumButtonContainer} onPress={sendButton}>
          <View style={styles.circleContainer}>
            <View style={[styles.circle, { width: 100, height: 100, }]}>
              <Ionicons name="send" size={30} color="white" />
              <Text style={[styles.titleText, styles.boldText, { color: 'white', marginTop: 5, textAlign: 'center' }]}>Send</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mediumButtonContainer} onPress={editProfileButton}>
          <View style={styles.circleContainer}>
            <View style={[styles.circle, { width: 100, height: 100, }]}>
              <Ionicons name="person-outline" size={30} color="white" />
              <Text style={[styles.titleText, styles.boldText, { color: 'white', marginTop: 5, textAlign: 'center' }]}>Edit Profile</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      

      <View style={styles.buttonsContainer}>
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={logOutButton}>
            <View style={[styles.smallButtonContainer, { width: 100, height: 100 }]}>
              <Ionicons name="log-out-outline" size={45} color="white" />
              <Text style={[styles.titleText, styles.boldText, { color: 'white', marginTop: 5, textAlign: 'center' }]}>Logout</Text>
            </View>
            
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
      

        
      <View style={styles.footbar}>
        <TouchableOpacity style={styles.iconContainer} onPress={currencyButton}>
        <Ionicons name="logo-bitcoin" size={24} color="black" />
          <Text style={styles.iconLabel}>Currency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={ScanQRButton}>
          <Ionicons name="md-qr-code" size={24} color="black" />
          <Text style={styles.iconLabel}>Scan QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={historyLogsButton}>
          <Ionicons name="md-time" size={24} color="black" />
          <Text style={styles.iconLabel}>History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

export default MainDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    height: 120,
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  welcomeText:{
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
   
  },
  welcomeContainer:{
    padding: 10
  },
  image:{
    flex: 1,
    //justifyContent: 'center'
  },
  titleText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  HeadlineText: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
  regularText: {
    fontSize: 30,
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-evenly',
   
  },
  mediumButtonContainer: {
    height: 90,
    width: 90,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 100,
    alignContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,

  },
  smallButtonContainer: {
    height: 50,
    width: 50,
    padding: 10,
    marginBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    alignContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'black',
  },
  boldText: {
    fontWeight: 'bold',
  },
  footbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'lightgray',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 5
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
