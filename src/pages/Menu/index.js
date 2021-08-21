import React, { useState, useEffect } from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import IconBacaMeter from '../../assets/icon/iconBacaMeter.svg';
import IconPengaduan from '../../assets/icon/iconPengaduan.svg';
import IconTagihan from '../../assets/icon/iconTagihan.svg';
import IconTarif from '../../assets/icon/iconTarif.svg';
import { Footer, HeaderBeranda } from '../../component';
import Distance from '../../utils/distance';
import { copilot, CopilotStep, walkthroughable } from "react-native-copilot";

const CustomCopilot = (props) => {
    const {copilot} =props;
    return( 
     
        <View {...copilot} 
            style={{
                position:'absolute',
                width: 120, 
                height:120, 
                top:40,
                marginLeft:props.marginLeft ? props.marginLeft:null,
            }}>
        </View>
       
     )
   }

const Menu =(props)=>{
    const {navigation} = props;
    const [images,setImages]=useState([require('../../assets/img/banner1.png'),require('../../assets/img/banner2.png'),require('../../assets/img/banner3.png'),require('../../assets/img/banner4.png')]);
    
    const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
    const handleStepChange = (step) => {
        console.log (`Current data: ${step.name}`)

    }
    useEffect(()=>{
        props.copilotEvents.on('stepChange', handleStepChange)
        props.start()
    },[])

    return(
        <View style={styles.container}>
            <ScrollView>
            <HeaderBeranda/>
                <Distance distanceV={10}/>
                <View style={{alignItems:'center'}}>
                    <View style={{height:200, alignItems:'center'}}>
                        <SliderBox
                            images={images}
                            sliderBoxHeight={200}
                            parentWidth={350}
                            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                            dotColor="#00F6FD"
                            inactiveDotColor="#90A4AE"
                            paginationBoxVerticalPadding={20}
                            autoplay
                            circleLoop
                        />
                    </View>
                    <Distance distanceV={10}/>
                    <View style={{backgroundColor:'#0C5CBF', width:'90%', height:50, borderRadius:5,}}>
                        <Text style={{color:'#FFFFFF', fontSize:15, fontWeight:'bold', padding:12}}>Layanan PDAM</Text>
                    </View>
                    <View style={{flexDirection:'row', width:'90%', alignItems:'center'}}>
                        {/* <CopilotStep
                            text="Scan atau arahkan Camera pada Stand Meter Anda"
                            order={1}
                            name="SatuUnique"
                            >
                            <CustomCopilot marginLeft='6%'/>
                            </CopilotStep> */}
                            <TouchableOpacity style={{flex:1, alignItems:'center', paddingVertical:20}} onPress={()=>navigation.navigate('HistoryComplaint')}>
                                <IconPengaduan width={120}/>
                             </TouchableOpacity>

                        {/* <CopilotStep
                            text="Scan atau arahkan Camera pada Stand Meter Anda"
                            order={2}
                            name="DuaUnique"
                            >
                            <CustomCopilot marginLeft='53%'/>
                            </CopilotStep > */}
                            <TouchableOpacity style={{flex:1, alignItems:'center', paddingVertical:20}} onPress={()=>navigation.navigate('Bill')}>
                                <IconTagihan width={120}/>
                            </TouchableOpacity>
                    </View>
                    
                    <View style={{flexDirection:'row', width:'90%'}}>
                        <TouchableOpacity style={{flex:1, alignItems:'center', paddingVertical:20}} onPress={()=>navigation.navigate('Meter')}>
                            <IconBacaMeter width={120}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1, alignItems:'center', paddingVertical:20}}onPress={()=>navigation.navigate('Fare')}>
                            <IconTarif width={120}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer 
            navigation = {navigation}
            focus = 'Menu'
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    textHeader:{
        color:'#EC2E2E',
        paddingVertical:7,
        paddingHorizontal:10, 
        width:280
    },
    boxShadowHeader:{
        width:'85%',
        height:55,
        backgroundColor:'#FFFFFF',
        top:-40,
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    },
    boxShadowBanner:{
        width:350,
        height:172,
        top:-5,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    }
});
const style = {
    backgroundColor: "white",
    borderRadius: 2,
    borderColor:'#137FC2',
    borderWidth:1
  };
export default copilot({
    overlay: "svg", // or 'view'
    animated: true, // or false
    tooltipStyle: style
  })(Menu);