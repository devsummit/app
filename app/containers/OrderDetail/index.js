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
import styles from './styles';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
          <Card>
            <CardItem header>
              <Text>Order Items</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Gold ticket</Text>
                <Text note style={{color: '#285ced'}}>Rp 500.000</Text>
              </Body>
              <Right>
                <Text note>Qty:</Text>
                <Text>4</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Silver ticket</Text>
                <Text note style={{color: '#285ced'}}>Rp 300.000</Text>
              </Body>
              <Right>
                <Text note>Qty:</Text>
                <Text>2</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Text>VIP ticket</Text>
                <Text note style={{color: '#285ced'}}>Rp 1.000.000</Text>
              </Body>
              <Right>
                <Text note>Qty:</Text>
                <Text>1</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>Total</Text>
              </Body>
              <Right><Text>Rp 3.600.000</Text></Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default OrderList;
