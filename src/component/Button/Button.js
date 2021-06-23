import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  const Button =(props)=>{
    return(
        <TouchableOpacity style={styles.buttonstyle} onPress={props.navigation}>
            <View style={{flexDirection:'row',paddingVertical:3,justifyContent:'center', }}>    
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.text}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }
  const styles = StyleSheet.create({
    buttonstyle:{
        backgroundColor:'#0C5CBF', 
        width:'80%', 
        height:50,
        paddingVertical:10, 
        borderRadius:10,
        paddingTop:10
    },
    text:{
        color:'#FFFFFF', 
        fontWeight:'bold',
        fontSize:18
    }
 });
  export default Button