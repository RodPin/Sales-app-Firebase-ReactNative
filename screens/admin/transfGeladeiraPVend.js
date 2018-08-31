import React from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Picker,
  Button
} from "react-native";
import { StackNavigator } from "react-navigation";
import firebase from "firebase";
import { Actions, Router, Scene } from "react-native-router-flux";
import * as functions from "../../global/funcoes.js";
// const nomeproduto = this.props.navigation.getParam(
//   "produto",
//   "some default value"
// );

export default class TransferirParaVendedor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendedor: "",
      quantidade: "",
      listaItems: [],
      quantidadeExibida: this.props.quantidadee
    };
  }
  componentWillMount() {
    firebase
      .database()
      .ref("vendedores")
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
          lista.push(items[i].data.nome);
        }
        this.setState({ listaItems: lista });
      });
  }

  retirarDoTotalEstoqueGeladeira(prod, quant, quantidadeAnterior) {
    firebase
      .database()
      .ref()
      .child("EstoqueGeladeira/" + prod)
      .update({
        quantidade: parseInt(quantidadeAnterior) - parseInt(quant)
      });
  }

  transferirProduto(prod, quant, vend) {
    firebase
      .database()
      .ref()
      .child("EstoqueGeladeira/" + prod)
      .once("value", function(snapshot) {
        var quantidadeAnterior = snapshot.val().quantidade;
        console.log(quantidadeAnterior);

        if (quant < quantidadeAnterior) {
          if (prod == "") {
            alert("Preencha o campo do nome do produto");
          } else if (quant == "") {
            alert("Preencha o campo da quantidade");
          } else if (vend == "") {
            alert("Preencha o campo do vendedor");
          } else {
            //REGISTRAR A Trasnferencia --------------------------------------------------------------------------------
            firebase
              .database()
              .ref()
              .child("TransferenciasPraVendedores/")
              .push({
                produto: prod,
                quantidade: quant,
                vendedor: vend,
                dia: functions.dataHoje(),
                hora: functions.horaHoje()
              });
            // FAZER COM QUE O ESTOQUE GELADEIRA DIMINUA O QUE JA TINHA ANTES COM O VALOR NOVO -----------------------------
            firebase
              .database()
              .ref()
              .child("EstoqueGeladeira/" + prod)
              .update({
                quantidade: parseInt(quantidadeAnterior) - parseInt(quant)
              });
            firebase
              .database()
              .ref()
              .child("EstoqueCadaVendedor/" + vend + "/" + prod)
              .update({
                quantidade: parseInt(quant)
              });

            alert("Produto transferido");
            Actions.estqGeladeira();
          }
        } else {
          alert("Voce tentou transferir mais que tinha na geladeira");
        }
      });
  }

  render() {
    let pickerComVendedores = this.state.listaItems.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });

    return (
      <View>
        <Button
          title="voltar"
          color="#6B8E23"
          onPress={() => Actions.estqGeladeira()}
        />
        <View>
          <Text style={styles.produto}>Produto: {this.props.produto}</Text>
        </View>

        <View>
          <Picker
            selectedValue={this.state.vendedor}
            onValueChange={itemValue => this.setState({ vendedor: itemValue })}
          >
            <Picker.Item label="Escolha o Vendedor" value="" />
            {pickerComVendedores}
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

        <Button
          title="tranferir"
          onPress={() => {
            console.log(this.state.quantidade, this.props.produto);
            this.transferirProduto(
              this.props.produto,
              this.state.quantidade,
              this.state.vendedor
            );
          }}
          color="green"
        />
        <Text>
          {this.props.produto} sobrando na geladeira:
          {this.state.quantidadeExibida}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  produto: {
    fontSize: 30,
    color: "black"
  }
});
