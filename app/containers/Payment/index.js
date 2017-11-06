import React, { Component } from 'react';
import { Container, Content, Picker, Item, Button, Text, Card, CardItem, Left, Body, Right } from 'native-base';
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

// @flow
type Props = {
  errorFields: {
    referalCode: boolean
  },
  inputFields: {
    referalCode: string
  },
  order: Object,
  paypalChecking: boolean,
  referalInfo: {
    data: string,
    meta: string
  },
  ticketTypes: Array<mixed>,
  userId: string
};

type order = {
  count: number,
  price: number,
  ticket_id: number
};

type State = {
  cardStatus: boolean
};

class Payment extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      cardStatus: true
    };
  }

  componentWillMount() {
    this.props.getTickets();
    this.props.navigation.setParams({
      handleIconTouch: this.handleIconTouch
    });
  }

  handleInputChange = (field: string, value: string) => {
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
    Alert.alert('Important', 'Your transaction will be converted from IDR to USD', [
      {
        text: 'OK',
        onPress: () => this.payWithPaypal()
      }
    ]);
  }

  payWithPaypal() {
    const { ticketTypes, ticketPrice } = this.props;
    if (ticketPrice) {
      const price = ticketPrice.replace(/[.]/gi, '');
      const ticket = ticketTypes.filter(ticketType => ticketType.price == price);
      LoaderHandler.showLoader('Confirming your payment');
      this.props.payWithPaypal(
        null,
        (result) => {
          LoaderHandler.hideLoader();
          if (result) {
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
          }
        },
        ticket[0].id
      );
    } else {
      const { order, payWithPaypal } = this.props;
      LoaderHandler.showLoader('Confirming your payment');
      payWithPaypal(order, (result) => {
        LoaderHandler.hideLoader();
        if (result) {
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
        }
      });
    }
  }

  payWithBankTransfer = () => {
    const userId = this.props.userId;
    const order = this.props.order;
    // this.props.updateOrder(order);
    Alert.alert(strings.order.proceedPaymentTitle, strings.order.proceedPaymentMessage, [
      {
        text: strings.order.proceedNo
      },
      {
        text: strings.order.proceedYes,
        onPress: () => {
          LoaderHandler.showLoader('Processing your Order');
          const { ticketTypes, ticketPrice } = this.props;
          if (ticketPrice) {
            const price = ticketPrice.replace(/[.]/gi, '');
            const ticket = ticketTypes.filter(ticketType => ticketType.price == price);
            this.props.createOrderExhibitor(ticket[0].id, () => {
              LoaderHandler.hideLoader();
              Actions.orderDetail();
            });
          } else {
            const referalCode = this.props.referalInfo.referal_code;

            this.props.payWithBankTransfer(userId, order, referalCode, (data) => {

              const orderId = data.order_id;
              LoaderHandler.hideLoader();
              Actions.orderDetail({ orderId, id: orderId, order: data });
            });
          }
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
        <View style={{ flex: 0, marginHorizontal: 10, marginVertical: 10, elevation: 4, borderWidth: 0 }}>
          <TouchableOpacity
            style={styles.buttonPayment}
            onPress={() => { this.payWithPaypalAlert(); }}
          >
            <CardItem header>
              {paypalChecking && <ActivityIndicator color={'white'} />}
              <Text>{paypalChecking ? strings.payment.checkingPayment : strings.payment.payWithPaypal}</Text>
              <Right>
                <Icon name="chevron-right" size={18} />
              </Right>
            </CardItem>
          </TouchableOpacity>
          <CardItem>
            <Left>
              <Icon name="paypal" size={23} color={'skyblue'} />
            </Left>
          </CardItem>
        </View>
        <View style={{ flex: 0, marginHorizontal: 10, elevation: 4, borderWidth: 0 }}>
          <TouchableOpacity
            style={styles.buttonPayment}
            onPress={() => { this.payWithBankTransfer(); }}
            disabled={false}
          >
            <CardItem header>
              {paypalChecking && <ActivityIndicator color={'white'} />}
              <Text>{'Bank Transfers'}</Text>
              <Right>
                <Icon name="chevron-right" size={18} />
              </Right>
            </CardItem>
          </TouchableOpacity >
          <CardItem>
            <Left>
              <Icon name="credit-card" size={23} color={'skyblue'} />
            </Left>
          </CardItem>
        </View>
      </Container>
    );
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  // order: selectors.getOrder(),
  userId: selectors.getUserId(),
  inputFields: selectors.getInputFields(),
  errorFields: selectors.getErrorFields(),
  paypalChecking: selectors.isPayingWithPaypal(),
  ticketTypes: selectors.getTicketTypes()
});

export default connect(mapStateToProps, actions)(Payment);
