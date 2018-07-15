import React, {Component} from 'react';
import {View,Text,ListView,TouchableHighlight,StyleSheet,Button,Image} from 'react-native';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';
import {Actions,Router,Scene } from 'react-native-router-flux';

const logo= require('../img/naroca.png')
//usar navigation.navigate
export default class EstoqueScreen extends Component {
    constructor(props){
    super(props);
    state = {
          loading: true,
          tipoUsuario: null
        }
    }
    _onItemSelect(item) {
       switch(item){ 
         case "vendedor": Actions.vendedor();
             break; 
         case "admin":  Actions.admin(); 
             break; }
    }

    componentWillMount(){
      var id=firebase.auth().currentUser.uid;
      firebase.database().ref().child('users/'+id).once('value').then((snapshot) => {
        this.setState({ tipoUsuario: snapshot.val().tipo, loading: false })
        this._onItemSelect(this.state.tipoUsuario)
      });
    }
//https://www.youtube.com/watch?v=rtoxRg-kbt0
    render(){
    return(
     <View style={styles.viewGeral}>
        <Image source={logo} style={styles.logo}/>
    </View>
      )
    }
};

const styles = StyleSheet.create({
    logo:{
        marginTop:100,
        marginLeft:50
    }, 
    viewGeral:{
        flex:1
    }
  })