import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import OneSignal from 'react-native-onesignal';
import { useDispatch } from 'react-redux';
import { Button, Input, TextArea, TextInput, Title } from '../../component';
import Spinner from '../../component/spinner';
import API from '../../service';

const Public =({navigation})=>{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [OTP, setOTP] = useState(null)
    const [form, setForm] = useState({
        name : '',
        address : '',
        phone :'',
        email : '',
        passwordNew : '',
        gender : '',
        _id_onesignal : ''
    })
    const isFocused = useIsFocused();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Laki-laki', value: 'male'},
        {label: 'Perempuan', value: 'female'}
    ]);

    // nested model virtualized
    DropDownPicker.setListMode("SCROLLVIEW");
    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key] : value
        })
    }

    useEffect(() => {
        handleForm('gender', value)
    }, [value])


    useEffect(() => {
        if(isFocused){
            var digits = '0123456789'; 
            let OTP = ''; 
            for (let i = 0; i <=4; i++ ) { 
                OTP += digits[Math.floor(Math.random() * 10)]; 
            } 
            setOTP(OTP)

            signupOnesignal().then((result) => {
                // console.log(result);
                setForm({...form, _id_onesignal : result})
           }).catch(e => {
               console.log(e);
           }).finally(() => setLoading(false))
        }
    }, [isFocused])


    const signupOnesignal = async () => {
        OneSignal.setAppId("282dff1a-c5b2-4c3d-81dd-9e0c2b82114b");
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        // dispatch(token_api_one_signal(device['userId']))
        const device = await OneSignal.getDeviceState();
        return device.userId;
    }


    const handleRegister = () => {
        if(form.name != '' && form.passwordNew !='' && form.address !='' && form.phone != '' && form.gender !='' && form._id_onesignal !=''){
            setLoading(true)
            var mes = ''

            API.registerCustomerPublic(form).then((result) => {
                mes = result.data.errorInfo ? result.data.errorInfo[2] : '';
                setLoading(false)
                API.OTP({phone:result.data.phone, OTP : OTP}).then((res) => {
                    // console.log('api',res);
                    navigation.navigate('SMS', {user : result.data, OTP : OTP, TOKEN : result.token})
                    setLoading(false)
                }).catch((e) => {
                    // console.log('api',e.request);
                    setLoading(false)
                })
            }).catch((e) => {
                console.log('eadad',e.request);
                setLoading(false)
                alert('Email atau No Hp sudah terdaftar')
            })
        }else{
            alert('mohon lengkapi data anda')
        }
            // console.log(form);
    }

    return(
        <View style={styles.container}> 
            {loading &&  <Spinner/>}
            <ScrollView  nestedScrollEnabled={true} >
                <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}>
                </View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
               
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadowBanner}>
                        
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Title
                             title="Masyarakat Umum"
                        />
                        <TextInput
                            title="No Handphone"
                        />
                        <Input
                              placeholder="No Handphone"
                              onChangeText = {(value) => handleForm('phone', value)}
                              keyboardType = 'number-pad'
                            //   keyboardType = 'number'
                         />
                        <TextInput
                              title="Password"
                        />
                        <Input
                              placeholder="Password"
                              onChangeText = {(value) => handleForm('passwordNew', value)}
                              secureTextEntry = {true}
                         />
                        <TextInput
                             title="Nama"
                        />
                        <Input
                              placeholder="Nama"
                              onChangeText = {(value) => handleForm('name', value)}
                         />
                         <TextInput
                              title="Email"
                        />
                        <Text style={{fontSize : 10, color :'red'}}>Boleh di isi atau tidak</Text>
                        <Input
                              placeholder="Email"
                              onChangeText = {(value) => handleForm('email', value)}
                         />
                         <TextInput
                              title="Alamat"
                        />
                        <TextArea
                              placeholder="Alamat"
                              onChangeText = {(value) => handleForm('address', value)}
                         />
                        <TextInput
                            title="Jenis Kelamin"
                        />
                        <View style={{paddingHorizontal : 35}}>
                            <DropDownPicker
                                style={{borderColor : '#087CDB', paddingHorizontal : 20, }}
                                placeholder='Jenis Kelamin'
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                            />
                        </View>
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Button
                            title="Lanjut"
                            // navigation={()=>navigation.navigate('SMS')}
                            onPress = {handleRegister}
                        />
                    </View>
                    </View>
                </View>
                </ImageBackground>
                
                
            </ScrollView>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    boxShadowBanner:{
        width:'90%',
        height:'100%',
        top:-45,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,

        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 3,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width:'100%',
        
      },
});
export default Public