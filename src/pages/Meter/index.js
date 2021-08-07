import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ScrollView, StyleSheet, View,Text,Image } from 'react-native';
import { ButtonAdd, Footer, Header2, IconDetail, Table, Title } from '../../component';
import Distance from '../../utils/distance';

const Aksi =(props)=>{
    return(
        <View style={{alignItems:'center',justifyContent:'center', paddingVertical:5}}>
            <IconDetail onPress={props.onPress}/>
        </View>
    )
}

const Meter=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView>
                <Header2/>
                <View style={{paddingLeft:10}}>
                    <Title
                    title="History Baca"
                    />
                    <ButtonAdd
                        title="Baca Meter"
                        width='60%'
                        icon={faTachometerAlt}
                        onPress={()=>navigation.navigate('AddMeter')}
                    />
                     </View>
                     {/* <Table
                        tbhead={['No','Bulan','Pemakaian','Status','Aksi']}
                        tbdata={[
                                ['1','Januari','200.000','Mantap',<Aksi onPress = {() => navigation.navigate('DetailMeter')}/>],
                                ['2','Februari','200.000','Bagus',<Aksi/>],
                                ['3','Januari','200.000','Nice',<Aksi/>],
                            ]}
                        cellindex={5}
                    /> 
             */}

            <Distance distanceV={5}/>
                <View style={{alignItems:'center'}}>
                    <View style={{backgroundColor:'#7DE74B', width:200, height:35,borderTopRightRadius:15,borderTopLeftRadius:15,alignItems:'center'}}>
                        <Text style={styles.textStatus}>Active</Text>
                    </View>
                    <View style={{backgroundColor:'#FFFFFF', width:'90%',borderRadius:9,borderWidth:3,borderColor:'#CAFEC0',height:'auto', padding:7}}>
                        <View style={{height:'auto', flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                 <Image source={require('../../assets/img/ImageFotoLoading.png')} style={{width:150, height:150}}/>
                            </View>
                            <View style={{paddingLeft:8,flex:1.2, height:'auto'}}>
                                <Text style={styles.title}>ID Pelanggan : </Text>
                                <Text style={styles.data}>60000</Text>
                                <Text style={styles.title}>Bulan</Text>
                                <Text style={styles.data}>Januari</Text>
                                <Text style={styles.title}>Pemakaian</Text>
                                <Text style={styles.data}>20.000</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:5}}>
                             <IconDetail  onPress = {() => navigation.navigate('DetailMeter')}/>
                           
                        </View>
                    </View>
                </View>
                <Distance distanceV={5}/>
                <Distance distanceV={5}/>
                <View style={{alignItems:'center'}}>
                    <View style={{backgroundColor:'#2392D7', width:200, height:35,borderTopRightRadius:15,borderTopLeftRadius:15,alignItems:'center'}}>
                        <Text style={styles.textStatus}>Close</Text>
                    </View>
                    <View style={{backgroundColor:'#FFFFFF', width:'90%',borderRadius:9,borderWidth:3,borderColor:'#CFEDFF',height:'auto', padding:7}}>
                        <View style={{height:'auto', flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                 <Image source={require('../../assets/img/ImageFotoLoading.png')} style={{width:150, height:150}}/>
                            </View>
                            <View style={{paddingLeft:8,flex:1.2, height:'auto'}}>
                                <Text style={styles.title}>ID Pelanggan : </Text>
                                <Text style={styles.data}>60000</Text>
                                <Text style={styles.title}>Bulan</Text>
                                <Text style={styles.data}>Januari</Text>
                                <Text style={styles.title}>Pemakaian</Text>
                                <Text style={styles.data}>20.000</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:5}}>
                             <IconDetail  onPress = {() => navigation.navigate('DetailMeter')}/>
                           
                        </View>
                    </View>
                </View>
                <Distance distanceV={20}/>
            </ScrollView>
            <Footer
                focus="Menu"
                navigation = {navigation}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    textStatus:{
        color:'#FFFFFF', 
        fontSize:20, 
        alignItems:'center', 
        justifyContent:'center', 
        fontWeight:'bold',
        paddingTop:5
    },
    title:{
        fontSize:15, 
        fontWeight:'bold', 
        color:'#696969',
        paddingVertical:5
   },
    data:{
        color:'#696969'
   }
});
export default Meter