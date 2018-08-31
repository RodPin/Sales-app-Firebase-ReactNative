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
import * as functions from "../../global/funcoes.js";
import stl from "../../global/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const logo = require("../../img/naroca.png");

export default class ComprarProdutos extends Component {
  static navigationOptions = {
    headerStyle: stl.colorNavigator,
    headerRight: <Text style={stl.navigatorOptionsStyle}>#NaRoça</Text>
  };

  constructor(props) {
    super(props);
    this.state = {
      produto: "",
      quantidade: "",
      preçoPorProduto: "",
      listaItems: []
    };
  }
  getRef() {
    return firebase.database().ref();
  }

  componentWillMount() {
    //zerar a lista toda vez pra dps pushar os elementos pra ela
    // firebase
    //   .database()
    //   .ref("Produtos")
    //   .on("value", function(snapshot) {
    //     console.log(snapshot.val());
    //   });

    firebase
      .database()
      .ref("Produtos")
      .on("value", snap => {
        this.setState({ listaItems: [] });
        lista = [];
        items = [];
        snap.forEach(data => {
          items.push({
            key: data.key,
            data: data.val()
          });
        });
        for (i = 0; i < items.length; i++) {
          lista.push(items[i].data.produto);
        }
        this.setState({ listaItems: lista });
      });
  }

  somarTotalEstoqueGeladeira(prod, quant) {
    firebase
      .database()
      .ref()
      .child("EstoqueGeladeira/" + prod)
      .once("value", function(snapshot) {
        var quantidadeAnterior = snapshot.val().quantidade;
        console.log("quantidadeAnteriorCompra: " + quantidadeAnterior);
        firebase
          .database()
          .ref()
          .child("EstoqueGeladeira/" + prod)
          .update({
            quantidade: parseInt(quantidadeAnterior) + parseInt(quant)
          });
      });
  }

  comprarProduto(prod, quant, preçoPorProduto) {
    if (prod == "") {
      alert("Preencha o campo do nome do produto");
    } else if (quant == "") {
      alert("Preencha o campo da quantidade");
    } else if (preçoPorProduto == "") {
      alert("Preencha o campo do preço");
    } else {
      //REGISTRAR A COMPRA --------------------------------------------------------------------------------
      var CustoTotal = preçoPorProduto * quant;
      firebase
        .database()
        .ref()
        .child("Compras/")
        .push({
          produto: prod,
          quantidade: quant,
          preçoPorProduto: preçoPorProduto,
          custoTotal: CustoTotal,
          dia: functions.dataHoje(),
          hora: functions.horaHoje()
        });
      // FAZER COM QUE O ESTOQUE GELADEIRA SOME O QUE JA TINHA ANTES COM O VALOR NOVO -----------------------------
      this.somarTotalEstoqueGeladeira(prod, quant);

      alert("Encomenda Adicionada");
      this.setState({
        quantidade: "",
        produto: "",
        preçoPorProduto: ""
      });
    }
  }

  render() {
    let pickerComProdutos = this.state.listaItems.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });

    return (
      <View>
        <View>
          <Text>Cadastrar Compra de Produto</Text>
          <Picker
            selectedValue={this.state.produto}
            onValueChange={itemValue => this.setState({ produto: itemValue })}
          >
            <Picker.Item label="Escolha o Produto" value="" />
            {pickerComProdutos}
          </Picker>
        </View>

        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "white"
            }}
            label="quantidade"
            placeholder="quantidade"
            value={this.state.quantidade}
            onChangeText={quantidade => this.setState({ quantidade })}
            keyboardType="numeric"
          />
        </View>

        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "white"
            }}
            label="preçoPorProduto"
            placeholder="preço Por Produto"
            value={this.state.preçoPorProduto}
            onChangeText={preçoPorProduto => this.setState({ preçoPorProduto })}
            keyboardType="numeric"
          />
        </View>

        <Button
          title="Registrar Compra"
          onPress={() => {
            this.comprarProduto(
              this.state.produto,
              this.state.quantidade,
              this.state.preçoPorProduto
            );
          }}
          color="green"
        />
      </View>
    );
  }
  // return <View />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white"
  },
  picker: {
    height: 50,
    width: 400,
    borderWidth: 1,
    borderColor: "green",
    position: Platform.OS === "ios" ? "absolute" : null,
    bottom: 0,
    right: 0,
    left: 0
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
