import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import { Container, Header, Tab, Tabs, TabHeading, Icon, List } from 'native-base';
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
const noTicket = require('./../../../assets/images/noticket.png');

const MyOrders = (props) => {
  console.log('landing here props', props);
  return (
    <ScrollView>
      <Tabs style={styles.tabs}>
        <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Ticket</Text></TabHeading>}>
          <View style={styles.container}>
            {/* <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={icon}
            resizeMode="center"
          />
          <Text style={styles.app}>Devsummit</Text>
        </View> */}


            {/*  */}

            <View style={{ marginTop: 5, backgroundColor: 'transparent' }}>
              {/* <Text>Hello World!</Text>

                  <TouchableHighlight onPress={() => {
                    this.setModalMyOrders(!this.state.modalMyOrders);
                  }}
                  >
                    <Text>Hide Modal</Text>
                  </TouchableHighlight> */}
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
              ) :
                <View style={styles.artwork} >
                  <Image source={noTicket} style={{ opacity: 0.5, marginTop: 150 }} />
                  <Text style={styles.artworkText}>You do not have any ticket</Text>
                </View>
              }
            </View>
          </View>
        </Tab>
        <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Hackaton</Text></TabHeading>}>
          <Text />
        </Tab>
        <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Exhibitor</Text></TabHeading>}>
          <Text />
        </Tab>
      </Tabs>
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
