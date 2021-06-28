import * as React from 'react';
import {
   View,
   StyleSheet,
  } from 'react-native';
  import Textarea from 'react-native-textarea';

const TextArea =(props)=>{
    return(
        <View style={{width:'80%'}}>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              maxLength={255}
              placeholder={props.placeholder}
              placeholderTextColor={'#c7c7c7'}
              onChangeText = {props.onChangeText}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    textareaContainer: {
        height: 120,
        borderRadius:10,
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderColor:'#087CDB',
        borderWidth:1,
    },
    textarea: {
        textAlignVertical: 'top', 
        height: 170,
        fontSize: 14,
        color: '#333',
    },
});    
export default TextArea;