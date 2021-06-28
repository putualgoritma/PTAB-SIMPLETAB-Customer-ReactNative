import React, {useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    ImageBackground
  } from 'react-native';
  import {Footer,Button,Title,Input,TextInput} from '../../component';
  import Background from '../../assets/img/background.svg'
  import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import API from '../../service';
import { useDispatch } from 'react-redux';
import { SET_DATA_USER, SET_DATA_TOKEN } from '../../redux/action';
import Spinner from '../../component/spinner';

const Public =({navigation})=>{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name : '',
        address : '',
        phone :''
    })
    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key] : value
        })
    }


    const handleRegister = () => {
        setLoading(true)
        API.registerCustomerPublic(form).then((res) => {
            console.log(res);
            dispatch(SET_DATA_USER(res.data))
            dispatch(SET_DATA_TOKEN(res.token))
            setLoading(false)
            navigation.navigate('Menu')
            // storeDataToken(result.token.token)
            // storeDataUser(result.user)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
            // let mes = JSON.parse(e.request._response)
            //     alert(mes.message)
            //     // setLoading(false)
            })
    }

    return(
        <View style={styles.container}> 
            {loading &&  <Spinner/>}
            <ScrollView>
                <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}>
                </View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
               
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadowBanner}>
                        
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Title
                             title="Masyarakat Umum"
                        />
                        <TextInput
                             title="Nama"
                        />
                        <Input
                              placeholder="Nama"
                              onChangeText = {(value) => handleForm('name', value)}
                         />
                         <TextInput
                              title="Alamat"
                        />
                        <Input
                              placeholder="Alamat"
                              onChangeText = {(value) => handleForm('address', value)}
                         />
                         <TextInput
                              title="No Handphone"
                        />
                        <Input
                              placeholder="No Handphone"
                              onChangeText = {(value) => handleForm('phone', value)}
                         />
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Button
                            title="Lanjut"
                            // navigation={()=>navigation.navigate('SMS')}
                            onPress = {handleRegister }
                        />
                    </View>
                    </View>
                </View>
                </ImageBackground>
                
                
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
    boxShadowBanner:{
        width:'90%',
        height:490,
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
});
export default Public