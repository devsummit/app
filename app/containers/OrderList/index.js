import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Button,
  Text,
  Body,
  Grid,
  Col,
  Right
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
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
          <List>
            <ListItem style={styles.item}>
              <Grid>
                <Col style={styles.left}>
                  <Text style={styles.orderId}>Order-001</Text>
                  <Text note style={styles.orderId}>2017-08-06</Text>
                </Col>
                <Col style={styles.center}>
                  <Text>Rp 1.500.000</Text>
                  <Text note style={{ color: 'red' }}>Pending</Text>
                </Col>
              </Grid>
              <Right>
                <Icon name="chevron-right" style={{ fontSize: 22, marginRight: 5 }} onPress={() => { console.log('press'); }} />
              </Right>
            </ListItem>
            <ListItem style={styles.item}>
              <Grid>
                <Col style={styles.left}>
                  <Text style={styles.orderId}>Order-002</Text>
                  <Text note style={styles.orderId}>2017-08-06</Text>
                </Col>
                <Col style={styles.center}>
                  <Text>Rp 1.500.000</Text>
                  <Text note style={{ color: 'green' }}>Paid</Text>
                </Col>
              </Grid>
              <Right>
                <Icon name="chevron-right" style={{ fontSize: 22, marginRight: 5 }} onPress={() => { console.log('press'); }} />
              </Right>
            </ListItem>
            <ListItem style={styles.item} >
              <Grid>
                <Col style={styles.left}>
                  <Text style={styles.orderId}>Order-003</Text>
                  <Text note style={styles.orderId}>2017-08-06</Text>
                </Col>
                <Col style={styles.center}>
                  <Text>Rp 1.500.000</Text>
                  <Text note style={{ color: '#777' }}>Canceled</Text>
                </Col>
              </Grid>
              <Right>
                <Icon name="chevron-right" style={{ fontSize: 22, marginRight: 5 }} onPress={() => { console.log('press'); }} />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default OrderList;
