import React, { Component } from 'react';
import { Container, Content, List, ListItem, Button, Text, Spinner } from 'native-base';
import PropTypes from 'prop-types';

import QRCode from 'react-native-qrcode';
import {
  RefreshControl,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import strings from '../../localization';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';
import { getOrders, getPendingOrders } from '../OrderList/selectors';
import { getOrderList } from '../OrderList/actions';
import { PRIMARYCOLOR } from '../../constants';
import Redeem from '../Redeem';
import OrderList from '../OrderList';

// @flow
type Props = {
  listTicket?: Array<mixed>,
  isGettingUserTicket: boolean,
  fetchTicketStatus: boolean
};

type State = {
  counter: number,
  isLoading: boolean,
  modalVisible: boolean
};

class TicketList extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalVisible: false,
      counter: 0
    };
  }

  componentWillMount() {
    this.props.fetchUserTicket();
    this.props.getOrderList();
  }

  componentWillReceiveProps(prevState) {
    if (prevState.listTicket !== this.props.listTicket) {
      this.setState({
        isLoading: false
      });
    }
  }

  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible });
  };

  updateCounter() {
    this.setState({ counter: this.state.counter + 1 });
  }

  renderError() {
    return (
      <View style={[ styles.errorContent, styles.card, { width: '95%', height: 100 } ]}>
        <Text style={styles.errorText}>{strings.order.noTicket}</Text>
        <Button
          small
          transparent
          style={styles.refreshButton}
          onPress={() => {
            this.props.fetchUserTicket();
          }}
        >
          <Text>{strings.order.refresh}</Text>
        </Button>
      </View>
    );
  }

  renderTicketList() {
    return (
      <List
        dataArray={this.props.listTicket}
        renderRow={(item) => {
          return (
            <ListItem
              style={[
                styles.card,
                {
                  alignSelf: 'center',
                  height: 110,
                  width: '95%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: 3
                }
              ]}
            >
              <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>{strings.order.ticketNumber} {`${item.id  }\n`}</Text>
                {strings.order.QRInstruction}
              </Text>
              <QRCode
                value={item.ticket_code}
                size={100}
                bgColor="black"
                fgColor="white"
              />
              {/* <Button
                small
                style={styles.button}
                onPress={() => {
                  Actions.attendeesList({ ticketId: item.id });
                }}
              >
                <Text style={styles.buttonText}>Transfer</Text>
                <Icons
                  name="exchange"
                  color="white"
                />
              </Button> */}
            </ListItem>
          );
        }}
      />
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

    return this.renderTicketList();

    /*
    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => Actions.orderList()}>
            <View style={[ styles.card, { justifyContent: 'space-between', padding: 0 } ]}>
              <Icons
                name="briefcase"
                color="#E57373"
                style={{ alignSelf: 'center', fontSize: 40, marginTop: 3 }}
              />
              <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>
                {strings.order.myOrder}
              </Text>
              {orders && orders.length > 0 ? (
                <Text style={{ marginBottom: 5, fontSize: 12, textAlign: 'center' }}>
                  {this.props.pendingOrders} {strings.order.pending}
                </Text>
              ) : (
                <Text style={{ fontSize: 12, textAlign: 'center', padding: 1 }}>
                  {strings.order.allTicket}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <View style={styles.card}>
              <Icons
                name="gift"
                color="#E57373"
                style={{ flex: 1, textAlign: 'center', fontSize: 40 }}
              />
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                {strings.order.redeem}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => Actions.newOrder()}>
          <View style={[ styles.card, { width: '94%' } ]}>
            <Icons
              name="ticket"
              color="#E57373"
              style={{ flex: 1, textAlign: 'center', fontSize: 40 }}
            />
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
              {strings.order.ticketOrder}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.free}> Or get free past by completing our partner offers </Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <View style={styles.card}>
              <Icons
                name="plus-circle"
                color="#E57373"
                style={{ flex: 1, textAlign: 'center', fontSize: 60 }}
              />
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Register our free trial</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <View style={styles.card}>
              <Icons
                name="plus-circle"
                color="#E57373"
                style={{ flex: 1, textAlign: 'center', fontSize: 60 }}
              />
              <Text style={{ textAlign: 'center', fontSize: 12 }}>Register our free trial</Text>
            </View>
          </TouchableOpacity>
        </View>
          refreshControl={
            <RefreshControl
              refreshing={this.props.isGettingUserTicket}
              onRefresh={() => {
                this.props.fetchUserTicket();
              }}
            />
          }
        >
          {this.props.fetchTicketStatus ? this.renderTicketList() : this.renderError()}
        </Content>
        <Modal
          animationType="fade"
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
          transparent
        >
          <View style={{ flex: 1, justifyContent: 'center' }} backgroundColor="rgba(0, 0, 0, 0.5)">
            <View style={styles.redeem}>
              <TouchableWithoutFeedback
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Icons style={styles.iconClose} name="times" />
              </TouchableWithoutFeedback>
              <View style={styles.viewredeem}>
                <Icons name="gift" style={{ fontSize: 40, color: PRIMARYCOLOR, margin: 10 }} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: PRIMARYCOLOR }}>
                  {strings.redeem.redeem}
                </Text>
              </View>
              <Redeem />
            </View>
          </View>
        </Modal>
      </ScrollView>
    ); */
  }
}

const mapStateToProps = createStructuredSelector({
  listTicket: selectors.getListTicket(),
  isGettingUserTicket: selectors.getIsFetchingTicket(),
  fetchTicketStatus: selectors.getFetchingUserTicketStatus(),
  orders: getOrders(),
  pendingOrders: getPendingOrders()
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOrderList,
      ...actions
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
