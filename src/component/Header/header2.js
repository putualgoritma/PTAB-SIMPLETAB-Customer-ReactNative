import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
  } from 'react-native';
  import Header from '../../assets/img/header2.svg'
  const header2=(props)=>{
    return(
        <View style={styles.Container}>
           <Header height={102} width={'100%'}/>
        </View>
    )
  }
const styles = StyleSheet.create({
    Container:{
        alignItems:'center',
        top:-1
    },
});
  export default header2