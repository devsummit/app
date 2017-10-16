import React, { Component } from 'react';
import { Container, Content, Picker, Item, Button, Text, Card, CardItem } from 'native-base';
import { View, ActivityIndicator, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LoaderHandler from 'react-native-busy-indicator/LoaderHandler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getProfileData } from '../../helpers';
import styles from './styles';
import strings from '../../localization';
import * as actions from './actions';
import * as selectors from './selectors';
import { PAYMENT_METHODS, BANK_TRANSFERS, CREDIT_CARD_LIST } from './constants';

let bankList = [];
const logo = require('../../../assets/images/bankmandiri.png');

class Payment extends Component {
  componentWillMount() {
    getProfileData()
      .then((profileData) => {
        this.props.updateUserId(profileData.id);
      });
    this.props.navigation.setParams({
      handleIconTouch: this.handleIconTouch
    });
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    if (field === 'paymentType' && value !== 'credit_card' && value !== 'bank_transfer') {
      const selectedMethod = PAYMENT_METHODS.filter((data) => {
        return data.payment_type === value;
      });
      this.props.updateErrorFields('bankDestination', selectedMethod[0].bankDestination);
    }
    this.props.updateErrorFields(`error_${field}`, (value = !(value.length > 0)));
  };

  payWithPaypalAlert() {
    Alert.alert(
      'Important',
      'Your transaction will be converted from IDR to USD',
      [
        {
          text: 'OK',
          onPress: () => this.payWithPaypal()
        }
      ]
    );
  }

  payWithPaypal() {
    const { order, payWithPaypal } = this.props;
    LoaderHandler.showLoader('Confirming your payment');
    payWithPaypal(order, (result) => {
      LoaderHandler.hideLoader();
      Alert.alert(
        strings.payment.thanksForTheOrderTitle,
        strings.payment.thanksForTheOrderMessage,
        [
          {
            text: strings.payment.okButton,
            onPress: () => Actions.mainTabs({ type: 'reset', activePage: 1 })
          }
        ]
      );
    });
  }

  payWithBankTransfer = () => {
    const userId = this.props.userId;
    const order = this.props.order;
    // still static referal code
    const referalCode = 'supercode';
    // this.props.updateOrder(order);
    Alert.alert(strings.order.proceedPaymentTitle, strings.order.proceedPaymentMessage, [
      {
        text: strings.order.proceedNo
      },
      {
        text: strings.order.proceedYes,
        onPress: () => {
          LoaderHandler.showLoader('Processing your Order');
          this.props.payWithBankTransfer(userId, order, referalCode, ((data) => {
            const id = data.order_id
            LoaderHandler.hideLoader();
            Actions.orderDetail({ id });
          }));
        }
      }
    ]);
  };

  // returnMidtransView = () => {
  //   const { inputFields, order } = this.props;
  //   const { paymentType, bankDestination } = inputFields || '';
  //   return (
  //     <View>
  //       {/* View Midtrans Payment */}
  //       <View style={styles.pickerWrapper}>
  //         <Picker
  //           style={styles.picker}
  //           mode="dropdown"
  //           selectedValue={paymentType}
  //           onValueChange={value => this.handleInputChange('paymentType', value)}
  //         >
  //           {PAYMENT_METHODS.map(component => (
  //             <Item key={component.value} label={component.label} value={component.payment_type} />
  //           ))}
  //         </Picker>
  //       </View>
  //       {(paymentType === 'bank_transfer' || paymentType === 'credit_card') ?
  //         <View>
  //           <Text style={styles.littleText}>{strings.payment.bank}</Text>
  //           {bankList.map(component => (
  //             <Card
  //               key={component.value}
  //               label={component.label}
  //               value={component.bankDestination}
  //               button
  //               onPress={() => Actions.paymentDetail({order,  component})}          
  //             >
  //               <Text>{component.label}</Text>
  //             </Card>
  //           ))}
  //         </View> : <View />}
  //       <Button
  //         style={styles.button}
  //         onPress={() => {
  //           Actions.paymentDetail({ order });
  //         }}
  //       >
  //         <Text>
  //           {strings.payment.goToPaymentDetail}
  //         </Text>
  //       </Button>
  //     </View>
  //   );
  // }

  render() {
    const { inputFields, paypalChecking, order } = this.props;
    const { paymentType, bankDestination } = inputFields || '';

    if (paymentType === 'bank_transfer') {
      bankList = BANK_TRANSFERS;
    } else if (paymentType === 'credit_card') {
      bankList = CREDIT_CARD_LIST;
    }

    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.littleText}>{strings.payment.method}</Text>
          <Button
            style={styles.button}
            onPress={() => {
              this.payWithPaypalAlert();
            }}
            disabled
          >
            {paypalChecking && <ActivityIndicator color={'white'} />}
            <Text>
              {paypalChecking ? strings.payment.checkingPayment : strings.payment.payWithPaypal}
            </Text>
          </Button>

          <Button
            style={styles.button}
            onPress={() => {
              this.payWithBankTransfer();
            }}
            disabled={false}
          >
            <Text>{'Bank Transfers'}</Text>
          </Button>

          {/* Bank Transfer Card */}
          <Card>
            <View style={styles.card}>
              <Image source={logo} style={{ height: 50, width: 200 }} />
              <Text style={styles.textTitle}>Cabang Bandung Siliwangi</Text>
              <Text style={{ fontSize: 18, color: '#000000', marginTop: 16 }}>Atas Nama :</Text>
              <Text style={styles.textTitleBold}>Taufan Aditya</Text>
              <Text style={styles.textTitle}>OR</Text>
              <Text style={styles.textTitleBold}>Krisna Galuh Herlangga</Text>
              <View
                style={{
                  flex: 8,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: '#000000',
                    marginBottom: 8,
                    marginTop: 16
                  }}
                >
                    Nomer Rekening:
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#000000',
                    marginBottom: 8,
                    fontWeight: 'bold'
                  }}
                >
                    130-0016066782
                </Text>
              </View>
            </View>
          </Card>

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
  order: PropTypes.object.isRequired,
  paypalChecking: PropTypes.bool.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  // order: selectors.getOrder(),
  userId: selectors.getUserId(),
  inputFields: selectors.getInputFields(),
  errorFields: selectors.getErrorFields(),
  paypalChecking: selectors.isPayingWithPaypal()
});

export default connect(mapStateToProps, actions)(Payment);
