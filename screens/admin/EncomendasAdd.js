import React, {Component} from 'react';
import {View,Text,TextInput,Button,ActivityIndicator,Picker,StyleSheet,Platform,Animated,Image,Dimensions} from 'react-native';
import * as firebase from 'firebase'
import {Actions,Router,Scene } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const logo= require('../../img/naroca.png')

export default class EncomendasAdd extends Component {
    
    constructor(props) {
        super(props);
        this.state = { nomeCliente: '', pago:'',produto:'',preço:'',lucro:''};

      }
      getRef(){
        return firebase.database().ref();
    }
    
    //   listarProduto(nCliente,pay,prod,price){
    //     if(nCliente==''){
    //         alert('Preencha o Campo do nome do cliente')
    //     }else if(pay==''){
    //         alert('Preencha o campo do status do pagamento')
    //     }else if(prod==''){
    //         alert('Preencha o campo do nome do produto')
    //     }else if(price==''){
    //         alert('Preencha o campo do nome do preço')
    //     }else{
    //         firebase.database().ref().child('Encomendas/'+prod+"/"+nCliente).set({
    //         statusPagamento:pay,
    //         preço:price,
    //         finalizado:'nao'
    //     })
    //         alert('Encomenda Adicionada');
    //         this.setState({nomeCliente:'',pago:'',produto:'',preço:'',lucro:''}) 
    //     }   
    // }

    botar(){
        firebase.database().ref().child('EncomendasFinalizadas/0').set({
            cliente:'asd',
            statusPagamento:'asd',
            preço:'price',
            produto:'prod',
            statusPagamento:'nao',
            lucro:'0'
        })
    }  

    listarProduto2(nCliente,pay,prod,price,lucro){
        if(nCliente==''){
            alert('Preencha o Campo do nome do cliente')
        }else if(pay==''){
            alert('Preencha o campo do status do pagamento')
        }else if(prod==''){
            alert('Preencha o campo do nome do produto')
        }else if(price==''){
            alert('Preencha o campo do nome do preço')
        }else{
            firebase.database().ref().child("Encomendas").once("value", function(snapshot) {
                firebase.database().ref().child('Encomendas/').push({
                    cliente:nCliente,
                    statusPagamento:pay,
                    preço:price,
                    produto:prod,
                    finalizado:'nao',
                    lucro:lucro
                })
                }  
              )
              alert('Encomenda Adicionada');
              this.setState({nomeCliente:'',pago:'',produto:'',preço:'',lucro:''}) 
        }
    }

    girar(){
   
    }

    render() {
        return(
            <View style={styles.viewGeral}>
                <View>
                    <Text>Nome Do Cliente:</Text>
                <TextInput
                    style={styles.input}
                     onChangeText={(nomeCliente) => this.setState({nomeCliente})}
                     value={this.state.nomeCliente}
                />
                </View>

                <View>
                    <Text>Produto:</Text>
                <TextInput
                    style={styles.input}
                     onChangeText={(produto) => this.setState({produto})}
                     value={this.state.produto}
                />
                </View>
                
                <View>
                    <Text>Preço:</Text>
                <TextInput
                    style={styles.input}
                     onChangeText={(preço) => this.setState({preço})}
                     value={this.state.preço}
                     keyboardType="numeric"
                />
                </View>

                <View>
                    <Text>Lucro nesta Entrega:</Text>
                <TextInput
                    style={styles.input}
                     onChangeText={(lucro) => this.setState({lucro})}
                     value={this.state.lucro}
                     keyboardType="numeric"
                />
                </View>

                 <Picker
                        selectedValue={this.state.pago}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => this.setState({pago: itemValue})}>
                        <Picker.Item label="Pago?" value=''/>
                        <Picker.Item label="Sim" value="sim" />
                        <Picker.Item label="Nao" value="nao" />
                </Picker>

                {/* <Button
                    title='botar'
                    onPress={() => {this.botar()}}
                    color='green'
                /> */}

                <Button
                    title='enviar'
                    onPress={() => {this.listarProduto2(this.state.nomeCliente,this.state.pago,this.state.produto,this.state.preço,this.state.lucro)}}
                    color='green'
                />
                
              
                    <Image source={logo} style={styles.logo}/>
              


                </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor:'white'
    },
    picker:{
         height: 50,
        width:400,
        borderWidth:1,
        borderColor:'green',
        position:Platform.OS === 'ios' ?'absolute':null,
        bottom:0,
        right:0,
        left:0
    },
    logo:{
        height:SCREEN_WIDTH*0.65,
        width:SCREEN_WIDTH*0.65,
        marginLeft:SCREEN_WIDTH*0.2
    },
    viewGeral:{
        flex:1
    }
})