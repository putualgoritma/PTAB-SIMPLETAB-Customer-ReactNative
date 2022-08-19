import React, { useEffect, useState } from 'react';
import TextBox from 'react-native-password-eye';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, BackHandler, Alert } from 'react-native';


const Login = (props) => {    

    return (
        <View style={styles.container}>
            <Text style={{fontSize : 12, color :'red'}}>99Pelanggan Yang Belum Memiliki Account Password Silahkan Scan QR Meteran Anda.</Text>
            <TextBox 
            onChangeText={(text) => console.log('onChangeText: ', text)} 
            secureTextEntry='true'            
            eyeColor='#000000'
            inputStyle={styles.input}
            />            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    baseBoxShadow: {
        // backgroundColor : 'red',
        alignItems: 'center',
        paddingVertical: 10
    },
    boxShadow: {
        backgroundColor: '#ffffff',
        width: '90%',
        alignItems: 'center',
        top: -80,
        paddingVertical: 35,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        color: '#696969',
    },
    ChangePhone: {
        fontSize: 16,
        color: '#F11F1F',
        textDecorationLine: 'underline',
    },
    input:{
        borderRadius:10,
        backgroundColor:'#ffffff',
        paddingHorizontal:20,
        borderColor:'#087CDB',
        borderWidth:1,
        color: '#c7c7c7',
    },

});
const style = {
    backgroundColor: "white",
    borderRadius: 2,
    borderColor: '#137FC2',
    borderWidth: 1
};
export default Login;