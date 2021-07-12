import * as React from 'react';
import {
    TextInput,
    StyleSheet,
    View
  } from 'react-native';
const input =(props)=>{
    return(
            <TextInput 
            
            style={[styles.input, 
              {
                fontSize : props.fontSize ? props.fontSize : null,
                textAlign : props.textAlign ? props.textAlign : null
              }
            ]}
            
            
            
            
            placeholder={props.placeholder} placeholderTextColor='#c7c7c7' value={props.value} onChangeText={props.onChangeText}  keyboardType={props.keyboardType} secureTextEntry={props.secureTextEntry} maxLength={props.maxLength ? props.maxLength : null} />
    )
}
const styles = StyleSheet.create({
    input:{
      width:'80%',
      borderRadius:10,
      backgroundColor:'#ffffff',
      paddingHorizontal:20,
      borderColor:'#087CDB',
      borderWidth:1,
    },
});
export default input;