import React, {Component} from 'react';
import {View,Text,TextInput,Button,ActivityIndicator,Picker,StyleSheet} from 'react-native';
import * as firebase from 'firebase'
import {Actions,Router,Scene } from 'react-native-router-flux';


export default class EncomendasMain extends Component {
    
  render() {
    return (
        <View>
          <Text style={styles.header}>Encomendas </Text>
          <View style={styles.topo}>
            <Button color="black" onPress={()=> Actions.encomendasFinalizadas()} title="Finalizadas"/>
            <Button color="black" onPress={()=> Actions.encomendasAndamento()} title="Andamento"/>
          </View>
          <Button color="black" onPress={()=> Actions.encomendasAdd()} title="Adicionar Encomenda"/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
      fontSize:30
  },
  topo:{
    justifyContent:'space-between',
     flexDirection:'row',
     marginHorizontal:30
  },
  tudo:{
    flex:1,
    justifyContent:'space-between',
    flexDirection:'column'
  }
})