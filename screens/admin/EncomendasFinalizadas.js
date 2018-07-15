import React, { Component } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Dimensions, Picker, ListView, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase'
import { Actions, Router, Scene } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class EncomendasFinalizada extends Component {
    constructor(props) {
        super(props);
        database = firebase.database();
        items = [];
        this.state = {
            quantidade: '',
            preço: '',
            aparecerLucro: '',
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
        }

        this.renderRow = this.renderRow.bind(this);
    }
    // componentWillMount(){

    //     database.ref('Encomendas').on('value',(snap) => {
    //         items=[];
    //         snap.forEach((data)=>{ 
    //             cheeseData = []
    //             data.forEach((subData)=>{
    //                 cheeseData.push({
    //                     person:subData.key,
    //                     data:subData.val()
    //                 })
    //             })

    //             items.push({
    //                 key: data.key,
    //                 data: cheeseData
    //             })
    //         })
    //     this.setState({dataSource:this.state.dataSource.cloneWithRows(items)}) 
    //     //console.log(items)
    //     })

    // }   

    componentWillMount() {

        database.ref('EncomendasFinalizadas').on('value', (snap) => {
            items = [];
            snap.forEach((data) => {
                items.push({
                    key: data.key,
                    data: data.val()
                })
            })
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(items) })
        })

    }


    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%'
                }}

            />
        )
    }

    retornarEntrega(numero, nCliente, lucro, price, prod, statusPagamento) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yy = today.getFullYear();

        firebase.database().ref().child("Encomendas").once("value", function (snapShot) {
            firebase.database().ref().child('Encomendas').push({
                cliente: nCliente,
                statusPagamento: statusPagamento,
                preço: price,
                produto: prod,
                lucro: lucro,
                dia: dd + '/' + mm + '/' + yy
            })
        }
        )
        firebase.database().ref().child('EncomendasFinalizadas/' + numero).remove();
    }

    arquivarEntrega(numero, nCliente, lucro, price, prod, statusPagamento,dia){
        firebase.database().ref().child("EncomendasArquivadas").once("value", function (snapShot) {
            firebase.database().ref().child('EncomendasArquivadas').push({
                cliente: nCliente,
                statusPagamento: statusPagamento,
                preço: price,
                produto: prod,
                lucro: lucro,
                dia:dia
            })
        }
        )
        firebase.database().ref().child('EncomendasFinalizadas/' + numero).remove();
    }
    


    // renderRow(data){
    //     return(        
    //         <View>
    //             <Text>{data.key}</Text>
    //             <View style={styles.navbar}>
    //                 <FlatList 
    //                     data={data.data}
    //                     style={styles.flatlist}
    //                     renderItem={({item}) =>
    //                         {if(item.data.finalizado=== 'nao'){
    //                             return(
    //                             <View  style={{backgroundColor:item.data.statusPagamento === 'nao' ?'#ff4d4d':'#b3ff99',height:45,flexDirection:'row',flex:1}}>
    //                                 <View style={styles.queijos}>
    //                                     <Text>{item.person}</Text>  
    //                                 </View>
    //                                 <View >
    //                                     <Text>status:{item.data.statusPagamento}</Text>
    //                                     <Text>preço:{item.data.preço}</Text>
    //                                 </View>
    //                                 <Button title='entregue' onPress={() => this.finalizar(item.person,data.key)}/>
    //                             </View>
    //                             )
    //                         }
    //                         }
    //                         }
    //                     ItemSeparatorComponent={this.renderSeparator}
    //                 />
    //             </View>
    //         </View>
    //     )
    // }
    // changeStatus(status, numero) {
    //     if (status === 'nao') {
    //         console.log('asdasd')
    //         firebase.database().ref().child('Encomendas/' + numero).update({
    //             statusPagamento: 'sim'
    //         })
    //         this.setState({ status: 'sim' })
    //     } else {
    //         console.log('weslley faggot')
    //         firebase.database().ref().child('Encomendas/' + numero).update({
    //             statusPagamento: 'nao'
    //         })
    //         this.setState({ status: 'nao' })
    //     }
    // }

    somarLucro() {
        // var lucroTotal = 0
        // firebase.database().ref().child("EncomendasFinalizadas").on("value", function (snapshot) {
        //     var a = snapshot.numChildren();

        //     for (i = 0; i < a; i++) {
        //         var ref = firebase.database().ref().child('EncomendasFinalizadas/' + i);
        //         ref.on('value', function (snapshot) {
        //             if (snapshot.val().statusPagamento === 'sim') {
        //                 lucroTotal = parseFloat(lucroTotal) + parseFloat(snapshot.val().lucro)
        //                 console.log(lucroTotal)
        //             }
        //         });
        //     }
        //     // console.log(lucroTotal)
        //     // return(
        //     //     <View><Text>{lucroTotal}</Text></View>
        //     // )
        // })
        // this.setState({ aparecerLucro: lucroTotal })
    }

    renderRow(data) {
        return (
            <View style={{
                backgroundColor: data.data.statusPagamento === 'nao' ? '#ff4d4d' : 'orange',
                height: 45,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                borderColor: 'black',
                borderWidth: 1
            }}
            >
                <TouchableHighlight>
                    <View style={styles.view}>
                        <View style={styles.cliente}>
                            <Text>{data.data.cliente}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text >{data.data.produto}</Text>
                            <Text>{data.data.dia}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text>R$: {data.data.preço}</Text>
                            <Text>lucro: {data.data.lucro}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.viewBotao}>
                    <Button title='Arq' style={{ height: 34, width: 50 }} onPress={() => this.arquivarEntrega(
                        data.key,
                        data.data.cliente,
                        data.data.lucro,
                        data.data.preço,
                        data.data.produto,
                        data.data.statusPagamento,
                        data.data.dia
                    )} />
                    <View style={{ marginLeft: 9 }}>
                        <Button title='Ret' style={{ height: 34, width: 50 }} onPress={() => this.retornarEntrega(
                            data.key,
                            data.data.cliente,
                            data.data.lucro,
                            data.data.preço,
                            data.data.produto,
                            data.data.statusPagamento
                        )} />
                    </View>
                </View>
            </View>
        )
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        if (user != null) {
            this.setState({ nome: user.displayName })
            // email = user.email;
            // photoUrl = user.photoURL;
            // emailVerified = user.emailVerified;
            // uid = user.uid; 
        }
    }
    deslogarUsuario() {
        const usuario = firebase.auth();
        usuario.signOut()
    }
    render() {
        return (
            <View style={styles.tudo}>

                <Text style={styles.header}>Finalizadas</Text>
                <Text></Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    style={styles.flat}
                />
                <View>
                    <View>
                        <Text style={styles.lucro}>LUCRO:{this.state.aparecerLucro}</Text>
                    </View>

                    <View>
                        <Button onPress={() => this.somarLucro()} title="Ver Lucro" />
                    </View>
                    <View>
                        <Button onPress={() => this.deslogarUsuario()} title="LOGOUT" />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        flexDirection: 'row',
        flex: 1
    },
    header: {
        fontSize: 30,
        color: 'grey'
    },
    cliente: {

    },
    tudo: {
        backgroundColor: '#bfbfbf',
        flex: 1
    },
    info: {
        marginLeft: SCREEN_WIDTH * 0.1
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lucro: {
        fontSize: 30,
        color: 'grey'
    },
    flat: {
        borderColor: 'black',
        borderWidth: 2,
    },
    viewBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});