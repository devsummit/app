import React, { Component } from 'react';
import {
  Container,
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
      active: false,
      invisible: false
    };
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
  }

  placeRedeem = () => {
    this.props.placeRedeem();
    this.setState({ invisible: !this.state.invisible });
  }

  render() {
    console.log('here props', this.props);
    return (
      <Container
        style={styles.container}
      >
        <HeaderPoint title="FEED" />
        <Tabs style={styles.tabs}>
        <Tab heading={ <TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>News feed</Text></TabHeading> }>
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
          <Tab heading={ <TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Ticket</Text></TabHeading> }>
              <TicketList />
          </Tab>
        </Tabs>
        <Fab
          active={ this.state.active }
          direction='up'
          style={{ backgroundColor: '#FFA726' }}
          position='bottomRight'
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name='plus' />
          <Button
            onPress={() => this.setState({invisible: !this.state.invisible})}
          >
            <Icon name='gift' style={ styles.icon } />
          </Button>
          <Button>
            <Icon name='transgender-alt' style={ styles.icon } />
          </Button>
        </Fab>
        <ModalRedeem
          visible={this.state.invisible}
          onChangeCode={text => this.handleInputChange('code', text)}
          onSubmit={() => this.placeRedeem()}
          onModalPress={() => this.setState({ invisible: !this.state.invisible })}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  inputFields: selectors.getInputFields()
});

export default connect(mapStateToProps, actions)(Feed);