import React, {Component} from 'react';
import {View,Text,ListView,TouchableHighlight,StyleSheet,Button} from 'react-native';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import {} from '../funcoes'
import {Actions,Router,Scene } from 'react-native-router-flux';

class EstoqueAdminScreen extends Component {
  componentWillMount(){
    var user=firebase.auth().currentUser;
    if (user != null) {
        this.setState({nome: user.displayName})
        // email = user.email;
        // photoUrl = user.photoURL;
        // emailVerified = user.emailVerified;
        // uid = user.uid; 
    }
  }
  deslogarUsuario(){
    const usuario = firebase.auth();
    usuario.signOut()
  }
  render(){
    return(
      <View style={styles.viewGeral}>
        <Text>logged as: {this.state.nome}</Text>
        <Text>PAGINA DO ADM</Text>
        <View style={styles.botoes}>
          <Button color="black" onPress={()=> Actions.encomendas()} title="Encomendas"/>
          <Button color="black"  /*onPress={()=>}*/ title="Estoque Geladeira"/>
          <Button color="black"  /*onPress={()=>}*/ title="Estoque Vendedores"/>
          <Button color="black"  /*onPress={()=>}*/ title="Vendas Gerais"/>
          <Button color="black" /*onPress={()=>}*/ title="Cadastro Vendedores"/>
          <Button color="black" onPress={()=> Actions.add()} title="Cadastrar Produtos"/>
          <Button color="black" /*onPress={()=>}*/ title="Custos Operacionais"/>
          <Button color="black" onPress={()=> this.deslogarUsuario()} title="LogOut"/>
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewGeral:{
      backgroundColor:'green',
      flex:1
  },
  botoes:{
     flex:1,
     justifyContent:'space-between',
     flexDirection:'column',
     width:200,
     marginLeft:60
  }
})

  export default EstoqueAdminScreen