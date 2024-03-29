import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image,ImageBackground } from 'react-native';
import { ButtonAdd, Footer, Header2, IconDetail, Table, Title, Spinner } from '../../component';
import Distance from '../../utils/distance';
import { useIsFocused } from '@react-navigation/native';
import API from '../../service';
import { useSelector } from 'react-redux';
import Config from 'react-native-config';

const Aksi = (props) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
            <IconDetail onPress={props.onPress} />
        </View>
    )
}

const Meter = ({ navigation }) => {
    const [ctm, setCtm] = useState(null)
    const isFocused = useIsFocused();
    const TOKEN = useSelector((state) => state.TokenReducer);
    const USER = useSelector((state) => state.UserReducer);
    const [loading, setLoading] = useState(true)
    const [loadingImage, setLoadingImage] = useState(true)

    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            ctmAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    const ctmAPi = () => {
        //alert(USER.code)
        API.ctms(USER.id, TOKEN).then((result) => {
            setCtm(result.data)
            setLoading(false)
            console.log('nilai ctm', result.data)
        }).catch((e) => {
            console.log('error', e);
            setLoading(false)
        })

    };

    return (
        <View style={styles.container}>
            {loading && <Spinner />}            
            <ScrollView>
                <Header2 />                
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Text style={[styles.notify, {fontSize: 16}]}>PERHATIAN!!!</Text>
                <Text style={styles.notify}>
    untuk stand meter hanya di ketik angka yg berwarna hitam saja yg ada di meteran.paling lambat di kirim tanggal 20 bulan ini.</Text>
                    <Title
                        title="STAND METER"
                    />
                    <ButtonAdd
                        title="Baca Meter"
                        width='60%'
                        icon={faTachometerAlt}
                        onPress={() => navigation.navigate('AddMeter')}
                    />
                </View>
                {/* <Table
                        tbhead={['No','Bulan','Pemakaian','Status','Aksi']}
                        tbdata={[
                                ['1','Januari','200.000','Mantap',<Aksi onPress = {() => navigation.navigate('DetailMeter')}/>],
                                ['2','Februari','200.000','Bagus',<Aksi/>],
                                ['3','Januari','200.000','Nice',<Aksi/>],
                            ]}
                        cellindex={5}
                    /> 
             */}
                {ctm && ctm.map((item, index) => {
                    return (
                        <View key={index}>
                            <Distance distanceV={5} />
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#7DE74B', width: 200, height: 35, borderTopRightRadius: 15, borderTopLeftRadius: 15, alignItems: 'center' }}>
                                    <Text style={styles.textStatus}>{item.month}/{item.year}</Text>
                                </View>
                                <View style={{ backgroundColor: '#FFFFFF', width: '90%', borderRadius: 9, borderWidth: 3, borderColor: '#CAFEC0', height: 'auto', padding: 7 }}>
                                    <View style={{ height: 'auto', flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            {/* {loadingImage && <Image source={require('../../assets/img/ImageFotoLoading.png')} style={{ width: 150, height: 150 }} />} */}
                                            { item.status == "approve" &&
                                            <ImageBackground source={require('../../assets/img/ImageFotoLoading.png') } style={{ flex:1, height: 200}} >
                                            <Image
                                                source={{ uri: Config.REACT_APP_ALTERNATIVE_CTM + `${String(item.img)}` }}
                                                style={{ flex: 1 }}
                                                onLoadEnd={() => setLoadingImage(false)}
                                                onLoadStart={() => setLoadingImage(true)}
                                            />
                                                                                    {/* {console.log(item.img)} */}
                                        </ImageBackground>

                                            }
                                             { item.status != "approve" &&
                                            <ImageBackground source={require('../../assets/img/ImageFotoLoading.png') } style={{ flex:1, height: 200}} >
                                                <Image
                                                    source={{ uri: Config.REACT_APP_ALTERNATIVE_CTM + `${String(item.img.replace("/gambar/", "/gambar-test/"))}` }}
                                                    style={{ flex: 1 }}
                                                    onLoadEnd={() => setLoadingImage(false)}
                                                    onLoadStart={() => setLoadingImage(true)}
                                                />
                                                {/* {console.log(item.img.replace("/gambar/", "/gambar-test/"))} */}
                                            </ImageBackground>
                }
                                        </View>
                                        <View style={{ paddingLeft: 8, flex: 1.2, height: 'auto' }}>
                                            <Text style={styles.title}>ID Pelanggan : </Text>
                                            <Text style={styles.data}>{item.norek}</Text>
                                            <Text style={styles.title}>Tgl. Pencatatan</Text>
                                            <Text style={styles.data}>{item.datecatatf3}</Text>
                                            <Text style={styles.title}>Stand Meter</Text>
                                            <Text style={styles.data}>{item.wmmeteran}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 'auto', paddingTop: 5 }}>
                                        <IconDetail onPress={() => navigation.navigate('DetailMeter', {item : item})} />

                                    </View>
                                </View>
                            </View>
                            <Distance distanceV={5} />
                        </View>
                    )
                })}
                <Distance distanceV={15} />
            </ScrollView>
            <Footer
                focus="Menu"
                navigation={navigation}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    textStatus: {
        color: '#FFFFFF',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        paddingTop: 5
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#696969',
        paddingVertical: 5
    },
    notify: {
        fontSize: 15,
        color: '#ff0000',
        paddingVertical: 5,
        textAlign: 'justify',
    },
    data: {
        color: '#696969'
    }
});
export default Meter