import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem, Body, Spinner, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Alert, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import LoaderHandler from 'react-native-busy-indicator/LoaderHandler';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Icon from 'react-native-vector-icons/FontAwesome';
import strings from '../../localization';
import Button from '../../components/Button';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';
import { PRIMARYCOLOR } from '../../constants';

// @flow
type Props = {
  errorFields: {
    referalCode: boolean,
  },
  inputFields: {
    isUsingReferal: boolean,
    referalCode: string
  },
  isFetchingReferal: boolean,
  isFetchingTicket: boolean,
  order?: Object<mixed>,
  referalInfo: {
    data: string,
    meta: string
  },
  ticketTypes?: Array<mixed>
};

type State = {
  count: number
}

class NewOrder extends Component<Props, State> {
  state ={
    count: 0
  };

  componentWillMount() {
    this.props.getTicketType();
  }

  increase = (typeId: number) => {
    this.props.updateOrder('increase', typeId);
  };

  decrease = (typeId: number) => {
    this.props.updateOrder('decrease', typeId);
  };

  placeOrder = () => {
    Alert.alert(strings.order.proceedPaymentTitle, strings.order.proceedPaymentMessage, [
      {
        text: strings.order.proceedNo
      },
      {
        text: strings.order.proceedYes,
        onPress: () => {
          LoaderHandler.showLoader('Processing...');
          this.props.placeOrder((order) => {
            LoaderHandler.hideLoader();
            Actions.payment({ order });
          });
        }
      }
    ]);
  };

  toggleReferal = () => {
    const { isUsingReferal } = this.props.inputFields;
    const { updateInputFields } = this.props;
    if (isUsingReferal && isUsingReferal === true) {
      updateInputFields('isUsingReferal', false);
      this.setState({ count: 0 })
    } else {
      updateInputFields('isUsingReferal', true);
      this.setState({ count: 1 })
    }
  };

  handleInputChange = (field: string, value: string) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, (value = !(value.length > 0)));
  };

  OnCheckReferal = () => {
    this.props.GetReferal();
  };

  checkCode = (info) => {
    if (info.data.used === true) {
      return (
        <Text style={{ color: 'red' }}>{strings.order.used}</Text>
      );
    } else if (info.data.quota_exceeded === true) {
      return (
        <Text style={{ color: 'red' }}>{strings.order.quotaExceeded}</Text>
      );
    } else if (info.data.code_invalid === true) {
      return (
        <Text style={{ color: 'red' }}>{strings.order.codeInvalid}</Text>
      );
    } else if (info.meta.success === true) {
      return (
        <Text style={{ color: '#64FFDA' }}>{strings.order.codeSuccess}</Text>
      );
    }

    return (
      <Text>{strings.order.checkCode}</Text>
    );
  }

  onPressPlaceOrder = ({ order, referalInfo }) => {
    Actions.payment({ order, referalInfo });
    this.setState({ count: 0 });
    this.props.reset();
  }

  render() {
    if (this.props.isFetchingReferal === true) {
      return (
        <Container>
          <Content>
            <Spinner color={PRIMARYCOLOR} />
          </Content>
        </Container>
      );
    }

    const { inputFields, referalInfo } = this.props || {};
    const { isUsingReferal } = this.props.inputFields;
    const order = this.props.order;
    const arraySub = Object.keys(order).map((key) => {
      return order[key].count * order[key].price;
    });
    const total = arraySub.reduce((a, b) => {
      return a + b;
    }, 0);
    return (
      <Container style={styles.container}>
        <Content>
          {this.props.isFetchingTicket ? (
            <Spinner color={PRIMARYCOLOR} />
          ) : (
            this.props.ticketTypes.map((ticket, index) => {
              if (index === 0) {
                return (
                  <Card key={ticket.id}>
                    <CardItem>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Icon
                            name="ticket"
                            style={{ alignSelf: 'center', fontSize: 60, marginRight: 20 }}
                          />
                          <View>
                            <Body>
                              <Text style={styles.title}>
                                {ticket.ticket_type === 'full'
                                  ? '3 DAYS'
                                  : ticket.ticket_type.toUpperCase()}
                              </Text>
                            </Body>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={{ color: 'grey', fontWeight: 'bold', textDecorationLine: 'line-through', marginTop: 5, marginRight: 5 }}>
                                Rp {Intl.NumberFormat('id').format(ticket.price) * 2}.000
                              </Text>
                              <Text style={{ fontSize: 14, color: 'grey', lineHeight: 27, fontWeight: 'bold' }}>
                                <Icon name="tags" /> 50%
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={{ color: 'orange', fontWeight: 'bold', margin: 1 }}>
                                  Rp {Intl.NumberFormat('id').format(ticket.price)}
                              </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
                              <Text note>{ticket.information}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.btnGroup}>
                          <TouchableWithoutFeedback disabled={isUsingReferal} onPress={() => { this.decrease(ticket.id); }}>
                            <View style={styles.plusMinus}>
                              <Icon name="minus" style={{ fontSize: 20 }} />
                            </View>
                          </TouchableWithoutFeedback>
                          <View style={styles.ticketCount}>
                            { isUsingReferal ?
                              <Text style={styles.textCount}>{this.state.count}</Text> :
                              <Text style={styles.textCount}>{order[ticket.id] ? order[ticket.id].count : 0}</Text>
                            }
                          </View>
                          <TouchableWithoutFeedback disabled={isUsingReferal} onPress={() => { this.increase(ticket.id); }}>
                            <View style={[ styles.plusMinus, { backgroundColor: '#FF6F00', borderColor: 'green' } ]}>
                              <Icon name="plus" style={{ fontSize: 20, color: 'white' }} />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    </CardItem>
                  </Card>
                );
              }
            })
          )}

          <Card style={{ marginBottom: 0 }}>
            <CardItem style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  { referalInfo.data.discount_amount ?
                    <Text style={{ textAlign: 'left', flex: 1, fontWeight: '700', color: '#4CAF50' }}>You will get {referalInfo.data.discount_amount * 100}% discount</Text> :
                    <Text style={{ textAlign: 'left', flex: 1 }}>
                      Enter your code
                    </Text>
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', marginRight: 5 }}>
                    {strings.order.useReferalCode}
                  </Text>
                  <TouchableOpacity
                    style={styles.iconWrapper}
                    onPress={() => {
                      this.toggleReferal();
                    }}
                  >
                    <Icon
                      name={'check-square-o'}
                      size={24}
                      color={inputFields.isUsingReferal ? '#3F51B5' : '#BDBDBD'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, width: '100%', alignSelf: 'stretch' }}>
                {inputFields.isUsingReferal && inputFields.isUsingReferal === true ? (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignSelf: 'stretch',
                      flex: 1,
                      marginTop: 10
                    }}
                  >
                    <Input
                      style={styles.inputStyle}
                      title="referal code"
                      value={inputFields.referalCode}
                      onChangeText={text => this.handleInputChange('referalCode', text)}
                      placeholder="Referal code"
                      disabled={!inputFields.isUsingReferal}
                    />
                    <Text style={{ color: '#BDBDBD', fontSize: 10 }}>{strings.order.referalLimit}</Text>
                    <Button style={styles.orderBtn} onPress={() => this.OnCheckReferal()}>
                      {this.checkCode(referalInfo)}
                    </Button>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </CardItem>
          </Card>
          {referalInfo && inputFields.isUsingReferal === true && referalInfo.owner ? (
            <View>
              <Card>
                <CardItem>
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>{strings.order.referalInfo}</Text>
                    <Text>{strings.order.referalCode}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{referalInfo.referal_code}</Text>
                    <Text>{strings.order.owner}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{referalInfo.owner}</Text>
                    <Text>{strings.order.totalDiscount}</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      Rp {Intl.NumberFormat('id').format(referalInfo.discount_amount * total)}
                    </Text>
                  </View>
                </CardItem>
              </Card>
              <Card>
                <CardItem style={{ flex: 1 }}>
                  <Text style={{ flex: 1 }}>{strings.order.totalAfterDiscount}</Text>
                  <Text style={{ textAlign: 'right', flex: 1 }}>
                    Rp {Intl.NumberFormat('id').format(total - referalInfo.discount_amount * total)}
                  </Text>
                </CardItem>
              </Card>
            </View>
          ) : (
            <View />
          )}
          <Button
            block
            style={styles.orderBtn}
            disabled={total === 0 && this.state.count === 0}
            onPress={() => {
              this.onPressPlaceOrder({ order, referalInfo });
            }}
          >
            <Text>{strings.order.placeOrder}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ticketTypes: selectors.getTicketTypes(),
  order: selectors.getOrder(),
  inputFields: selectors.getInputFields(),
  errorFields: selectors.getErrorFields(),
  referalInfo: selectors.getReferal(),
  isFetchingReferal: selectors.getIsGettingReferal(),
  isFetchingTicket: selectors.isGetTicketType()
});

export default connect(mapStateToProps, actions)(NewOrder);
