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
import * as functions from "../../global/funcoes";
import { StackNavigator } from "react-navigation";
import stl from "../../global/styles";
var tamanho = SCREEN_WIDTH * 0.8;
const SCREEN_WIDTH = Dimensions.get("window").width;
export default class EstoqueGeladeira extends Component {
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
    database.ref("EstoqueGeladeira").on("value", snap => {
      items = [];
      snap.forEach(data => {
        items.push({
          key: data.key,
          data: data.val()
        });
      });
      this.setState({ k: items });
    });
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
        });
        for (i = 0; i < items.length; i++) {
          lista.push(items[i].data.nome);
        }
        this.setState({ listaVendedores: lista, loading: false });
      });
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({ nome: user.displayName });
      // email = user.email;
      // photoUrl = user.photoURL;
      // emailVerified = user.emailVerified;
      // uid = user.uid;
    }
  }
  // TA DANDO MERDA PQ TA MUNDANDO SE UM DOS CAMPOS NAO FOR PREECHIDO E TBM NAO CONSIGO SETAR O STATE PRA 0 DNV
  verificar(prod, quantNova, vend) {
    let funcionar = true;
    if (vend !== undefined) {
      for (i = 0; i < prod.length; i++) {
        console.log("entrou");
        if (quantNova[i] > prod[i].data.quantidade) {
          console.log("kaka");
          funcionar = false;
          console.log(funcionar);
        }
      }
      console.log("2: " + funcionar);
      if (funcionar == true) {
        var newRef = firebase
          .database()
          .ref()
          .child("TransferenciasPraVendedores/")
          .push({
            vendedor: vend,
            dia: functions.dataHoje(),
            hora: functions.horaHoje()
          });
        for (i = 0; i < prod.length; i++) {
          console.log("transf1:");
          if (quantNova[i] !== undefined) {
            console.log(quantNova[i]);
            if (Number.isNaN(parseInt(quantNova[i])) == false) {
              this.transferirProduto(prod, quantNova, vend, newRef);
            }
          }
        }
      } else {
        alert("Voce tentou transferir mais que tinha na geladeira");
      }
    } else {
      alert("Para qual vendedor?");
    }
    funcionar = true;
  }

  transferirProduto(prod, quantNova, vend, newRef) {
    newRef
      .child(prod[i].key)
      .set({
        quantidade: quantNova[i]
      })
      .then(
        // quantidade:[]-----------------------------
        firebase
          .database()
          .ref()
          .child("EstoqueGeladeira/" + prod[i].key)
          .update({
            quantidade:
              parseInt(prod[i].data.quantidade) - parseInt(quantNova[i])
          })
          .then(
            firebase
              .database()
              .ref()
              .child("EstoqueCadaVendedor/" + vend + "/" + prod[i].key)
              .update({
                quantidade: parseInt(quantNova[i])
              })
              .then(
                alert("Produto transferido"),
                this.setState({ vendedor: "", quantidade: [] })
              )
          )
      );
  }

  transferencia() {
    this.setState({ aparecer: true });
  }
  aparecer(x) {
    let pickerComVendedores = this.state.listaVendedores.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    if (x == false) {
      return (
        <View>
          <FlatList data={this.state.k} renderItem={this.renderItem} />
          <Button
            title="Transferencia para vendedor"
            color="black"
            onPress={() => {
              this.transferencia();
            }}
          />
        </View>
      );
    }
    return (
      <View>
        <Picker
          selectedValue={this.state.vendedor}
          onValueChange={itemValue => this.setState({ vendedor: itemValue })}
        >
          <Picker.Item label="Escolha o Vendedor" value="" />
          {pickerComVendedores}
        </Picker>
        <FlatList
          data={this.state.k}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.view}>
                <Text style={styles.row}>{item.key}</Text>
                <Text>{item.data.quantidade}</Text>
                <TextInput
                  style={{
                    height: 40,
                    width: 50,
                    borderColor: "black",
                    borderWidth: 1
                  }}
                  onChangeText={qnt => {
                    // let { quantidade } = this.state;
                    this.state.quantidade[index] = qnt;
                    // this.setState({
                    //   quantidade
                    // });
                  }}
                  value={this.state.quantidade[index]}
                  keyboardType="numeric"
                />
              </View>
            );
          }}
        />
        <Button
          title="Transferir"
          color="grey"
          onPress={() =>
            this.verificar(
              this.state.k,
              this.state.quantidade,
              this.state.vendedor
            )
          }
        />
      </View>
    );
  }

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
    return (
      <ScrollView style={stl.mainBackground}>
        <Text style={styles.header}>Estoque Geladeira</Text>

        {this.aparecer(this.state.aparecer)}
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
