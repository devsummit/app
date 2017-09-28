import React, { Component } from 'react';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { View, ScrollView } from 'react-native';
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
                  onPress={() => Actions.codeConduct()}
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
