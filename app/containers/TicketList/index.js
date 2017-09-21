import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Button,
  Text,
  Spinner,
  CardItem,
  Left,
  Right
} from 'native-base';
import PropTypes from 'prop-types';
import { RefreshControl, View, TouchableOpacity } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
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
      isLoading: true
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

  renderTicketList() {
    return (
      <List
        dataArray={this.props.listTicket}
        renderRow={(item) => {
          return (
            <ListItem style={{ marginLeft: 9, marginRight: 9, padding: 10, marginBottom: 10, borderRadius: 3}}>
              <Text style={styles.text}>Ticket No. {item.id}</Text>
              <Button
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
              </Button>
            </ListItem>);
        }}
      />);
  }

  renderError() {
    return (
      <View style={styles.errorContent}>
        <Text style={styles.errorText}>You have no tickets, please order or try to refresh</Text>
        <Button
          small
          bordered
          style={styles.refreshButton}
          onPress={() => { this.props.fetchUserTicket(); }}
        >
          <Text>refresh</Text>
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
      <Container
        style={styles.container}
      >
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => Actions.orderList()}>
            <View style={styles.card}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>My Orders</Text>
              <Icon name="ios-arrow-dropright" style={{flex: 1, fontSize: 30, textAlign: 'right', marginTop: 8}}/>
              {
                orders && orders.length > 0
                  ? <Text style={{flex: 1, marginTop: -8}}>{orders.length} orders is pending</Text>
                  : <Text style={{fontSize: 12, marginTop: -4}}>All your ticket orders shows up here</Text>
              }
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.newOrder()}>
            <View style={styles.ticketCard}>
              <Icons name="ticket" color="#E57373" style={{flex: 1, fontSize: 30, textAlign: 'center'}}/>
              <Text style={{textAlign: 'center', marginTop: -4, fontSize: 16}}>Ticket Orders</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.redeem}>
            <Redeem />
          </View>
        <Content style={{ marginTop: -10 }}
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
      </Container>
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
