import React,{useState} from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
  } from 'react-native';
  import {
    FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
  import Distance from '../../utils/distance'
  import IconPengaduan from '../../assets/icon/iconPengaduan.svg'
  import IconTagihan from '../../assets/icon/iconTagihan.svg'
  import IconBacaMeter from '../../assets/icon/iconBacaMeter.svg'
  import IconTarif from '../../assets/icon/iconTarif.svg'
  import {Footer, Header} from '../../component';
import {faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { SliderBox } from "react-native-image-slider-box";
const Menu =({navigation})=>{
    const [images,setImages]=useState([require('../../assets/img/banner1.png'),require('../../assets/img/banner2.png'),require('../../assets/img/banner3.png'),require('../../assets/img/banner4.png')]);
    return(
        <View style={styles.container}>
            <ScrollView>
            <Header
            text="PERUMDA Kab.Tabanan"
            />
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadowHeader}>
                        <Text style={styles.textHeader}>Silahkan melakukan login untuk dapat membayarkan tagihan PDAM Anda </Text>
                            <TouchableOpacity style={{position:'absolute', left:'85%', paddingVertical:12}}>
                                <FontAwesomeIcon icon={faSignInAlt} style={{color:'#0C5CBF'}} size={ 27 }/>
                            </TouchableOpacity>
                    </View>
                        <View style={{width:'100%', height:3, backgroundColor:'#E5E5E5', top:-15}}> 
                        </View>
                            <View style={{height:200, alignItems:'center'}}>
                                <SliderBox
                                    images={images}
                                    sliderBoxHeight={200}
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
                    <View style={{flexDirection:'row', width:'90%'}}>
                        <TouchableOpacity style={{flex:1, alignItems:'center', paddingVertical:20}} onPress={()=>navigation.navigate('HistoryComplaint')}>
                            <IconPengaduan width={120}/>
                        </TouchableOpacity>
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
export default Menu