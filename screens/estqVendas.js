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
import * as firebase from "firebase";
import { Actions, Router, Scene } from "react-native-router-flux";
import * as functions from "../global/funcoes";
import EstoqueCadaVendedor from "./estoqueCadaVendedor";
import Vender from "./vender";
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class estoqueKdVendEVendas extends Component {
  render() {
    return (
      //com esse provider store todos os components que estao dentro do main navigator podem ser relacionados com a  store via react-redux
      <Router>
        <Scene key="app2">
          <Scene key="vender" component={Vender} hideNavBar />
          <Scene key="estoqueVend" component={EstoqueCadaVendedor} hideNavBar />
        </Scene>
      </Router>
    );
  }
}
