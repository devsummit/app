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
import { RefreshControl } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import styles from './styles';
import { primaryColor } from '../../constants';
import * as actions from './actions';
import * as selectors from './selectors';


class TicketList extends Component {
  state = {
    isLoading: true,
    refreshing: false
  }

  componentWillMount() {
    this.props.fetchUserTicket();
  }

  componentDidMount() {

  }

  componentWillReceiveProps(prevState) {
    if (prevState.listTicket !== this.props.listTicket) {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Content>
            <Spinner color={primaryColor} />
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Header title="Ticket List">
          <Button small warning style={styles.btnOrder} onPress={() => { Actions.orderList(); }}>
            <Text>Order</Text>
          </Button>
        </Header>
        <Content refreshControl={
          <RefreshControl
            refreshing={this.props.isGettingUserTicket}
            onRefresh={() => { this.props.fetchUserTicket(); }}
          />
        }
        >
          <List
            dataArray={this.props.listTicket}
            renderRow={(item) => {
              return (<ListItem>
                <Text style={styles.text}>Ticket No. {item.id}</Text>
                <Button
                  small
                  style={styles.button}
                  onPress={() => {
                    Actions.attendeesList({ ticketId: item.id });
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
        </Content>
      </Container>
    );
  }
}

TicketList.propTypes = {
  listTicket: PropTypes.array.isRequired,
  isGettingUserTicket: PropTypes.bool.isRequired,
  fetchUserTicket: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  listTicket: selectors.getListTicket(),
  isGettingUserTicket: selectors.getIsFetchingTicket()
});

export default connect(mapStateToProps, actions)(TicketList);
