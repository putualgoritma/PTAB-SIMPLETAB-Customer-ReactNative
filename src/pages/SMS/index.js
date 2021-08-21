import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    ScrollView, StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Header1, In, Input, Out, Spinner, TextInput, Title } from '../../component';
import { SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
import API from '../../service';
import Distance from '../../utils/distance';


const SMS=({navigation,route})=>{

    const [oldOTP, setOldOTP] = useState(route.params.OTP);
    const user = route.params.user
    const token = route.params.TOKEN
    const [send, setSend] = useState(false)
    const [OTP, setOTP] = useState(null)
    const [newOTP, setNewOTP] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            setSend(true)
        }, 5000);
    }, [])



    const checkOTP = () => {
        console.log(OTP);
        if(OTP != null && oldOTP !=null ){
            // oldOTP == OTP ? navigation.replace('Home') : alert('OTP Salah')
            if(oldOTP == OTP) {
                dispatch(SET_DATA_USER(user))
                dispatch(SET_DATA_TOKEN(token))
                storeDataToken(token)
                storeDataUser(user)
                navigation.replace('Menu')
            }else{
                alert('OTP Salah')
            }
        }else{
            alert('mohon isi OTP')
        }
    }

    const storeDataUser = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@LocalUser', jsonValue)
        } catch (e) {
          console.log('no save')
        }
    }

    const storeDataToken = async (value) => {
        try {
          await AsyncStorage.setItem('@LocalToken', value)
        } catch (e) {
          console.log('TOken not Save ')
        }
    }

    const sendOTP = ()=>{
        setLoading(true)


        var digits = '0123456789'; 
        let createOTP = ''; 
        for (let i = 0; i <=4; i++ ) { 
            createOTP += digits[Math.floor(Math.random() * 10)]; 
        } 

        console.log('create OTP', createOTP);
        API.OTP({phone : user.phone, OTP:createOTP}).then((result) => {
            setSend(false)
            console.log(result);
            setOldOTP(createOTP)
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setSend(false)
            setLoading(false)
        })
    }




    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ScrollView >
                <View style={{flex:1}}>
                    <Header1/>
                    <View style={{alignItems:'center'}}>
                        <Title
                            title="Login Via SMS"
                        />
                        <TextInput
                            title="SMS OTP"
                        />
                        <Input
                                value={route.params ? route.params.dataId:''}
                                onChangeText = {value => setOTP(value)}
                                keyboardType = 'number-pad'
                                maxLength ={5}
                                fontSize={30}
                                textAlign = 'center'
                                secureTextEntry={true}
                        />
                        <View style={{marginVertical : 10}} />
                      
{/*                         
                        <Button 
                            title = {send ? 'Kirim Ulang Otp' : 'Mohon tunggu max 3 menit sms otp'}
                            onPress={() => {send ? sendOTP() : alert('Mohon tunggu sms otp anda')}}
                        /> */}
                        <Distance distanceV={5}/>
                       
                        <View style={{flexDirection:'row',width:'100%',justifyContent:'center'}}>
                            <View style={{flex:1}}>
                                <Out
                                        title="Kembali"
                                        onPress={()=>navigation.navigate('Login')}
                                    />
                            </View>
                            <View style={{flex:1}}>
                                <In
                                    title="Masuk"
                                    onPress={checkOTP}
                                />
                              </View>
                        </View>
                        <Distance distanceV={5}/>
                        <TouchableOpacity  onPress={() => {send ? sendOTP() : alert('Mohon Tunggu SMS OTP Anda')}} style={{width:'80%'}}>
                                <Text style={{color:'#FC7979', fontSize:18,textDecorationLine: 'underline'}}>{send ? 'Kirim Ulang OTP' : 'Mohon Tunggu Max 3 Menit SMS OTP'}</Text>
                            {/* <Distance distanceV={2}/>
                            <View style={{backgroundColor:'#0C5CBF', width:80, height:3}}></View>  */}
                         </TouchableOpacity>                     
                    </View>
                   
                </View>
                {/* <Footer1/> */}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
});
export default SMS