import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
  } from 'react-native';
import { useSelector } from 'react-redux';
import {Footer,Header2,Title,ButtonIcon,Table, Spinner, Button} from '../../component';
import API from '../../service';
const HistoryComplaint=({navigation})=>{
    const TOKEN = useSelector((state) => state.TokenReducer);
    const USER = useSelector((state) => state.UserReducer);
    const [ticket, setTicket] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            console.log(USER.id);
            API.tickets(USER.id, TOKEN).then((result) => {
                let data = []
                let no = 1
                result.data.map((item, index) => {
                    // console.log(Object.keys(result.data[index]));
                   data[index] = [
                       no++,
                       item.created_at,
                       item.description,
                       item.status,
                       <View  >
                            <Button title='Show' height ={40} text = {13} onPress={() => (navigation.navigate('ShowComplaint', {item : item}))}/>
                        </View>
                   ]
                })
                
                setTicket(data)
                setTicket(result.data)
                setLoading(false)
                console.log(data);
            }).catch((e) => {
                console.log(e);
                setLoading(false)
            })
        }

        return () => {
            isAmounted = false;
        }
    }, [])

    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
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
                        onPress={()=>navigation.navigate('Complaint')}
                    />
                     </View>
                  {ticket &&   <Table
                    tbhead={['No','Tanggal','Keterangan','Status', 'Show']}
                    tbdata={ticket}
                    cellindex={5}
                  />}
                    
                
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