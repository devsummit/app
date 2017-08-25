import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Right,
  Grid,
  Row,
  Col
} from 'native-base';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import styles from './styles';
import TicketType from '../../components/TicketType';

class OrderDetail extends Component {
  componentWillMount() {
    this.props.getTicketType();
    this.props.getOrderDetail(this.props.orderId);
  }

  getType = (typeId) => {
    return this.props.ticketTypes.filter((type) => { return type.id === typeId; })[0];
  }

  increase = (typeId) => {
    this.props.updateOrder('increase', typeId);
  };

  decrease = (typeId) => {
    this.props.updateOrder('decrease', typeId);
  };

  renderItem = (item) => {
    const type = this.getType(item.ticket_id);
    return (
      <TicketType
        key={item.id}
        count={item.count}
        ticket={type}
        onAdd={() => this.increase(item.ticket_id)}
        onReduce={() => this.decrease(item.ticket_id)}
      />
    );
  }

  render() {
    const order = this.props.order;
    const arraySub = Object.keys(order).map((key) => {
      return order[key].count * order[key].price;
    });
    const total = arraySub.reduce((a, b) => { return a + b; }, 0);
    return (
      <Container style={styles.container}>
        <Content>
          <Card>
            <CardItem>
              <Grid>
                <Row>
                  <Col><Text>Order number:</Text></Col>
                  <Col><Text>{ this.props.orderId }</Text></Col>
                </Row>
                <Row>
                  <Col><Text>Order date:</Text></Col>
                  <Col><Text>11-08-2017</Text></Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>

          {/* { this.props.ticketTypes.map((ticket, index) => {
            return <TicketType count={index} ticket={ticket} />;
          })} */}

          { Object.keys(this.props.order).map((key) => {
            return this.renderItem(this.props.order[key]);
          })}

          <Card>
            <CardItem>
              <Body>
                <Text>Total</Text>
              </Body>
              <Right><Text>Rp {Intl.NumberFormat('id').format(total)}</Text></Right>
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
