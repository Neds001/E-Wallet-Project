import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { auth } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import QRCode from 'react-native-qrcode-svg';
import { Color, FontFamily } from '../GlobalStyles';

const Card = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [contact, setContact] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setQrCodeValue(user.email);
        const uid = user.uid;
        const userRef = doc(db, 'users', uid);
        const unsubscribe = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFullname(data.fullname); // Update the state with the user's fullname
            setContact(data.contact); // Update the state with the user's contact number
          } else {
            console.log('No such document!');
          }
        });
        return () => unsubscribe();
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.qrCodeContainer}>
          {qrCodeValue ? <QRCode value={qrCodeValue} size={150} /> : null}
        </View>
        <View style={styles.detailsContainer}>
          <Image
            style={styles.avatarIcon}
            resizeMode="cover"
            source={require('../assets/avatar.png')}
          />
          <Text style={styles.nameText}>
            Name: {fullname}
          </Text>
          <Text style={styles.contactText}>
            Contact Number: {contact}
          </Text>
          <Text style={styles.emailText}>
            Email: {email}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.blackModePrimaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    height: '50%',
    borderRadius: 30,
    backgroundColor: '#7b61ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeContainer: {
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#e5e5e5',
    borderRadius: 10,
    padding: 10,
  },
  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  contactText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsBold,
    color: 'white',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsBold,
    color: 'white',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsBold,
    color: 'white',
    marginBottom: 10,
  },
});

export default Card;
