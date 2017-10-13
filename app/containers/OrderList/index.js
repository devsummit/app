import React, { Component } from 'react';
import { Container, Content, List, Spinner, Button, Card } from 'native-base';
import PropTypes from 'prop-types';
import { RefreshControl, Alert, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ProgressBar from 'react-native-progress/Bar';
import { connect } from 'react-redux';
import Share from 'react-native-share';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import strings from '../../localization';
import { getProfileData } from './../../helpers';
import OrderItem from '../../components/OrderItem';
import * as actions from './actions';
import * as selectors from './selectors';
import { PRIMARYCOLOR } from '../../constants';

const { width } = Dimensions.get('window');

const noTicket = require('./../../../assets/images/noticket.png');

class OrderList extends Component {
  state = {
    selectedOrder: '',
    isLoading: true,
    referal: '',
    haveRefered: 0,
    referalCount: 0,
    firstName: '',
    lastName: ''
  }

  componentWillMount() {
    this.props.getOrderList();

    getProfileData()
      .then((data) => {
        this.setState({
          firstName: data.first_name,
          lastName: data.last_name,
          referal: data.referal,
          haveRefered: data.have_refered,
          referalCount: data.referal_count
        })
      })
      .catch(err => console.log('Error getting data'));
  }

  componentWillReceiveProps(prevState) {
    const { isConfirming, isFetching } = this.props;
    this.setState({ isLoading: isConfirming || isFetching });
    if (prevState.orders !== this.props.orders) {
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
        {
          text: strings.global.confirm,
          onPress: () => {
            this.props.confirmPayment(props.payment.id, idx);
          }
        }
      ],
      { cancelable: false }
    );
  };

  invite = () => {
    const { firstName, lastName, referal } = this.state;

    Share.open({
      title: "Devsummit invitation",
      message: `${firstName} ${lastName} has invited you to Devsummit. Please download https://play.google.com/store/apps/details?id=io.devsummit.app.android and use ${referal} as referal code on register.`,
      subject: "Devsummit invitation"
    });
  }

  render() {
    console.log('landing here', this.props);
    const count = this.props.redeemCount === 10;

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
          <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <Card>
              <View style={{ flex: 1, backgroundColor: '#CFD8DC', padding: 10, alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity style={{ flex: 2, alignItems: 'center' }} disabled={!count} onPress={() => this.props.submitReferal()}>
                  <Icon name="gift" style={{ fontSize: 30, color: count ? PRIMARYCOLOR : '#BDBDBD' }} />
                  <Text style={{ fontSize: 20, color: count ? PRIMARYCOLOR : '#BDBDBD' }}>CLAIM</Text>
                </TouchableOpacity>
                <View style={{ flex: 8, alignItems: 'center' }}>
                  <Text style={{ fontSize: 15, color: '#000000', marginBottom:8 }}>Invite friends to get free pass!</Text>
                  <Text style={{ fontSize: 12, marginBottom: 4 }}>{this.state.referalCount} of 10</Text>
                  <ProgressBar borderRadius={0} progress={this.props.redeemCount / 10} width={width * 0.5} />
                  <Text onPress={() => this.invite()} style={{ color: '#FFFFFF', marginTop: 8, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: 'skyblue', fontWeight: 'bold' }}>Invite</Text>
                </View>
              </View>
            </Card>
          </View>
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
  isConfirming: selectors.getIsConfirmingPayment(),
  redeemCount: selectors.getRedeemCode(),
  redeemstatus: selectors.getReedemStatus()
});

export default connect(mapStateToProps, actions)(OrderList);
