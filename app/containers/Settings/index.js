import React, { Component } from 'react';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { View, ScrollView, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import strings from '../../localization';
import Button from '../../components/Button';
import Header from '../../components/Header';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

class Settings extends Component {
  state = {
    id: null,
    modalVisible: false
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isLogOut !== this.props.isLogOut) {
      Actions.main();
      this.props.updateIsLogOut(false);
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <Container>
        <Content>
          <ScrollView>
            <Header title={strings.settings.title} />
            <Content>
              <View style={styles.section2}>
                <Button
                  block
                  rounded
                  style={styles.button}
                  onPress={() => Actions.profile()}
                >
                  <Text>{strings.settings.editProfile}</Text>
                </Button>
                {/* <Button
                block
                rounded
                style={styles.button}
                onPress={() => Actions.profile()}
              >
                <Text>Connect To Social Media</Text>
              </Button> */}
                <Button
                  block
                  rounded
                  style={styles.button}
                  onPress={() => { this.setModalVisible(true); }}
                >
                  <Text>{strings.settings.codeConduct}</Text>
                </Button>
                <Button
                  block
                  light
                  rounded
                  style={styles.button}
                  onPress={() => { this.props.logOut(); }}
                >
                  <Text>{strings.settings.logout}</Text>
                </Button>
              </View>
              <View style={{ marginTop: 22 }}>
                <Modal
                  animationType="fade"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => { this.setModalVisible(!this.state.modalVisible); }}
                >
                  <ScrollView>
                    <View style={{ marginTop: 22, marginLeft: 22, marginRight: 22, marginBottom: 22 }}>
                      <View>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#000', fontWeight: 'bold' }}>Code of Conduct :</Text>
                        <Text />
                        <Text style={{ fontSize: 16, textAlign: 'left', color: '#000' }}>DevSummit is a tech event intended for networking and collaboration in the tech community. We value the participation of each member and want all attendees to have a meaningful and memorable experience.</Text>
                        <Text />
                        <Text style={{ fontSize: 16, textAlign: 'left', color: '#000' }}>All attendees are expected to show respect and courtesy to other attendees throughout all events hosted in the Sabuga, Bandung, Indonesia. To make clear what is expected, all attendees, speakers, exhibitors, organizers, and volunteers at any event in the Sabuga, Bandung, Indonesia are required to conform to the following Code of Conduct. Organizers will enforce this code throughout the event.</Text>
                        <Text />
                        <Text style={{ fontSize: 16, textAlign: 'left', color: '#000' }}>DevSummit is dedicated to providing a harassment-free event experience for everyone, regardless of gender, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of event participants in any form, nor do we tolerate any behavior that would reasonably lead to another event participant being made to feel unsafe, insecure, or frightened for their physical or emotional well-being.</Text>
                        <Text />
                        <Text style={{ fontSize: 16, textAlign: 'left', color: '#000' }}>All communication should be appropriate for a professional audience including people of many different backgrounds. Sexual language and imagery is not appropriate for any presentation given in the Sabuga, Bandung, Indonesia or in any presentation associated with or related to DevSummit. Be kind to others. Do not insult or put down other attendees.</Text>
                        <Text />
                        <Text style={{ fontSize: 16, textAlign: 'left', color: '#000' }}>Each event guest is entirely responsible for his or her own actions.</Text>
                        <Text />
                        <Text style={{ fontSize: 16, textAlign: 'left', color: '#000' }}>Attendees violating these rules will be asked to leave the event at the sole discretion of the event managers.</Text>
                        <Text />
                        <Text style={{ fontSize: 16, textAlign: 'center', color: '#000', fontWeight: 'bold' }}>Thank you for your participation.</Text>
                        <Button
                          primary
                          style={styles.btnModal}
                          onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                          }}
                        >
                          <Text style={{ color: '#FFF' }}>{strings.global.back}</Text>
                        </Button>
                      </View>
                    </View>
                  </ScrollView>
                </Modal>
              </View>
            </Content>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  isLogOut: selectors.getIsLogOut()
});

export default connect(mapStateToProps, actions)(Settings);
