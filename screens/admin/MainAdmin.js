import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Button,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import * as firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";
import * as functions from "../../global/funcoes";
import stl from "../../global/styles";
import { Actions, Router, Scene } from "react-native-router-flux";
import CadastroVendedor from "./cadastroVendedores";

const image = require("../../img/background.jpg");

class MainAdmin extends Component {
  static navigationOptions = {
    header: () => null, //this will hide the Stack navigator's header (TabA_StackNavigator)
    tabBarVisible: false //this will hide the TabBar navigator's header (LoggedIn_TabNavigator)
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    const usuario = firebase.auth();
    usuario.onAuthStateChanged(usuarioAtual => {
      if (usuarioAtual) {
        console.log("usuario: " + usuario.currentUser.displayName);
        this.setState({
          usuarioLogado: usuario.currentUser.displayName,
          loading: false
        });
      }
    });
  }
  deslogarUsuario() {
    const usuario = firebase.auth();
    usuario.signOut();
  }
  loader() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View style={stl.mainBackground}>
        <Text>logged as: {this.state.usuarioLogado}</Text>
        <Text>PAGINA DO ADM</Text>
        <View style={styles.botoes}>
          <Button
            color="black"
            onPress={() => this.props.navigation.navigate("CadastroProdutos")}
            title="Cadastrar Produtos"
          />
          <Button
            color="black"
            onPress={() => this.props.navigation.navigate("CadastroVendedor")}
            title="CadastroVendedor"
          />
          <Button
            color="black"
            onPress={() => this.props.navigation.navigate("CriarClasse")}
            title="CriarClasse"
          />
          <Button
            color="black"
            onPress={() => this.props.navigation.navigate("geladeiraStack")}
            title="Geladeira"
          />
          <Button
            color="black"
            onPress={() => this.props.navigation.navigate("Vendedores")}
            title="Vendedores"
          />

          <Button
            color="black"
            onPress={() => this.deslogarUsuario()}
            title="LogOut"
          />
        </View>
      </View>
    );
  }

  render() {
    return this.loader();
  }
}

const styles = StyleSheet.create({
  botoes: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    width: 200,
    marginLeft: 60
  }
});

export default MainAdmin;
