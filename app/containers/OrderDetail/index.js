import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Right,
  Button,
  Grid,
  Row,
  Col,
  List,
  ListItem,
  Spinner
} from 'native-base';
import { RefreshControl, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { PRIMARYCOLOR } from '../../constants';
import * as actions from './actions';
import * as selectors from './selectors';
import TicketType from '../../components/TicketType';

let total = 0;
class OrderDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: <Button style={styles.roundButton} onPress={() => params.saveOrder()} >
        <Icon name="save" color={PRIMARYCOLOR} />
        <Text style={styles.textButton}>save</Text>
      </Button>
    };
  };

  componentWillMount = () => {
    this.props.getOrderDetail(this.props.orderId);
    this.props.navigation.setParams({
      saveOrder:
      this.saveOrder
    });
  }

  getTotal = () => {
    const order = this.props.order;
    const arraySub = order.map((item) => {
      return item.count * item.ticket.price;
    });
    total = arraySub.reduce((a, b) => { return a + b; }, 0);
    return total;
  }

  increase = (typeId) => {
    this.props.updateOrder('increase', typeId);
  };

  decrease = (typeId) => {
    this.props.updateOrder('decrease', typeId);
  };

  saveOrder = () => {
    Alert.alert(
      'Are you sure want to update this order?',
      'Order number '.concat(this.props.orderId),
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => { this.props.submitUpdateOrder(this.props.order) } },
      ],
      { cancelable: false }
    )
  }

  render() {
    if (this.props.isUpdating) {
      return (
        <Container>
          <Content>
            <Spinner color={PRIMARYCOLOR} />
          </Content>
        </Container>
      )
    }
    return (
      <Container style={styles.container}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.isUpdating}
              onRefresh={() => { this.props.getOrderDetail(this.props.orderId) }}
            />
          }
        >
          <Card>
            <CardItem>
              <Grid>
                <Row>
                  <Col><Text>Order number:</Text></Col>
                  <Col><Text>{this.props.orderId}</Text></Col>
                </Row>
                <Row>
                  <Col><Text>Order date:</Text></Col>
                  <Col><Text>11-08-2017</Text></Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>
          {
            <Content>
              <List
                dataArray={this.props.order}
                renderRow={item =>
                  (<ListItem>
                    <TicketType
                      key={item.id}
                      count={item.count}
                      ticket={item.ticket}
                      onAdd={() => this.increase(item.id)}
                      onReduce={() => this.decrease(item.id)}
                    />
                  </ListItem>)
                }
              />
            </Content>
          }
          <Card>
            <CardItem>
              <Body>
                <Text>Total</Text>
              </Body>
              <Right><Text>Rp {Intl.NumberFormat('id').format(this.getTotal())}</Text></Right>
            </CardItem>
          </Card>
        </Content>
      </Container >
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ticketTypes: selectors.getTicketTypes(),
  order: selectors.getOrder(),
  isUpdating: selectors.getIsUpdatingOrder()
});

export default connect(mapStateToProps, actions)(OrderDetail);
