import React from 'react';
import {
    ScrollView, StyleSheet,
    View
} from 'react-native';
import { Footer1, Header1, In, Input, Out, TextInput, Title } from '../../component';
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