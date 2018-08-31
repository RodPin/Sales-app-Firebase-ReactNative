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
import * as functions from "../../global/funcoes.js";
import stl from "../../global/styles";

var listaProdutos = [];
var preços = [];
export default class CriarClasse extends Component {
  static navigationOptions = {
    headerStyle: stl.colorNavigator,
    headerRight: <Text style={stl.navigatorOptionsStyle}>#NaRoça</Text>
  };

  constructor(props) {
    super(props);
    database = firebase.database();
    items = [];
    this.state = {
      loading: true,
      nomeProd: "",
      preços: []
    };
    //   ,
    //   dataSource: new ListView.DataSource({
    //     rowHasChanged: (r1, r2) => r1 != r2
    //   })
    // };
    // this.renderRow = this.renderRow.bind(this);
  }
  componentWillMount() {
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
        this.setState({
          listaItems: lista,
          loading: false
          // ,
          // dataSource: this.state.dataSource.cloneWithRows(items)
        });
      });
  }
  // renderRow(data) {
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: "white",
  //         height: 45,
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         flex: 1,
  //         borderColor: "black",
  //         borderWidth: 1
  //       }}
  //     >
  //       <View style={styles.view}>
  //         <View>
  //           <Text>{data.data.produto}</Text>
  //         </View>
  //         <View>
  //           <TextInput
  //             style={{
  //               height: 40,
  //               width: 70,
  //               borderColor: "gray",
  //               borderWidth: 1,
  //               backgroundColor: "white"
  //             }}
  //             label={data.data.produto}
  //             placeholder={data.data.produto}
  //             value={this.state.preços[i]} //<--tentar isso aqui
  //             keyboardType="numeric"
  //             onChangeText={preço => {
  //               this.state.preços[i] = preço;
  //               console.log(data);
  //             }}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }
  getRef() {
    return firebase.database().ref();
  }
  // definirTipoUsuario(id,x){
  //         var usersRef =this.firebase.database().ref().child(id);
  //         usersRef.set({
  //         tipoUsuario:x
  //         })
  // }

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
            value={this.state.preços[i]}
            onChangeText={preço => {
              this.state.preços[i] = preço;
            }}
            keyboardType="numeric"
          />
        </View>
      );
    });
    return (
      <ScrollView style={stl.mainBackground}>
        <View style={styles.nomeClasse}>
          <Text>CADASTRO DA CLASSE:</Text>
          <TextInput
            style={{
              height: 40,
              width: 130,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "white",
              marginLeft: 20
            }}
            label="nome da classe"
            placeholder="nome da classe"
            value={this.state.nomeClasse}
            onChangeText={nomeClasse => this.setState({ nomeClasse })}
          />
        </View>
        {ProdutosPreços}
        <Button
          title="cadastrar Classe"
          onPress={() => {
            for (i = 0; i <= lista.length - 1; i++) {
              console.log(this.state.listaItems[i], this.state.preços[i]);
              firebase
                .database()
                .ref()
                .child("Classes/" + this.state.nomeClasse)
                .update({
                  [this.state.listaItems[i]]: this.state.preços[i]
                });
            }
          }}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
      </ScrollView>
    );
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
