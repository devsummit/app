import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import OrderItem from '../OrderItem';
import * as actions from './actions';
import * as selectors from './selectors';
import Button from '../../components/Button';
import styles from './style';
import strings from '../../localization';
import OrderList from '../../containers/OrderList';


const icon = require('./../../../assets/images/icon.png');

const MyOrders = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ marginTop: 5 }}>
          <View>
            {props.orders.length > 0 ? (
              <List>
                {props.orders.map((order) => {
                  if (order.status !== 'paid') {
                    return (
                      <OrderItem
                        key={order.id}
                        order={order}
                        confirmPayment={this.confirmPayment}
                        onPress={() => {
                          Actions.orderDetail({
                            orderId: order.id,
                            id: order.id
                          });
                        }}
                      />
                    );
                  }
                })}
              </List>
            ) : <View /> }

          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// export default MyOrders;

MyOrders.propTypes = {
  orders: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
  orders: selectors.getOrders()
});

export default connect(mapStateToProps, actions)(MyOrders);
