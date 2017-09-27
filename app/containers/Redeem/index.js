import React, { Component } from 'react';
import {
  Container,
  ListItem,
  Button,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Fab,
  Form,
  Item,
  Input
} from 'native-base';
import PropTypes from 'prop-types';
import { RefreshControl, View, AsyncStorage } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getProfileData } from '../../helpers';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { PRIMARYCOLOR } from '../../constants';
import HeaderPoint from '../../components/Header';
import * as actions from './actions';
import * as selectors from './selectors';

class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 3
    };
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
  }

  placeRedeem = () => {
    this.props.placeRedeem();
  }

  render() {
    return (
      <View>
        <Text style={styles.modalTitle}>Redeem your code</Text>
        <View style={styles.inputItem}>
          <Form>
            <Item>
              <Input
                placeholder="Enter code"
                onChangeText={text => this.handleInputChange('code', text)}
              />
            </Item>
          </Form>
        </View>
        <View style={styles.buttonsSection}>
          <Button
            transparent
            style={styles.button}
            onPress={() => this.placeRedeem()}
          >
            <Text style={styles.buttonText}>REDEEM</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  inputFields: selectors.getInputFields()
});

export default connect(mapStateToProps, actions)(Redeem);
