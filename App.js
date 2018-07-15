import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import {Actions,Router,Scene } from 'react-native-router-flux';
import firebase from 'firebase'
import {TabNavigator,StackNavigator,SwitchNavigator} from 'react-navigation';
//npm install --save redux react-redux redux-thunk  
import EstoqueScreen from './screens/EstoqueScreen';
import CadScreen from './screens/CadastroScreen';
import Loading from './screens/Loading';
import LogScreen from './screens/LogScreen';
import EstoqueAdminScreen from "./screens/EstoqueAdminScreen"
import  EstoqueVendScreen from "./screens/EstoqueVendScreen"

import CadastroProdutos from './screens/admin/cadastroProdutos';
import AddScreen from './screens/AddScreen';

import EncomendasMain from './screens/admin/EncomendasMain'
import EncomendasFinalizada from './screens/admin/EncomendasFinalizadas';
import EncomendasAndamento from './screens/admin/EncomendasAndamento';
import EncomendasAdd from './screens/admin/EncomendasAdd'

//https://wpesc.cos.ufrj.br:8003/index.php?zone=wpesc&redirurl=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect

export default class App extends React.Component {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyCBv6PFQ5IpK-SS18tV-9equs2vQa-RLeM",
      authDomain: "naroca-88d69.firebaseapp.com",
      databaseURL: "https://naroca-88d69.firebaseio.com",
      projectId: "naroca-88d69",
      storageBucket: "",
      messagingSenderId: "352745983174"
    };
    firebase.initializeApp(config);
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
  //       <Scene key='app'>
  //         <Scene key='loading' component={Loading} hideNavBar />
  //         <Scene key='login' component={LogScreen} hideNavBar  />
  //         <Scene key='cadastro' component={CadScreen} hideNavBar />
  //         <Scene key='estoque' component={EstoqueScreen} hideNavBar  />
  //         <Scene key='admin' component={EstoqueAdminScreen} hideNavBar />
  //         <Scene key='vendedor' component={EstoqueVendScreen} hideNavBar  />

  //         <Scene key='cadastroProdutos' component={CadastroProdutos} hideNavBar  /> 
  //         <Scene key='add' component={AddScreen} hideNavBar  />  


  //         <Scene key='encomendas' component={EncomendasMain} />
  //         <Scene key='encomendasFinalizadas' component={EncomendasFinalizada} />
  //         <Scene key='encomendasAndamento' component={EncomendasAndamento} />
  //         <Scene key='encomendasAdd' component={EncomendasAdd} />
  //        </Scene>
  //     </Router>
  //   );
  // }

  render() {
    const MainNavigator = TabNavigator({
        Finalizado: { screen: EncomendasFinalizada},
        encomendas:{ screen:EncomendasAndamento },
        ADD:{screen:EncomendasAdd}
      },
      {
        tabBarOptions : {
          style: {
            backgroundColor: 'green',
            
          }
        }
      })
  

  return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <MainNavigator />
      </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  }
})
