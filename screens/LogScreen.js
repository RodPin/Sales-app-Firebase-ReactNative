import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  Platform
} from "react-native";
import firebase from "firebase";
import { Actions, Router, Scene } from "react-native-router-flux";

//https://medium.com/@jamesmarino/getting-started-with-react-native-and-firebase-ab1f396db549 async coisas
//https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2
export default class LogScreen extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //     headerTitle: "Login",
  //     headerRight: (
  //       <Button
  //         title="Cadastro"
  //         text="Cadastro"
  //         onPress={() => {
  //           navigation.navigate("Cadastro");
  //         }}
  //         //backgroundColor="rgba(0,0,0,0)"
  //         color="green"//"rgba(0,122,255,1)"
  //       />
  //     )
  // });
  state = { email: "", password: "", error: "", loading: false };

  onLoginPress() {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "", loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
  }

  verificarUsuarioLogado() {
    const usuario = firebase.auth();
    usuario.onAuthStateChanged(usuarioAtual => {
      if (usuarioAtual) {
        alert("Usuario esta Logado");
        console.log(usuario.currentUser.displayName);
      } else {
        alert("Usuario nao esta Logado");
      }
    });
  }

  render() {
    return (
      <View>
        <Text>LOGIN</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "white"
          }}
          label="Email Address"
          placeholder="you@domain.com"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "white"
          }}
          label="Password"
          autoCorrect={false}
          placeholder="*******"
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        {this.renderButtonOrSpinner()}

        <Button
          onPress={() => {
            this.verificarUsuarioLogado();
          }}
          title="Verificar usuario logado"
          color="green"
          acessibilityLabel="Verificar usuario logado"
        />

        <Button
          onPress={() => Actions.cadastro()}
          title="Cadastre-se"
          color="purple"
          acessibilityLabel="Cadastre"
        />
      </View>
    );
  }
}
const styles = {
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
};
