import { faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import {StyleSheet,View,ScrollView,Text, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import {Footer,Header2,Title,ButtonIcon,Table, Spinner, Button,IconDetail,ButtonAdd} from '../../component';
import { PageTicket } from '../../component/Page';
import API from '../../service';
import {colors} from '../../utils/colors';
import Distance from '../../utils/distance';




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
                       <View style={{alignItems:'center', justifyContent:'center'}} >
                            <IconDetail onPress={() => (navigation.navigate('ShowComplaint', {item : item}))}/>
                            {/* <Button title='Show' height ={40} text = {13} onPress={() => (navigation.navigate('ShowComplaint', {item : item}))}/> */}
                        </View>
                   ]
                })
                
                // setTicket(data)
                setTicket(result.data)
                console.log(result.data);
                setLoading(false)
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
                    <View>

                    </View>
                    <ButtonAdd
                        title="Buka Tiket"
                        width='60%'
                        icon={faPlusCircle}
                        onPress={()=>navigation.navigate('Complaint')}
                    />
                     </View>

                     {ticket && 
                        ticket.map((item, index) => {
                            return (
                                <PageTicket 
                                    data = {item} 
                                    detail ={<IconDetail onPress={() => (navigation.navigate('ShowComplaint', {item : item}))}/>}
                                />
                            )
                        })
                     }
            </ScrollView>
            <Footer
                focus="Complaint"
                navigation = {navigation}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F4F4F4',
    },
});
export default HistoryComplaint