import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
    ScrollView, StyleSheet,
    View
} from 'react-native';
import { ButtonIcon, Dropdown, Footer, Header2, Table1, Title } from '../../component';
const Fare=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps = 'always'>
                <Header2/>
                <View style={{paddingLeft:10}}>
                    <Title
                    title="Info Tarif"
                    />
                    <View style={{flexDirection:'row', width:'70%'}}>
                        <Dropdown
                            data={[{id:1,name:'1'},
                            {id:2,name:'2'},
                            {id:3,name:'3'},
                            {id:4,name:'4'}
                            ]}
                            placeholder="<--Pilih Kategori Golongan-->"
                            />
                        <View style={{width:5}}></View>
                        <ButtonIcon
                            title="Filter"
                            width='40%'
                            icon={faSearch}
                            />
                    </View>
                </View>
                <Table1
                title="INDUSTRI"
                tbhead={['Progresif','Kubikasi','Biaya']}
                tbdata={[
                        ['Blok1','0.0 m3 - 0.0 m3','Rp.27.500,-'],
                        ['Blok2','0.0 m3 - 0.0 m3','Rp.3.950,-'],
                        ['Blok3','0.0 m3 - 0.0 m3','Rp.13.250,-'],
                        ['Blok4','0.0 m3 - 0.0 m3','Rp.24.150,-'],
                        ['Blok5','0.0 m3 - 0.0 m3','Rp.33.020,-'],
                            ]}
                cellindex={3}
                />
                <Table1
                title="INTANSI PEMERINTAH (IP)"
                tbhead={['Progresif','Kubikasi','Biaya']}
                tbdata={[
                        ['Blok1','0.0 m3 - 0.0 m3','Rp.17.500,-'],
                        ['Blok2','0.0 m3 - 0.0 m3','Rp.13.950,-'],
                        ['Blok3','0.0 m3 - 0.0 m3','Rp.11.250,-'],
                        ['Blok4','0.0 m3 - 0.0 m3','Rp.23.150,-'],
                        ['Blok5','0.0 m3 - 0.0 m3','Rp.43.020,-'],
                            ]}
                cellindex={3}
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
export default Fare