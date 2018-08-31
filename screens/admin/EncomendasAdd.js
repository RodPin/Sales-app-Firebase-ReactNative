import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Picker
} from "react-native";
import * as firebase from "firebase";

export default class CadastroProdutos extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //     headerTitle: "Cadastro",
  // });

  state = {
    nome: "",
    error: ""
  };

  getRef() {
    return firebase.database().ref();
  }

  onCadastroPress(nomeProduto) {
    firebase
      .database()
      .ref()
      .child("Encomendas/")
      .push({
        cliente: nCliente,
        statusPagamento: pay,
        preço: price,
        produto: prod,
        finalizado: "nao",
        lucro: lucro
      });
  }

  definirTipoUsuario(id, x) {
    var usersRef = this.firebase
      .database()
      .ref()
      .child(id);
    usersRef.set({
      tipoUsuario: x
    });
  }

  render() {
    return (
      <View>
        <Text>PRODUTO</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "white"
          }}
          label="Nome"
          placeholder="Nome do Produto"
          value={this.state.nome}
          onChangeText={nome => this.setState({ nome })}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <Button
          onPress={() => this.onCadastroPress(this.state.nome)}
          title="cadastrar"
        />
        ;
      </View>
    );
  }
}
const styles = {
  errorTextStyle: {
    color: "red", //this.error=='Usuario Cadastrado' ?  'green': 'red'  n funciona essa merda---=--=-
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
};
