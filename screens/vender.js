// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ActivityIndicator,
//   Picker,
//   ListView,
//   FlatList,
//   StyleSheet,
//   TouchableHighlight,
//   Dimensions
// } from "react-native";
// import * as firebase from "firebase";
// import { Actions, Router, Scene } from "react-native-router-flux";
// import * as functions from "../funcoes.js";
// import { StackNavigator } from "react-navigation";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// export default class Vender extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       vendedor: "",
//       quantidade: "",
//       listaItems: [],
//       quantidadeExibida: this.props.quantidadee
//     };
//   }
//   componentWillMount() {}

//   retirarDoTotalEstoqueGeladeira(prod, quant, quantidadeAnterior) {
//     firebase
//       .database()
//       .ref()
//       .child("EstoqueGeladeira/" + prod)
//       .update({
//         quantidade: parseInt(quantidadeAnterior) - parseInt(quant)
//       });
//   }

//   venderProduto(prod, quant) {}

//   render() {
//     return (
//       <View>
//         <Button
//           title="voltar"
//           color="#6B8E23"
//           onPress={() => Actions.estoqueVend()}
//         />
//         <View>
//           <Text style={styles.produto}>Produto: {this.props.produto}</Text>
//         </View>
//         <View>
//           <Text>Insira o total de vendas realizada hoje</Text>
//         </View>
//         <View>
//           <TextInput
//             style={{
//               height: 40,
//               borderColor: "gray",
//               borderWidth: 1,
//               backgroundColor: "white"
//             }}
//             label="quantidade"
//             placeholder="quantidade"
//             value={this.state.quantidade}
//             onChangeText={quantidade => this.setState({ quantidade })}
//             keyboardType="numeric"
//           />
//         </View>

//         <Button
//           title="tranferir"
//           onPress={() => {
//             console.log(this.state.quantidade, this.props.produto);
//             this.venderProduto(this.props.produto, this.state.quantidade);
//           }}
//           color="green"
//         />
//         <Text>
//           {this.props.produto} sobrando no seu estoque:
//           {this.state.quantidadeExibida}
//         </Text>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   produto: {
//     fontSize: 30,
//     color: "black"
//   }
// });

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Picker,
  ListView,
  ScrollView
} from "react-native";
import Input from "react-native-elements";
import * as firebase from "firebase";
import * as functions from "../global/funcoes.js";

var listaProdutos = [];
var preços = [];
export default class Vender extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //     headerTitle: "Cadastro",
  // });
  constructor(props) {
    super(props);
    database = firebase.database();
    items = [];
    usuario = firebase.auth();
    this.state = {
      loading: true,
      nomeProd: "",
      qnt: []
    };
    //   ,
    //   dataSource: new ListView.DataSource({
    //     rowHasChanged: (r1, r2) => r1 != r2
    //   })
    // };
    // this.renderRow = this.renderRow.bind(this);
  }
  componentWillMount() {
    usuario.onAuthStateChanged(usuarioAtual => {
      if (usuarioAtual) {
        firebase
          .database()
          .ref("EstoqueCadaVendedor/" + usuario.currentUser.displayName)
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
              lista.push(items[i].key);
              console.log(items[i].key);
            }
            this.setState({
              listaItems: lista,
              loading: false
              // ,
              // dataSource: this.state.dataSource.cloneWithRows(items)
            });
          });
      }
    });
  }

  cadastrarClasse() {}

  renderClasseOrSpinner() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" />;
    }
    let ProdutosPreços = this.state.listaItems.map((s, i) => {
      return (
        <View style={styles.lista}>
          <Text style={styles.texto}> {s} </Text>
          <TextInput
            style={{
              height: 40,
              width: 50,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "white",
              position: "absolute",
              marginLeft: 120
            }}
            label={s}
            placeholder={s}
            value={this.state.qnt[i]}
            onChangeText={qnt => {
              this.state.qnt[i] = qnt;
            }}
            keyboardType="numeric"
          />
        </View>
      );
    });
    return (
      <ScrollView>
        <View style={styles.nomeClasse}>
          <Text>Registrar Venda</Text>
        </View>
        <View>{ProdutosPreços}</View>
        <Button
          title="Registrar Venda"
          onPress={() => {
            // for (i = 0; i <= lista.length - 1; i++) {
            //   if (this.state.qnt[i] !== undefined) {
            //     firebase
            //       .database()
            //       .ref()
            //       .child("vendas")
            //       .push({
            //         vendedor: usuario.currentUser.displayName,
            //         produto: this.state.listaItems[i],
            //         quantidade: this.state.qnt[i],
            //         dia: functions.dataHoje(),
            //         hora: functions.horaHoje()
            //       });
            //   }
            // }
            var pushedRef = firebase
              .database()
              .ref()
              .child("vendas")
              .push({
                vendedor: usuario.currentUser.displayName,
                dia: functions.dataHoje(),
                hora: functions.horaHoje()
              });
            for (i = 0; i <= lista.length - 1; i++) {
              if (this.state.qnt[i] !== undefined) {
                firebase
                  .database()
                  .ref()
                  .child("vendas/" + pushedRef)
                  .update({
                    [this.state.listaItems[i]]: this.state.qnt[i]
                  });
              }
            }
          }}
        />
        <Button
          title="logout"
          onPress={() => {
            this.deslogarUsuario();
          }}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
      </ScrollView>
    );
  }
  deslogarUsuario() {
    const usuario = firebase.auth();
    usuario.signOut();
  }
  render() {
    //return <View>{this.renderClasseOrSpinner()}
    return (
      // <View>
      //   <ListView
      //     dataSource={this.state.dataSource}
      //     renderRow={this.renderRow}
      //     style={styles.flat}
      //   />
      //   <Button
      //     title="cadastrar"
      //     // onPress={() => {
      //     //   for (i = 0; i < items.length - 1; i++) {
      //     //     firebase
      //     //       .database()
      //     //       .ref()
      //     //       .child("Classes/2")
      //     //       .update({
      //     //         [this.state.listaItems[i]]: this.state.preços[i]
      //     //       });
      //     //   }
      //     // }}
      //     onPress={() => {
      //       for (i = 0; i <= lista.length; i++) {
      //         console.log(
      //           this.state.listaItems[i] + " : " + this.state.preços[i]
      //         );
      //       }
      //     }}
      //   />
      // </View>
      this.renderClasseOrSpinner()
    );
  }
}

const styles = {
  errorTextStyle: {
    color: "red", //this.error=='Usuario Cadastrado' ?  'green': 'red'  n funciona essa merda---=--=-
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  lista: {
    flexDirection: "row",
    marginTop: 20
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  texto: {
    fontSize: 30
  },
  nomeClasse: {
    flexDirection: "row",
    alignItems: "center"
  }
};
