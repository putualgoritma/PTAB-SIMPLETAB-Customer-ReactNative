import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Image,View,StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';
import Splash from '../../assets/img/Splash.svg'
import { SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
  const SplashScreen=({navigation})=>{
      // useEffect(() => {
      //     setTimeout(() => {
      //       navigation.replace('Login')
      //     }, 2000);
      // })


      const dispatch = useDispatch();
      useEffect(() => {
            let isAmounted = false
           if(!isAmounted){
                  Promise.all([getDataUser(), getDataToken()])
                  .then(response => {
                        if(response[0] !== null && response !== response[1]){
                              dispatch(SET_DATA_USER(response[0]))
                              dispatch(SET_DATA_TOKEN(response[1]))
                              setTimeout(() => {
                                    navigation.replace('Home')
                              }, 2000);
                        }else{
                              setTimeout(() => {
                                    navigation.replace('Login')
                              }, 2000);
                        }
                  }).catch((e) => {
                        setTimeout(() => {
                              navigation.replace('Login')
                        }, 2000);
                        console.log('data local tidak dibaca');
                  })
           }
            return () => {
                  isAmounted= true
            }
      }, [])


      
      const getDataUser = async () => {
            try {
            const jsonValue = await AsyncStorage.getItem('@LocalUser')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
            // console.log('local user',jsonValue);
            } catch(e) {
            // error reading value
            }
      }
      
      const getDataToken = async () => {
            try {
              const value = await AsyncStorage.getItem('@LocalToken')
              if(value !== null) {
                  return value
              }
            } catch(e) {
              // error reading value
            }
      }
    


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