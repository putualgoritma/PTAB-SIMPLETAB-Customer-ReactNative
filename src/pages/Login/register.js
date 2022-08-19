import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button, Input, Spinner, TextInput, Title, InputLine } from '../../component';
import API from '../../service';
import Distance from '../../utils/distance';
import { useDispatch } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { useIsFocused } from '@react-navigation/native';
import { SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextBox from 'react-native-password-eye';

const Register = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        phone: '',
        password: '',
        repassword: '',
        code: route.params.code,
        _id_onesignal: route.params._id_onesignal,
        name: route.params.name,
        address: route.params.address,
    })
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    useEffect(() => {
        // alert('useeffect')
        // setLoading(true)
        // signupOnesignal().then((res) => {
        //     handleForm(_id_onesignal, res)
        //     alert('signupOnesignal'+res)
        // })
        // setLoading(false)
        // alert('end')
    }, [])

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

    const signupOnesignal = async () => {
        const device = await OneSignal.getDeviceState();
        return device.userId;
    }

    const handleAction = () => {
        
        //alert(form.phone+':'+form.password+':'+form.code+':'+form._id_onesignal)
        if (form.phone != null && form.phone != '' && form.password != null && form.password != '' && form.repassword != null && form.repassword != '') {
            if(form.password == form.repassword){
            setLoading(true)
            API.register(form).then((result) => {
                console.log(result);
                if (result.success) {
                    setLoading(false)
                    alert(result.message)
                    dispatch(SET_DATA_USER(result.data))
                    dispatch(SET_DATA_TOKEN(result.token))
                    storeDataToken(result.token)
                    storeDataUser(result.data)
                    navigation.navigate('Menu')
                } else {
                    alert(result.message)
                    setLoading(false)
                }
            }).catch((e) => {
                console.log(e);
                alert('No. Rekening tidak teregistrasi atau tidak dikenali.')
                setLoading(false)
            })
        }else{
            alert('Password harus sama.')
        }
        } else {
            alert('Mohon isi data dengan Lengkap')
        }
    }

    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            <ScrollView>
                <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 165 }}></View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.boxShadowBanner}>
                            <View style={{ alignItems: 'center', paddingVertical: 0 }}>
                                <Title title="Register Account" />
                                <Distance distanceV={15} />

                                <View style={{ maxWidth: '90%', marginBottom: 10, flexDirection: 'row' }}>
                                <Text style={{ flex: 2 }}>Nomor SBG :</Text>
                                <Text style={{ flex: 4, fontWeight: 'bold' }}>{form.code}</Text>
                                </View>

                                <View style={{ maxWidth: '90%', marginBottom: 10, flexDirection: 'row' }}>
                                <Text style={{ flex: 2 }}>Nama :</Text>
                                <Text style={{ flex: 4, fontWeight: 'bold' }}>{form.name}</Text>
                                </View>

                                <View style={{ maxWidth: '90%', marginBottom: 10, flexDirection: 'row' }}>
                                <Text style={{ flex: 2 }}>Alamat :</Text>
                                <Text style={{ flex: 4, fontWeight: 'bold' }}>{form.address}</Text>
                                </View>

                                <TextInput title="No Telepon" />
                                <Input
                                    placeholder="Masukan No Telepon"
                                    value={form.phone}
                                    width='90%'
                                    onChangeText={(value) => handleForm('phone', value)}
                                />
                                <Distance distanceV={10} />
                                <TextInput title="Password" />
                                <View style={{ width: '90%', alignItems: 'center' }}>
                                <TextBox 
                                onChangeText={(value) => handleForm('password', value)} 
                                secureTextEntry='true'            
                                eyeColor='#000000'
                                inputStyle={styles.input}
                                placeholder="Masukan Password"
                                value={form.password}
                                />
                                </View>
                                <Distance distanceV={10} />
                                <TextInput title="Ulangi Password" />
                                <View style={{ width: '90%', alignItems: 'center' }}>
                                <TextBox 
                                onChangeText={(value) => handleForm('repassword', value)} 
                                secureTextEntry='true'            
                                eyeColor='#000000'
                                inputStyle={styles.input}
                                placeholder="Ulangi Password"
                                value={form.repassword}
                                />
                                </View>
                                <Distance distanceV={10} />
                                <Button title="Register"
                                    onPress={() => Alert.alert(
                                        'Peringatan',
                                        `Register Account ? `,
                                        [
                                            {
                                                text: 'Tidak',
                                                onPress: () => console.log('tidak')
                                            },
                                            {
                                                text: 'Ya',
                                                onPress: () => handleAction()
                                            }
                                        ]
                                    )} />
                                <Distance distanceV={10} />
                            </View>                            
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    boxShadowBanner: {
        width: '90%',
        height: '100%',
        top: -45,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
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
        width: '100%',
        height: 600,
    },
    input:{
        borderRadius:10,
        backgroundColor:'#ffffff',
        paddingHorizontal:20,
        borderColor:'#087CDB',
        borderWidth:1,
        color: '#c7c7c7',
    },
})
export default Register