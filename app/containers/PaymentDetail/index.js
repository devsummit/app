import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Button,
  Text
} from 'native-base';
import { Alert, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountKit, {
  LoginButton,
  Color,
  StatusBarStyle
} from 'react-native-facebook-account-kit';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';
import * as paymentSelectors from '../Payment/selectors';
import { BANK_TRANSFERS, CREDIT_CARD } from '../Payment/constants';

// import constants
import { PRIMARYCOLOR } from '../../constants';

class PaymentDetail extends Component {
  componentWillMount() {
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  render() {
    // if (this.props.getIsFetchingTransaction) {
    //   Alert.alert(this.props.getTransactionResponse.data.status_message);
    //   Actions.pop();
    //   Actions.pop();
    // }
    const monthList = [];
    const yearList = [];

    const { paymentType, bankDestination } = this.props.initialPayment;
    let detail = {};
    if (paymentType === 'bank_transfer') {
      detail = BANK_TRANSFERS.filter((data) => {
        return data.bankDestination === bankDestination;
      })[0];
    } else if (paymentType === 'credit_card') {
      detail = CREDIT_CARD;

      for (let i = 0; i < 12; i++) {
        monthList.push({
          value: 'key'.concat(i),
          label: (i + 1).toString()
        });
      }

      for (let i = 0; i < 20; i++) {
        yearList.push({
          value: 'key'.concat(i),
          label: (i + 2017).toString()
        });
      }
    }

    const { inputFields, errorFields } = this.props;
    const {
      emailDetail,
      firstName,
      lastName,
      phoneNumber,
      vaNumber,
      cardExpiryMonth,
      cardExpiryYear,
      cardNumber
    } = inputFields || '';
    console.log(this.props)
    const {
      errorEmailDetail,
      errorFirstName,
      errorLastName,
      errorPhoneNumber,
      errorVaNumber,
      errorCardExpiryMonth,
      errorCardExpiryYear,
      errorCardNumber,
    } = errorFields || false;

    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.text}>{detail.label}</Text>
          {detail && detail.basicDetail ?
            <Content>
              <InputItem
                error={errorEmailDetail}
                title="Email"
                onChangeText={text => this.handleInputChange('emailDetail', text)}
                value={emailDetail}
              />
              <InputItem
                error={errorFirstName}
                title="First Name"
                onChangeText={text => this.handleInputChange('firstName', text)}
                value={firstName}
              />
              <InputItem
                error={errorLastName}
                title="Last Name"
                onChangeText={text => this.handleInputChange('lastName', text)}
                value={lastName}
              />
              <InputItem
                error={errorPhoneNumber}
                title="Phone Number"
                onChangeText={text => this.handleInputChange('phoneNumber', text)}
                value={phoneNumber}
              />
            </Content>
            : <Content />}
          {detail && detail.vaNumber ?
            <InputItem
              error={errorVaNumber}
              title="VA number"
              onChangeText={text => this.handleInputChange('vaNumber', text)}
              value={vaNumber}
            /> : <Content />
          }
          {detail && detail.ccDetail ?
            <Content>
              <InputItem
                error={errorCardNumber}
                title="Card Number"
                onChangeText={text => this.handleInputChange('cardNumber', text)}
                value={cardNumber}
              />
              <Text>expiry</Text>
              <View style={styles.datePicker}>
                <Picker
                  style={styles.monthPicker}
                  placeholder="expiry month"
                  mode="dropdown"
                  selectedValue={cardExpiryMonth}
                  onValueChange={value => this.handleInputChange('cardExpiryMonth', value)}
                >
                  {monthList && monthList.map(component => (
                    <Item key={component.value} label={component.label} value={component.label} />
                  ))}
                </Picker>
                <Picker
                  style={styles.yearPicker}
                  placeholder="expiry year"
                  mode="dropdown"
                  selectedValue={cardExpiryYear}
                  onValueChange={value => this.handleInputChange('cardExpiryYear', value)}
                >
                  {monthList && yearList.map(component => (
                    <Item key={component.value} label={component.label} value={component.label} />
                  ))}
                </Picker>
              </View>
            </Content> : <Content />
          }

          <Button
            style={styles.button}
            onPress={() => {
              this.props.submitPayment();
            }}
          >
            <Text>
                  SUBMIT PAYMENT
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

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  inputFields: selectors.getInputFields(),
  errorFields: selectors.getErrorFields(),
  initialPayment: paymentSelectors.getInputFields(),
  getIsFetchingTransaction: selectors.getIsFetchingTransaction(),
  getTransactionResponse: selectors.getTransactionResponse()
});

export default connect(mapStateToProps, actions)(PaymentDetail);
