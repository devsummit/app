import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  Fab
} from 'native-base';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import OrderItem from '../../components/OrderItem';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const orders = [
      {
        id: 645,
        totalPrice: '5.000.000',
        status: 'paid',
        date: '2017-08-09'
      },
      {
        id: 795,
        totalPrice: '3.200.000',
        status: 'pending',
        date: '2017-08-09'
      },
      {
        id: 984,
        totalPrice: '3.200.000',
        status: 'canceled',
        date: '2017-08-09'
      }
    ];

    return (
      <Container style={styles.container}>
        <Content>
          <List>
            { orders.map((order) => {
              return <OrderItem key={order.id} order={order} onPress={() => { Actions.orderDetail({ orderId: order.id }); }}/>
            }) }
          </List>
        </Content>
        <Fab position="bottomRight" onPress={() => { Actions.newOrder(); }}>
          <Icon name="plus" />
        </Fab>
      </Container>
    );
  }
}

export default OrderList;
