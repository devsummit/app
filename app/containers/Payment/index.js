import React, { Component } from 'react';
import {
  Container,
  Content,
  Picker,
  Item,
  Button,
  Text
} from 'native-base';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';
import { PAYMENT_METHODS, BANK_TRANSFERS, CREDIT_CARD_LIST } from './constants';


let bankList = [];


class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.navigation.setParams({
      handleIconTouch:
      this.handleIconTouch
    });
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    if (field === 'paymentType' && value !== 'credit_card' && value !== 'bank_transfer') {
      const selectedMethod = PAYMENT_METHODS.filter((data) => {
        return data.payment_type === value;
      })
      this.props.updateErrorFields('bankDestination', selectedMethod[0].bankDestination);
    }
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  render() {
    const { inputFields, order } = this.props;
    const {
      paymentType,
      bankDestination
    } = inputFields || '';

    if (paymentType === 'bank_transfer') {
      bankList = BANK_TRANSFERS;
    } else if (paymentType === 'credit_card') {
      bankList = CREDIT_CARD_LIST;
    }
    return (
      <Container style={styles.container}>
        <Content>
          <Text>SELECT METHOD</Text>
          <Picker
            style={styles.picker}
            placeholder="Payment method"
            mode="dropdown"
            selectedValue={paymentType}
            onValueChange={value => this.handleInputChange('paymentType', value)}
          >
            {PAYMENT_METHODS.map(component => (
              <Item key={component.value} label={component.label} value={component.payment_type} />
            ))}
          </Picker>

          {(paymentType === 'bank_transfer' || paymentType === 'credit_card') ?
            <View>
              <Text>SELECT BANK</Text>
              <Picker
                style={styles.picker}
                placeholder="Bank"
                mode="dropdown"
                selectedValue={bankDestination}
                onValueChange={value => this.handleInputChange('bankDestination', value)}
              >
                {bankList.map(component => (
                  <Item
                    key={component.value}
                    label={component.label}
                    value={component.bankDestination}
                  />
                ))}
              </Picker>
            </View> : <View />}
          <Button
            style={styles.button}
            onPress={() => {
              Actions.paymentDetail({ order });
            }}
          >
            <Text>
              GO TO PAYMENT DETAIL
            </Text>
          </Button>
          {/* {
            (this.props.inputFields.first_name.length !== 0 &&
              this.props.inputFields.email.length !== 0 && this.state.isEmailValid) ?
              this.renderLoginButton() :
              this.renderErrorButton()
          } */}
        </Content>
      </Container>
    );
  }
}

// props validation
Payment.propTypes = {
  updateErrorFields: PropTypes.func.isRequired,
  updateInputFields: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  inputFields: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  inputFields: selectors.getInputFields(),
  errorFields: selectors.getErrorFields()
});

export default connect(mapStateToProps, actions)(Payment);
