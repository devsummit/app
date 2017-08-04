import React, { Component } from 'react';
import { Container, Content, Button, Text, Form, Input, Label, Item } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Image, View, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        username: '',
        password: '',
        loggedIn: false 
    };
  }
  onLogin = (usernameInput, passwordInput) => {
    fetch('http://private-f30431-devsummit.apiary-mock.com/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput
        })
    }).then((response) => response.json())
    .then(async (responseJson) => {
        if (responseJson.success) {
            try {
                await AsyncStorage.setItem('access_token', responseJson.result.access_token);
                await AsyncStorage.setItem('refresh_token', responseJson.result.refresh_token);
            } catch (error) {
                Alert.alert(
                    'Failed',
                    'Failed to store token',
                )
            }

            this.setState({loggedIn: true})
            Alert.alert(
                'Success',
                'Login Success',
            )
        }
    })
    .catch((error) => {
        Alert.alert(
            'Login Failed',
            'Something is wrong, try again later.',
        )
    });
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.headerSection}>
              <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
              <Text style={styles.titleText}>DevSummit</Text>
          </View>
          <View style={styles.formSection}>
            <Form>
              <Item>
                  <Input placeholder="Username" onChangeText={(username) => this.setState({username})}/>
              </Item>
              <Item>
                  <Input placeholder="Password" secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
              </Item>
            </Form>
          </View>
          <View style={styles.buttonSection}>
            {(this.state.username=='' || this.state.password=='') ?
              <Button disabled block style={[styles.button, {elevation: 0}]}>
                  <Text style={styles.buttomText}>Log In</Text>
              </Button>
            :
            <Button primary block style={styles.button} onPress={() => (this.state.username=='' || this.state.password=='') ? null : this.onLogin(this.state.username,this.state.password)}>
                <Text style={styles.buttomText}>Log In</Text>
            </Button>
            }
            <View style={styles.lineSection}>
              <View style={styles.lineTextOne}></View>
              <Text style={styles.lineTextTwo}> or </Text>
              <View style={styles.lineTextOne}></View>
            </View>
            <Button primary style={styles.button}>
              <Icon name="facebook" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Facebook</Text>
            </Button>
            <Button danger style={styles.button}>
              <Icon name="google-plus" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Google</Text>
            </Button>
            <Button info style={styles.button}>
              <Icon name="twitter" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Twitter</Text>
            </Button>
          </View>
          <View style={styles.registerSection}>
            <Text style={styles.registerText} onPress={() => Actions.register()}>Don't have an account? <Text style={styles.registerTextBold}>Register</Text></Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)',
    flex: 1,
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 25,
    paddingTop: 25,
    backgroundColor: '#0D47A1',
    marginBottom: 5
  },
  logo: {
    height: 60,
    width: 60,
  },
  titleText: {
    fontSize: 10.5,
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  formSection: {
    marginRight: 20,
    marginLeft: 3
  },
  icon: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18,
  },
  buttonSection: {
    marginTop: 14
  },
  button: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    paddingRight: 26,
    flex: 7,
  },
  lineSection: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  lineTextOne: {
    flex:4.5,
    opacity:0.1,
    backgroundColor: 'black',
    height: 1.5,
    marginTop: 12
  },
  lineTextTwo: {
    textAlign: 'center',
    flex:1,
    opacity:0.3,
  },
  registerSection: {
    marginTop: 15,
  },
  registerText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#3366BB'
  },
  registerTextBold: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#3366BB'
  }
});