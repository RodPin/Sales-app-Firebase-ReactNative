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
  Dimensions,
  ScrollView
} from "react-native";
import * as firebase from "firebase";
import { Actions, Router, Scene } from "react-native-router-flux";
import * as functions from "../../../global/funcoes";
import { StackNavigator } from "react-navigation";
import stl from "../../../global/styles";
var tamanho = SCREEN_WIDTH * 0.8;
const SCREEN_WIDTH = Dimensions.get("window").width;
export default class EstoqueVendedores extends Component {
  constructor(props) {
    super(props);
    database = firebase.database();

    this.state = {
      lista: [],
      loading: true,
      aparecer: false,
      counter: 1
    };
  }

  componentWillMount() {
    database
      .ref("EstoqueCadaVendedor/" + this.props.vendedorSelecionado)
      .on("value", snap => {
        items = [];
        snap.forEach(data => {
          items.push({
            key: data.key,
            data: data.val()
          });
        });
        this.setState({ lista: items, loading: false });
      });
  }
  // TA DANDO MERDA PQ TA MUNDANDO SE UM DOS CAMPOS NAO FOR PREECHIDO E TBM NAO CONSIGO SETAR O STATE PRA 0 DNV

  renderItem({ item, index }) {
    return (
      <View>
        <View style={styles.view}>
          <Text style={styles.row}>{item.key}</Text>
          <Text>{item.data.quantidade}</Text>
        </View>
      </View>
    );
  }

  renderTudoOrSpinner() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" />;
    }
    console.log(this.state.lista);
    return (
      <ScrollView style={stl.mainBackground}>
        <Button
          title="voltar"
          color="black"
          onPress={() => {
            Actions.ListaVendedores();
          }}
        />
        <Text style={styles.header}>
          Estoque: {this.props.vendedorSelecionado}
        </Text>

        <FlatList data={this.state.lista} renderItem={this.renderItem} />
      </ScrollView>
    );
  }

  render() {
    return this.renderTudoOrSpinner();
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
    marginLeft: SCREEN_WIDTH * 0.1
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
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 20,
    borderTopWidth: 1,
    width: SCREEN_WIDTH * 0.8
  },
  viewAfter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 20,
    borderTopWidth: 1,
    width: SCREEN_WIDTH * 0.4
  },
  flat: {
    borderColor: "black",
    borderWidth: 2
  }
});
