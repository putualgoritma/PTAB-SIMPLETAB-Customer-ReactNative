import React from 'react';
import { Dimensions } from 'react-native'
import {
    Text,
    StyleSheet,
    View,
    Image
  } from 'react-native';    
import Beranda from '../../assets/img/beranda.svg'
import {Footer} from '../../component';
const { width, height} = Dimensions.get('screen');
const Home =({navigation})=>{
    return(
        <View style={styles.container}>
            <View style={{flex:1}}>
                <View style={{top:-5}}>
                    <Beranda width={'100%'} height={height/100*75}/>
                </View>
                <Image source={require('../../assets/img/logo.png')} style={{width:66, height:52 ,position:'absolute', left:10, top:20}}/>
                {/* <View style={{width:300, height:80,position:'absolute',left:25, top:180 }}>
                <Text style={{ fontSize:18, color:'#FFFFFF',textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</Text>
                </View> */}
            </View>
            <Footer 
            navigation = {navigation}
            focus = 'Home'
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    }
});
export default Home