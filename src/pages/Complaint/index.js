import { faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
  } from 'react-native';
import {Footer,Header2,Title,ButtonIcon,Table} from '../../component';
const HistoryComplaint=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView>
                <Header2/>
                <View style={{paddingLeft:10}}>
                    <Title
                    title="History Pengaduan"
                    />
                    <ButtonIcon
                        title="Buka Tiket"
                        width='60%'
                        icon={faPlusSquare}
                        navigation={()=>navigation.navigate('Complaint')}
                    />
                     </View>
                    <Table
                    tbhead={['No','Tanggal','Keterangan','Status']}
                    tbdata={[
                            ['1','2021-01-04','Pipa Bocor','Selesai'],
                            ['2','2021-01-05','Air Mampet','Selesai'],
                             ]}
                    cellindex={4}
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
export default HistoryComplaint