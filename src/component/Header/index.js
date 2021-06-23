import React from 'react';
import {
    Text,
    StyleSheet,
    View,
  } from 'react-native';
  import Header from '../../assets/img/header.svg'

  const header=(props)=>{
    return(
        <View style={styles.Container}>
            <Header height={165} width={'100%'}/>
            <Text style={styles.Text}>{props.text}</Text>
        </View>
    )
  }
const styles = StyleSheet.create({
    Container:{
        alignItems:'center'
    },
    Text:{
        fontSize:17, 
        color:'#FFFFFF', 
        position:'absolute', 
        fontWeight:'bold', 
        top:100, 
        left:30
    }
});
  export default header