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
const SCREEN_WIDTH = Dimensions.get("window").width;
export default class ListaVendedores extends Component {
  constructor(props) {
    super(props);
    database = firebase.database();

    this.state = {
      quantidade: [],
      preço: "",
      loading: true,
      aparecer: false,
      counter: 1
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref("vendedores")
      .on("value", snap => {
        this.setState({ listaVendedores: [] });
        lista = [];
        items = [];
        snap.forEach(data => {
          items.push({
            key: data.key,
            data: data.val()
          });
          this.setState({ listaVendedores: items });
        });
        this.setState({ loading: false });
        console.log(this.state.listaVendedores);
      });
  }

  renderItem({ item, index }) {
    return (
      <View>
        <View style={styles.view}>
          <Text style={styles.row}>{item.data.nome}</Text>
          <Button
            title="Estoque"
            style={{ width: 40, height: 40 }}
            color="black"
            onPress={() => {
              Actions.EstoqueVendedores({
                vendedorSelecionado: item.data.nome
              });
            }}
          />
          <Button
            title="Edit"
            style={{ width: 40, height: 40 }}
            color="black"
            onPress={() => {
              Actions.EditarVendedores({ vendedorSelecionadoID: item.key });
            }}
          />
        </View>
      </View>
    );
  }

  renderTudoOrSpinner() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <ScrollView style={stl.mainBackground}>
        <Text style={styles.header}>Vendedores:</Text>
        <View>
          <FlatList
            data={this.state.listaVendedores}
            renderItem={this.renderItem}
          />
        </View>
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
