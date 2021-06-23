import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
  } from 'react-native';
  import Header from '../../assets/img/header1.svg'
  const header1=(props)=>{
    return(
        <View style={styles.Container}>
           <Header height={Dimensions.get('window').height*(15/100)} width={'100%'}/>
            {/* <Image source={require('../../assets/img/header1.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height*(15/100)}} /> */}

        </View>
    )
  }
const styles = StyleSheet.create({
    Container:{
        alignItems:'center',
        top:-2
    },
});
  export default header1