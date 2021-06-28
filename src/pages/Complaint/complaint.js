import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground
  } from 'react-native';
import { useSelector } from 'react-redux';
  import {
    Footer,
    Button,
    Title,
    Input,
    TextInput,
    TextArea,
    Dropdown} from '../../component';
import API from '../../service';
const Complaint =({navigation})=>{
    const [categories, setCategories] = useState(null)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] =useState({})

    useEffect(() => {
        let isAmounted = true
        API.categories(TOKEN).then((res) => {
            setCategories(res.data)
            setLoading(false)
        }).catch((e) => {
            console.log(e);
            setLoading(false)
        })
        return () => {
            isAmounted = false
        }
    }, [])


    const [form, setForm] = useState({
        title : '',
        category_id : '',
        description : '',
        
    })


    const handleFrom = (key , value) => {
        setForm({
            ...form,
            [key] : value
        })
    }


    const APiCaegories = () => {
        API.categories(TOKEN).then((res) => {
            console.log(res);
        }).cath((e) => {
            console.log(e);
        })
    }

    return(
        <View style={styles.container}> 
            <View style={{flex : 1}} >
                <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}/>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadowBanner}>
                  
                        <View style={{alignItems:'center',paddingVertical:10}}>
                            <Title
                                title="Pengaduan"
                            />
                            <TextInput
                                title="Kategori Pengaduan"
                            />
                            <Dropdown
                                data={categories}
                                placeholder="<--Pilih Kategori Pengaduan-->"
                                onItemSelect = {(item) => handleFrom('category_id', item)}
                                selectedItem = {form.category_id}
                            />
                            <ScrollView style={{width : '100%'}} >
                                <View style={{alignItems : 'center'}}>
                                    <TextInput
                                        title="Judul"
                                    />
                                    <Input
                                        placeholder="Judul"
                                        onChangeText = {value => handleFrom('title', value)}
                                    />
                                    <TextInput
                                        title="Keterangan"
                                    />
                                    <TextArea
                                        placeholder="Keterangan"
                                        onChangeText = {value => handleFrom('description', value)}
                                    />

                                    <View style={{marginVertical : 10}} />

                                    <Button
                                        title="Lanjut"
                                        onPress={()=>navigation.navigate('Proof', {form : form})}
                                    />
                               </View>
                            </ScrollView>
                        </View>
                    
                        </View>
                    </View>
                </ImageBackground>
            </View>
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
export default Complaint