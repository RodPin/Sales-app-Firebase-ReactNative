import React, {Component} from 'react';
import {View,Text,TextInput,Button,ActivityIndicator,Picker} from 'react-native';
import * as firebase from 'firebase'
export default class CadastroProdutos extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     headerTitle: "Cadastro",
    // });
    
    state = { email: '', password: '', error: '',nome:'',tipo:'', loading: false };

    
    
    onCadastroPress(x) {
        this.setState({ error: '', loading: true });

                //Login was not successful, let's create a new accoun

                var usersRef =this.getRef().child('queijos/'+ x);
                usersRef.set({
                quantidade:2,
                preço:3
            })
            .catch((error) => {
                this.setState({ error: error.message, loading: false });
            });
        
        }
    
    getRef(){
        return firebase.database().ref();
    }
    // definirTipoUsuario(id,x){
    //         var usersRef =this.firebase.database().ref().child(id);
    //         usersRef.set({
    //         tipoUsuario:x
    //         })
    // }

    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <ActivityIndicator />;    
        }
        return <Button onPress={this.onCadastroPress.bind(this)} title="CADASTRE-SE" />;
    }
    render() {
        return (
            <View>
                    <Text>CADASTRE O PRODUTO</Text>
                    <TextInput 
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'white'}}
                        label='Nome'
                        placeholder='Nome do Produto'
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })}
                    />
                    
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    {this.renderButtonOrSpinner(this.state.nome)}
                    
            </View>
        );
    }
}
const styles = {
    errorTextStyle: {
        color: 'red', //this.error=='Usuario Cadastrado' ?  'green': 'red'  n funciona essa merda---=--=-
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
};
