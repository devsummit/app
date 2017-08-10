import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  List,
  ListItem,
  Picker,
  Item,
  Label,
  Input,
  Button,
  Text,
  Title
} from 'native-base';
import { View, StyleSheet, Alert, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import styles from './styles';

class Speaker extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: 'John',
      lastName: 'Doe',
    }
  }

  render(){
    return (
      <Container>
        <Header title="SPEAKER" />
      </Container>
    )
  }
}

export default Speaker;
