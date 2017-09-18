import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Button,
  Text,
  Spinner,
  Right
} from 'native-base';
import PropTypes from 'prop-types';
import { RefreshControl, View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import styles from './styles';
import { PRIMARYCOLOR } from '../../constants';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container
        style={styles.container}
      >
        <Header title="Feed" />
        <Button primary style={styles.btnOrder} onPress={() => Actions.newOrder()}>
          <Text style={{ textAlign: 'center', flex: 1 }}>Get Ticket</Text>
        </Button>
        <Content>
            <ListItem>
              <Text style={styles.text}>Materi Nomor 1</Text>
              <Button
                small
                style={styles.button}
                onPress={() => {
                  Actions.attendeesList({ ticketId: item.id });
                }}
              >
                <Text style={styles.buttonText}>Share</Text>
                <Icon
                  name="share"
                  color="white"
                />
              </Button>
            </ListItem>
            <ListItem>
              <Text style={styles.text}>Materi Nomor 2</Text>
              <Button
                small
                style={styles.button}
                onPress={() => {
                  Actions.attendeesList({ ticketId: item.id });
                }}
              >
                <Text style={styles.buttonText}>Share</Text>
                <Icon
                  name="share"
                  color="white"
                />
              </Button>
            </ListItem>
            <ListItem>
              <Text style={styles.text}>Materi Nomor 3</Text>
              <Button
                small
                style={styles.button}
                onPress={() => {
                  Actions.attendeesList({ ticketId: item.id });
                }}
              >
                <Text style={styles.buttonText}>Share</Text>
                <Icon
                  name="share"
                  color="white"
                />
              </Button>
            </ListItem>
            <ListItem>
              <Text style={styles.text}>Materi Nomor 4</Text>
              <Button
                small
                style={styles.button}
                onPress={() => {
                  Actions.attendeesList({ ticketId: item.id });
                }}
              >
                <Text style={styles.buttonText}>Share</Text>
                <Icon
                  name="share"
                  color="white"
                />
              </Button>
            </ListItem>
            <ListItem>
              <Text style={styles.text}>Materi Nomor 5</Text>
              <Button
                small
                style={styles.button}
                onPress={() => {
                  Actions.attendeesList({ ticketId: item.id });
                }}
              >
                <Text style={styles.buttonText}>Share</Text>
                <Icon
                  name="share"
                  color="white"
                />
              </Button>
            </ListItem>
        </Content>
      </Container>
    );
  }
}

export default connect(null, null)(Feed);
