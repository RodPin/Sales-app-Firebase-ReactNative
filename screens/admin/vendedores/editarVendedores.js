import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Picker,
  Image,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import * as functions from "../../../global/funcoes.js";
import { Actions } from "react-native-router-flux";
import stl from "../../../global/styles";

export default class EditarVendedores extends Component {
  static navigationOptions = {
    headerStyle: stl.colorNavigator,
    headerRight: <Text style={stl.navigatorOptionsStyle}>#NaRoça</Text>
  };

  state = {
    email: "",
    password: "",
    error: "",
    nome: "",
    telefone: "",
    endereço: "",
    loading: true
  };
  componentWillMount() {
    firebase
      .database()
      .ref("Classes")
      .on("value", snap => {
        this.setState({ classes: [] });
        lista = [];
        items = [];
        snap.forEach(data => {
          items.push({
            key: data.key,
            data: data.val()
          });
        });
        for (i = 0; i < items.length; i++) {
          lista.push(items[i].data);
        }
        this.setState({ classes: lista, loading: false });
      });
    console.log(this.props.vendedorSelecionadoID);
    firebase
      .database()
      .ref("vendedores")
      .on("value", snap => {
        this.setState({ classes: [] });
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
        }
      });
  }
  getRef() {
    return firebase.database().ref();
  }
  onCadastroPress() {}

  renderTudoOrSpinner() {
    if (this.state.loading == true) {
      return <ActivityIndicator size="large" />;
    }
    let pickerComClasses = this.state.classes.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    return (
      <View style={stl.mainBackground}>
        <View style={{ flex: 10 }}>
          <Text>EDITAR VENDEDOR {this.props.vendedorSelecionado}</Text>

          <TextInput
            style={styles.input}
            label="Email Address"
            placeholder="you@domain.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.input}
            label="telefone"
            placeholder="telefone"
            value={this.state.telefone}
            onChangeText={telefone => this.setState({ telefone })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            label="endereço"
            placeholder="endereço"
            value={this.state.endereço}
            onChangeText={endereço => this.setState({ endereço })}
          />
          <TextInput
            style={styles.input}
            label="Password"
            autoCorrect={false}
            placeholder="*******"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Picker
            selectedValue={this.state.classe}
            onValueChange={itemValue => this.setState({ classe: itemValue })}
          >
            <Picker.Item label="Escolha a Classe" value="" />
            {pickerComClasses}
          </Picker>
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
        </View>
      </View>
    );
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <Button
        onPress={this.onCadastroPress.bind(this)}
        title="CADASTRAR USUARIO"
      />
    );
  }

  render() {
    return this.renderTudoOrSpinner();
  }
}
const styles = {
  errorTextStyle: {
    color: "red",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    height: 40,
    width: 200,
    alignSelf: "center",
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white"
  }
};
