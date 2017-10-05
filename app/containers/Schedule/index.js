import React, { Component } from 'react';
import { View, Image } from 'react-native';
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
import strings from '../../localization';
import ScheduleList from '../../components/ScheduleList';
import styles from './styles';
import { PRIMARYCOLOR } from '../../constants';

import * as actions from './actions';
import * as selectors from './selectors';

const noSchedule = require('./../../../assets/images/noschedule.png');

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
        <View style={{ flex: 1 }}>
          <HeaderPoint title={strings.schedule.title} />
          <Tabs style={styles.tabs}>
            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon style={styles.icon} name= "calendar"/><Text style={styles.tabTitle}>21 Nov</Text></TabHeading> }>
              <View style={styles.content}>
                <View style={styles.cards}>
                  { !(this.state.isLoading) ?
                    this.props.userSchedule[0].length > 0 ?
                      (<ScheduleList events={this.props.userSchedule[0]} />) :
                      (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={noSchedule} />
                        <Text style={styles.artworkText}>There is no event schedule today</Text>
                      </View>) :
                    (<View style={styles.loading}>
                      <Spinner color={PRIMARYCOLOR} />
                      <Text style={{ color: '#3a3a3a' }}>{strings.schedule.loading}</Text>
                    </View>
                    )
                  }
                </View>
              </View>
            </Tab>
            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon style={styles.icon} name="calendar"/><Text style={styles.tabTitle}>22 Nov</Text></TabHeading> }>
              <View style={styles.content}>
                <View style={styles.cards}>
                  { !(this.state.isLoading) ?
                    this.props.userSchedule[1].length > 0 ?
                      (<ScheduleList events={this.props.userSchedule[1]} />) :
                      (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={noSchedule} />
                        <Text style={styles.artworkText}>There is no event schedule today</Text>
                      </View>) :
                    (<View style={styles.loading}>
                      <Spinner color={PRIMARYCOLOR} />
                      <Text style={{ color: '#3a3a3a' }}>{strings.schedule.loading}</Text>
                    </View>
                    )
                  }
                </View>
              </View>
            </Tab>
            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon style={styles.icon} name="calendar"/><Text style={styles.tabTitle}>Nov 23</Text></TabHeading> }>
              <View style={styles.content}>
                <View style={styles.cards}>
                  { !(this.state.isLoading) ?
                    this.props.userSchedule[2].length > 0 ?
                      (<ScheduleList events={this.props.userSchedule[2]} />) :
                      (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={noSchedule} />
                        <Text style={styles.artworkText}>There is no event schedule today</Text>
                      </View>) :
                    (<View style={styles.loading}>
                      <Spinner color={PRIMARYCOLOR} />
                      <Text style={{ color: '#3a3a3a' }}>{strings.schedule.loading}</Text>
                    </View>
                    )
                  }
                </View>
              </View>
            </Tab>
          </Tabs>
        </View>
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
