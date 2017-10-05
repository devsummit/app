import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Button,
  Text,
  Spinner
} from 'native-base';
import PropTypes from 'prop-types';
import { RefreshControl, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import strings from '../../localization';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';
import { getOrders } from '../OrderList/selectors';
import { getOrderList } from '../OrderList/actions';
import { PRIMARYCOLOR } from '../../constants';
import Redeem from '../Redeem';

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalVisible: false
    };
  }

  componentWillMount() {
    this.props.fetchUserTicket();
    this.props.getOrderList();
  }

  componentWillReceiveProps(prevState) {
    if ((prevState.listTicket !== this.props.listTicket)) {
      this.setState({
        isLoading: false
      });
    }
  }


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  renderTicketList() {
    return (
      <List
        dataArray={this.props.listTicket}
        renderRow={(item) => {
          return (
            <ListItem style={[ styles.card, { alignSelf: 'center', height: 50, width: '95%', marginLeft: 'auto', marginRight: 'auto', borderRadius: 3 } ]}>
              <Text style={styles.text}>{strings.order.ticketNumber} {item.id}</Text>
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
      />);
  }

  renderError() {
    return (
      <View style={[ styles.errorContent, styles.card, { width: '95%', height: 100 } ]}>
        <Text style={styles.errorText}>{strings.order.noTicket}</Text>
        <Button
          small
          bordered
          style={styles.refreshButton}
          onPress={() => { this.props.fetchUserTicket(); }}
        >
          <Text>{strings.order.refresh}</Text>
        </Button>
      </View>);
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

    const { orders } = this.props;
    return (
      <ScrollView
        style={styles.container}
      >
        {/* My order and redeem code */}
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => Actions.orderList()}>
            <View style={[ styles.card, { justifyContent: 'space-between', padding: 0 } ]}>
              <Icons name="shopping-basket" color="#E57373" style={{ alignSelf: 'center', fontSize: 40, marginTop: 3 }} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>{strings.order.myOrder}</Text>
              {
                orders && orders.length > 0
                  ? <Text style={{ marginBottom: 5, fontSize: 12, textAlign: 'center' }}>{orders.length} {strings.order.pending}</Text>
                  : <Text style={{ fontSize: 12, textAlign: 'center', padding: 1 }}>{strings.order.allTicket}</Text>
              }
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <View style={styles.card}>
              <Icons name="ticket" color="#E57373" style={{ flex: 1, textAlign: 'center', fontSize: 40 }} />
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{strings.order.redeem}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => Actions.newOrder()}>
          <View style={[ styles.card, { width: '94%' } ]}>
            <Icons name="shopping-cart" color="#E57373" style={{ flex: 1, textAlign: 'center', fontSize: 40 }} />
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{strings.order.ticketOrder}</Text>
          </View>
        </TouchableOpacity>

        { /* Redeem Modal */ }
        <Modal
          animationType="fade"
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
          transparent
        >
          <View style={{ flex: 1, justifyContent: 'center' }} backgroundColor="rgba(0, 0, 0, 0.5)">
            <View style={styles.redeem}>
              <View style={styles.viewredeem}>
                <Icons name="gift" style={{ fontSize: 60, color: 'white', margin: 10 }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{strings.redeem.redeem}</Text>
              </View>
              <Redeem />
            </View>
          </View>
        </Modal>

        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.isGettingUserTicket}
              onRefresh={() => { this.props.fetchUserTicket(); }}
            />
          }
        >
          {
            this.props.fetchTicketStatus ?
              this.renderTicketList() :
              this.renderError()
          }
        </Content>
      </ScrollView>
    );
  }
}

TicketList.propTypes = {
  listTicket: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]
  ).isRequired,
  isGettingUserTicket: PropTypes.bool.isRequired,
  fetchUserTicket: PropTypes.func.isRequired,
  fetchTicketStatus: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  listTicket: selectors.getListTicket(),
  isGettingUserTicket: selectors.getIsFetchingTicket(),
  fetchTicketStatus: selectors.getFetchingUserTicketStatus(),
  orders: getOrders()
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOrderList,
    ...actions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
