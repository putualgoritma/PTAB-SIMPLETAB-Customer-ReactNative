import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    Text
  } from 'react-native';
  import {
    Footer,
    Button,
    Title,
    TextInput,
    TextArea,
    Input} from '../../component';
const Action =({navigation})=>{
    return(
        <View style={styles.container}> 
            <ScrollView keyboardShouldPersistTaps = 'always'>
                <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}>
                </View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
               
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadowBanner}>
                    
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Title
                        title="Penanganan"
                        />
                        <View style={{flexDirection:'row',justifyContent:'flex-start', width:'80%'}}>
                            <Text style={{fontSize:15, fontWeight:'bold'}}>No Tiket :</Text>
                            <Text style={{fontSize:15, paddingLeft:10}}>TIK002341</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'flex-start', width:'80%'}}>
                            <Text style={{fontSize:15, fontWeight:'bold'}}>Petugas 1 :</Text>
                            <Text style={{fontSize:15, paddingLeft:10}}>Hartawan I Made</Text>
                        </View>
                        <TextInput
                        title="Bentuk Tindakan"
                        />
                       
                         <TextInput
                        title="Pilih Petugas"
                        />
                        <View style={{flexDirection:'row', width:'90%'}}>
                            <View style={{ flex:1,alignItems:'center'}}>
                                <Input
                                    placeholder="Tindakan 1"
                                />
                            </View>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Input
                                    placeholder="Tindakan 2"
                                />
                            </View>
                        </View>
                        <View style={{flexDirection:'row', width:'90%', paddingTop:10}}>
                            <View style={{ flex:1,alignItems:'center'}}>
                                <Input
                                    placeholder="Tindakan 3"
                                />
                            </View>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Input
                                    placeholder="Tindakan 4"
                                />
                            </View>
                        </View>
                         <TextInput
                        title="Memo"
                        />
                        <TextArea
                        placeholder="Memo"
                         />
                    </View>
                   
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Button
                        title="Selesai"
                        navigation={()=>navigation.navigate('Menu')}
                        />
                    </View>
                    </View>
                </View>
                </ImageBackground>
            </ScrollView>
            <Footer
                navigation = {navigation}
                focus = 'Complaint'
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
        height:590,
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
        height:590
      },
});
export default Action