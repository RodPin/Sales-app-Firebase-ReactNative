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
import { StackNavigator } from "react-navigation";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class EstoqueCadaVendedor extends Component {
  constructor(props) {
    super(props);
    database = firebase.database();
    items = [];
    this.state = {
      quantidade: "",
      preço: "",
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      })
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    const usuario = firebase.auth();
    usuario.onAuthStateChanged(usuarioAtual => {
      if (usuarioAtual) {
        console.log("usuario: " + usuario.currentUser.displayName);
        console.log("usuario2: " + usuarioAtual);
        this.setState({ usuarioLogado: usuario.currentUser.displayName });
        database
          .ref("EstoqueCadaVendedor/" + usuario.currentUser.displayName)
          .on("value", snap => {
            items = [];
            snap.forEach(data => {
              items.push({
                key: data.key,
                data: data.val()
              });
              console.log(items);
            });
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(items)
            });
          });
      } else {
        alert("Usuario nao esta Logado");
      }
    });
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }

  aaaasomarTotalEstoqueCadaVendedor(vendedor, produto, quantidade) {
    firebase
      .database()
      .ref()
      .child("EstoqueCadaVendedor/" + vendedor)
      .once("value", function(snapshot) {
        var quantidadeAnterior = snapshot.val().quantidade;
        firebase
          .database()
          .ref()
          .child("EstoqueGeladeira/" + vendedor)
          .update({
            [produto]: parseInt(quantidadeAnterior) + parseInt(quantidade)
          });
      });
  }

  aaaaatransferirParaVendedor(vendedor, quant, prod) {
    if (vendedor == "") {
      alert("Informe o vendedor");
    } else if (quant == "") {
      alert("Informe a quantidade");
    } else if (prod == "") {
      alert("Preencha o campo do produto");
    } else {
      //REGISTRAR A COMPRA --------------------------------------------------------------------------------
      firebase
        .database()
        .ref()
        .child("TransferenciasParaVendedores/")
        .push({
          produto: prod,
          quantidade: quant,
          Vendedor: vendedor,
          dia: functions.dataHoje(),
          hora: functions.horaHoje()
        });
      this.somarTotalEstoqueCadaVendedor(vendedor, prod, quant);
    }
  }

  renderRow(data) {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: 45,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          borderColor: "black",
          borderWidth: 1
        }}
      >
        <View style={styles.view}>
          <View style={styles.cliente}>
            <Text>{data.key}</Text>
          </View>
          <View>
            <Text style={styles.produto}>{data.data.quantidade}</Text>
          </View>
        </View>
        {/* <View style={styles.viewBotao}>
                            <Button title='editar' style={{height:45,width:50}} onPress={() => this.edit(data.key)} />
                        </View> */}
      </View>
    );
  }

  deslogarUsuario() {
    const usuario = firebase.auth();
    usuario.signOut();
  }

  render() {
    return (
      <View style={styles.tudo}>
        <Text>{this.state.usuarioLogado}</Text>
        <Text style={styles.header}>Estoque Cada Vendedor</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.flat}
        />
        <View>
          <Button
            onPress={() => Actions.vender()}
            title="Registrar Venda"
            color="green"
          />
        </View>
        <View>
          <Button onPress={() => this.deslogarUsuario()} title="LOGOUT" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderColor: "transparent",
    borderWidth: 1,
    flexDirection: "row",
    flex: 1
  },
  header: {
    fontSize: 30,
    color: "black"
  },
  cliente: {
    marginTop: 10
  },
  produto: {
    marginRight: SCREEN_WIDTH * 0.1
  },
  tudo: {
    backgroundColor: "#bfbfbf",
    flex: 1
  },
  info: {
    marginLeft: SCREEN_WIDTH * 0.1
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  flat: {
    borderColor: "black",
    borderWidth: 2
  }
});
