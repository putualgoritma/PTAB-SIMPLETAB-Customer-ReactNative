import React, {useEffect} from 'react';
import {Image,View,StyleSheet} from 'react-native';
import Splash from '../../assets/img/Splash.svg'
  const SplashScreen=({navigation})=>{
      useEffect(() => {
          setTimeout(() => {
            navigation.replace('Login')
          }, 2000);
      })
      return (
        <View style={styles.container}>
          <View style={{flex:1.1,alignItems:'center',top:180}}>
          <Image source={require('../../assets/img/logo.png')} style={{width:155, height:122}} />
          </View>
          <View style={{flex:1, bottom:0}}>
            <Splash width={'100%'} height={400}/>
          </View>
        </View>
      )
  }
  const styles = StyleSheet.create({
    container:{
      flex:1, 
      backgroundColor:'white', 
      width:'100%'
    },
  })
  export default SplashScreen