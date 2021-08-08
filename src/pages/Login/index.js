import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { copilot, CopilotStep, walkthroughable } from "react-native-copilot";
import { Header, In, Input, Spinner, TextInput } from '../../component';
import API from '../../service';
import Distance from '../../utils/distance';
import OneSignal from 'react-native-onesignal';

const CustomCopilot = (props) => {
    const {copilot} =props;
    return(  
    <View {...copilot} 
        style={{
            position:'absolute',
            width: props.width ? props.width:'85%', 
            height:props.height? props.height:90, 
            marginTop:props.marginTop,
            
        }}>
    </View>
     )
   }

const Login =(props)=>{
    
    const { navigation } = props;
    const {route} =props;
    const WalkthroughableText = walkthroughable(Text)
    const WalkthroughableImage = walkthroughable(Image)

    const handleStepChange = (step) => {
        console.log (`Current data: ${step.name}`)

    }
    const [loading, setLoading]= useState(false)
    const isFocused = useIsFocused();
    const [user, setUser] = useState(null)
    const [form, setForm] = useState({
        phone : null,
        password : null,
        OTP : null,
        _id_onesignal : null
    })


    const notif = async () => {
        try{
          OneSignal.setAppId("282dff1a-c5b2-4c3d-81dd-9e0c2b82114b");
          OneSignal.setLogLevel(6, 0);
          OneSignal.setRequiresUserPrivacyConsent(false);
          // dispatch(token_api_one_signal(device['userId']))
          const device = await OneSignal.getDeviceState()


          var digits = '0123456789'; 
          let OTP = ''; 
          for (let i = 0; i <=4; i++ ) { 
                OTP += digits[Math.floor(Math.random() * 10)]; 
          } 
          setForm({...form, _id_onesignal : device.userId, OTP : OTP})
  
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
        } catch(e){
          console.log(e);
            return null;
        }
      }

    


    useEffect( () => {
       notif()
    }, [isFocused])

    useEffect(()=>{
        props.copilotEvents.on('stepChange', handleStepChange)
        props.start()
    },[])

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
                <Header/>
                <View style={styles.baseBoxShadow} >
                    <View style={styles.boxShadow} >
                        <View style={{width:'80%', alignItems:'center'}}>
                                <CopilotStep
                                    text="Scan atau arahkan Camera pada Stand Meter Anda"
                                    order={1}
                                    name="SatuUnique"
                                    >
                                    <CustomCopilot marginTop={15} width={113} height={141}/>
                                    </CopilotStep>
                                <TouchableOpacity onPress={()=>navigation.navigate('Scan')}>
                                    <Image source={require('../../assets/icon/iconQR.png')} style={{width:113, height:129}} />
                                </TouchableOpacity>
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

                        <Distance distanceV={5}/>
                        <View style={{backgroundColor:'#C4C4C4', height:2, width:'80%'}}></View>
                        <Distance distanceV={5}/>
                        <Text style={styles.text}>Atau</Text>
                        <View style={{width:'100%', alignItems:'center'}}>
                            <CopilotStep
                                text="Masukan No Handphone yang telah terdaftar sebagai Pelanggan"
                                order={2}
                                name="DuaUnique"
                                >
                                <CustomCopilot marginTop={38}/>
                            </CopilotStep>

                            <TextInput title='Phone' />
                                <Input
                                    value = {form.phone !== null ? form.phone : null}
                                    placeholder="Phone"
                                    onChangeText = {(value) => handleForm('phone', value)}
                                    // value={route.params ? route.params.dataId:''}
                                    keyboardType='number-pad'
                                />
                         </View>
                         <Distance distanceV={5}/>
                         <View style={{width:'100%', alignItems:'center'}}>
                            <CopilotStep
                                    text="Permohonan ganti telepon digunakan jika no telepon yang terdaftar sudah diganti dengan yang baru"
                                    order={3}
                                    name="TigaUnique"
                                    >
                                    <CustomCopilot marginTop={27} width={'70%'} height={38}/>
                            </CopilotStep>
                            <TouchableOpacity onPress={()=> navigation.navigate('ChangePhone')}>
                                 <Text style={styles.ChangePhone}>Permohonan Ganti No Telepon</Text>
                            </TouchableOpacity>
                         </View>
                         <Distance distanceV={5}/>
                         <View style={{width:'100%', alignItems:'center'}}>
                            <CopilotStep
                                text="Masukan Password, untuk pertama kali gunakan password = 123456, untuk selanjutnya dapat disesuaikan"
                                order={4}
                                name="EmpatUnique"
                                >
                                <CustomCopilot marginTop={38}/>
                            </CopilotStep>
                            <TextInput title='Password' />
                            <Input
                                placeholder="Pasaword"
                                onChangeText = {(value) => handleForm('password', value)}
                                // value={route.params ? route.params.dataId:''}
                                secureTextEntry = {true}
                            />
                        </View>
                        <View style={{width:'80%', flexDirection:'row', justifyContent:'flex-end'}}>
                            <CopilotStep
                                text="Klik tombol Login dan pastikan no handphone dan password sudah benar"
                                order={5}
                                name="LimaUnique"
                                >
                                <CustomCopilot marginTop={38} width={'35%'} height={40}/>
                            </CopilotStep>
                        <In
                            title="Login"
                            onPress={handleAction}
                        />
                         </View>

                        <Distance distanceV={5}/>
                        <View style={{backgroundColor:'#C4C4C4', height:2, width:'80%'}}></View>
                        <Distance distanceV={5}/>
                        <Text style={styles.text}>Atau</Text>
                        <Distance distanceV={5}/>
                        <View style={{width:'80%', alignItems:'center'}}>
                            <CopilotStep
                                text="Bagi yang bukan pelanggan dapat mengakses menu ini"
                                order={6}
                                name="EnamUnique"
                                >
                                <CustomCopilot marginTop={18} width={181} height={151}/>
                                </CopilotStep>
                            <TouchableOpacity onPress={()=>navigation.navigate('Public')}>
                                <Image source={require('../../assets/img/MasyarakatUmum.png')} style={{width:181, height:131}} />
                            </TouchableOpacity>
                        </View>
                       
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
        top:-80,
        paddingVertical : 35,
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
    },
    ChangePhone:{
        fontSize:16,
        color:'#F11F1F',
        textDecorationLine: 'underline',
    }
    
});
const style = {
    backgroundColor: "white",
    borderRadius: 2,
    borderColor:'#137FC2',
    borderWidth:1
  };
export default copilot({
    overlay: "svg", // or 'view'
    animated: true, // or false
    tooltipStyle: style
  })(Login);