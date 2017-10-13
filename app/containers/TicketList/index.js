import React, { Component } from 'react';
import { Container, Content, List, ListItem, Button, Text, Spinner, Form, Item, Label, Input } from 'native-base';
import PropTypes from 'prop-types';
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

class TicketList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalVisible: false,
      modalTransfer: false,
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

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  setModalTransfer = (visible, id) => {
    this.setState({ modalTransfer: visible });
    this.handleChangeInput('user_ticket_id', id);
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
                  height: 50,
                  width: '95%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: 3
                }
              ]}
            >
              <View style={ styles.transferSection }>
                <Text style={styles.text}>
                  {strings.order.ticketNumber} {item.id}
                </Text>
                <Button
                  small
                  style={styles.button}
                  onPress={() => this.setModalTransfer(true, item.id)}
                >
                  <Text style={styles.buttonText}>Transfer</Text>
                  <Icons
                    name="exchange"
                    color="white"
                    style={styles.iconTransfer}
                  />
                </Button> 
              </View>
              
            </ListItem>
          );
        }}
      />
    );
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

  updateCounter() {
    this.setState({ counter: this.state.counter + 1 });
  }

  handleChangeInput = (field, value) => {
    this.props.updateInputFields(field, value);
  }

  transferTicket = () => {
    this.props.transferTicket(this.props.fields.receiver, this.props.fields.user_ticket_id, this.props.fields.password,() => this.setModalTransfer(false));
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

    // return (
    //   <OrderList />
    // );

    return (
      <ScrollView style={styles.container}>
        {/* My order and redeem code */}
        {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
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
        </View> */}

        {/* Ticket Orders */}
        {/* <TouchableOpacity onPress={() => Actions.newOrder()}>
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
        </TouchableOpacity> */}

        {/* Free pass */}
        {/* <Text style={styles.free}> Or get free past by completing our partner offers </Text>
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
        </View> */}

        {/* Ticket List */}
        <Content
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

        {/* Redeem Modal */}
        {/* <Modal
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
        </Modal> */}

        {/* Authenticate Modal */}
        <Modal
          animationType='fade'
          visible={ this.state.modalTransfer }
          onRequestClose={() => this.setModalTransfer(!this.state.modalTransfer) }
          transparent
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalComponent}>
              <TouchableOpacity onPress={() => this.setModalTransfer(!this.state.modalTransfer)}>
                <Icons name='close' style={{ alignSelf: 'flex-end', fontSize: 14 }}/>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Transfer Ticket</Text>
              <View style={styles.inputItem}>
                <Form>
                  <Item floatingLabel >
                    <Label>
                      username receiver
                    </Label>
                    <Input
                      onChangeText={text => this.handleChangeInput('receiver', text)}
                    />
                  </Item>
                </Form>
                <Form>
                  <Item floatingLabel >
                    <Label>
                      your password
                    </Label>
                    <Input
                      secureTextEntry
                      onChangeText={text => this.handleChangeInput('password', text)}
                    />
                  </Item>
                </Form>
                <Button
                  style={styles.buttonUpload}
                  onPress={() => this.transferTicket()}
                >
                  <Text style={styles.buttonText1}>Transfer</Text>
                </Button>
              </View>
            </View>
            <View style={{ flex: this.state.onKeyboardShow ? 0.15 : 0.325 }} />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

TicketList.propTypes = {
  listTicket: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
  isGettingUserTicket: PropTypes.bool.isRequired,
  fetchUserTicket: PropTypes.func.isRequired,
  fetchTicketStatus: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  listTicket: selectors.getListTicket(),
  isGettingUserTicket: selectors.getIsFetchingTicket(),
  fetchTicketStatus: selectors.getFetchingUserTicketStatus(),
  orders: getOrders(),
  pendingOrders: getPendingOrders(),
  fields: selectors.getFields()
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
