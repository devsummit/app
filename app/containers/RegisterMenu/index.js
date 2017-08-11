import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Picker,
  Item,
  Label,
  Input,
  Text
} from 'native-base';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button'

class RegisterMenu extends Component {
    render() {
      return (
        <Container style={styles.container}>
            <Content>
              <Text style={styles.title}>Register with: </Text>
              <Button block style={styles.button} >
                <Icon name="facebook" color="white" style={styles.icon} />
                <Text style={styles.buttonText} >Facebook</Text>
              </Button>
              <Button info block style={styles.button} >
                <Icon name="twitter" color="white" style={styles.icon} />
                <Text style={styles.buttonText} >Twitter</Text>
              </Button>
              <Button danger block style={styles.button} >
                <Icon name="google-plus" color="white" style={styles.icon} />
                <Text style={styles.buttonText} >Google</Text>
              </Button>
              <Button warning block style={styles.button} onPress={() => Actions.register()}>
                <Icon name="envelope" color="white" style={styles.icon} />
                <Text style={styles.buttonText} >Email</Text>
              </Button>
            </Content>
        </Container>
      );
    }
}

export default RegisterMenu;
