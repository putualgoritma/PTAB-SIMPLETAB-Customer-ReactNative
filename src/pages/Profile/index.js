import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
import {Footer, Header,ButtonIcon,In,InputLine, TextInput,Button, Spinner} from '../../component';
import IconLogout from '../../assets/icon/iconLogout.svg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector } from 'react-redux';
import API from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile =({navigation})=>{

    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    const loggout = () => {
        setLoading(true)
        API.logout(TOKEN).then((result) => {
            console.log(result);
            AsyncStorage.clear()
            setTimeout(function () {
                setLoading(false)
                navigation.replace('SplashScreen')
            }, 2000); 
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
            alert('logout failed')
        })
    }

    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ScrollView>
                <Header
                    text="Profile"
                />
                <TouchableOpacity style={{position:'absolute',}} onPress={loggout}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end', width:'100%',paddingTop:10}}>
                        <IconLogout width={120}/>
                    </View>
                </TouchableOpacity>
                <FontAwesomeIcon icon={faUser} style={{color:'#FFFFFF', postion:'absolute', top:-115, left:35}} size={43}/>
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:50, position:'absolute', top:104}}>
                    <View style={{backgroundColor:'#FFFFFF', width:'70%', height:50,borderTopLeftRadius:60, alignItems:'center'}}>
                        <Text style={{fontSize:18, color:"#000000", fontWeight:'bold',top:15}}>{USER.name}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                   
                        <TextInput
                            title="Code Pelanggan : "
                        />
                         <InputLine
                            value={USER.code}
                            editable={false}
                        />
                        <TextInput
                            title="Alamat :"
                        />
                        <InputLine
                            value={USER.address}
                            editable={false}
                        />  
                        <TextInput
                            title="No Telepon :"
                        />
                        <InputLine
                            placeholder="No Telepon"
                            value={USER.phone}
                            editable={false}
                        />
                </View> 
                {/* <View style={{alignItems:'center',paddingVertical:40}}>
                        <Button
                        title="Simpan"
                        // navigation={()=>navigation.navigate('Menu')}
                        onPress = {() => console.log(USER)}
                        />
                </View>     */}
            </ScrollView>
            <Footer
                navigation = {navigation}
                focus = 'Profile'
            />
        </View>  
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    text:{
        fontSize:16,
        fontWeight:'bold',
        color:'#696969',
        paddingVertical:5
    }
});
export default Profile