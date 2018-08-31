import Expo from "expo";
import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Actions, Router, Scene } from "react-native-router-flux";
import firebase from "firebase";
import {
  TabNavigator,
  StackNavigator,
  SwitchNavigator
} from "react-navigation";
//npm install --save redux react-redux redux-thunk
import stl from "./global/styles";
import FirebaseConfig from "./keys";

import EstoqueScreen from "./screens/EstoqueScreen";
import CadScreen from "./screens/CadastroScreen";
import Loading from "./screens/Loading";
import LogScreen from "./screens/LogScreen";

import EstoqueCadaVendedor from "./screens/estoqueCadaVendedor";
import estoqueKdVendEVendas from "./screens/estqVendas";

import MainAdmin from "./screens/admin/MainAdmin";
import CadastroProdutos from "./screens/admin/cadastroProdutos";
import CadastroVendedor from "./screens/admin/cadastroVendedores";

import ComprarProdutos from "./screens/admin/comprarProdutos";
import Vendedores from "./screens/admin/vendedores/vendedores";

import EstoqueGeladeira from "./screens/admin/EstoqueGeladeira";
import AddScreen from "./screens/AddScreen";
import EncomendasMain from "./screens/admin/EncomendasMain";
import EncomendasFinalizada from "./screens/admin/EncomendasFinalizadas";
import EncomendasAndamento from "./screens/admin/EncomendasAndamento";
import EncomendasAdd from "./screens/admin/EncomendasAdd";

import TransferirParaVendedor from "./screens/admin/transfGeladeiraPVend";
import CriarClasse from "./screens/admin/criarClasse";

//https://wpesc.cos.ufrj.br:8003/index.php?zone=wpesc&redirurl=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp(FirebaseConfig.Firebase);
  }
  ////na hora do login ir pra onde tem q ir
  //   const usuario = firebase.auth();
  //   usuario.onAuthStateChanged(
  //     (usuarioAtual) => {
  //        if (usuarioAtual){
  //           Actions.encomendas();
  //         }else{
  //           Actions.login();
  //         }
  //     }
  //   );
  // }

  // render() {
  //   return (
  //     //com esse provider store todos os components que estao dentro do main navigator podem ser relacionados com a  store via react-redux
  //     <Router>
  //       <Scene key="app">
  //         <Scene key="MainAdmin" component={MainAdmin} hideNavBar />
  //         <Scene
  //           key="CadastroVendedor"
  //           component={CadastroVendedor}
  //           hideNavBar
  //         />
  //         <Scene key="CriarClasse" component={CriarClasse} hideNavBar />

  //         <Scene key="encomendas" component={EncomendasMain} />
  //         <Scene key="encomendasFinalizadas" component={EncomendasFinalizada} />
  //         <Scene key="encomendasAndamento" component={EncomendasAndamento} />
  //         <Scene key="encomendasAdd" component={EncomendasAdd} />
  //       </Scene>
  //     </Router>
  //   );
  // }

  render() {
    const geladeiraStack = TabNavigator(
      {
        EstoqueGeladeira: {
          screen: EstoqueGeladeira
        },
        ComprarProdutos: { screen: ComprarProdutos }
      },
      {
        tabBarOptions: {
          style: { backgroundColor: "grey" }
        }
      }
    );

    const MainNavigator = StackNavigator({
      MainAdmin: {
        screen: MainAdmin
      },
      CadastroVendedor: { screen: CadastroVendedor },
      CriarClasse: { screen: CriarClasse },
      CadastroProdutos: { screen: CadastroProdutos },
      geladeiraStack: { screen: geladeiraStack },
      Vendedores: {
        screen: Vendedores
      }
    });

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  }
});
