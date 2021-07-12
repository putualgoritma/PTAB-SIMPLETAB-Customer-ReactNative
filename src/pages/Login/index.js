import { faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ButtonIcon, Header, In, Input, Spinner, TextInput } from '../../component';
import API from '../../service';
import { useIsFocused } from '@react-navigation/native';
const Login =({navigation,route})=>{
    const [loading, setLoading]= useState(false)
    const isFocused = useIsFocused();
    const [user, setUser] = useState(null)
    const [form, setForm] = useState({
        phone : null,
        password : null,
        OTP : null
    })

    useEffect(() => {
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i <=4; i++ ) { 
              OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        handleForm('OTP', OTP);

        let code = route.params ? (route.params.code ? route.params.code : null) : null;
        if(code !== null){
            setLoading(true)
            API.scanCode({code : code}).then((result)=> {
                console.log(result);
                handleForm('phone' , result.data.phone)
                setLoading(false)
            }).catch((e) => {
                console.log(e.request);
                alert('data tidak ada')
                setLoading(false)
            })
        }
    }, [isFocused])

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key] :  value
        })
    }

    const handleAction = () => {
        if(form.phone != null && form.password != null && form.OTP != null){
            console.log(form.OTP);
            setLoading(true)
            API.login(form).then((result) => {
                // console.log('response' ,result);
                // navigation.navigate('SMS', {form : form})
                // setLoading(false)
                API.OTP({phone:result.data.phone, OTP : form.OTP}).then((res) => {
                    console.log(res);
                    navigation.navigate('SMS', {user : result.data, OTP : form.OTP, TOKEN : result.token})
                    setLoading(false)
                }).catch((e) => {
                    console.log(e);
                    setLoading(false)
                })
                console.log(result);
            }).catch((e) => {
                console.log(e);
                setLoading(false)
            })
        }else{
            alert('Mohon isi data dengan Lengkap')
        }
    }

    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ScrollView>
                <Header
                    text="Login"
                />
                <View style={styles.baseBoxShadow} >
                    <View style={styles.boxShadow} >
                        <ButtonIcon
                            title='Scan QR'
                            width='80%'
                            icon={faQrcode}
                            onPress={()=> navigation.navigate('Scan') }
                        />
                        <Text style={styles.text}>Atau</Text>
                        <TextInput title='Phone' />
                        <Input
                            value = {form.phone !== null ? form.phone : null}
                            placeholder="Phone"
                            onChangeText = {(value) => handleForm('phone', value)}
                            // value={route.params ? route.params.dataId:''}
                            keyboardType='number-pad'
                        />
                        <TextInput title='Password' />
                        <Input
                            placeholder="Pasaword"
                            onChangeText = {(value) => handleForm('password', value)}
                            // value={route.params ? route.params.dataId:''}
                            secureTextEntry = {true}
                        />
                        <In
                            title="Login"
                            onPress={handleAction}
                        />
                        <Text style={[styles.text, {marginBottom : 20}]}>Atau</Text>
                        <ButtonIcon
                            title='Masyarakat Umum'
                            width='80%'
                            icon={faUser}
                            onPress={()=>navigation.navigate('Public')}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>  
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    baseBoxShadow : {
        // backgroundColor : 'red',
        alignItems : 'center',
        paddingVertical : 10
    },
    boxShadow : {
        backgroundColor : '#ffffff',
        width : '90%',
        alignItems : 'center',
        top:-40,
        paddingVertical : 60,
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
    text:{
        fontSize:16, 
        color:'#696969',
        paddingTop : 20 
    }
    
});
export default Login