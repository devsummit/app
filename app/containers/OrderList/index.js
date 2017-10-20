import React, { Component } from 'react';
import { Container, Content, List, Spinner, Button, Card, Form, Item, Input } from 'native-base';
import PropTypes from 'prop-types';
import {
  RefreshControl,
  Alert,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal
} from 'react-native';
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
import InputItem from '../../components/InputItem';

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
    lastName: '',
    modalVisibleConfirmation: false
  };

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
        });
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

  submitRegistration = () => {
    this.props.register(() => Actions.mainTabs());
  };

  checkEmail = (inputvalue) => {
    const pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (pattern.test(inputvalue)) return true;
    return false;
  };

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
  };

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
      title: 'Devsummit invitation',
      message: `Check out the biggest event for programmer in 21-23 November 2017. Download the apps https://play.google.com/store/apps/details?id=io.devsummit.app.android and use ${referal} as referal code to collect points for free ticket. Cheers!`,
      subject: 'Devsummit invitation'
    });
  };

  setModalVisibleConfirmation(visible) {
    this.setState({ modalVisibleConfirmation: visible });
  }

  render() {
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
    const { isConfirmEmail } = this.props;
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
            {this.props.redeemCount > 10 ? null : (
              <Card>
                <View style={styles.card}>
                  <TouchableOpacity
                    style={styles.buttonClaim}
                    disabled={!count}
                    onPress={() => this.props.submitReferal()}
                  >
                    <Icon
                      name="gift"
                      style={{ fontSize: 30, color: count ? PRIMARYCOLOR : '#BDBDBD' }}
                    />
                    <Text style={{ fontSize: 18, color: count ? PRIMARYCOLOR : '#BDBDBD' }}>
                      CLAIM
                    </Text>
                  </TouchableOpacity>
                  {!isConfirmEmail ? (
                    <View />
                  ) : (
                    <View style={styles.inviteField}>
                      <Text style={styles.inviteDesc}>Invite friends to get free pass!</Text>
                      <Text style={styles.counterText}>{this.props.redeemCount} of 10</Text>
                      <ProgressBar
                        borderRadius={0}
                        progress={this.props.redeemCount / 10}
                        width={width * 0.5}
                      />
                      <TouchableWithoutFeedback onPress={() => this.invite()} disabled={count}>
                        <View>
                          <Text style={count ? styles.inviteDisable : styles.invite}>Invite</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  )}
                </View>
              </Card>
            )}
          </View>
          {this.props.orders.length > 0 ? (
            <List>
              {this.props.orders.map((order) => {
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
              })}
            </List>
          ) : (
            <View style={styles.artwork}>
              <Image source={noTicket} style={{ opacity: 0.7 }} />
              {!isConfirmEmail ? (
                <View>
                  <Text style={styles.artworkText}>Please Confirm Your Email First</Text>
                  <Button
                    block
                    style={{ margin: 10 }}
                    onPress={() =>
                      this.setModalVisibleConfirmation(!this.state.modalVisibleConfirmation)}
                  >
                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                      Resend Confirmation
                    </Text>
                  </Button>
                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisibleConfirmation}
                    onRequestClose={() => {
                      this.setModalVisibleConfirmation(!this.state.modalVisibleConfirmation);
                    }}
                  >
                    <View style={{ marginTop: 22 }}>
                      <View>
                        <Form>
                          <Item>
                            <Input placeholder="E-Mail" />
                          </Item>
                        </Form>

                        <Button
                          block
                          style={{ margin: 10 }}
                          onPress={() => this.props.setConfirmEmail()}
                        >
                          <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                            Resend Confirmation
                          </Text>
                        </Button>
                        <Button
                          block
                          style={{ margin: 10 }}
                          onPress={() => {
                            this.setModalVisibleConfirmation(!this.state.modalVisibleConfirmation);
                          }}
                        >
                          <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                            Close
                          </Text>
                        </Button>
                      </View>
                    </View>
                  </Modal>
                </View>
              ) : (
                <Text style={styles.artworkText}>{strings.order.noTicket}</Text>
              )}
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
  redeemstatus: selectors.getReedemStatus(),
  inputFields: selectors.getInputFields(),
  isConfirmEmail: selectors.getIsConfirmEmail()
});

export default connect(mapStateToProps, actions)(OrderList);
