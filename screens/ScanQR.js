import React from 'react';
import { View, 
         TouchableOpacity, 
         Text, 
         StyleSheet, 
         ImageBackground, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ScanQR() {
  const handleLogout = () => {
    console.log('Logout button clicked!');
    // Implement logout logic here
  };

  const handleCardPress = (cardName) => {
    console.log(`Clicked on ${cardName} card!`);
    // Handle the click event for each card
  };

  return (
      <View style={{flex: 1,
        justifyContent: "center",
        }}>
        <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('Card 1')}
          >
            <AntDesign name="profile" size={60} color="white" />
            <Text style={styles.cardText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('Card 2')}
          >
            <Ionicons name="qr-code" size={60} color="white" />
            <Text style={styles.cardText}>My QR Codes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('Card 3')}
          >
            <Ionicons name="ios-settings-outline" size={60} color="white" />
            <Text style={styles.cardText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('Card 4')}
          >
            <Ionicons name="notifications-circle-outline" size={60} color="white" />
            <Text style={styles.cardText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('Card 5')}
          >
            <Ionicons name="ios-chatbubbles" size={60} color="white" />
            <Text style={styles.cardText}>Customer Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('Card 6')}
          >
            <Ionicons name="md-log-out-sharp" size={60} color="white" />
            <Text style={styles.cardText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>
    
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F6',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  balance: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image:{
    flex: 1,
    justifyContent: 'center'
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
});