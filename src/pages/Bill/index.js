import React from 'react';
import {ScrollView, StyleSheet,View, TouchableOpacity,Image} from 'react-native';
import { Footer1, Header1, In, Input, Out, TextInput, Title } from '../../component';
import Distance from '../../utils/distance';
const Bill=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
            <Header1/>
            <View style={{alignItems:'center'}}>
            <Title
                title="Cek Tagihan"
            />
            <Distance distanceV={10}/>
             <TouchableOpacity onPress={()=>navigation.navigate('Scan')}>
                <Image source={require('../../assets/icon/iconQR.png')} style={{width:113, height:129}} />
            </TouchableOpacity>
            <TextInput
                title="ID Pelanggan"
            />
            <Input
                placeholder="Masukan ID Pelanggan"
            />
                <Distance distanceV={5}/>
                <View style={{flex:1, alignItems:'center'}}>
                    <In
                        title="Masuk"
                        onPress={()=>navigation.navigate('BillList')}
                    />
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
});
export default Bill