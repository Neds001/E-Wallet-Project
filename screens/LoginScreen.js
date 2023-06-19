import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,onAuthStateChanged 
} from "firebase/auth";
import { collection, setDoc, doc, addDoc } from "firebase/firestore";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const onPress = () => {
    navigation.navigate("Registrationpage")
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Main")
      }
    })

    return unsubscribe
  }, [])

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
              wallet: 0
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
            navigation.navigate("Main");
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
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
        }}>
       <ImageBackground source={require('../assets/background1.jpg')} resizeMode="cover" style={styles.image}>
       <View style={styles.logoContainer}>
       <ImageBackground
        style={styles.logo}
        source={require('../assets/blinc.png')}
       />
       </View>
       <View style={styles.logoName}>
       <Text style={styles.logoText}>Bitshares Labs Inc</Text>
       </View>
       
       <Text style={styles.title}>Welcome to C D J N</Text>
    
      <TextInput
        style={styles.input}
        placeholder="Email"
       
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin(email, password)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={{marginTop: 10, textAlign:'center',}}>Already have an account?</Text>
      <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonText}>
              
              <Text style={styles.buttonTextSignUp}>Signup here!</Text>
          </View>
        </TouchableOpacity>

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
  logoContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom:0,
  },  
  logo: {
    width: 250, 
    height: 250, 
    flexDirection: 'column',
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
  title: {
    fontSize: 40,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    fontFamily: 'Roboto'
  },
  image:{
    flex: 1,
    justifyContent: 'center',
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
  button: {
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
  buttonTextSignUp: {
    marginTop: 10,
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: 'underline'
  },
 
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
      backgroundColor: 'royalblue',
    },
    titleText: {
      fontSize: 12,
      color: 'white',
    },
    HeadlineText: {
      fontSize: 12,
      marginBottom: 10,
      color: 'gray'
    },
    regularText: {
      fontSize: 30,
      color: "white",
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
      borderRadius: 20,
      alignContent: 'center',
      flexWrap: 'wrap',
      backgroundColor: 'white'
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 100,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    smallButtonContainer: {
      height: 50,
      width: 50,
      padding: 10,
      marginBottom10: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      alignContent: 'center',
      flexWrap: 'wrap',
      backgroundColor: 'black'
    },
});

export default Login;
