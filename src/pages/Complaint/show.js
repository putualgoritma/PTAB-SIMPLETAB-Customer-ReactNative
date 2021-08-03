import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity,Touchable, View,Modal, TouchableHighlight } from 'react-native'
import Config from 'react-native-config'
import { Footer, Spinner, TextInput, Title, VideoPlayer,Input } from '../../component'
import Distance from '../../utils/distance';
import ImageViewer from 'react-native-image-zoom-viewer';




const Show =({navigation,route})=>{
    const data = route.params.item
    const [loading, setLoading] = useState(false)
    const [onFullScreen, setOnFullScreen] = useState(false)
    const [onFullScreenImage, setOnFullScreenImage] = useState(false)
    const [loadingImage, setLoadingImage] = useState(true)
    const [loadingVideo, setLoadingVideo] = useState(false)
    const [image, setImage] = useState(JSON.parse(data.ticket_image[0].image))
    const [showImage, setShowImage] = useState(false)
    const [images, setImages] = useState([]);
    useEffect(() => {
       image.map((item, index) => {
           images.push({
            url: Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`,
           })
       })

    console.log('images looping', images);
       setLoading(false)
       
    }, [])
    return(
        <View style={styles.container}>
      
            {loading &&  <Spinner/>}
             
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
                                    <TextInput title="Foto :"/>
                                    <Modal visible={showImage} transparent={true} enablePreload={true}
                                        onRequestClose={() => setShowImage(false)}
                                        onDoubleClick={() => setShowImage(true)}
                                    >
                                        <ImageViewer imageUrls={images}/>
                                    </Modal>
                                    <View style={{width:'80%'}}>
                                    <TouchableHighlight onPress ={() =>{ setShowImage(true);console.log(images);}}>
                                    <ScrollView style={{flexDirection:'row',}}horizontal={true}>
                                    {loadingImage &&<Image source={require('../../assets/img/ImageFotoLoading.png')} style={{width:150, height:200}}/>}
                                        {image.map((item,index) => {
                                                return (
                                                   
                                                    <View style={{marginVertical:5}}>
                                                        <Image
                                                            key={index}
                                                            onLoadEnd={() => {setLoadingImage(false); console.log('end');}}
                                                            source = {{uri : Config.REACT_APP_BASE_URL + `${String(item).replace('public/', '')}`}}
                                                            style={{height: 220, width: 260, marginRight: 10, resizeMode : 'stretch'}}
                                                            // loadingIndicatorSource={require('../../assets/img/ImageFotoLoading.png')}
                                                            onLoadEnd={() => setLoadingImage(false)}
                                                            onLoadStart={() => setLoadingImage(true)}
                                                        /> 
                                                    </View>
                                                )
                                            })} 
                                     </ScrollView>  
                                    </TouchableHighlight>
                                    </View>
                                  
                                    <TextInput title="Video :" />
                                    <View style={{width:'80%', height:220}}>
                                        {!loadingVideo && <Text style={{fontSize : 17}}>Video is Loading...</Text>}
                                        <VideoPlayer
                                            src={{uri :  Config.REACT_APP_BASE_URL + `${String(data.video).replace('public/', '')}` }}
                                            onFullScreen = {() => setOnFullScreen (true)}
                                            onLoad={() => {setLoadingVideo(loadingVideo ? false : true); return loadingVideo}} 
                                            poster="https://somesite/thumb.png"
                                            
                                        />
                                    </View>
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