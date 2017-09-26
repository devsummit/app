import 'intl';
import 'intl/locale-data/jsonp/id';
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
import PropTypes from 'prop-types';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import styles from './styles';
import strings from '../../localization';
import * as actions from './actions';
import * as selectors from './selectors';
import * as paymentSelectors from '../Payment/selectors';
import { BANK_TRANSFERS, CREDIT_CARD, PAYMENT_METHODS } from '../Payment/constants';

// import constants
import { PRIMARYCOLOR } from '../../constants';

import { getProfileData } from '../../helpers';

class PaymentDetail extends Component {
  componentWillMount() {
    const { order, updateInputFields } = this.props;
    getProfileData().then((profileData) => {
      if (profileData) {
        updateInputFields('firstName', profileData.first_name);
        updateInputFields('lastName', profileData.last_name);
        updateInputFields('emailDetail', profileData.email);
      }
    });
    updateInputFields('order', order);
    updateInputFields('orderId', order.id);
    updateInputFields('grossAmount', order.amount);
    updateInputFields('input2', order.amount);
    updateInputFields('cardExpiryMonth', '01');
    updateInputFields('cardExpiryYear', '2017');
    updateInputFields('input3', Math.floor(Math.random() * 90000) + 10000);
  }

  componentWillReceiveProps() {
    const { getTransactionResponse } = this.props;
    if (getTransactionResponse && getTransactionResponse.meta && getTransactionResponse.meta.message) {
      Alert.alert(getTransactionResponse.meta.message);
      this.props.resetResponse();
      Actions.pop();
    }
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  render() {
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

      for (let i = 0; i < 12; i += 1) {
        let mo = i + 1;
        if (i < 9) {
          mo = '0'.concat(mo);
        }
        monthList.push({
          value: 'key'.concat(i),
          label: mo.toString()
        });
      }
      for (let i = 0; i < 20; i += 1) {
        yearList.push({
          value: 'key'.concat(i),
          label: (i + 2017).toString()
        });
      }
    } else {
      detail = PAYMENT_METHODS.filter((data) => {
        return data.payment_type === paymentType;
      })[0];
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
      descriptionDetail,
      mandiriToken,
      input1,
      input2,
      input3
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
          <Text style={styles.text}>{detail.label.toUpperCase()}</Text>
          {detail && detail.basicDetail ?
            <Content>
              <InputItem
                error={errorEmailDetail}
                title={strings.payment.email}
                onChangeText={text => this.handleInputChange('emailDetail', text)}
                value={emailDetail}
                placeholder={strings.payment.email}
              />
              <InputItem
                error={errorFirstName}
                title={strings.payment.firstName}
                onChangeText={text => this.handleInputChange('firstName', text)}
                value={firstName}
                placeholder={strings.payment.firstName}
              />
              <InputItem
                error={errorLastName}
                title={strings.payment.lastName}
                onChangeText={text => this.handleInputChange('lastName', text)}
                value={lastName}
                placeholder={strings.payment.lastName}
              />
              <InputItem
                error={errorPhoneNumber}
                title={strings.payment.phone}
                onChangeText={text => this.handleInputChange('phoneNumber', text)}
                value={phoneNumber}
                placeholder={strings.payment.phone}
              />
            </Content>
            : <Content />}
          {detail && detail.vaNumber ?
            <InputItem
              error={errorVaNumber}
              title="VA number"
              onChangeText={text => this.handleInputChange('vaNumber', text)}
              value={vaNumber}
              placeholder="VA number"
            /> : <Content />
          }
          {detail && detail.ccDetail ?
            <Content>
              <InputItem
                error={errorCardNumber}
                title={strings.payment.cardNumber}
                onChangeText={text => this.handleInputChange('cardNumber', text)}
                value={cardNumber}
                placeholder={strings.payment.cardNumber}
              />
              <InputItem
                title="cvv"
                error={errorCardCvv}
                onChangeText={text => this.handleInputChange('cardCvv', text)}
                value={cardCvv}
                placeholder="cvv"
              />
              <Text style={styles.text}>{strings.payment.expiry}</Text>
              <View style={[ styles.datePicker ]}>
                <Picker
                  style={styles.monthPicker}
                  placeholder={strings.payment.expiryMonth}
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
                  placeholder={strings.payment.expiryYear}
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
                title={strings.payment.description}
                onChangeText={text => this.handleInputChange('descriptionDetail', text)}
                value={descriptionDetail}
                placeholder={strings.payment.description}
              />
            </Content> : <Content />
          }
          {detail && detail.extraInput ?
            <Content>
              <InputItem
                error={errorCardNumber}
                title={strings.payment.digitsNumber}
                onChangeText={(text) => {
                  this.handleInputChange('cardNumber', text);
                  this.handleInputChange('input1', text.slice(6, 16));
                }
                }
                value={cardNumber}
                placeholder={strings.payment.digitsNumber}
                maxLength={16}
              />
              <InputItem
                title="input1"
                value={input1}
                placeholder={strings.payment.lastDigitsNumber}
                disabled
              />
              <InputItem
                title="input2"
                value={'Total Amount = Rp.'.concat(Intl.NumberFormat('id').format(input2))}
                placeholder="Gross Amount"
                disabled
              />
              <InputItem
                title="random"
                value={'Enter this number for token : '.concat(input3)}
                placeholder="5 Random Number"
                disabled
              />
              <InputItem
                error={errorMandiriToken}
                title="Mandiri token"
                onChangeText={text => this.handleInputChange('mandiriToken', text)}
                value={mandiriToken}
                placeholder="Mandiri token"
              />
            </Content> : <Content />
          }

          <Button
            style={styles.button}
            onPress={() => {
              this.props.submitPayment();
            }}
          >
            <Text>
              {strings.payment.submitPayment}
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
  resetResponse: PropTypes.func.isRequired,
  updateInputFields: PropTypes.func.isRequired,
  inputFields: PropTypes.object.isRequired,
  errorFields: PropTypes.object.isRequired,
  submitPayment: PropTypes.func.isRequired,
  getIsFetchingTransaction: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired,
  initialPayment: PropTypes.object.isRequired
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
