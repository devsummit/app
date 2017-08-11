import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Picker,
  Item,
  Label,
  Input,
  Button,
  Text
} from 'native-base';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { Actions } from 'react-native-router-flux';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as actions from '../Register/actions';
import * as selectors from '../Register/selectors';

class RegisterMenu extends Component {

    handleButtonClick = (value) => {
      this.props.updateRegisterMethod(value);
    }

    render() {
      return (
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
          <Button warning block style={styles.button} onPress={() => this.handleButtonClick('email')}>
            <Icon name="envelope" color="white" style={styles.icon} />
            <Text style={styles.buttonText} >Email</Text>
          </Button>
          <Button success block style={styles.button} onPress={() => this.handleButtonClick('phone')}>
            <Icon name="phone" color="white" style={styles.icon} />
            <Text style={styles.buttonText} >Phone</Text>
          </Button>
        </Content>
      );
    }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  registerMethod: selectors.getRegisterMethod()
});

export default connect(mapStateToProps, actions)(RegisterMenu);
