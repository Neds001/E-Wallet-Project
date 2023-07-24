import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { Image } from "expo-image";
import { AntDesign } from '@expo/vector-icons';
import { Color, FontFamily} from "../GlobalStyles";

const Others = () => {
    const navigation = useNavigation();
    const backButton = () =>{
        navigation.navigate("Main")
      }
    




  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backImgContainer} onPress={backButton}>
            <Image
                source={require('../assets/back.png')}
                style={styles.backImg}
            />
        </TouchableOpacity>
        <View style={styles.mainteContainer1}>
            <AntDesign name="setting" size={150} style={{color: Color.gray_700}}/>
        </View>
        <View style={styles.mainteContainer2}>
            <AntDesign name="setting" size={100} style={{color: Color.gray_700}}/>
        </View>
    
    <View style={styles.maintenanceTextContainer}>
        <Text style={styles.maintenanceText}>M A I N T E N A N C E</Text>
    </View>

    <View style={styles.backTextContainer}>
        <Text style={styles.backText}>We will be back soon</Text>
    </View>

    </View>
  )
}

export default Others

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#2C0283',
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
    mainteContainer1: {
        marginTop: 100,
        marginRight: 100,
        alignItems: 'center'
    },
    mainteContainer2: {
        marginTop: -70,
        marginRight: -100,
        alignItems: 'center'
    },
    maintenanceTextContainer:{
        alignItems: 'center',
        padding: 10
    },
    maintenanceText:{
        fontFamily: FontFamily.poppinsBold,
        color: Color.gray_700,
        fontSize: 25,
        letterSpacing: 2
    },
    backTextContainer:{
    alignItems: 'center',
    },
    backText:{
    fontFamily: FontFamily.poppinsBold,
    color: Color.gray_700,
    fontSize: 15,
    letterSpacing: 1
    },


})