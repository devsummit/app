import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  Spinner
} from 'native-base';
import PropTypes from 'prop-types';
import { RefreshControl, Alert, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import strings from '../../localization';
import OrderItem from '../../components/OrderItem';
import * as actions from './actions';
import * as selectors from './selectors';
import { PRIMARYCOLOR } from '../../constants';

const noTicket = require('./../../../assets/images/noticket.png');

class OrderList extends Component {
  state = {
    selectedOrder: '',
    isLoading: true
  }

  componentWillMount() {
    this.props.getOrderList();
  }

  componentWillReceiveProps(prevState) {
    const { isConfirming, isFetching } = this.props;
    this.setState({ isLoading: isConfirming || isFetching });
    if ((prevState.orders !== this.props.orders)) {
      this.setState({
        isLoading: false
      });
    }
  }

  confirmPayment = (props) => {
    const idx = this.props.orders.indexOf(props);
    Alert.alert(
      strings.order.confirmPayment,
      'Confirm payment Order : '.concat(props.id),
      [
        { text: strings.global.cancel },
        { text: strings.global.confirm, onPress: () => { this.props.confirmPayment(props.payment.id, idx); } }
      ],
      { cancelable: false }
    );
  }

  render() {
    if (this.state.isLoading) {
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
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.isFetching}
              onRefresh={() => this.props.getOrderList()}
            />
          }
        >
          { this.props.orders.length > 0 ? (
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
          ) : (
            <View style={styles.artwork}>
              <Image source={noTicket} style={{ opacity: 0.7 }} />
              <Text style={styles.artworkText}>{strings.order.noTicket}</Text>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  confirmPayment: PropTypes.func.isRequired,
  getOrderList: PropTypes.func.isRequired,
  isConfirming: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  orders: selectors.getOrders(),
  isFetching: selectors.getIsFetchingOrders(),
  isConfirming: selectors.getIsConfirmingPayment()
});

export default connect(mapStateToProps, actions)(OrderList);
