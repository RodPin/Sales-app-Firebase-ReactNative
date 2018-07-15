import React, {Component} from 'react';
import {View,Text,TextInput,Button,ActivityIndicator,Picker} from 'react-native';
import * as firebase from 'firebase'
export default class CadScreen extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     headerTitle: "Cadastro",
    // });
    
    state = { email: '', password: '', error: '',nome:'',tipo:'', loading: false };

    
    
    onCadastroPress() {
        this.setState({ error: '', loading: true });

        const { email, password ,nome} = this.state;
                //Login was not successful, let's create a new account
        if(this.state.tipo==''){
            alert("selecione uma opcao");
            this.setState({loading:false})
        }else{

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { 
                var id=firebase.auth().currentUser.uid;
                this.setState({ error: 'Usuario Cadastrado', loading: false }),
                firebase.auth().currentUser.updateProfile({
                    displayName: nome
                    //photoURL: "https://example.com/jane-q-user/profile.jpg"
                }),
                this.getRef().child('users/'+id).set({
                    tipo:this.state.tipo,
                    nome:nome
                }).then(function() {
                    
                    // const usuario = firebase.auth();
                    // usuario.signOut()
                }).catch(function(error) {
                    // An error happened.
            })
        //   var userId=firebase.auth().currentUser.uid;     
        //     definirTipoUsuario(userId,'vendedor');
        }
        )
            .catch((error) => {
                this.setState({ error: error.message, loading: false });
            });
        
        }
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
                    <Text>CADASTRO</Text>
                    <TextInput 
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'white'}}
                        label='Nome'
                        placeholder='Nome'
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })}
                    />
                    <TextInput 
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'white'}}
                        label='Email Address'
                        placeholder='you@domain.com'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput 
                        style={{height: 40, borderColor: 'gray', borderWidth: 1,backgroundColor:'white'}}
                        label='Password'
                        autoCorrect={false}
                        placeholder='*******'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />

                    <Picker
                        selectedValue={this.state.tipo}
                        style={{ height: 50, width:400 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({tipo: itemValue})}>
                        <Picker.Item label="Select Value" value=''/>
                        <Picker.Item label="Admin" value="admin" />
                        <Picker.Item label="Vendedor" value="vendedor" />
                        <Picker.Item label="Cliente" value="cliente" />
                    </Picker>
                    
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    {this.renderButtonOrSpinner()}
                    
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
