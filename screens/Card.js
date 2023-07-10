import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";

export default function Card() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />

      <Text>Card</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.blackModePrimaryDark,  
    flex: 1
  }
})
