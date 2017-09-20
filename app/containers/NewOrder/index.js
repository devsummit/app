import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Spinner
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import InputItem from '../../components/InputItem';
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
    this.props.placeOrder(() => Actions.orderList());
  }

  toggleReferal = () => {
    const { isUsingReferal } = this.props.inputFields;
    const { updateInputFields } = this.props;
    if (isUsingReferal && isUsingReferal === true) {
      updateInputFields('isUsingReferal', false);
    } else {
      updateInputFields('isUsingReferal', true);
    }
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  OnCheckReferal = () => {
    this.props.GetReferal();
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
    const order = this.props.order;
    const arraySub = Object.keys(order).map((key) => {
      return order[key].count * order[key].price;
    });
    const total = arraySub.reduce((a, b) => { return a + b; }, 0);
    return (
      <Container style={styles.container}>
        <Content>
          { this.props.isFetchingTicket
            ? <Spinner color={PRIMARYCOLOR}/>
            : this.props.ticketTypes.map((ticket) => {
              return (
                <Card key={ticket.id}>
                  <CardItem>
                    <Body style={styles.summary}>
                      <Text>{ticket.ticket_type}</Text>
                      <Text note style={{ color: 'green' }}>
                        Rp {Intl.NumberFormat('id').format(ticket.price)}
                      </Text>
                      <Text note>{ticket.information}</Text>
                    </Body>
                    <View style={styles.btnGroup}>
                      <Text style={styles.plusMinus} onPress={() => { this.decrease(ticket.id); }}>
                        <Icon name="minus" />
                      </Text>
                      <Text style={styles.ticketCount}>
                        {order[ticket.id] ? order[ticket.id].count : 0}
                      </Text>
                      <Text style={styles.plusMinus} onPress={() => { this.increase(ticket.id); }}>
                        <Icon name="plus" />
                      </Text>
                    </View>
                  </CardItem>
                </Card>
              );
            })
          }

          <Card>
            <CardItem style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>Total price: </Text>
              <Text style={{ textAlign: 'right', flex: 1 }}>
                Rp {Intl.NumberFormat('id').format(total)}
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <View style={{ flex: 1, width: '100%', alignSelf: 'stretch' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold' }}>USE REFERAL CODE</Text>
                  <TouchableOpacity
                    style={styles.iconWrapper}
                    onPress={() => { this.toggleReferal(); }}
                  >
                    <Icon name={'check-square-o'} size={24} color={inputFields.isUsingReferal ? '#3F51B5' : '#BDBDBD'} />
                  </TouchableOpacity>
                </View>
                {inputFields.isUsingReferal && inputFields.isUsingReferal === true ?
                  <View style={{ flexDirection: 'column', flex: 1, alignSelf: 'stretch' }}>
                    <InputItem
                      title="referal code"
                      value={inputFields.referalCode}
                      onChangeText={text => this.handleInputChange('referalCode', text)}
                      placeholder="referal code"
                      disabled={!inputFields.isUsingReferal}
                    />
                    <Button
                      style={styles.orderBtn}
                      onPress={() => this.OnCheckReferal()}
                    >
                      <Text style={{ textAlign: 'center' }}>CHECK REFERAL CODE</Text>
                    </Button>
                  </View>
                  : <View />
                }
              </View>
            </CardItem>
          </Card>
          {
            referalInfo && inputFields.isUsingReferal === true && referalInfo.owner ?
              <View>
                <Card>
                  <CardItem>
                    <View>
                      <Text style={{ fontWeight: 'bold' }}>REFERAL INFO</Text>
                      <Text>Referal Code :</Text>
                      <Text style={{ fontWeight: 'bold' }}>{referalInfo.referal_code}</Text>
                      <Text>Owner :</Text>
                      <Text style={{ fontWeight: 'bold' }}>{referalInfo.owner}</Text>
                      <Text>Total Discount :</Text>
                      <Text style={{ fontWeight: 'bold' }}>Rp {Intl.NumberFormat('id').format(referalInfo.discount_amount * total)}</Text>
                    </View>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem style={{ flex: 1 }}>
                    <Text style={{ flex: 1 }}>Total price after discount: </Text>
                    <Text style={{ textAlign: 'right', flex: 1 }}>
                      Rp {Intl.NumberFormat('id').format(total - (referalInfo.discount_amount * total))}
                    </Text>
                  </CardItem>
                </Card>
              </View> : <View />
          }
          <Button
            block
            style={styles.orderBtn}
            onPress={() => { this.placeOrder(); }}
          >
            <Text>Place Order</Text>
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
