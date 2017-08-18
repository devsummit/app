import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Button,
  Text,
  Spinner
} from 'native-base';
import PropTypes from 'prop-types';
import { Alert, RefreshControl } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { primaryColor } from '../../constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as ticketSelectors from '../TicketList/selectors';

class AttendeesList extends Component {
  state = {
    isLoading: true
  }

  componentWillMount() {
    this.props.fetchAttendees();
  }

  componentWillReceiveProps(prevState) {
    if (
      prevState.isTransferring === true
      &&
      this.props.isTransferring === false
      &&
      this.props.isGettingTicket === false) {
      Actions.pop();
    } else if (prevState.listAttendees !== this.props.listAttendees) {
      this.setState({
        isLoading: false
      });
    }
  }

  handleTransferPressed = (ticketId, receiverId, targetName) => {
    Alert.alert(
      'Are you sure want to send this ticket to :',
      targetName,
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.transferTicket(ticketId, receiverId);
          }
        }
      ],
      { cancelable: true }
    );
  }

  renderAttendees() {
    return (
      <List
        dataArray={this.props.listAttendees}
        renderRow={(item) => {
          return (<ListItem>
            <Text style={styles.text}>{item.user.first_name}  {item.user.last_name}</Text>
            <Button
              small
              style={styles.button}
              onPress={() => {
                this.handleTransferPressed(this.props.ticketId, item.user_id, `${item.user.first_name} ${item.user.last_name}`);
              }}
            >
              <Text style={styles.buttonText}>Transfer</Text>
              <Icon
                name="exchange"
                color="white"
              />
            </Button>
          </ListItem>);
        }
        }
      />
    );
  }

  renderError() {
    return (
      <Content style={styles.errorContent}>
        <Text style={styles.buttonText}>No attendee listed, try to refresh</Text>
        <Button
          small
          style={styles.refreshButton}
          onPress={() => { this.props.fetchAttendees(); }}
        >
          <Text>refresh</Text>
        </Button>
      </Content>);
  }

  render() {
    if (this.state.isLoading || this.props.isTransferring) {
      return (
        <Container style={{ alignItems: 'center' }}>
          <Content>
            <Spinner color={primaryColor} />
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.isGettingAttendees}
              onRefresh={() => { this.props.fetchAttendees(); }}
            />
          }
        >
          {
            this.props.fetchingAttendeeStat ?
              this.renderAttendees() :
              this.renderError()
          }
        </Content>
      </Container>
    );
  }
}

AttendeesList.propTypes = {
  listAttendees: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]
  ).isRequired,
  isTransferring: PropTypes.bool.isRequired,
  isGettingTicket: PropTypes.bool.isRequired,
  fetchAttendees: PropTypes.func.isRequired,
  transferTicket: PropTypes.func.isRequired,
  ticketId: PropTypes.number.isRequired,
  isGettingAttendees: PropTypes.bool.isRequired,
  fetchingAttendeeStat: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  listAttendees: selectors.getAttendees(),
  isTransferring: selectors.getIsTransferring(),
  isGettingTicket: ticketSelectors.getIsFetchingTicket(),
  isGettingAttendees: selectors.getIsFetchingAttendees(),
  fetchingAttendeeStat: selectors.getFetchingAttendeesStatus()
});
export default connect(mapStateToProps, actions)(AttendeesList);
