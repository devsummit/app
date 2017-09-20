import React, { Component } from 'react';
import {
  Container,
  Content,
  ListItem,
  Button,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Fab
} from 'native-base';
import PropTypes from 'prop-types';
import { RefreshControl, View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {PRIMARYCOLOR} from '../../constants';
import HeaderPoint from '../../components/Header';
import ModalRedeem from '../../components/ModalRedeem';
import * as actions from './actions';
import * as selectors from './selectors';

import TicketList from '../TicketList';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log('here props', this.props);
    return (
      <Container
        style={styles.container}
      >
      <Content>
        <HeaderPoint title="FEED" />
        <Tabs style={styles.tabs}>
          <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>News feed</Text></TabHeading>}>
            <ListItem>
              <Text style={styles.text}>Feed 1</Text>
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
              <Text style={styles.text}>Feed 2</Text>
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
              <Text style={styles.text}>Feed 3</Text>
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
              <Text style={styles.text}>Feed 4</Text>
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
              <Text style={styles.text}>Feed 5</Text>
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
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Ticket</Text></TabHeading>}>
            <TicketList />
          </Tab>
        </Tabs>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  inputFields: selectors.getInputFields()
});

export default connect(mapStateToProps, actions)(Feed);