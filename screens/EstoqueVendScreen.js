import React, {Component} from 'react';
import {View,Text,ListView,TouchableHighlight,StyleSheet,Button} from 'react-native';
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';

//14 min https://www.youtube.com/watch?v=FIu0MNirS1M&t=462s
class  EstoqueVendScreen extends Component {

//https://www.youtube.com/watch?v=DubYGbDNtkw
    constructor(props){
        super(props);
        database=firebase.database();
        items=[];
        this.state = {
            quantidade:'',
            preço:'',
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
        }

        this.renderRow = this.renderRow.bind(this);
    }
    componentWillMount(){
        

        var id=firebase.auth().currentUser.uid;
        database.ref('queijos/'+id).on('value',(snap) => {
            items=[];
            snap.forEach((data)=>{    
                items.push({
                    key:data.key,
                    data:data.val()
                })
            })
        this.setState({dataSource:this.state.dataSource.cloneWithRows(items)})
        })
        
    }

    renderRow(data){
        return(        
            <View style={styles.navbar}>
                <View style={styles.queijos}>
                    <Text>{data.key}</Text>
                </View>

                <View>
                    <Text>quantidade:{data.data.quantidade}</Text>
                    <Text>preço:{data.data.preço}</Text>
                </View>
            </View>
        )
    }
    componentDidMount(){
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
    render() {
        return(
            // <View>
                  
            //     <View>
            //         <Text>logged as: {this.state.nome}</Text>
            //     </View>    
            //     
            //     <ListView 
            //         dataSource={this.state.dataSource}
            //         renderRow={this.renderRow}
            //     />
            //    <View>
            //         <Button onPress={()=> this.deslogarUsuario()} title="LOGOUT"/>
            //     </View>
            // </View>

        <View style={styles.viewGeral}>
            <Text>logged as: {this.state.nome}</Text>
            <Text style={styles.header}>Meus Queijos</Text>
            <View style={styles.botoes}>
          <Button color="black" /*onPress={()=>}*/ title="Produtos"/>
          <Button color="black"  /*onPress={()=>}*/ title="Historico de vendas"/>
          <Button color="black" /*onPress={()=>}*/ title="A receber"/>
          <Button color="black" /*onPress={()=>}*/ title="Correção"/>
          <Button color="black" onPress={()=> this.deslogarUsuario()} title="LogOut"/>
          <Text> </Text>
          
        </View>
      </View>
            
        )
    }
} 

const styles = StyleSheet.create({
    navbar: {
        alignItems: 'center',
        backgroundColor:'#fff',
        borderBottomColor:'#eee',
        borderColor:'transparent',
        borderWidth:1,
        height:44,
        flexDirection:'row'
    },
    queijos:{
        justifyContent: 'center',
        flex:2
    },
    header:{
        fontSize:30,
        color:'grey'
    }, 
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
  });

  export default EstoqueVendScreen