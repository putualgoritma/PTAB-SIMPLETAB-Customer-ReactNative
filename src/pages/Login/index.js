import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, BackHandler, Alert } from 'react-native';
import { copilot, CopilotStep, walkthroughable } from "react-native-copilot";
import { Header, In, Input, Spinner, TextInput } from '../../component';
import API from '../../service';
import Distance from '../../utils/distance';
import OneSignal from 'react-native-onesignal';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action';
import TextBox from 'react-native-password-eye';

const CustomCopilot = (props) => {
    const { copilot } = props;
    return (
        <View {...copilot}
            style={{
                position: 'absolute',
                width: props.width ? props.width : '85%',
                height: props.height ? props.height : 90,
                marginTop: props.marginTop,

            }}>
        </View>
    )
}

const Login = (props) => {

    const { navigation } = props;
    const { route } = props;
    const WalkthroughableText = walkthroughable(Text)
    const WalkthroughableImage = walkthroughable(Image)
    const dispatch = useDispatch();

    const handleStepChange = (step) => {
        console.log(`Current data: ${step.name}`)

    }
    const [loading, setLoading] = useState(false)
    const isFocused = useIsFocused();
    const [user, setUser] = useState(null)
    const [form, setForm] = useState({
        phone: null,
        password: null,
        code: null,
        OTP: null,
        _id_onesignal: null
    })
    const [passwordVisible, setPasswordVisible] = useState(true);


    const notif = async () => {
        try {

            // dispatch(token_api_one_signal(device['userId']))
            const device = await OneSignal.getDeviceState()


            var digits = '0123456789';
            let OTP = '';
            for (let i = 0; i <= 4; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            setForm({ ...form, _id_onesignal: device.userId, OTP: OTP })
            
            let code = route.params ? (route.params.code ? route.params.code : null) : null;
            //alert(code)
            if (code !== null) {
                setLoading(true)
                API.scanCode({ code: code }).then((result) => {
                    console.log(result);                    
                    handleForm('code', result.data.code)
                    handleForm('phone', result.data.phone)
                    setLoading(false)
                    if(result.pass_set==0){
                        navigation.navigate('Register', { code: result.data.code, _id_onesignal: device.userId, name: result.data.name, address: result.data.address,  })
                    }else{
                        alert('Data Pelanggan sudah teregistrasi, tolong masukkan nomor SBG dan Password.')
                    }                  
                }).catch((e) => {
                    console.log(e.response);
                    alert('Data tidak ditemukan')
                    setLoading(false)
                })
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    useEffect(() => {        
        notif()
        const backAction = () => {
            Alert.alert("Peringatan", "Apakah anda yakin keluar dari Applikasi?", [
                {
                    text: "Tidak",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Ya", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();


    }, [isFocused])

    useEffect(() => {
        props.copilotEvents.on('stepChange', handleStepChange)
        props.start()
    }, [])

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const handleAction = () => {
        let data = form;
        setLoading(true)
        if (!data._id_onesignal) {
            signupOnesignal().then((res) => {
                data._id_onesignal = res;
                handleData(data)
            })
        } else {
            handleData(data)
        }

    }

    const signupOnesignal = async () => {
        // OneSignal.setAppId("282dff1a-c5b2-4c3d-81dd-9e0c2b82114b");
        // OneSignal.setLogLevel(6, 0);
        // OneSignal.setRequiresUserPrivacyConsent(false);
        // dispatch(token_api_one_signal(device['userId']))
        const device = await OneSignal.getDeviceState();
        return device.userId;
    }

    // const idOneSignal = async() => {
    //     let device = await OneSignal.getDeviceState();
    //     data
    // }

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

    const handleData = (data) => {
        //alert(data.code+':'+data.phone+':'+data.password)
        if (data.code != null && data.password != null && data.OTP != null && data._id_onesignal) {
            console.log('data',data);
            // setLoading(true)
            API.login(data).then((result) => {
                // console.log('response' ,result);
                // navigation.navigate('SMS', {form : form})
                // setLoading(false)
                if (result.data.phone !== "00001") {
                    // API.OTP({ phone: result.data.phone, OTP: data.OTP }).then((res) => {
                    //     console.log(res);
                    //     navigation.replace('SMS', { user: result.data, OTP: data.OTP, TOKEN: result.token })
                    //     setLoading(false)
                    // }).catch((e) => {
                    //     console.log(e);
                    //     alert('OTP Gagal dikirim')
                    //     setLoading(false)
                    // })
                    dispatch(SET_DATA_USER(result.data))
                    dispatch(SET_DATA_TOKEN(result.token))
                    storeDataToken(result.token)
                    storeDataUser(result.data)
                    navigation.replace('Menu')
                } else {
                    dispatch(SET_DATA_USER(result.data))
                    dispatch(SET_DATA_TOKEN(result.token))
                    storeDataToken(result.token)
                    storeDataUser(result.data)
                    navigation.replace('Menu')
                }
                console.log(result);
            }).catch((e) => {
                console.log(e);
                alert('Email atau password salah')
                setLoading(false)
            })
        } else {
            alert('Mohon isi data dengan Lengkap')
            setLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            <ScrollView>
                <Header />
                <View style={styles.baseBoxShadow} >
                <View style={styles.boxShadow} >
                    <Text style={styles.textbold}>LOGIN</Text>                                            
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <CopilotStep
                                text="Masukan No SBG (Nomor Stand Meter Pelanggan)"
                                order={1}
                                name="SatuUnique"
                            >
                                <CustomCopilot marginTop={38} />
                            </CopilotStep>

                            <TextInput title='No SBG' />
                            <Input
                                value={form.code !== null ? form.code : null}
                                placeholder="No SBG"
                                onChangeText={(value) => handleForm('code', value)}
                                // value={route.params ? route.params.dataId:''}
                                keyboardType='number-pad'
                            />
                        </View>
                        <Distance distanceV={5} />
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            {/* <CopilotStep
                                text="Permohonan ganti telepon digunakan jika no telepon yang terdaftar sudah diganti dengan yang baru"
                                order={3}
                                name="TigaUnique"
                            >
                                <CustomCopilot marginTop={27} width={'70%'} height={38} />
                            </CopilotStep>
                            <TouchableOpacity onPress={() => navigation.navigate('ChangePhone')}>
                                <Text style={styles.ChangePhone}>Permohonan Ganti No Telepon</Text>
                            </TouchableOpacity> */}
                        </View>
                        <Distance distanceV={5} />                        

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <CopilotStep
                                text="Masukan Password."
                                order={2}
                                name="DuaUnique"
                            >
                                <CustomCopilot marginTop={38} />
                            </CopilotStep>
                            <TextInput title='Password' />
                            </View>
                            <View style={{ width: '80%', alignItems: 'center' }}>
                            <TextBox 
                            onChangeText={(value) => handleForm('password', value)} 
                            secureTextEntry='true'            
                            eyeColor='#000000'
                            inputStyle={styles.input}
                            />
                            </View>
                        <Distance distanceV={5} />

                        <View style={{ width: '80%' }}>
                        <Text style={{fontSize : 12, color :'red'}}>Lupa Password Silahkan Hubungi Kantor Pusat PERUMDA Tirta Amertha Bhuana.</Text>
                            {/* <CopilotStep
                                text="Reset Password digunakan jika lupa dengan password yang sudah terdaftar"
                                order={5}
                                name="LimaUnique"
                            >
                                <CustomCopilot marginTop={27} width={'50%'} height={38} />
                            </CopilotStep>
                            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                                <Text style={styles.ChangePhone}>Reset Password</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <CopilotStep
                                text="Klik tombol Login dan pastikan no SBG dan password sudah benar"
                                order={3}
                                name="TigaUnique"
                            >
                                <CustomCopilot marginTop={38} width={'35%'} height={40} />
                            </CopilotStep>
                            <In
                                title="Login"
                                onPress={handleAction}
                            />
                        </View>

                        {/* <TouchableOpacity onPress={()=>navigation.navigate('Scan')}>
                            <CopilotStep
                                text='Scan atau arahkan Camera pada Stand Meter Anda'
                                order={1}
                                name='SatuUnique'
                            >
                                <WalkthroughableImage 
                                    source={require('../../assets/icon/iconQR.png')}
                                    style={{width:113, height:129}}
                                />
                            </CopilotStep>
                         </TouchableOpacity> */}

                        <Distance distanceV={5} />
                        <Distance distanceV={5} />
                        <View style={{ backgroundColor: '#C4C4C4', height: 2, width: '80%' }}></View>
                        <Distance distanceV={5} />                        
                        <View style={{ width: '80%', alignItems: 'center' }}>
                            <CopilotStep
                                text="Scan atau arahkan Camera pada Stand Meter Anda"
                                order={4}
                                name="EmpatUnique"
                            >
                                <CustomCopilot marginTop={15} width={113} height={141} />
                            </CopilotStep>
                            <Text style={{fontSize : 12, color :'red'}}>Pelanggan Yang Belum Memiliki Account Password Silahkan Scan QR Meteran Anda.</Text>
                            <Distance distanceV={5} />
                            <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
                                <Image source={require('../../assets/icon/iconQR.png')} style={{ width: 113, height: 129 }} />
                            </TouchableOpacity>
                        </View>
                        

                        {/* <Distance distanceV={5} /> */}
                        {/* <View style={{ backgroundColor: '#C4C4C4', height: 2, width: '80%' }}></View>
                        <Distance distanceV={5} />
                        <Text style={styles.text}>Atau</Text>
                        <Distance distanceV={5} />
                        <View style={{ width: '80%', alignItems: 'center' }}>
                            <CopilotStep
                                text="Bagi yang bukan pelanggan dapat mengakses menu ini"
                                order={7}
                                name="TujuUnique"
                            >
                                <CustomCopilot marginTop={18} width={181} height={151} />
                            </CopilotStep>
                            <TouchableOpacity onPress={() => navigation.navigate('Public')}>
                                <Image source={require('../../assets/img/MasyarakatUmum.png')} style={{ width: 181, height: 131 }} />
                            </TouchableOpacity>
                        </View> */}

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    baseBoxShadow: {
        // backgroundColor : 'red',
        alignItems: 'center',
        paddingVertical: 10
    },
    boxShadow: {
        backgroundColor: '#ffffff',
        width: '90%',
        alignItems: 'center',
        top: -80,
        paddingVertical: 35,
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
    text: {
        fontSize: 16,
        color: '#696969',
    },
    textbold: {
        fontSize: 16,
        color: '#696969',
        fontWeight: 'bold'
    },
    ChangePhone: {
        fontSize: 16,
        color: '#F11F1F',
        textDecorationLine: 'underline',
    },
    input:{
        borderRadius:10,
        backgroundColor:'#ffffff',
        paddingHorizontal:20,
        borderColor:'#087CDB',
        borderWidth:1,
        color: '#c7c7c7',
    },

});
const style = {
    backgroundColor: "white",
    borderRadius: 2,
    borderColor: '#137FC2',
    borderWidth: 1
};
export default copilot({
    overlay: "svg", // or 'view'
    animated: true, // or false
    tooltipStyle: style
})(Login);