import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  List,
  ListItem,
  Picker,
  Label,
  Input,
  Text,
  Title
} from 'native-base';
import { View, StyleSheet, Alert, Image, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import Button from '../../components/Button'
import Header from '../../components/Header';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'John',
      lastName: 'Doe',
    }
  }

  componentWillMount() {
    // this.handleInputChange('username', this.props.username)
    // this.handleInputChange('firstName', this.props.username)
    // this.handleInputChange('username', this.props.username)
  }

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  }

  render() {
    return (
      <Container>
        <Header
          title="PROFILE"
        >
          <View style={styles.section1}>
            <Image
              source={{ uri: "http://lorempixel.com/450/450/cats/" }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
        </Header>
        <Content>
          <View style={styles.section3}>
            <Text style={styles.username}>username</Text>
          </View>
          <View style={styles.section2}>
            <InputItem
              title="First Name"
              onChangeText={(text) => { this.setState({firstName: text}) }}
              onSubmitEditing={()=>{ this.input.focus()}}
              value={this.props.firstName}
            />
            <InputItem
              title="Last Name"
              onChangeText={(text) => {this.setState({lastName: text}) }}
              onSubmitEditing={()=>{ this.input.focus()} }
              value={this.props.lastName}
            />
            <Button block light style={styles.button} onPress={() => { Actions.changePassword(); }}>
              <Text>Change Password</Text>
            </Button>
            <Button
              block
              disabled={ this.state.firstName === '' ? true : false }
              style={styles.button}
            >
              <Text>Save changes</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields()
});

export default connect(mapStateToProps, actions)(Profile);
