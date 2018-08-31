import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Picker,
  ListView,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { Actions, Router, Scene } from "react-native-router-flux";
import EstoqueVendedores from "./estoqueVendedores";
import ListaVendedores from "./listaVendedores";
import EditarVendedores from "./editarVendedores";
import stl from "../../../global/styles";

export default class Vendedores extends Component {
  static navigationOptions = {
    headerStyle: stl.colorNavigator,
    headerRight: <Text style={stl.navigatorOptionsStyle}>#NaRoça</Text>
  };
  render() {
    return (
      //com esse provider store todos os components que estao dentro do main navigator podem ser relacionados com a  store via react-redux
      <Router>
        <Scene key="vend">
          <Scene
            key="ListaVendedores"
            component={ListaVendedores}
            hideNavBar
            main
          />
          <Scene
            key="EstoqueVendedores"
            component={EstoqueVendedores}
            hideNavBar
          />
          <Scene
            key="EditarVendedores"
            component={EditarVendedores}
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }
}
