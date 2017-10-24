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

class NewOrder extends Component {
  componentWillMount() {
    this.props.getTicketType();
  }

  increase = (typeId) => {
    this.props.updateOrder('increase', typeId);
  };

  decrease = (typeId) => {
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
    } else {
      updateInputFields('isUsingReferal', true);
    }
  };

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, (value = !(value.length > 0)));
  };

  OnCheckReferal = () => {
    this.props.GetReferal();
  };

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
                            <Text style={{ color: 'orange', fontWeight: 'bold' }}>
                              Rp {Intl.NumberFormat('id').format(ticket.price)}
                            </Text>
                            <View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
                              <Text note>{ticket.information}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.btnGroup}>
                          <TouchableWithoutFeedback onPress={() => { this.decrease(ticket.id); }}>
                            <View style={styles.plusMinus}>
                              <Icon name="minus" style={{ fontSize: 20 }}/>
                            </View>
                          </TouchableWithoutFeedback>
                          <View style={styles.ticketCount}>
                            <Text style={styles.textCount}>{order[ticket.id] ? order[ticket.id].count : 0}</Text>
                          </View>
                          <TouchableWithoutFeedback onPress={() => { this.increase(ticket.id); }}>
                            <View style={[ styles.plusMinus, { backgroundColor: '#2ecc71', borderColor: 'green' } ]}>
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
                  <Text style={{ flex: 1 }}>{strings.order.total}</Text>
                  <Text style={{ textAlign: 'left', flex: 1 }}>
                    Rp {Intl.NumberFormat('id').format(total)}
                  </Text>
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
                      flex: 1,
                      alignSelf: 'stretch',
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
                    <Button style={styles.orderBtn} onPress={() => this.OnCheckReferal()}>
                      <Text>{strings.order.checkCode}</Text>
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
            disabled={!(total > 0)}
            onPress={() => {
              Actions.payment({ order });
            }}
          >
            <Text>{strings.order.placeOrder}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

NewOrder.propTypes = {
  updateOrder: PropTypes.func.isRequired,
  inputFields: PropTypes.object.isRequired,
  updateInputFields: PropTypes.func.isRequired,
  updateErrorFields: PropTypes.func.isRequired,
  GetReferal: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  ticketTypes: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]).isRequired,
  placeOrder: PropTypes.func.isRequired,
  getTicketType: PropTypes.func.isRequired,
  isFetchingReferal: PropTypes.bool.isRequired,
  isFetchingTicket: PropTypes.bool.isRequired
};

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
