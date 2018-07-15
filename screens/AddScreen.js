import React, {Component} from 'react';
import {View,Text,TextInput,Button,StyleSheet} from 'react-native';
import * as firebase from 'firebase';

export default class AddScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { nomeQueijo: '', quantidade:'',preço:''};

      }
      getRef(){
        return firebase.database().ref();
    }
    
      criarItem(x,y,z){
        if(x==''){
            alert('Preencha o Campo do nome')
        }else if(y==''){
            alert('Preencha o campo da quantidade')
        }else if(z==''){
            alert('Preencha o campo do preço')
        }else{
            var nome=firebase.auth().currentUser.displayName;
            var id=firebase.auth().currentUser.uid;
            // this.getRef().child('users/'+id).set({
            //     admin:false,
            //     nome:nome
            // })
            var usersRef =this.getRef().child('queijos/'+id+"/"+ x);
            usersRef.set({
            quantidade:y,
            preço:z
        })
            alert('Queijo Adicionado');
        }
        // this.getRef().child("queijos").child("nome").set({
        //     quantidade:this.state.quantidade
        // })
    }

    render() {
        return(
            <View>
                <View>
                    <Text>Nome Do queijo:</Text>
                <TextInput
                    style={styles.input}
                     onChangeText={(nomeQueijo) => this.setState({nomeQueijo})}
                     value={this.state.nomeQueijo}
                />
                </View>

                <View>
                    <Text>Quantidade:</Text>
                <TextInput
                    style={styles.input}
                     onChangeText={(quantidade) => this.setState({quantidade})}
                     value={this.state.quantidade}
                     keyboardType="numeric"
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
                
                <Button
                    title='enviar'
                    onPress={() => {this.criarItem(this.state.nomeQueijo,this.state.quantidade,this.state.preço)}}
                    color='green'
                />
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
    }
})