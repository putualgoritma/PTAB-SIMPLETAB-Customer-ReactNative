import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Footer1, Header1, In, Input, Out, TextInput, Title } from '../../component';
import Distance from '../../utils/distance';
import { useSelector } from 'react-redux';
import API from '../../service';
import { useIsFocused } from '@react-navigation/native';

const Bill = ({ navigation, route }) => {
    const USER = useSelector((state) => state.UserReducer);
    const [form, setForm] = useState({
        code: USER.code,
    })
    const [loading, setLoading]= useState(false)
    const isFocused = useIsFocused();

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            let code = route.params ? (route.params.code ? route.params.code : null) : null;
            alert(code)
            if (code !== null) {
                setLoading(true)
                API.scanCode({ code: code }).then((result) => {
                    console.log(result);
                    handleForm('code', result.data.code)
                    setLoading(false)
                }).catch((e) => {
                    console.log(e.request);
                    alert('data tidak ada')
                    setLoading(false)
                })
            }
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ScrollView style={{ flex: 1 }}>
                <Header1 />
                <View style={{ alignItems: 'center' }}>
                    <Title
                        title="Cek Tagihan"
                    />
                    <Distance distanceV={10} />
                    <TouchableOpacity onPress={() => navigation.navigate('BillScan')}>
                        <Image source={require('../../assets/icon/iconQR.png')} style={{ width: 113, height: 129 }} />
                    </TouchableOpacity>
                    <TextInput
                        title="ID Pelanggan"
                    />
                    <Input
                        placeholder="Masukan ID Pelanggan"
                        value={form.code}
                        onChangeText={(value) => handleForm('code', value)}
                    />
                    <Distance distanceV={5} />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <In
                            title="Masuk"
                            onPress={() => navigation.navigate('BillList', { form: form })}
                        />
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
});
export default Bill