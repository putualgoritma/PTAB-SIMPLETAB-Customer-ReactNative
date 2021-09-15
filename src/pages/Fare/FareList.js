import React, { useEffect,useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';
import { Header2, Footer, Title, DataView, Spinner } from '../../component';
import Distance from '../../utils/distance';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Rp, { Rupiah } from '../../utils/Rp';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import API from '../../service';

const FareList=({navigation, route})=>{
    const data = route.params.form
    const [loading, setLoading] = useState(true)
    const isFocused = useIsFocused();
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tableData, setTableData] = useState([])
    const tableHead = ['No', 'BULAN', 'PENCATATAN METER', 'PEMAKAIAN AIR (M3)'];
    const widthArr = [40, 200, 170, 170]
    const [customer, setCustomer] = useState({})
    const [recap, setRecap] = useState({
        total_pemakaian :  0,
        avg: 0,
    })
    
    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            ctmPayAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    const ctmPayAPi = () => {
        Promise.all([API.ctmuse(data.code, TOKEN), API.ctmcustomer(data.code, TOKEN)]).then((result) => {
            let data = []
            var total_pemakaian = 0  
            var count_num = 0       
            result[0].data.map((item, index) => {
                total_pemakaian += item.pemakaianair
                count_num ++
                data[index] = [
                    index + 1,
                    item.tahunrekening + '-' + item.bulanrekening,
                    item.pencatatanmeter,
                    item.pemakaianair,                    
                ]
            })
            var avg = total_pemakaian/count_num
            setTableData(data)
            setCustomer(result[1].data)
            setRecap({
                total_pemakaian:total_pemakaian,
                avg:avg,
            })
            setLoading(false)
            console.log('result', result)
            console.log('customer', result[1].data)
        }).catch((e) => {
            console.log('error', e);
            setLoading(false)
        })

    };
    

    return(
        <View style={styles.container}>
            {loading && <Spinner />}
            <ScrollView>
                <Header2/>
                <View style={{ paddingLeft: 10, flex: 1 }}>
                    <Title title="Pemakaian Air"/>
                    <DataView title='Tahun Pemakaian' txt={customer.year}/>
                    <DataView title='Nomor Sambungan' txt={customer.nomorrekening}/>
                    <DataView title='Nama Pelanggan' txt={customer.namapelanggan}/>
                    <DataView title='Alamat' txt={customer.alamat}/>
                    <DataView title='Gol. Tarif' txt={customer.idgol}/>
                    <DataView title='Areal' txt={customer.idareal}/>
                    <DataView title='Status' txt={customer.status = '1' ? 'Aktif' : 'Pasif'}/>
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
                    <DataView flex={1.6} title='Total Pemakaian Air' txt={recap.total_pemakaian}/>
                    <DataView flex={1.6} title='Rata-Rata Pemakaian Air' txt={recap.avg}/>
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