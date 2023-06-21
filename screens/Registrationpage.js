import React, { useState } from "react";
import {
         View,
         Text,
         TextInput,
         StyleSheet,
         TouchableOpacity,
         ImageBackground, } from "react-native";
import { auth, 
         db } from "../firebase";
import {
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { setDoc, 
         doc } from "firebase/firestore";

const Registrationpage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");

  const onPress = () => {
    navigation.navigate("Login")
  }

  const createNewUser = async (email) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid  = user.uid;
        console.log(uid);
        try {
          const newUser = async() =>{
            await setDoc(doc(db, "users", uid), {
              email: email,
              wallet: 0,
              fullname:fullname,
              contact: contact
            });
          }
          newUser();
        }catch (err){
          console.error(err);
        }
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
     
  };

  const handleRegister = (e, p) => {
    // Implement your login logic here
    createUserWithEmailAndPassword(auth, e, p)
      .then(() => {
        createNewUser(e)
          .then(() => {
            alert("Registration Successful!");
            console.log("Registration Successful!")
            navigation.navigate("Login");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
    // You can replace the console.log statements with your actual login implementation
  };
  const handleLogin = (e, p) => {
    // Implement your login logic here
    signInWithEmailAndPassword(auth, e, p)
      .then(() => {
        navigation.navigate("Main", {
          email: e,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
    // You can replace the console.log statements with your actual login implementation
  };
  return (
    <View style={{flex: 1,
                  justifyContent: "center",
                  flexDirection: 'column' }}>
      <ImageBackground 
        source={require('../assets/background1.jpg')} 
        resizeMode="cover" 
        style={styles.image}>
      
      {/* logo cointainer */}
      <View style={styles.logoContainer}>
       <ImageBackground
          style={styles.logo}
          source={require('../assets/logoReg.png')}/>
       </View>

      <Text style={styles.title}>Register Your Account Here</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={fullname}
          onChangeText={setFullname}
          
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={contact}
          onChangeText={setContact}
          
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRegister(email, password)}>
          <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={{paddingBottom: 10}}>
        <Text style={{marginTop: 10, textAlign:'center',}}>Already have an account?</Text>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonText}>
              <Text style={styles.buttonTextLogin}>Login here!</Text>
            </View>
          </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    fontFamily: 'Roboto'
  },
  image:{
    flex: 1,
    justifyContent: 'center'
  },
  logoContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom:0,
  },  
  logo: {
    width: 250, 
    height: 250, 
    //flexDirection: 'column',
  },
  logoName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  logoText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
    opacity: 0.6,
   
  },
  input: {
    height: 30,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    margin: 10,
    fontFamily: 'Roboto',
    padding: 5,
    backgroundColor: 'white'
  },
  button: {
    marginHorizontal: 80,
    backgroundColor: "#111827",
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
  buttonTextLogin: {
    marginTop: 10,
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: 'underline'
  },
});

export default Registrationpage;
