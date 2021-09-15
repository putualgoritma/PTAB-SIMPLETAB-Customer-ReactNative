import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    PermissionsAndroid, ScrollView, StyleSheet,
    View
} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { useSelector } from 'react-redux';
import {
    Button, Footer, Spinner, TextArea, TextInput, Title
} from '../../component';
import API from '../../service';


const Complaint =({navigation})=>{
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] =useState('')
    const [statusGps, setStatusGps] = useState('disabled')


    const [form, setForm] = useState({
        description : '',
        lat : '',
        lng : ''
        
    })


    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            setLoading(true)

            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                ok: "YES",
                cancel: "NO",
            }).then(function(success) { 
                Promise.all([requestLocationPermission()]).then((res) => {
                    // setCategories(res[0].data)
                    Geolocation.getCurrentPosition(
                        (position) => {
                            console.log('posisi',position);
                            //  positionNew = position;
                             setForm({
                                 ...form,
                                 lat : position.coords.latitude,
                                 lng : position.coords.longitude 
                             })
                            console.log( typeof (position.coords.latitude));
                        //    return position;
                            // setSuccess(true)
                            setLoading(false)
                        },
                        (error) => {
                            console.log(error);    
                            setLoading(false)
                        },
                            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                        );
                }).catch((e) => {
                    console.log(e.request);
                    setLoading(false)
                })
            }).catch((error) => {
          
                setStatusGps(error.message); 
                setLoading(false)
            });
       }
    }, [])

    const permissionGps = () => {
        var positionNew = null;
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
          }).then(function(success) {
                setStatusGps(success.status)
                requestLocationPermission().then(() => {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            console.log('posisi',position);
                             positionNew = position;
                             setForm({
                                 ...form,
                                 lat : position.coords.latitude,
                                 lng : position.coords.longitude 
                             })
                            setLocation({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude, 
                            })
                            console.log( typeof (position.coords.latitude));
                        //    return position;
                            setSuccess(true)
                            setLoading(false)
                        },
                        (error) => {
                            console.log(error);    
                        },
                            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                        );
                })
          }).catch((error) => {
              console.log(error.message); // error.message => "disabled"
              setStatusGps(error.message)
              setLoading(false)
            //   navigation.navigate('Register')
          });

          return true;
    }

    const requestLocationPermission =  async () => {
        let info ='';
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                'title': 'Location Permission',
                'message': 'MyMapApp needs access to your location'
              }
            )
    
           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //   setEnableLocation(true)
           } else {
            //   setEnableLocation(false)
           }
        } catch (err) {
            info=1
        }
      }
    


    const handleFrom = (key , value) => {
        setForm({
            ...form,
            [key] : value
        })
    }

    const handleAction = () => {
            setLoading(true)
        if(statusGps =='disabled' ){
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                ok: "YES",
                cancel: "NO",
            }).then(function(success) { 
                setStatusGps(success.status)
                Promise.all([requestLocationPermission()]).then((res) => {
                    // console.log('corrrrrr',res);
                    Geolocation.getCurrentPosition(
                    (position) => {
                        // positionNew = position
                        console.log( 'posisiisii ', (position.coords.latitude));
                        setForm({
                            ...form,
                            lat : position.coords.latitude,
                            lng : position.coords.longitude
                        })
                       handleData(position)
                    },
                    (error) => {
                        console.log(error);    
                        setLoading(false)
                    },
                        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, accuracy : 'high'},
                    );
                }).catch((e) => {
                    console.log(e);
                    setLoading(false)
                })
            }).catch((error) => {
                console.log(error.message); // error.message => "disabled"
                //   navigation.navigate('Register')
                setStatusGps(error.message)
                setLoading(false)
            });
        }else{
            handleData()
        }

        // if(form.description != '' && form.lat != '' && form.lng !=''){
        //     navigation.navigate('Proof', {form : form})
        // }else{
        //     alert ('data belum lengkap')
        // }
        // console.log(selectedItem);
    }

    const handleData=(position=null) => {
        let dataUpload=[];
        let data = form;
        if(position!=null){
            data.lat= position.coords.latitude
            data.lng= position.coords.longitude 
          }
        if(data.description != '' && data.lat != '' && data.lng !=''){
            navigation.navigate('Proof', {form : data})
        }else{
            alert ('data belum lengkap')
        }
    }


    return(
        <View style={styles.container}> 
                {loading &&  <Spinner/>}
            <View style={{flex : 1}} >
                <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}/>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadowBanner}>
                  
                        <View style={{alignItems:'center',paddingVertical:10}}>
                            <Title
                                title="Pengaduan"
                            />                            

                            <ScrollView style={{width : '100%'}} >
                                <View style={{alignItems : 'center'}}>
                                    <TextInput
                                        title="Keterangan"
                                    />
                                    <TextArea
                                        placeholder="Keterangan"
                                        onChangeText = {value => handleFrom('description', value)}
                                    />

                                    <View style={{marginVertical : 10}} />

                                    <Button
                                        title="Lanjut"
                                        onPress={handleAction}
                                        // onPress={() => console.log(selectedItem)}
                                    />
                               </View>
                            </ScrollView>
                        </View>
                    
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <Footer
                navigation = {navigation}
                focus = 'Complaint'
            />
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
        height:550,
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
        height:550
      },
});
export default Complaint