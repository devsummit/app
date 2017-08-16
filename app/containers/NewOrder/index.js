import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import styles from './styles';

class NewOrder extends Component {
  add = () => {};

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Card>
            <CardItem>
              <Body style={styles.summary}>
                <Text>Regular</Text>
                <Text note style={{ color: 'green' }}>Rp 500.000</Text>
                <Text note>Regular Ticket</Text>
              </Body>
              <View style={styles.btnGroup}>
                <Text style={styles.plusMinus} onPress={() => { console.log('minus'); }}>
                  <Icon name="minus" />
                </Text>
                <Text style={styles.ticketCount}>0</Text>
                <Text style={styles.plusMinus} onPress={() => { console.log('plus'); }}>
                  <Icon name="plus" />
                </Text>
              </View>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <Text>Gold</Text>
                <Text note style={{ color: 'green' }}>Rp 1.000.000</Text>
                <Text note>Gold ticket for vvip</Text>
              </Body>
              <View style={styles.btnGroup}>
                <Text style={styles.plusMinus} onPress={() => { console.log('minus'); }}>
                  <Icon name="minus" />
                </Text>
                <Text style={styles.ticketCount}>0</Text>
                <Text style={styles.plusMinus} onPress={() => { console.log('plus'); }}>
                  <Icon name="plus" />
                </Text>
              </View>
            </CardItem>
          </Card>

          <Button
            style={styles.orderBtn}
            onPress={() => {}}
          >
            <Text>Place Order</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default NewOrder;
