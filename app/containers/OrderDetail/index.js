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
  Col
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { PRIMARYCOLOR } from '../../constants';


class OrderList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: <Button style={styles.roundButton} onPress={() => params.handleCheckOut()} >
        <Icon name='check' color={PRIMARYCOLOR} />
        <Text style={styles.textButton}>Check Out</Text>
      </Button>
    };
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.navigation.setParams({
      handleCheckOut:
      this.handleCheckOut
    });
  }

  handleCheckOut = () => {
    Actions.payment();
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
