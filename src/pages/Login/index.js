import React, { useEffect } from 'react';
import {Text,StyleSheet,View,ScrollView,} from 'react-native';
import {Header,ButtonIcon,In,Input} from '../../component';
import {faQrcode, faUser} from '@fortawesome/free-solid-svg-icons';
import {launchCamera} from 'react-native-image-picker';
import API from '../../service';
const Login =({navigation,route})=>{
    const [response, setResponse] = React.useState(null);

    return(
        <View style={styles.container}>
            <ScrollView>
                <Header
                    text="Login"
                />
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadow}>
                        <View style={{alignItems:'center',paddingVertical:10}}>
                            <ButtonIcon
                                title='Scan QR'
                                width='80%'
                                icon={faQrcode}
                                navigation={()=> navigation.navigate('Scan') }
                            />
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.text}>Atau</Text>
                        </View>
                        <View style={{alignItems:'center',paddingVertical:10}}>
                            <Input
                                placeholder="No.Hp/No SBG"
                                // value={route.params ? route.params.dataId:''}
                            />
                        </View>
                        <View style={{alignItems:'center'}}>
                            <In
                                title="Login"
                                navigation={()=>navigation.navigate('SMS')}
                            />
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.text}>Atau</Text>
                        </View>
                        <View style={{alignItems:'center',paddingVertical:10}}>
                            <ButtonIcon
                                title='Masyarakat Umum'
                                width='80%'
                                icon={faUser}
                                onPress={()=>navigation.navigate('Public')}
                            />
                        </View>
                    </View>
                </View>          
            </ScrollView>
        </View>  
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    boxShadow:{
        paddingVertical:60,
        width:'90%',
        height:440,
        top:-40,
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
    text:{
        fontSize:16, 
        color:'#696969'
    }
});
export default Login