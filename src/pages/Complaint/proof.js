import { faCamera, faPlus, faPlusCircle, faTrash, faUndo, faVideo } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    PermissionsAndroid,
    Image,
    Video,
    Alert,
    Text,
    TouchableOpacity
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import {
    Footer,
    Title,
    ButtonIcon,
    TextInput,
    Button,
    VideoPlayer,
    Spinner,
} from '../../component';
import RNFetchBlob from 'react-native-fetch-blob';
import { colors } from '../../utils/colors';
import Distance from '../../utils/distance';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ButtonImage = (props) => {
    const [qty, setQty] = useState(1)
    const [show, setShow] = useState(true)
    var myloop = [];
    for (let index = 0; index < qty; index++) {
        myloop.push(
            <View key={index}>
                <View style={{ alignItems: 'center', paddingVertical: 10, height: 210 }}>
                    <TextInput
                        title="Foto"
                    />
                    <Image
                        style={{ width: '80%', height: 150 }}
                        source={props.dataImage[index] == null ? require('../../assets/img/ImageFoto.png') : { uri: props.dataImage[index].uri }}
                    />

                </View>
                {props.dataImage[index] == null &&
                    <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                        <ButtonIcon
                            onPress={() => { props.Image(); props.dataImage ? setShow(false) : null }}
                            backgroundColor='#1DA0E0'
                            title="Ambil Foto"
                            width="80%"
                            icon={faCamera}
                        />
                    </View>}
            </View>
        );

    }

    return (

        <View >
            {myloop}
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                    {(props.dataImage[qty - 1] != null) &&
                        <TouchableOpacity style={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.success, paddingHorizontal: 10, borderRadius: 5 }} onPress={() => { setQty(qty + 1); setShow(true) }}>
                            <FontAwesomeIcon icon={faPlusCircle} size={20} color={'#FFFFFF'} />
                            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginLeft: 3 }}>Tambah</Text>
                        </TouchableOpacity>}
                    <View style={{ marginHorizontal: 3 }} />
                    <TouchableOpacity style={{ backgroundColor: colors.danger, flexDirection: 'row', paddingHorizontal: 10, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => { qty > 1 ? setQty(qty - 1) : alert('data tidak boleh dihapus'); props.deleteImage() }}>
                        <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'} />
                        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginLeft: 3 }}>Delete </Text>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 3 }} />
                    <TouchableOpacity style={{ backgroundColor: colors.detail, flexDirection: 'row', paddingHorizontal: 10, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => { setQty(1); props.resetImage() }}>
                        <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'} />
                        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginLeft: 3 }}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


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

const Proof = ({ navigation, route }) => {

    const TOKEN = useSelector((state) => state.TokenReducer);
    const USER = useSelector((state) => state.UserReducer);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false)
    const data = route.params.form
    // const category = route.params.category
    const [form, setForm] = useState({
        description: data.description,
        lat: data.lat,
        lng: data.lng,
        customer_id: USER.id,
    })

    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            requestCameraPermission()
            console.log(form);
        }
        return () => {
            isAmounted = false
        }
    }, [])

    const [video, setVideo] = useState(null)


    const getImage = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 500,
                maxWidth: 500,
            },
            (response) => {
                if (response.assets) {
                    let dataImage = response.assets[0];
                    setResponses([...responses, dataImage])
                }
            }
        )
    }

    const deleteImage = () => {
        if (responses.length > 1) {
            const lastIndex = responses.length - 1;
            setResponses(responses.filter((item, index) => index !== lastIndex));
        }
    }

    const resetImage = () => {
        if (responses.length > 0) {
            setResponses([]);
        }
    }


    const handleTicket = () => {
        let dataUpload = [];
        let message = 'Mohon lengkapi data';
        let send = false;
        if ((responses.length > 0 || responses.length <= 3) && video !== null) {
            if (video.fileSize <= 50000000) {
                dataUpload =
                    [
                        // name: image adalah nama properti dari api kita
                        {
                            name: 'qtyImage',
                            data: JSON.stringify(responses.length)
                        },
                        {
                            name: 'video',
                            filename: video.fileName,
                            type: 'mp4',
                            data: RNFetchBlob.wrap(video.uri)
                        },
                        {
                            name: 'form',
                            data: JSON.stringify(form)
                        },
                    ];
                send = true
            } else {
                message = 'max video 5mb'
            }

        } else if (responses.length >= 2 && responses.length <= 3) {
            dataUpload =
                [
                    // name: image adalah nama properti dari api kita
                    {
                        name: 'qtyImage',
                        data: JSON.stringify(responses.length)
                    },
                    {
                        name: 'form',
                        data: JSON.stringify(form)
                    },
                ];
            send = true;

        }

        let dataQtyImage = 1;
        for (let index = 0; index < responses.length; index++) {
            dataUpload.push(
                {
                    'name': 'image' + dataQtyImage,
                    'filename': responses[index].fileName,
                    'data': responses[index].base64
                }
            )
            dataQtyImage++;
        }

        if (form.description != '') {

            if (send) {
                setLoading(true)
                RNFetchBlob.fetch(
                    'POST',
                    'https://simpletabadmin.ptab-vps.com/api/close/customer/ticket/store',
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
                if (video != null && responses.length < 1) {
                    message = 'mohon gambar diisi min 1'
                }
                if (video == null && responses.length <= 2) {
                    message = 'Mohon isi gambar min 2 jika tidak tersedia video'
                }
                if (video == null && responses.length >= 3) {
                    message = 'Max upload 3 gambar'
                }

                alert(message)
            }
        } else {
            alert('Mohon Lengkapi data')
        }

    }
    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 165 }}>
                </View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.boxShadowBanner}>

                            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                                <Title
                                    title="Bukti Laporan"
                                />
                            </View>

                            {/* image */}

                            <ButtonImage Image={getImage} dataImage={responses} deleteImage={() => deleteImage()} resetImage={() => resetImage()} />


                            <View style={{ paddingVertical: 10, paddingHorizontal: 30, height: 220 }}>
                                <TextInput
                                    title="Video"
                                />
                                {video == null && (
                                    <View style={{ alignItems: 'center' }}>
                                        <Image source={require('../../assets/img/ImageVideo.png')} style={{ width: '90%', height: 150 }} />
                                    </View>
                                )}
                                {video && (
                                    <VideoPlayer
                                        src={{ uri: video.uri }}
                                    />
                                )}
                            </View>
                            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                                <ButtonIcon
                                    backgroundColor='#1DA0E0'
                                    title="Ambil Video"
                                    width="80%"
                                    icon={faVideo}
                                    onPress={
                                        () => Alert.alert(
                                            'Peringatan',
                                            `Video tidak boleh lebih besar dari 10mb ! `,
                                            [
                                                {
                                                    text: 'Tidak',
                                                    onPress: () => console.log('tidak')
                                                },
                                                {
                                                    text: 'Ya',
                                                    // onPress : () => {generateCodeOTP(); setModalVisible(true)}
                                                    onPress: () => {
                                                        launchCamera(
                                                            {
                                                                mediaType: 'video',
                                                                quality: 1,
                                                                videoQuality: 'law'
                                                                // includeBase64: true 
                                                            },
                                                            (response) => {
                                                                if (response.assets) {
                                                                    setVideo(response.assets[0]);
                                                                    setForm({
                                                                        ...form,
                                                                        video: response.assets[0].fileName
                                                                    })
                                                                    console.log(response.assets[0]);
                                                                }
                                                            })
                                                    }
                                                }
                                            ]
                                        )
                                    }
                                />
                            </View>
                            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                                <Button
                                    title="Kirim Tiket"
                                    // navigation={()=>navigation.navigate('Heandling')}
                                    // onPress={() => console.log(responses)}
                                    onPress={handleTicket}

                                />
                            </View>
                            <Distance distanceV={20} />
                        </View>
                    </View>
                </ImageBackground>


            </ScrollView>
            <Footer
                navigation={navigation}
                focus='Complaint'
            />
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
        height: 'auto',
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
        height: 'auto'
    },
});
export default Proof