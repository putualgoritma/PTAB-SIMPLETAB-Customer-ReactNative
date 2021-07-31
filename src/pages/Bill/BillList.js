import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React,{useState} from 'react';
import {ScrollView, StyleSheet,View,Text} from 'react-native';
import { ButtonIcon, DateMonth, Footer, Header2, Title,DataView } from '../../component';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Distance from '../../utils/distance';

const BillList=({navigation})=>{    
    const tableHead = ['No', 'Nomor REK', 'Periode', 'Tanggal', 'M3', 'Wajib Dibayar(Rp)', 'Terbayar(Rp)', 'Denda(Rp)', 'Sisa(Rp)'];
    const widthArr = [40, 60, 100, 100, 60, 140, 140, 100,100]
    const tableData = [
        ['1', '0', '12-2020','20/01/2020','38','139.092','139.092','0','0'],
        ['2', '0', '12-2020','20/01/2020','38','139.092','139.092','0','0'],
        ['3', '0', '12-2020','20/01/2020','38','139.092','139.092','0','0'],
        ['4', '0', '12-2020','20/01/2020','38','139.092','139.092','0','0'],
        ['5', '0', '12-2020','20/01/2020','38','139.092','139.092','0','0'],
        ['6', '0', '12-2020','20/01/2020','38','139.092','139.092','0','0'],
        ['7', '0', '12-2020','20/01/2020','38','139.092','139.092','0','0'],
        ['8', '0', '12-2020','20/01/2020','38','139.092','139.092','0','0'], 
        ['', '', '','TOTAL','273','1.033.628','612.308','50.000','421.320'],  
      ];

    return(
            <View style={styles.container}>
                <ScrollView>
                    <Header2/>
                    <View style={{paddingLeft:10,flex:1}}>
                        <Title
                        title="Pembayaran Rekening Pelanggan"
                        />
                        <DataView title='Tahun Pembayaran' txt='2021'/>
                        <DataView title='Nomor Sambungan' txt='1'/>
                        <DataView title='Nama Pelanggan' txt='I GST. AGUNG WAYAN CATENG'/>
                        <DataView title='Alamat' txt='JL. GUNUNG AGUNG 83'/>
                        <DataView title='Gol. Tarif' txt='E2 - Niaga Kecil'/>
                        <DataView title='Areal' txt='K010101 - DAERAH-KOTA'/>
                        <DataView title='Status' txt='Aktif'/>
                    <Distance distanceV={10}/>
                    </View>
                        <View style={{alignItems:'center'}}>
                            <ScrollView horizontal={true} style={{width:'95%'}}>
                                <View>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
                                    </Table>
                                    <ScrollView style={styles.dataWrapper}>
                                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                            {
                                            tableData.map((rowData, index) => (
                                                <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={widthArr}
                                                style={[styles.row]}
                                                textStyle={styles.text}
                                                />
                                            ))
                                            }
                                        </Table>
                                    </ScrollView>
                                </View>
                            </ScrollView>
                        </View>
                        <Distance distanceV={10}/>
                        <View style={{paddingLeft:10}} >
                            <Text style={{fontSize:19, color:'#696969',fontWeight:'bold'}}>Jumlah Tunggakan</Text>
                            <Distance distanceV={5}/>
                            <DataView title='1. Tagihan Air' txt='.......'/>
                            <DataView title='2. Denda' txt='.......'/>
                            <DataView title='Total' txt='.......'/>
                        </View>
                        <Distance distanceV={10}/>
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
  header: {
        height: 50,
        backgroundColor:'#EAF4FA'
    },
  text: { 
        textAlign: 'center', 
        fontWeight: '100' 
    },
  dataWrapper: {
        marginTop: -1 
    },
  row: { 
        height: 45, 
        backgroundColor: '#FFFFFF' 
    }
});
export default BillList