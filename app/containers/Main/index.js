import React, { Component } from 'react';
import { Container, Content, Button, Text, Form, Input, Item, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, View, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

const Logo = require('../../../assets/images/logo.png');

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      loginMethod: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  onLogin = () => {
    this.props.login();
  }

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  }

  clearCredential = () => {
    this.handleInputChange('username', '')
    this.handleInputChange('password', '')
  }

  toggle() {
    this.setState({
        visible: !this.state.visible,
        loginMethod: !this.state.loginMethod,
    });
    this.state.loginMethod ?  this.clearCredential() : this.handleInputChange('phone', '')
  }

  render() {
    const { fields, isLoggedIn } = this.props;
    console.log(fields)
    const { username, password, phone } = fields || '';
    if (isLoggedIn) {
      Alert.alert('success', 'User logged in!');
    }
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.headerSection}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.titleText}>DevSummit</Text>
          </View>
          <View style={styles.formSection}>
            {this.state.visible ?
              <Form>
                <Item floatingLabel >
                  <Label>Username</Label>
                  <Input
                    onChangeText={username => this.handleInputChange('username', username)}
                    value={username}
                  />
                </Item>
                <Item floatingLabel >
                  <Label>Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={password => this.handleInputChange('password', password)}
                    value={password}
                  />
                </Item>
              </Form>
              :
              <Form>
                <Item floatingLabel >
                  <Label>Phone number</Label>
                  <Input
                    onChangeText={phone => this.handleInputChange('phone', phone)}
                    value={phone}
                  />
                </Item>
              </Form>
            }
          </View>
          
          <View style={styles.buttonSection}>
            {(username === '' || password === '') ?
              <Button disabled block style={[ styles.button, { elevation: 0 } ]}>
                <Text style={styles.buttomText}>Log In</Text>
              </Button>
              :
              <Button primary block style={styles.button} onPress={() => ((username === '' || password === '') ? null : this.onLogin())}>
                <Text style={styles.buttonText}>Log In</Text>
              </Button>
            }
            <TouchableOpacity onPress={this.toggle}>
              {this.state.loginMethod ? 
                <Text style={styles.loginMethod}>{'Log in with phone number'}</Text>
                :
                <Text style={styles.loginMethod}>{'Log in with username'}</Text>
              }  
            </TouchableOpacity>
            <View style={styles.lineSection}>
              <View style={styles.lineTextOne} />
              <Text style={styles.lineTextTwo}> or </Text>
              <View style={styles.lineTextOne} />
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
            <Text
              style={styles.registerText}
              onPress={() => Actions.register()}
            >{'Don\'t have an account?'}
              <Text style={styles.registerTextBold}>Register</Text>
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isLoggedIn: selectors.isLoggedIn()
});

export default connect(mapStateToProps, actions)(Main);
