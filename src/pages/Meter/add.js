import { faCamera, faImages } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ImageBackground, PermissionsAndroid, Image, Text } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Footer, Button, Title, Input, TextInput, TextArea, ButtonIcon, ImageFoto, Spinner } from '../../component';
import Distance from '../../utils/distance'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from '@react-native-community/geolocation';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';

const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Cool Photo App Camera Permission",
                message:
                    "Cool Photo App needs access to your camera " +
                    "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
        } else {
            console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

const AddMeter = ({ navigation }) => {
    const background = require('../../assets/img/BackgroundInput.png')
    const [response, setResponse] = React.useState([]);
    const [image, setImage] = useState({
        name: null,
        filename: null,
        data: null
    })

    const [loading, setLoading] = useState(false)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const USER = useSelector((state) => state.UserReducer);
    const [success, setSuccess] = useState(false)
    const [location, setLocation] = useState({
        latitude: 0.00000,
        longitude: 0.0000
    })
    var defaultLoc = {};

    const [form, setForm] = useState({
        norek: USER.code,
        wmmeteran: 0,
        namastatus: '-',
        opp: 'MANDIRI',
        lat: 0,
        lng: 0,
        accuracy: 0,
        operator: 'MANDIRI',
        nomorpengirim: USER.phone,
        statusonoff: 'on',
        description: '',
    })

    useEffect(() => {
        requestCameraPermission()
        let isAmounted = true
        if (isAmounted) {
            setLoading(true)
            Promise.all([permissionGps()]).then((res) => {
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
        }).then(function (success) {
            requestLocationPermission().then(() => {
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log('posisi', position);
                        positionNew = position;
                        setForm({
                            ...form,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        })
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        })
                        defaultLoc = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        }
                        console.log(typeof (position.coords.latitude));
                        //    return position;
                        setSuccess(true)
                        setLoading(false)
                    },
                    (error) => {
                        console.log(error);
                    },
                    { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
                );
            })
        }).catch((error) => {
            console.log(error.message); // error.message => "disabled"
            //   navigation.navigate('Register')
        });

        return true;
    }

    const requestLocationPermission = async () => {
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

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const handleTest = () => {
        console.log("Handle", form)
    }

    const handleCtm = () => {
        let dataUpload = [];
        let message = 'Mohon lengkapi data';
        let send = false;
        if (Object.keys(response).length > 0 && form.wmmeteran > 0 && form.norek != '' && form.lng != '') {
            dataUpload =
                [
                    {
                        name: 'image',
                        filename: image.filename,
                        data: image.data
                    },
                    {
                        name: 'form',
                        data: JSON.stringify(form)
                    },
                ];
            send = true
        }
        // console.log("image", image)
        // console.log("dataUpload", dataUpload)

        if (send) {
            setLoading(true)
            RNFetchBlob.fetch(
                'POST',
                'https://simpletabadmin.ptab-vps.com/api/close/customer/ctm/prev',
                {
                    Authorization: `Bearer ${TOKEN}`,
                    otherHeader: 'foo',
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                dataUpload
                    ,
            ).then((result) => {
                setLoading(false)
                let data = JSON.parse(result.data);
                console.log(result);
                alert(data.message)
                navigation.navigate('Menu')
            }).catch((e) => {
                console.log(e);
                setLoading(false)
            })
        } else {
            alert(message)
        }

    }

    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            <ImageBackground source={background} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 100 }}></View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: '90%' }}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <View style={{ alignItems: 'center' }}>
                                        <Title title="Meter Mandiri" width='90%' />
                                        <TextInput title="ID Pelanggan" width='90%' />
                                        <Input
                                            placeholder="ID Pelanggan"
                                            editable={false}
                                            value={form.norek}
                                            width='90%'
                                            onChangeText={(value) => handleForm('norek', value)}
                                        />
                                        <TextInput title="Stand Meter" width='90%' />
                                        <Input
                                            placeholder="00000"
                                            keyboardType='number-pad'
                                            width='90%'
                                            onChangeText={(value) => handleForm('wmmeteran', value)}
                                        />
                                        <TextInput title="Foto" width='90%' />
                                        <Image
                                            style={{ width: '90%', height: 150 }}
                                            source={Object.keys(response).length === 0 ? require('../../assets/img/ImageFoto.png') : { uri: response.uri }}
                                        />
                                        <Distance distanceV={10} />
                                        <ButtonIcon
                                            backgroundColor='#1DA0E0'
                                            title="Ambil Foto"
                                            width="90%"
                                            icon={faCamera}
                                            onPress={() => launchCamera(
                                                {
                                                    mediaType: 'photo',
                                                    includeBase64: true,
                                                    maxHeight: 500,
                                                    maxWidth: 500,
                                                },
                                                (response) => {
                                                    if (response.assets) {
                                                        setResponse(response.assets[0]);
                                                        setImage({
                                                            name: 'img',
                                                            filename: response.assets[0].fileName,
                                                            data: response.assets[0].base64
                                                        })

                                                        console.log('ini response', response);
                                                    }
                                                },
                                            )}
                                        />
                                        {/* <TextInput title='Keterangan' width='90%' />
                                        <TextArea
                                            placeholder="Keterangan"
                                            width='90%'
                                            onChangeText={value => handleForm('description', value)}
                                        /> */}
                                        <Distance distanceV={10} />
                                        <Button
                                            title="Kirim"
                                            width='90%'
                                            onPress={handleCtm}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={navigation} focus='Menu' />
            </ImageBackground>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    baseBoxShadow: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    boxShadow: {
        backgroundColor: '#ffffff',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 30,
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
        justifyContent: "center"
    },
});
export default AddMeter