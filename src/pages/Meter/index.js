import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ButtonAdd, Footer, Header2, IconDetail, Table, Title } from '../../component';

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
                     <Table
                        tbhead={['No','Bulan','Pemakaian','Status','Aksi']}
                        tbdata={[
                                ['1','Januari','200.000','Mantap',<Aksi onPress = {() => navigation.navigate('DetailMeter')}/>],
                                ['2','Februari','200.000','Bagus',<Aksi/>],
                                ['3','Januari','200.000','Nice',<Aksi/>],
                            ]}
                        cellindex={5}
                    />     
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
});
export default Meter