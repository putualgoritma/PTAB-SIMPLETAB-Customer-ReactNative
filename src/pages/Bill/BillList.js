import {faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
  } from 'react-native';
import {Footer,Header2,Title,ButtonIcon,Table,Input,DateMonth} from '../../component';
const BillList=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView>
                <Header2/>
                <View style={{paddingLeft:10}}>
                    <Title
                    title="History Tagihan"
                    />
                    <View style={{flexDirection:'row', width:'70%'}}>
                        <DateMonth/>
                        <View style={{width:5}}>
                        </View>
                        <ButtonIcon
                            title="Filter"
                            width='40%'
                            icon={faSearch}
                        />
                        
                    </View>
                     </View>
                    <Table
                    tbhead={['No','Bln/Thn','Tagihan','Status']}
                    tbdata={[
                            ['1','01/2021','Rp.150.000','Terbayar'],
                            ['2','02/2021','Rp.100.000','Terbayar'],
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
export default BillList