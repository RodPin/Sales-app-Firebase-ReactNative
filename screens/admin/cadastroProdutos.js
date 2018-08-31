import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Picker,
  StyleSheet,
  Platform,
  Animated,
  Image,
  Dimensions
} from "react-native";
import * as firebase from "firebase";
import { Actions, Router, Scene } from "react-native-router-flux";
import stl from "../../global/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const logo = require("../../img/naroca.png");

export default class CadastroProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: ""
    };
  }
  getRef() {
    return firebase.database().ref();
  }

  cadastrarProduto(prod) {
    if (prod == "") {
      alert("Preencha o campo do nome do produto");
    } else {
      firebase
        .database()
        .ref()
        .child("Produtos/")
        .push({
          produto: prod
        });

      firebase
        .database()
        .ref()
        .child("EstoqueGeladeira/" + prod)
        .set({
          quantidade: 0
        });

      alert("Encomenda Adicionada");
      this.setState({
        produto: ""
      });
    }
  }

  girar() {}

  render() {
    return (
      <View style={stl.mainBackground}>
        <View>
          <Text>Produto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={produto => this.setState({ produto })}
            value={this.state.produto}
          />
        </View>

        <Button
          title="enviar"
          onPress={() => {
            this.cadastrarProduto(this.state.produto);
          }}
          color="green"
        />

        <Image source={logo} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white"
  },
  logo: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH * 0.65,
    marginLeft: SCREEN_WIDTH * 0.2
  },
  viewGeral: {
    flex: 1
  }
});
