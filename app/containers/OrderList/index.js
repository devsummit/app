import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  Fab,
  Spinner
} from 'native-base';
import { RefreshControl, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import OrderItem from '../../components/OrderItem';
import * as actions from './actions';
import * as selectors from './selectors';
import { PRIMARYCOLOR } from '../../constants';


class OrderList extends Component {
  componentWillMount() {
    this.props.getOrderList();
  }

  render() {
    if (this.props.isFetching) {
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
        <Content refreshControl={
          <RefreshControl
            refreshing={this.props.isFetching}
            onRefresh={() => { this.props.getOrderList(); }}
          />
        }
        >
          <List style={{ paddingRight: 10 }}>
            {this.props.orders.map((order) => {
              return (
                <OrderItem
                  key={order.id}
                  order={order}
                  onPress={() => {
                    Actions.orderDetail({
                      orderId: order.id
                    });
                  }}
                />
              );
            })}
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
  orders: selectors.getOrders(),
  isFetching: selectors.getIsFetchingOrders()
});

export default connect(mapStateToProps, actions)(OrderList);
