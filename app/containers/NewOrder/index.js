import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View } from 'react-native';

import { Actions } from 'react-native-router-flux';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

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
    this.props.placeOrder();
  }

  render() {
    console.log("PROPPPS", this.props)
    const order = this.props.order;
    const arraySub = Object.keys(order).map((key) => {
      return order[key].count * order[key].price;
    });
    const total = arraySub.reduce((a, b) => { return a + b; }, 0);

    return (
      <Container style={styles.container}>
        <Content>
          {this.props.ticketTypes.map((ticket, index) => {
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
          })}

          <Card>
            <CardItem style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>Total price: </Text>
              <Text style={{ textAlign: 'right', flex: 1 }}>
                Rp {Intl.NumberFormat('id').format(total)}
              </Text>
            </CardItem>
          </Card>
          <Button
            block
            style={styles.orderBtn}
            onPress={() => { this.props.placeOrder(); }}
          >
            <Text>Place Order</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ticketTypes: selectors.getTicketTypes(),
  order: selectors.getOrder()
});

export default connect(mapStateToProps, actions)(NewOrder);
