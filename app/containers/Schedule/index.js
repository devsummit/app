import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Label,
  Spinner
} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';

// import redux components
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import HeaderPoint from '../../components/Header';
import ScheduleList from '../../components/ScheduleList';
import styles from './styles';
import { PRIMARYCOLOR } from '../../constants';

import * as actions from './actions';
import * as selectors from './selectors'

class Schedule extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
  }

  componentWillMount() {
    this.props.fetchUserSchedule();
  }

  componentWillReceiveProps(prevState) {
    if ((prevState.userSchedule !== this.props.userSchedule)) {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderPoint
            title="SCHEDULE"
        />
        <Container style={styles.content}>
          <Header searchBar style={styles.searchHeader} androidStatusBarColor="#f39e21">
            <Item>
              <Icon name="ios-search"/>
              <Input placeholder="Search event ..."/>
              <Icon name="ios-calendar"/>
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <Content>
            <View style={styles.cards}>
                { !(this.state.isLoading) ? (<ScheduleList events={this.props.userSchedule} />) : (
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner color={ PRIMARYCOLOR }/>
                    <Text style={{color: '#3a3a3a'}}>Loading...</Text>
                  </View>
                )}
            </View>
          </Content>
        </Container>
      </View>
    );
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  userSchedule: selectors.getListSchedule()
});

export default connect(mapStateToProps, actions)(Schedule);
