import React,{useState} from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';
import { Header2,Footer, Title,DataView } from '../../component';
import Distance from '../../utils/distance';
import { Table, TableWrapper, Row } from 'react-native-table-component';

const FareList=({navigation})=>{
    const [tableData, setTableData] = useState([
        ['1', 'Januari', '782', '18'],
        ['2', 'Februari', '797', '15'],
        ['3', 'Maret', '812', '15'],
        ['4', 'April', '827', '15'],
        ['5', 'Mei', '843', '16'],
        ['6', 'Juni', '861', '18'],
        ['7', 'Juli', '875', '14'],
        ['8', 'Agustus', '890', '15'],
        ['9', 'September', '903', '13'],
        ['10', 'Oktober', '0', '0'],
        ['11', 'November', '0', '0'],
        ['12', 'Desember', '0', '0']
      ])
    const tableHead = ['No', 'BULAN', 'PENCATATAN METER', 'PEMAKAIAN AIR (M3)'];
    const widthArr = [40, 200, 170, 170]

    return(
        <View style={styles.container}>
            <ScrollView>
                <Header2/>
                <View style={{ paddingLeft: 10, flex: 1 }}>
                    <Title title="Pemakaian Air"/>
                    <DataView title='Tahun Pemakaian' txt='2021'/>
                    <DataView title='Nomor Sambungan' txt='4906'/>
                    <DataView title='Nama Pelanggan' txt='I WAYAN SURIANA'/>
                    <DataView title='Alamat' txt='Jl. WARKUDARA 17'/>
                    <DataView title='Gol. Tarif' txt='C6 - Non Niaga'/>
                    <DataView title='Areal' txt='K010103 - DAERAH KOTA'/>
                    <DataView title='Status' txt='Aktif'/>
                </View>
                <Distance distanceV={10}/>
                <View style={{ alignItems: 'center' }}>
                    <ScrollView horizontal={true} style={{ width: '95%' }}>
                        <View>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
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
                <View style={{ paddingLeft: 10 }} >
                    <DataView flex={1.6} title='Total Pemakaian Air' txt='139'/>
                    <DataView flex={1.6} title='Rata-Rata Pemakaian Air' txt='15'/>
                </View>
                <Distance distanceV={10} />
            </ScrollView>
            <Footer
                focus="Menu"
                navigation={navigation}
            />
        </View>
    )
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
},
header: {
    height: 50,
    backgroundColor: '#EAF4FA'
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
})
export default FareList