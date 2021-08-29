import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Config from 'react-native-config';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Spinner, TextInput, Title, VideoPlayer } from '../../component';
import Distance from '../../utils/distance';




const Show =({navigation,route})=>{
    const data = route.params.item
    const [loading, setLoading] = useState(false)
    const [onFullScreen, setOnFullScreen] = useState(false)
    const [onFullScreenImage, setOnFullScreenImage] = useState(false)
    const [loadingImage, setLoadingImage] = useState(true)
    const [loadingVideo, setLoadingVideo] = useState(false)
    const [image, setImage] = useState( data.ticket_image.length > 0 ? JSON.parse(data.ticket_image[0].image) : null)

    const [showImage, setShowImage] = useState(false)
    const [ShowImagePengerjaan, setShowImagePengerjaan] = useState(false)
    const [images, setImages] = useState([]);

    const [imagesPengerjaan, setImagesPengerjaan] = useState([]);
    const [panjang,setPanjang]= useState(data.action.length) ;
    // const [imagePengerjaan,setimagePengerjaan] = useState(data.action.length > 0 ? JSON.parse(data.action[panjang-1].image) : null )
    const [imagePengerjaan,setimagePengerjaan] = useState(data.action.length > 0 ? (data.action[panjang-1].image != null && data.action[panjang-1].image !='' ?    JSON.parse(data.action[panjang-1].image) : null) : null )



    // const imagepengerjaan = data.action.length >0 ? (JSON.parse(data.action[0].image)[0]): null

    useEffect(() => {
      if(image != null){
        image.map((item, index) => {
            images.push({
             url: Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`,
            })
        })
 
      }
    console.log('images looping', images);
       setLoading(false)
       
    }, [])

    useEffect(() => {
        if(imagePengerjaan != null){
          imagePengerjaan.map((item, index) => {
              imagesPengerjaan.push({
               url: Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`,
              })
          })
   
        }
         setLoading(false)
      }, [])

    return(
        <View style={styles.container}>
            {onFullScreen && <View style={{width:'100%', height:'100%'}} >
                <VideoPlayer
                    src={{uri :  Config.REACT_APP_BASE_URL + `${String(data.video).replace('public/', '')}` }}
                    onFullScreen = {() => setOnFullScreen (false)}
                    onLoad={() => {setLoadingVideo(loadingVideo ? false : true); return loadingVideo}}         
                  />
            {loading &&  <Spinner/>}
            </View>}
             
            <ScrollView>
            <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}></View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
                    <View style={{alignItems:'center'}}>
                        <View style={styles.boxShadowBanner}>
                            <View style={{alignItems:'center',paddingVertical:10}}>
                                <Title title="Detail Tiket"/>
                                <Distance distanceV={5}/>
                                <View style={{flexDirection:'row', width:'80%'}}>
                                    <View >
                                        <TextInput title="Tanggal " fontWeight='bold'/>
                                    </View>
                                    <View style={{width:'60%'}}>
                                        <Text style={styles.text} >: {data.created_at}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row', width:'80%'}}>
                                    <View >
                                        <TextInput title="Nama Pelanggan " fontWeight='bold'/>
                                    </View>
                                    <View style={{width:'60%'}}>
                                        <Text style={styles.text} >: {data.customer.namapelanggan}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row', width:'80%'}}>
                                    <View >
                                        <TextInput title="Keluhan" fontWeight='bold'/>
                                    </View>
                                    <View style={{width:'60%'}}>
                                        <Text style={styles.text} >: {data.title}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row', width:'80%'}}>
                                    <View >
                                        <TextInput title="Kategori" fontWeight='bold'/>
                                    </View>
                                    <View style={{width:'60%'}}>
                                        <Text style={styles.text}>: {data.category.name}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row', width:'80%'}}>
                                        <View>
                                            <TextInput title="Keterangan" fontWeight='bold'/>
                                        </View>
                                        <View style={{width:'60%'}}>
                                            <Text style={styles.text} >: {data.description}</Text>
                                        </View>
                                    </View>
                                    <TextInput title="Foto Keluhan" fontWeight='bold'/>
                                    
                                    <Modal visible={showImage} transparent={true} enablePreload={true}
                                        onRequestClose={() => setShowImage(false)}
                                        onDoubleClick={() => setShowImage(true)}
                                    >
                                        <ImageViewer imageUrls={images}/>
                                    </Modal>
                                    <View style={{width:'80%'}}>
                                        <TouchableHighlight onPress ={image != null ? () =>{ setShowImage(true);console.log(images);} : null}>
                                        <ScrollView style={{flexDirection:'row',}}horizontal={true}>
                                        <ImageBackground source={require('../../assets/img/ImageFotoLoading.png') } style={{ height : 220, width : 280}} >
                                            {image && image.map((item,index) => {
                                                    return (
                                                    
                                                        <View style={{marginVertical:5}}>
                                                            <Image
                                                                key={index}
                                                                onLoadEnd={() => {setLoadingImage(false); console.log('end');}}
                                                                source = {{uri : Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`}}
                                                                style={{height: 220, width: 280, marginRight: 10, resizeMode : 'stretch'}}
                                                            /> 
                                                        </View>
                                                    )
                                                })} 
                                        </ImageBackground>
                                        </ScrollView>  
                                        </TouchableHighlight>
                                    </View>

                                    <TextInput title="Video Keluhan" fontWeight='bold'/>
                                    <View style={{width:'80%', height:220}}>
                                        {!loadingVideo && <Text style={{fontSize : 17}}>Video Loading...</Text>}
                                        <VideoPlayer
                                            src={{uri :  Config.REACT_APP_BASE_URL + `${String(data.video).replace('public/', '')}` }}
                                            onFullScreen = {() => setOnFullScreen (true)}
                                            onLoad={() => {setLoadingVideo(loadingVideo ? false : true); return loadingVideo}} 
                                            poster="https://somesite/thumb.png"
                                            
                                        />
                                    </View>
                                    <View style={{flexDirection:'row', width:'80%'}}>
                                        <View >
                                            <TextInput title="Deskripsi Pengerjaan" fontWeight='bold'/>
                                        </View>
                                        <View style={{width:'60%'}}>
                                            <Text style={styles.text} >: {data.action.length >0 ? data.action[panjang-1].description :null}</Text>
                                        </View>
                                    </View>

                                    <TextInput title="Foto Pengerjaan" fontWeight='bold'/>

                                    <Modal visible={ShowImagePengerjaan} transparent={true} enablePreload={true}
                                        onRequestClose={() => setShowImagePengerjaan(false)}
                                        onDoubleClick={() => setShowImagePengerjaan(true)}
                                    >
                                        <ImageViewer imageUrls={imagesPengerjaan}/>
                                    </Modal>
                                    <View style={{width:'80%'}}>
                                        <TouchableHighlight onPress ={imagePengerjaan != null ? () =>{ setShowImagePengerjaan(true);} : null}>
                                        <ScrollView style={{flexDirection:'row',}}horizontal={true}>
                                        <ImageBackground source={require('../../assets/img/ImageFotoLoading.png') } style={{ height : 220, width : 280}} >
                                            {imagePengerjaan && imagePengerjaan.map((item,index) => {
                                                    return (
                                                        <View style={{marginVertical:5}}>
                                                            <Image
                                                                key={index}
                                                                onLoadEnd={() => {setLoadingImage(false); console.log('end');}}
                                                                source = {{uri : Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`}}
                                                                style={{height: 220, width: 280, marginRight: 10, resizeMode : 'stretch'}}
                                                            /> 
                                                        </View>
                                                    )
                                                })} 
                                        </ImageBackground>
                                        </ScrollView>  
                                        </TouchableHighlight>
                                    </View>

                                   
                                    {/* <TextInput title="Foto Pengerjaan" fontWeight='bold'/>
                                  
                                        <Image
                                        key={ data.action.length >0? Config.REACT_APP_BASE_URL + `${String(imagepengerjaan).replace('public/', '')}` : require('../../assets/img/ImageFoto.png')}
                                            source={ data.action.length >0?{ uri: Config.REACT_APP_BASE_URL + `${String(imagepengerjaan).replace('public/', '')}`} : require('../../assets/img/ImageFoto.png') }
                                            style={{ height : 220, width : 280 }} 
                                        />
                                 */}
                                    <Distance distanceV={5}/>
                                <Distance distanceV={20}/>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
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
    height:'100%',
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
  },
text:{
    paddingVertical:10,
    fontSize:15
}
})
export default Show