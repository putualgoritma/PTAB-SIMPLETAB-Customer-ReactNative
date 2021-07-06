import { faCamera, faVideo } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import Config from 'react-native-config'
import { Button, ButtonIcon, Footer, Spinner, TextInput, Title, VideoPlayer } from '../../component'
import { Dimensions } from 'react-native';
const show = ({navigation, route}) => {
    const data = route.params.item
    const [loading, setLoading] = useState(false)
    const [onFullScreen, setOnFullScreen] = useState(false)
    useEffect(() => {
       console.log(data);
    }, [])
    return (
        <View style={styles.container}> 
            {onFullScreen && 
                 <VideoPlayer
                 src={{uri :  Config.REACT_APP_BASE_URL + `${String(data.video).replace('public/', '')}` }}
                 onFullScreen = {() => setOnFullScreen (false)}
             />}
            {loading &&  <Spinner/>}
                {!onFullScreen && 
                    <View>
                        <ScrollView >
                            <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}/>
                
                             <ImageBackground source={require('../../assets/img/background.png')} style={styles.image} >
                            <View style={{alignItems : 'center', paddingBottom:'10%'}}>
                                                    <View style={styles.box}>
                                                        <Title
                                                            title="Bukti Laporan"
                                                        />
                                                        <>
                                                        <TextInput
                                                            title="Code"
                                                        />
                                                        <Text style={styles.text} >{data.code}</Text>
                                                        </>
                                                        <>
                                                            <TextInput
                                                                title="Keluhan"
                                                            />
                                                            <Text style={styles.text} >{data.title}</Text>
                                                        </>
                                                        <>
                                                        <TextInput
                                                            title="Bukti Foto"
                                                        />
                                                        <Image
                                                            source = {{uri : Config.REACT_APP_BASE_URL + `${String(data.image).replace('public/', '')}?time="` + new Date()}}
                                                            style={{height: '28%', width: '100%', marginRight: 20}}
                                                        /> 
                                                        </>
                                                        <>
                                                            <TextInput
                                                                title="Bukti Video"
                                                            />
                                                            <VideoPlayer
                                                                src={{uri :  Config.REACT_APP_BASE_URL + `${String(data.video).replace('public/', '')}` }}
                                                                onFullScreen = {() => setOnFullScreen (true)}
                                                            />
                                                        </>
                                                        <>
                                                            <TextInput
                                                                title="Description"
                                                            />
                                                            <Text style={styles.text} >{data.description}</Text>
                                                        </>
                                                </View>
                                        </View>
                            </ImageBackground>
                        </ScrollView>
        
                        <Footer
                            navigation = {navigation}
                            focus = 'Menu'
                        />
                    </View>
                }
        </View>
    )
}

export default show

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width:'100%',
        height: 1020
      
      },
   
      text : {
        color:'black', 
        fontWeight : 'bold', 
        borderBottomWidth : 1,
        fontSize : 15,
        paddingVertical : 10
      },
      box : {
            // flexDirection: "column",
            // flex: 1,
             backgroundColor : 'white',

          height: Dimensions.get('screen').height - 30,
                width : '90%',
                position : 'relative',
                borderRadius:10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
        
                },
                shadowOpacity: 0.44,
                shadowRadius: 10.32,
                elevation: 3,
                paddingHorizontal : '5%'
      }
})
