import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
  } from 'react-native';
import {Footer1,Out,In,Input,TextInput,Header1,Title} from '../../component';
const Bill=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
            <Header1/>
            <View style={{alignItems:'center'}}>
            <Title
                title="Cek Tagihan"
            />
            <TextInput
                title="ID Pelanggan"
            />
            <Input
                placeholder="Masukan ID Pelanggan"
            />
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <Out
                        title="Kembali"
                        navigation={()=>navigation.navigate('Menu')}
                    />
                </View>   
                <View style={{flex:1}}>
                    <In
                        title="Masuk"
                        navigation={()=>navigation.navigate('BillList')}
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
export default Bill