import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    PermissionsAndroid
  } from 'react-native';
import { useSelector } from 'react-redux';
  import {
    Footer,
    Button,
    Title,
    Input,
    TextInput,
    TextArea,
    Dropdown,
    Spinner,
    Select} from '../../component';
import API from '../../service';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from '@react-native-community/geolocation';
import SearchableDropDown from 'react-native-searchable-dropdown';
import Select2 from "react-native-select-two"

const mockData = [
    { id: 1, name: "React Native Developer", checked: true },
    { id: 2, name: "Android Developer" },
    { id: 3, name: "iOS Developer" }
  ]



const Complaint =({navigation})=>{
    const [categories, setCategories] = useState(null)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] =useState('')
    const [success, setSuccess] = useState(false)
    const [location, setLocation] = useState({
        latitude: 0.00000,
        longitude: 0.0000
    })
    const LATITUDE = -8.3978769;
    const LONGITUDE = 115.2141418;
    var defaultLoc = {};


    const [form, setForm] = useState({
        description : '',
        lat : '',
        lng : ''
        
    })


    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            setLoading(true)
console.log(TOKEN)
            Promise.all([API.categories(TOKEN), permissionGps()]).then((res) => {
                console.log('corrrrrr',res);
                setCategories(res[0].data)
                // if(setSuccess){
                //     setLoading(false)
                // }
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
       }
    }, [])

    const permissionGps = () => {
        var positionNew = null;
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
          }).then(function(success) {
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
                            defaultLoc ={
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude, 
                            }
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
            //   navigation.navigate('Register')
          });

          return true;
    }

    const requestLocationPermission =  async () => {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Location Permission',
              'message': 'MyMapApp needs access to your location'
            }
            )
    
           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               console.log("Location permission granted")
           } else {
               console.log("Location permission denied")
           }
        } catch (err) {
           console.warn(err)
        }
      }
    


    const handleFrom = (key , value) => {
        setForm({
            ...form,
            [key] : value
        })
    }

    const handleAction = () => {
        if(form.description != '' && form.lat != '' && form.lng !=''){
            navigation.navigate('Proof', {form : form})
        }else{
            alert ('data belum lengkap')
        }
        console.log(selectedItem);
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