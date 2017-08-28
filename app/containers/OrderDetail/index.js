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
  ListItem
} from 'native-base';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
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
      headerRight: <Button style={styles.roundButton} onPress={() => params.handleCheckOut()} >
        <Icon name="check" color={PRIMARYCOLOR} />
        <Text style={styles.textButton}>Check Out</Text>
      </Button>
    };
  };

  componentWillMount() {
    // this.props.getTicketType();
    this.props.getOrderDetail(this.props.orderId);
    this.props.navigation.setParams({
      handleCheckOut:
      this.handleCheckOut
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

  handleCheckOut = () => {
    Actions.payment();
  }

  render() {
    console.log('ORDER DETAIL', this.props.order);

    return (
      <Container style={styles.container}>
        <Content>
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
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ticketTypes: selectors.getTicketTypes(),
  order: selectors.getOrder()
});

export default connect(mapStateToProps, actions)(OrderDetail);
