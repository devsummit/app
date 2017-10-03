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
import { RefreshControl, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import RedeemIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import strings from '../../localization';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';
import { getOrders } from '../OrderList/selectors';
import { getOrderList } from '../OrderList/actions';
import { PRIMARYCOLOR } from '../../constants';
import Redeem from '../Redeem';
const { width, height } = Dimensions.get('window');


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
            <ListItem style={{ marginLeft: 9, marginRight: 9, padding: 10, marginBottom: 10, borderRadius: 3 }}>
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
      <View style={styles.errorContent}>
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
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => Actions.orderList()}>
            <View style={[styles.ticketCard, {}]}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Icon name="ios-briefcase" color="#E57373" style={{ flex: 1, fontSize: 50 }} />
                {
                  orders && orders.length > 0
                    ? <Text style={{ flex: 2 }}>{orders.length} {strings.order.pending}</Text>
                    : <Text style={{ fontSize: 16 }}>{strings.order.myOrder}</Text>
                }
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.ticketCard}>
            {/* <Redeem /> */}
            <RedeemIcon name="redeem" color="#E57373" style={{ flex: 1, fontSize: 50, textAlign: 'center' }} />
            <Text style={{ textAlign: 'center', fontSize: 16 }}>Redeem</Text>
          </View>
        </View>
        <View style={{ flex: 0, flexDirection: 'column' }}>
          <TouchableOpacity onPress={() => Actions.newOrder()}>
            <View style={[styles.ticketCard, { height: 110, width: '98%', borderWidth: 0, backgroundColor: '#2196F3' }]}>
              <Icons name="ticket" color="white" style={{ flex: 1, fontSize: 50, textAlign: 'center' }} />
              <Text style={{ textAlign: 'center', fontSize: 16 }}>{strings.order.ticketOrder}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={{ flex: 1, flexDirection: 'row'}}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <View style={{ borderColor: 'grey', borderWidth: 0.3, width: width * 0.2, marginLeft: 2, marginRight: 2 }} />
              </View>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>   or get free pass by completing our partner offers</Text>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <View style={{ borderColor: 'grey', borderWidth: 0.3, width: width * 0.18, marginLeft: 2, marginRight: 2 }} />
              </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.ticketCard}>
              {/* <Redeem /> */}
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image resizeMode={'contain'} style={{ height: 110, width: 110, marginTop: 40}} source={require('../../../assets/images/logobrand.png')} />
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginTop: 50, marginLeft: 8 }}>
                <Text style={{fontSize: 12, textAlign: 'center'}}>Register our free trial </Text>
              </View>
            </View>
            <View style={[styles.ticketCard, { flex: 1, justifyContent: 'space-between'}]}>
              <Image resizeMode={'contain'} style={{ height: 110, width: 110, marginTop: -28, marginLeft: 20}} source={require('../../../assets/images/logobrand.png')} />
              <Text style={{fontSize: 12, textAlign: 'center', marginTop: -15}}>Register our free trial </Text>
            </View>
          </View>
        </View>
        <Content
          style={{ marginTop: -10 }}
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

const Line = () => {
  return (
    <View style={{borderWidth: 0.5}}> <View style={{ borderWidth: 0.5 }}/></View>
  )
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
