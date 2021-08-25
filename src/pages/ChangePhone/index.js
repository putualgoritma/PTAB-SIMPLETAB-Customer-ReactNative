import React, { useEffect, useState } from 'react'
import Distance from '../../utils/distance';
import { ImageBackground, ScrollView, StyleSheet, PermissionsAndroid, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, ButtonIcon, Input, TextArea, TextInput, Title, Spinner } from '../../component';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { launchCamera } from 'react-native-image-picker';
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

const ChangePhone = ({ navigation }) => {
    const [response, setResponse] = React.useState(null);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const USER = useSelector((state) => state.UserReducer);
    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState({
        name: null,
        filename: null,
        data: null
    })
    const [form, setForm] = useState({
        norek: USER.code,
        telp: USER.phone,
        alamat: USER.address,
    })

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    useEffect(() => {
        requestCameraPermission()
    }, [])

    const handleButton = () => {
        let dataUpload = [];
        let message = 'Mohon lengkapi data';
        let send = false;
        if (Object.keys(response).length > 0 && form.norek != '' && form.telp != '' && form.alamat != '') {
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
                'https://simpletabadmin.ptab-vps.com/api/open/customer/customerrequests',
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
                navigation.navigate('Login')
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
            <ScrollView>
                <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 165 }}></View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.boxShadowBanner}>
                            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                                <Title title="Ganti Telepon" />
                                <Distance distanceV={15} />
                                <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
                                    <Image source={require('../../assets/icon/iconQR.png')} style={{ width: 113, height: 129 }} />
                                </TouchableOpacity>
                                <TextInput title="Kode Pelanggan" />
                                <Input
                                    placeholder="Masukan Kode Pelanggan"
                                    value={form.norek}
                                    onChangeText={(value) => handleForm('norek', value)}
                                />
                                <TextInput title="No Handphone Baru" />
                                <Input
                                    placeholder="Masukan No Handphone Baru"
                                    value={form.telp}
                                    onChangeText={(value) => handleForm('telp', value)}
                                />
                                <TextInput title="Alamat" />
                                <TextArea
                                    placeholder="Masukan Alamat"
                                    value={form.alamat}
                                    onChangeText={(value) => handleForm('alamat', value)}
                                />
                                <TextInput title="Foto Selfie" />
                                <Image
                                    style={{ width: 145, height: 168 }}
                                    source={response == null ? require('../../assets/img/ImageSelfie.png') : { uri: response.uri }}
                                />
                                <Distance distanceV={5} />
                                <ButtonIcon
                                    backgroundColor='#1DA0E0'
                                    title="Ambil Foto Selfie"
                                    width="80%"

                                    icon={faCamera}
                                    onPress={() => launchCamera(
                                        {
                                            mediaType: 'photo',
                                            includeBase64: true,
                                            maxHeight: 500,
                                            maxWidth: 500,
                                            cameraType: 'front'
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
                                <Distance distanceV={5} />
                                <Distance distanceV={10} />
                                <Button title="Kirim" onPress={handleButton} />
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
    },
})
export default ChangePhone