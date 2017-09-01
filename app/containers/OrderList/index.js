import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  Fab,
  Spinner
} from 'native-base';
import { RefreshControl, Alert } from 'react-native';
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
  state = {
    selectedOrder: ''
  }

  componentWillMount() {
    this.props.getOrderList();
  }

  componentWillReceiveProps(nextProps) {
  }


  confirmPayment = (props) => {
    const idx = this.props.orders.indexOf(props);
    Alert.alert(
      'Payment Confirmation',
      'Confirm payment Order : '.concat(props.id),
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Confirm', onPress: () => { this.props.confirmPayment(props.payment.id, idx); } }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { isConfirming, isFetching } = this.props;
    if (isFetching || isConfirming) {
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
            onRefresh={() => this.props.getOrderList()}
          />
        }
        >
          <List>
            {this.props.orders.map((order) => {
              return (
                <OrderItem
                  key={order.id}
                  order={order}
                  confirmPayment={this.confirmPayment}
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
        <Fab position="bottomRight" onPress={() => Actions.newOrder()} >
          <Icon name="plus" />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  orders: selectors.getOrders(),
  isFetching: selectors.getIsFetchingOrders(),
  isConfirming: selectors.getIsConfirmingPayment()
});

export default connect(mapStateToProps, actions)(OrderList);
