import React, { useEffect, useState } from 'react'
import Distance from '../../utils/distance';
import { ImageBackground, ScrollView, StyleSheet, PermissionsAndroid, Image, Text, TouchableOpacity, Alert, View } from 'react-native';
import { Button, ButtonIcon, Input, TextArea, TextInput, Title, Spinner } from '../../component';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { launchCamera } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
import API from '../../service';


const ResetPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        phone: '',
    })

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const handleAction = () => {
        if (form.phone != null && form.phone != '') {
            setLoading(true)
            API.reset(form).then((result) => {
                console.log(result);
                if (result.success) {
                    setLoading(false)
                    alert(result.message)
                    navigation.navigate('Login')
                } else {
                    alert(result.message)
                    setLoading(false)
                }
            }).catch((e) => {
                console.log(e);
                alert('No. Telfon tidak teregistrasi atau tidak dikenali.')
                setLoading(false)
            })
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
                            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                                <Title title="Reset Password" />
                                <Distance distanceV={15} />
                                <TextInput title="No Telepon" />
                                <Input
                                    placeholder="Masukan No Telepon"
                                    value={form.phone}
                                    width='90%'
                                    onChangeText={(value) => handleForm('phone', value)}
                                />
                                <Distance distanceV={15} />
                                <Button title="Reset"
                                    onPress={() => Alert.alert(
                                        'Peringatan',
                                        `Reset Password ? `,
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
})
export default ResetPassword