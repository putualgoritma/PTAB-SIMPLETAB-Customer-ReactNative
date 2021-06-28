import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
import {Footer, Header,ButtonIcon,In,InputLine, TextInput,Button} from '../../component';
import IconLogout from '../../assets/icon/iconLogout.svg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector } from 'react-redux';
const Profile =({navigation})=>{

    const USER = useSelector((state) => state.UserReducer);

    return(
        <View style={styles.container}>
            <ScrollView>
                <Header
                    text="Profile"
                />
                <TouchableOpacity style={{position:'absolute',}} onPress={()=>navigation.navigate('Menu')}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end', width:'100%',paddingTop:10}}>
                        <IconLogout width={120}/>
                    </View>
                </TouchableOpacity>
                <FontAwesomeIcon icon={faUser} style={{color:'#FFFFFF', postion:'absolute', top:-115, left:35}} size={43}/>
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'100%', height:50, position:'absolute', top:104}}>
                    <View style={{backgroundColor:'#FFFFFF', width:'70%', height:50,borderTopLeftRadius:60, alignItems:'center'}}>
                        <Text style={{fontSize:18, color:"#000000", fontWeight:'bold',top:15}}>Surya Dwipayana</Text>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                   
                        <TextInput
                            title="ID Pelanggan :"
                        />
                         <InputLine
                            value="12332123477"
                            editable={false}
                        />
                        <TextInput
                            title="Alamat :"
                        />
                        <InputLine
                            value="Tabanan Indonesia"
                            editable={false}
                        />  
                        <TextInput
                            title="No Handphone :"
                        />
                        <InputLine
                            placeholder="No Handphone"
                            value="08923712342"
                        />
                </View> 
                <View style={{alignItems:'center',paddingVertical:40}}>
                        <Button
                        title="Simpan"
                        // navigation={()=>navigation.navigate('Menu')}
                        onPress = {() => console.log(USER)}
                        />
                    </View>    
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