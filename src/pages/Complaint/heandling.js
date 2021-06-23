import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground
  } from 'react-native';
  import {
    Footer,
    Button,
    Title,
    Input,
    TextInput,
    TextArea,
    Dropdown} from '../../component';
const Heandling =({navigation})=>{
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
                        title="Delegasi Penanganan"
                        />
                        <TextInput
                        title="Pilih Bagian"
                        />
                       <Dropdown
                        data={[{id:1,name:'1'},
                                {id:2,name:'2'},
                                {id:3,name:'3'},
                                {id:4,name:'4'}
                                ]}
                        placeholder="<--Pilih Kategori Bagian-->"
                        />
                         <TextInput
                        title="Pilih Petugas"
                        />
                        <View style={{flexDirection:'row', width:'90%'}}>
                            <View style={{ flex:1,alignItems:'center'}}>
                                <Button
                                title="Petugas 1"
                                />
                            </View>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Button
                                title="Petugas 2"
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
                        title="Tugaskan"
                        navigation={()=>navigation.navigate('Action')}
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
        height:550,
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
        height:550
      },
});
export default Heandling