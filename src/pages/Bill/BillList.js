import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect,useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ButtonIcon, DateMonth, Footer, Header2, Title, DataView, Spinner } from '../../component';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Distance from '../../utils/distance';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import API from '../../service';

const BillList = ({ navigation, route }) => {
    const data = route.params.form
    const [loading, setLoading] = useState(true)
    const isFocused = useIsFocused();
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tableData, setTableData] = useState([])
    const tableHead = ['No', 'Nomor REK', 'Periode', 'Tanggal', 'M3', 'Wajib Dibayar(Rp)', 'Terbayar(Rp)', 'Denda(Rp)', 'Sisa(Rp)'];
    const widthArr = [40, 60, 100, 100, 60, 140, 140, 100, 100]

    const [customer, setCustomer] = useState({})
    const [recap, setRecap] = useState({
        tagihan : 0,
        denda : 0,
        total : 0,
        tunggakan: 0
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
        Promise.all([API.ctmpay(data.code, TOKEN), API.ctmcustomer(data.code, TOKEN)]).then((result) => {
            let data = []
            var tunggakan = 0
            var tagihan = 0
            var denda = 0  
            var total = 0          
            result[0].data.map((item, index) => {
                let m3 = item.bulanini - item.bulanlalu
                let sisa = item.wajibdibayar - item.sudahdibayar
                tagihan =tagihan + sisa
                if(sisa>0){
                    tunggakan =tunggakan + 1
                }
                data[index] = [
                    index + 1,
                    item.nomorrekening,
                    item.tahunrekening + '-' + item.bulanrekening,
                    item.tglbayarterakhir,
                    m3,
                    item.wajibdibayar,
                    item.sudahdibayar,
                    item.denda,
                    sisa,
                ]
            })
            if(tunggakan>0 && tunggakan<2){
                denda = 10000
                total = tagihan + denda
                denda = new Number(denda).toLocaleString("id-ID");
            }
            if(tunggakan>1 && tunggakan<4){
                denda = 50000
                total = tagihan + denda
                denda = new Number(denda).toLocaleString("id-ID");
            }
            if(tunggakan>3){
                denda = 'SSB'
                total = tagihan
            }
            
            tagihan = new Number(tagihan).toLocaleString("id-ID");            
            total = new Number(total).toLocaleString("id-ID");
            setTableData(data)
            setCustomer(result[1].data)
            setRecap({
                tagihan:tagihan,
                denda:denda,
                total:total,
                tunggakan:tunggakan
            })
            setLoading(false)
            console.log('result', result)
            console.log('customer', result[1].data)
        }).catch((e) => {
            console.log('error', e);
            setLoading(false)
        })

    };

    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            <ScrollView>
                <Header2 />
                <View style={{ paddingLeft: 10, flex: 1 }}>
                    <Title
                        title="Info Tagihan Pelanggan"
                    />
                    <DataView title='Tahun Pembayaran' txt={customer.year} />
                    <DataView title='Nomor Sambungan' txt={customer.nomorrekening} />
                    <DataView title='Nama Pelanggan' txt={customer.namapelanggan} />
                    <DataView title='Alamat' txt={customer.alamat} />
                    <DataView title='Gol. Tarif' txt={customer.idgol} />
                    <DataView title='Areal' txt={customer.idareal} />
                    <DataView title='Status' txt={customer.status} />
                    <Distance distanceV={10} />
                </View>
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
                <Distance distanceV={10} />
                <View style={{ paddingLeft: 10 }} >
                    <Text style={{ fontSize: 19, color: '#696969', fontWeight: 'bold' }}>Jumlah Tunggakan</Text>
                    <Distance distanceV={5} />
                    <DataView title='1. Tagihan Air' txt={recap.tagihan} />
                    <DataView title='2. Denda' txt={recap.denda} />
                    <DataView title='Total' txt={recap.total} />
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
});
export default BillList