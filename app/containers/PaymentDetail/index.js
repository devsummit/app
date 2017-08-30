import React, { Component } from 'react';
import {
  Container,
  Content,
  Item,
  Picker,
  Button,
  Text,
  Spinner
} from 'native-base';
import { Alert, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';
import * as paymentSelectors from '../Payment/selectors';
import { BANK_TRANSFERS, CREDIT_CARD, PAYMENT_METHODS } from '../Payment/constants';

// import constants
import { PRIMARYCOLOR } from '../../constants';

class PaymentDetail extends Component {
  componentWillMount() {

  }

  componentWillReceiveProps() {
    const { getTransactionResponse } = this.props;
    if (Object.keys(getTransactionResponse).length > 0) {
      if (getTransactionResponse.data && getTransactionResponse.data.status_message) {
        Alert.alert(getTransactionResponse.data.status_message);
        this.props.updateGetTransactionResponse({});
        Actions.pop();
      } else if (
        getTransactionResponse.meta &&
        getTransactionResponse.meta.message &&
        getTransactionResponse.meta.message.status_message) {
        if (getTransactionResponse.meta.message.validation_messages) {
          const messages = getTransactionResponse.meta.message.validation_messages;
          let message = ''
          for (let i = 0; i < messages.length; i++) {
            message += messages[i];
          }
          Alert.alert(message);
        } else {
          Alert.alert(getTransactionResponse.meta.message.status_message);
          this.props.updateGetTransactionResponse({});
          Actions.pop();
        }
      } else if (getTransactionResponse.meta && getTransactionResponse.meta.message.length > 0) {
        Alert.alert(getTransactionResponse.meta.message);
        this.props.updateGetTransactionResponse({});
      }
    }
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  render() {
    console.log(this.props)
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
        let mo = i + 1
        if (i < 9) {
          mo = '0'.concat(mo)
        }
        monthList.push({
          value: 'key'.concat(i),
          label: mo.toString()
        });
      }
      for (let i = 0; i < 20; i++) {
        yearList.push({
          value: 'key'.concat(i),
          label: (i + 2017).toString()
        });
      }
    } else {
      detail = PAYMENT_METHODS.filter((data) => {
        return data.payment_type === paymentType;
      })[0];
      console.log(detail)
    }

    const { inputFields, errorFields, getIsFetchingTransaction } = this.props;
    const {
      emailDetail,
      firstName,
      lastName,
      phoneNumber,
      vaNumber,
      cardExpiryMonth,
      cardExpiryYear,
      cardCvv,
      cardNumber,
      grossAmount,
      orderId,
      descriptionDetail,
      lastDigitNumber,
      randomNumber,
      mandiriToken
    } = inputFields || '';
    const {
      errorEmailDetail,
      errorFirstName,
      errorLastName,
      errorPhoneNumber,
      errorVaNumber,
      errorCardNumber,
      errorCardCvv,
      errorDescriptionDetail,
      errorLastDigitNumber,
      errorRandomNumber,
      errorMandiriToken
    } = errorFields || false;

    if (getIsFetchingTransaction) {
      return (
        <Container>
          <Content>
            <Spinner color={PRIMARYCOLOR} />
          </Content>
        </Container>
      );
    }
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
              <InputItem
                title="cvv"
                error={errorCardCvv}
                onChangeText={text => this.handleInputChange('cardCvv', text)}
                value={cardCvv}
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
          {detail && detail.descriptionDetail ?
            <Content>
              <InputItem
                error={errorDescriptionDetail}
                title="Description"
                onChangeText={text => this.handleInputChange('descriptionDetail', text)}
                value={descriptionDetail}
              />
            </Content> : <Content />
          }
          {detail && detail.extraInput ?
            <Content>
              <InputItem
                error={errorCardNumber}
                title="16 digits card number"
                onChangeText={text => this.handleInputChange('cardNumber', text)}
                value={cardNumber}
              />
              <Text style={styles.text}>
                Last 10 digits
              </Text>
              <Text
                style={styles.text}
                onChangeText={text => this.handleInputChange('lastDigitNumber', text)}
              >
                {cardNumber.slice(6, 16)}
              </Text>
              <InputItem
                error={errorRandomNumber}
                title="5 digit random number given"
                onChangeText={text => this.handleInputChange('randomNumber', text)}
                value={randomNumber}
              />
              <InputItem
                error={errorMandiriToken}
                title="mandiri token"
                onChangeText={text => this.handleInputChange('mandiriToken', text)}
                value={mandiriToken}
              />
            </Content> : <Content />
          }
          <InputItem
            title="Order ID"
            onChangeText={text => this.handleInputChange('orderId', text)}
            value={orderId}
          />
          <InputItem
            title="Gross Amount"
            onChangeText={text => this.handleInputChange('grossAmount', text)}
            value={grossAmount}
          />

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

//  props validation
PaymentDetail.propTypes = {
  getTransactionResponse: PropTypes.object.isRequired,
  updateErrorFields: PropTypes.func.isRequired,
  updateGetTransactionResponse: PropTypes.func.isRequired,
  updateInputFields: PropTypes.func.isRequired,
  inputFields: PropTypes.object.isRequired,
  errorFields: PropTypes.object.isRequired,
  submitPayment: PropTypes.func.isRequired,
  getIsFetchingTransaction: PropTypes.bool.isRequired
};

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
