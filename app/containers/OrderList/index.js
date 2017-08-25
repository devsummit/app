import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  Fab
} from 'native-base';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import OrderItem from '../../components/OrderItem';
import * as actions from './actions';
import * as selectors from './selectors';

class OrderList extends Component {
  componentWillMount() {
    this.props.getOrderList();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List style={{ paddingRight: 10 }}>
            { this.props.orders.map((order) => {
              return (
                <OrderItem
                  key={order.id}
                  order={order}
                  onPress={() => { Actions.orderDetail({ orderId: order.id }); }}
                />
              );
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

const mapStateToProps = createStructuredSelector({
  orders: selectors.getOrders()
});

export default connect(mapStateToProps, actions)(OrderList);
