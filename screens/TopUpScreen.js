import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Color, FontFamily, } from "../GlobalStyles";
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/core'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

export default function TopUpScreen() {

  const navigation = useNavigation();
    const backButton = () =>{
        navigation.navigate("Main")
      }
  
  const [selectedAmount, setSelectedAmount] = useState(""); // State to keep track of selected amount
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State to keep track of selected payment method
  const [totalAmount, setTotalAmount] = useState(0);
  const [isAmountSelected, setIsAmountSelected] = useState(false);
  const [email, setEmail] = useState(""); // State for email input value


  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    const numericAmount = parseFloat(amount.substring(2));
    setTotalAmount(numericAmount);
    setIsAmountSelected(true); // Set isAmountSelected to true when an amount is selected
  };

  const handlePaymentMethodSelection = (method) => {
    if (isAmountSelected) {
      setSelectedPaymentMethod(method);
    }
    else{
      ToastAndroid.show('Select Amount First', ToastAndroid.SHORT);
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleCheckout = () => {
    if (email.trim() === "") {
      // alert("Please fill up the email form before proceeding to checkout.");
    } else if (selectedPaymentMethod === "") {
      // alert("Please select a payment method before proceeding to checkout.");
    } else {
      // Navigate to the appropriate screen based on the selected payment method
      navigation.navigate(selectedPaymentMethod);
    }
  };



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backImgContainer} onPress={backButton}>
            <Image
                source={require('../assets/back.png')}
                style={styles.backImg}
            />
        </TouchableOpacity>

          <View style={styles.containerHeader}>
           <AntDesign name='infocirlceo' size={25} style={styles.icon}/>
           <Text style={{fontSize: 18, marginHorizontal: 10}}>User Information</Text>
          <View>
          </View>
        </View>
        <View style={styles.contentContainer}>
            <Text style={{fontSize: 15, paddingVertical: 5, fontFamily: FontFamily.poppinsMedium}}>Enter Email Address</Text>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder={"Juan@gmail.com"}
              onChangeText={handleEmailChange}
              value={email}
            />
            </View>
        </View>
        <View style={styles.containerHeader}>
           <AntDesign name='infocirlceo' size={25} style={styles.icon}/>
           <Text style={{fontSize: 18, marginHorizontal: 10}}>Select Amount</Text>
          <View>
          </View>
        </View>
        <View style={styles.amountContentContainer}>
          <View style={styles.contentsContainer}>
          <TouchableOpacity
            style={[styles.boxContainer, selectedAmount === "₱ 50" && styles.selectedBox]} // Apply selected style if amount is selected
            onPress={() => handleAmountSelection("₱ 50")}
          >
              <FontAwesome5 name='money-bill-wave' size={45}/>
              <Text style={{fontSize: 30}}>₱ 50</Text>
              <Text style={{fontSize: 15}}>Philippine Peso</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.boxContainer, selectedAmount === "₱ 100" && styles.selectedBox]} // Apply selected style if amount is selected
            onPress={() => handleAmountSelection("₱ 100")}
            >
              <FontAwesome5 name='money-bill-wave' size={45}/>
              <Text style={{fontSize: 30}}>₱ 100</Text>
              <Text style={{fontSize: 15}}>Philippine Peso</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentsContainer}>
            <TouchableOpacity
            style={[styles.boxContainer, selectedAmount === "₱ 200" && styles.selectedBox]} // Apply selected style if amount is selected
            onPress={() => handleAmountSelection("₱ 200")}
            >
              <FontAwesome5 name='money-bill-wave' size={45}/>
              <Text style={{fontSize: 30}}>₱ 200</Text>
              <Text style={{fontSize: 15}}>Philippine Peso</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.boxContainer, selectedAmount === "₱ 300" && styles.selectedBox]} // Apply selected style if amount is selected
            onPress={() => handleAmountSelection("₱ 300")}
            >
              <FontAwesome5 name='money-bill-wave' size={45}/>
              <Text style={{fontSize: 30}}>₱ 300</Text>
              <Text style={{fontSize: 15}}>Philippine Peso</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentsContainer}>
          <TouchableOpacity
            style={[styles.boxContainer, selectedAmount === "₱ 500" && styles.selectedBox]} // Apply selected style if amount is selected
            onPress={() => handleAmountSelection("₱ 500")}
            >
              <FontAwesome5 name='money-bill-wave' size={45}/>
              <Text style={{fontSize: 30}}>₱ 500</Text>
              <Text style={{fontSize: 15}}>Philippine Peso</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.boxContainer, selectedAmount === "₱ 1000" && styles.selectedBox]} // Apply selected style if amount is selected
            onPress={() => handleAmountSelection("₱ 1000")}
            >
              <FontAwesome5 name='money-bill-wave' size={45}/>
              <Text style={{fontSize: 30}}>₱ 1000</Text>
              <Text style={{fontSize: 15}}>Philippine Peso</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerHeader}>
           <AntDesign name='infocirlceo' size={25} style={styles.icon}/>
           <Text style={{fontSize: 18, marginHorizontal: 10}}>Select Payment Method</Text>
          <View>
          </View>
        </View>

        <View style={styles.amountContentContainer}>
        <View style={styles.contentsContainer}>
        <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "SevenConnect" && styles.selectedBox]}
            onPress={() => handlePaymentMethodSelection("SevenConnect")}
          >
              <Image source={require('../assets/7_Eleven.jpeg')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>7-Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "GrabPayPH" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("GrabPayPH")}
          >
              <Image source={require('../assets/grabpay.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>GrabPay PH</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.contentsContainer}>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "GCash" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("GCash")}
          >
              <Image source={require('../assets/gcash.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>GCash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "BDO" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("BDO")}
          >
              <Image source={require('../assets/bdo.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>BDO</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.contentsContainer}>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "BPI" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("BPI")}
          >
              <Image source={require('../assets/bpi.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>BPI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "ShopeePay" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("ShopeePay")}
          >
              <Image source={require('../assets/shopee.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>Shopee Pay</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.contentsContainer}>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "Paypal" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("Paypal")}
          >
              <Image source={require('../assets/paypal.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>Paypal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "UnionBank" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("UnionBank")}
          >
              <Image source={require('../assets/ubank.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>Union Bank</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.contentsContainer}>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "Paymaya" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("Paymaya")}
          >
              <Image source={require('../assets/paymaya.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>Paymaya</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxContainer, selectedPaymentMethod === "LandBank" && styles.selectedBox]} // Apply selected style if method is selected
            onPress={() => handlePaymentMethodSelection("LandBank")}
          >
              <Image source={require('../assets/landbank.png')}
                style={styles.sevenElevenImg}/>
              <Text style={{fontSize: 15}}>Land Bank</Text>
          </TouchableOpacity>
          </View>
        </View>

      {/* Display the "Total Amount View" section only when a payment method is selected */}
      {selectedPaymentMethod !== "" && (
        <View>
          <View style={styles.containerHeader}>
            <AntDesign name='infocirlceo' size={25} style={styles.icon}/>
            <Text style={{fontSize: 18, marginHorizontal: 10}}>Pay</Text>
              <View style={{justifyContent: 'flex-end',alignItems: 'center', marginLeft: '30%'}}>
                {email.trim() === "" && (
                  <Text style={{ color: 'red', fontSize: 12}}>Please enter your email address.</Text>
                )}
              </View>
          </View>
          

          <View style={styles.amountContentContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 15, fontFamily: FontFamily.poppinsMedium}}>Total Amount: {totalAmount}</Text>
              <TouchableOpacity
                style={styles.checkOutButton}
                onPress={handleCheckout}
                disabled={email.trim() === ""} // Disable the button if email is empty
              >
                <Text style={{fontSize: 15, fontFamily: FontFamily.poppinsMedium}}>CHECKOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.blackModePrimaryDark,
    paddingHorizontal: 10
  },
  backImgContainer:{
    justifyContent:'center',
    alignItems: 'flex-start',
    padding: 20
},
backImg:{
    height: 50,
    width: 70
},
containerHeader:{
  paddingHorizontal: 10,
  flexDirection: 'row',
  backgroundColor: '#fff',
  paddingVertical: 10,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
},
contentContainer:{
  paddingHorizontal: 10,
  flexDirection: 'column',
  backgroundColor: Color.gray_700,
  paddingVertical: 10,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  marginBottom: 20
},
amountContentContainer:{
  paddingHorizontal: 10,
  flexDirection: 'column',
  backgroundColor: Color.gray_700,
  paddingVertical: 10,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  marginBottom: 20
},
inputContainer:{
  backgroundColor: "#fff",
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 15,
},
inputText:{
  fontFamily: FontFamily.poppinsMedium,
  fontSize: 18,
},
contentsContainer:{
  flexDirection: 'row',
},
boxContainer:{
  borderRadius: 10,
  backgroundColor: "#fff",
  padding: 5,
  paddingHorizontal: 30,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 5,
},
sevenElevenImg:{
  height: 50,
  width: 100
},
checkOutButton:{
  borderRadius: 10,
  backgroundColor: '#1BD658',
  padding: 10,
  paddingHorizontal: 10

},
selectedBox: {
  borderColor: 'green',
  borderWidth: 4,
},

  
})