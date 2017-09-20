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
  Spinner,
  Tab,
  Tabs,
  TabHeading
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

export const orderByDay = '';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
      <Container style={styles.container}>
      <Content>
        <HeaderPoint title= "SCHEDULE"/>
        <Tabs style={styles.tabs}>
            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon style={styles.icon} name= "calendar"/><Text style={styles.tabTitle}>21 Nov</Text></TabHeading> }>
              <Content style={styles.content}>
                <View style={styles.cards}>
                  { !(this.state.isLoading) ? (<ScheduleList events={this.props.userSchedule[0]} />) : (
                    <View style={styles.loading}>
                      <Spinner color={ PRIMARYCOLOR }/>
                      <Text style={{color: '#3a3a3a'}}>Loading...</Text>
                    </View>
                  )}
                </View>
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon style={styles.icon} name="calendar"/><Text style={styles.tabTitle}>22 Nov</Text></TabHeading> }>
            <Content style={styles.content}>
              <View style={styles.cards}>
                { !(this.state.isLoading) ? (<ScheduleList events={this.props.userSchedule[1]} />) : (
                  <View style={styles.loading}>
                    <Spinner color={ PRIMARYCOLOR }/>
                    <Text style={{color: '#3a3a3a'}}>Loading...</Text>
                  </View>
                )}
              </View>
            </Content>
          </Tab>
          <Tab heading={ <TabHeading style={styles.tabHeading}><Icon style={styles.icon} name="calendar"/><Text style={styles.tabTitle}>Nov 23</Text></TabHeading> }>
              <Content style={styles.content}>
                <View style={styles.cards}>
                  { !(this.state.isLoading) ? (<ScheduleList events={this.props.userSchedule[2]} />) : (
                    <View style={styles.loading}>
                      <Spinner color={ PRIMARYCOLOR }/>
                      <Text style={{color: '#3a3a3a'}}>Loading...</Text>
                    </View>
                  )}
                </View>
              </Content>
            </Tab>
        </Tabs>
        </Content>
      </Container>
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
