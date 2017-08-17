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

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {}
    };
  }

  componentWillMount() {
    this.props.getTicketType();
  }

  increase = (typeId) => {
    //
  };
  decrease = (typeId) => {
    //
  };

  render() {
    console.log('ticket ==>', this.props.ticketTypes);
    return (
      <Container style={styles.container}>
        <Content>
          { this.props.ticketTypes.map((ticket) => {
            return (
              <Card key={ticket.id}>
                <CardItem>
                  <Body style={styles.summary}>
                    <Text>{ticket.ticket_type}</Text>
                    <Text note style={{ color: 'green' }}>
                      Rp { Intl.NumberFormat('id').format(ticket.price) }
                    </Text>
                    <Text note>{ ticket.information }</Text>
                  </Body>
                  <View style={styles.btnGroup}>
                    <Text style={styles.plusMinus} onPress={() => { this.decrease(ticket.id); }}>
                      <Icon name="minus" />
                    </Text>
                    <Text style={styles.ticketCount}>0</Text>
                    <Text style={styles.plusMinus} onPress={() => { this.increase(ticket.id); }}>
                      <Icon name="plus" />
                    </Text>
                  </View>
                </CardItem>
              </Card>
            );
          })}

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

const mapStateToProps = createStructuredSelector({
  ticketTypes: selectors.getTicketTypes()
});

export default connect(mapStateToProps, actions)(NewOrder);
