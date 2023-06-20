

import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import MaterialButtonGrey from "../components/MaterialButtonGrey";

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
    <View style={styles.container}>
      <TextInput placeholder="Log In" style={styles.textInput}></TextInput>
      <MaterialRightIconTextbox
        style={styles.materialRightIconTextbox}
      ></MaterialRightIconTextbox>
      <MaterialUnderlineTextbox
        style={styles.materialUnderlineTextbox}
      ></MaterialUnderlineTextbox>
      <MaterialButtonGrey
        style={styles.materialButtonGrey}
      ></MaterialButtonGrey>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(31,31,31,1)",
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    fontFamily: "Arial",
    color: "#121212",
    width: 121,
    height: 53,
    lineHeight: 40,
    fontSize: 40,
    marginTop: 226,
    marginLeft: 51
  },
  materialRightIconTextbox: {
    height: 43,
    width: 298,
    marginTop: 166,
    marginLeft: 33
  },
  materialUnderlineTextbox: {
    height: 43,
    width: 298,
    marginTop: -108,
    marginLeft: 33
  },
  materialButtonGrey: {
    height: 36,
    width: 100,
    borderRadius: 15,
    marginTop: 120,
    marginLeft: 130
  }
});
