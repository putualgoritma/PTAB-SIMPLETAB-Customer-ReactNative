import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
  } from 'react-native';
import {Footer1,Out,In,Input,TextInput,Header1,Title} from '../../component';
const SMS=({navigation,route})=>{
    return(
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
            <Header1/>
            <View style={{alignItems:'center'}}>
            <Title
                title="Login Via SMS"
            />
            <TextInput
                title="SMS OTP"
            />
            <Input
                 value={route.params ? route.params.dataId:''}
            />
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <Out
                        title="Kembali"
                        navigation={()=>navigation.navigate('Login')}
                    />
                </View>   
                <View style={{flex:1}}>
                    <In
                        title="Masuk"
                        navigation={()=>navigation.navigate('Home')}
                    />
                </View>
            </View>
            </View>
            </ScrollView>
            <Footer1/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
});
export default SMS