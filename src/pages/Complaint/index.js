import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { ButtonAdd, Footer, Header2, IconDetail, Spinner, Title } from '../../component';
import API from '../../service';
import { colors } from '../../utils/colors';
import Distance from '../../utils/distance';

const TextInfo = (props) => {
    return (
        <View style={{ paddingBottom: 5 }}>
            <View style={{ flexDirection: 'column', height: 'auto' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.textTiltle}>{props.title}</Text>
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.textTiltle}>:</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.textItem}>{props.item}</Text>
                </View>
            </View>
        </View>
    )
}
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HistoryComplaint = ({ navigation }) => {
    const TOKEN = useSelector((state) => state.TokenReducer);
    const USER = useSelector((state) => state.UserReducer);
    const [ticket, setTicket] = useState(null)
    const [loading, setLoading] = useState(true)
    const isFocused = useIsFocused();
    const [loadingImage, setLoadingImage] = useState(true)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // wait(2000).then(() => setRefreshing(false));
        API.tickets(USER.id, TOKEN).then((result) => {
            setTicket(result.data)
            console.log('nilai ticket', result.data)
        }).catch((e) => {
            console.log(e.request);
        }).finally(() => setRefreshing(false))

    }, []);


    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            ticketsAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])


    const ticketsAPi = () => {
        API.tickets(USER.id, TOKEN).then((result) => {
            setTicket(result.data)
            setLoading(false)
            // console.log('nilai token', TOKEN)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })

    };





    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Header2 />
                <View style={{ paddingLeft: 10 }}>
                    <Title
                        title="History Pengaduan"
                    />
                    <View>

                    </View>
                    <ButtonAdd
                        title="Buka Tiket"
                        width='60%'
                        icon={faPlusCircle}
                        onPress={() => navigation.navigate('Complaint')}
                    // onPress={()=>console.log('data ini', ticket)}
                    />
                    <Distance distanceV={10} />
                </View>
                {ticket && ticket.map((item, index) => {
                    const imagefoto = item.ticket_image.length > 0 ? (JSON.parse(item.ticket_image[0].image)[0]) : null
                    var colorStatus = '';
                    var borderStatus = '';
                    if (item.status == 'active') {
                        var colorStatus = '#7DE74B';
                        var borderStatus = '#CAFEC0'

                    } else if (item.status == 'pending') {
                        var colorStatus = '#F0D63C';
                        var borderStatus = '#FFF6C2'
                    } else {
                        var colorStatus = '#2392D7';
                        var borderStatus = '#CFEDFF'
                    }
                    return (

                        <View style={{ alignItems: 'center' }} key={index}>
                            <View style={{ backgroundColor: colorStatus, width: 200, height: 35, borderTopRightRadius: 15, borderTopLeftRadius: 15, alignItems: 'center' }}>
                                <Text style={styles.textStatus}>{item.status}</Text>
                            </View>
                            <View style={[styles.content, { borderColor: borderStatus }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 200, justifyContent: 'center' }}>
                                        <ImageBackground source={require('../../assets/img/ImageFotoLoading.png')} style={{ flex: 1, height: 200 }} >
                                            {/* {loadingImage && <Image source={require('../../assets/img/ImageFotoLoading.png')} style={{width:150, height:200}}/>} */}
                                            <Image
                                                source={{ uri: Config.REACT_APP_BASE_URL + `${String(imagefoto).replace('public/', '')}` }}
                                                style={{ flex: 1 }}
                                                onLoadEnd={() => setLoadingImage(false)}
                                                onLoadStart={() => setLoadingImage(true)}
                                            />
                                        </ImageBackground>
                                    </View>
                                    <View style={[styles.textnfo, { flex: 1 }]}>
                                        <TextInfo title='Tanggal' item={item.created_at} />
                                        <TextInfo title='Nama' item={item.customer.namapelanggan} />
                                        <TextInfo title='Code' item={item.code} />
                                        <TextInfo title='Kategori' item={item.category.name} />
                                        <TextInfo title='Deskripsi' item={item.description} />
                                        <TextInfo title='Memo Pengerjaan' item={item.action.length > 0 ? item.action[item.action.length - 1].memo : null} />
                                    </View>
                                </View>
                                <View style={{ backgroundColor: '#f4f4f4', width: '100%', height: 2, marginVertical: 5 }}></View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', width: '15%', height: 'auto' }}>
                                        <IconDetail onPress={() => (navigation.navigate('ShowComplaint', { item: item }))} />
                                    </View>
                                </View>
                            </View>
                            <Distance distanceV={10} />
                        </View>
                    )
                })}

            </ScrollView>
            <Footer
                focus="Complaint"
                navigation={navigation}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    content: {
        borderWidth: 3,
        width: Dimensions.get('screen').width - 45,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff'
        // marginVertical : 20
    },
    search: {
        backgroundColor: '#ffffff',
        width: '60%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 20
    },
    textnfo: {
        paddingHorizontal: 10,
    },
    textTiltle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#696969'
    },
    textItem: {
        fontSize: 15,
        color: '#696969'
    },
    textStatus: {
        color: '#FFFFFF',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        paddingTop: 5
    },
});
export default HistoryComplaint