import React, { Component } from 'react';
import { Container, Content, Text, Spinner } from 'native-base';
import {
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
  WebView,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getProfileData } from '../../helpers';
import strings from '../../localization';
import Button from '../../components/Button';
import Header from '../../components/Header';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';
import { FEEDBACK_URL } from '../../constants';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      id: null,
      modalVisible: false,
      firstName: '',
      lastName: '',
      photo: null
    };
  }
  componentWillMount() {
    getProfileData().then((profileData) => {
      if (profileData) {
        this.handleInputChange('username', profileData.username);
        this.handleInputChange('firstName', profileData.first_name);
        this.handleInputChange('lastName', profileData.last_name);
        this.handleUpdateAvatar(profileData.photos[0].url);
        if (profileData.role_id === 3) {
          this.handleInputChange('boothInfo', profileData.booth.summary);
        }
        if (profileData.role_id === 4) {
          this.handleInputChange('job', profileData.speaker.job);
          this.handleInputChange('summary', profileData.speaker.summary);
        }
      }
    });
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

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  };

  handleUpdateAvatar = (value) => {
    this.props.updateAvatar(value);
  };

  render() {
    const { fields, isDisabled, avatar, errorFields, isLoading } = this.props || {};
    const { firstName, lastName, username, boothInfo, job, summary, profilePic } = fields || '';
    return (
      <Container>
        <Content>
          <ScrollView>
            <Header title={strings.settings.title} />
            <Content>
              <View style={styles.section2}>
                <TouchableWithoutFeedback onPress={() => Actions.profile()}>
                  <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Image
                      source={{ uri: avatar }}
                      style={{ width: 70, height: 70, borderRadius: 35 }}
                    />
                    <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                      <Text>
                        {firstName} {lastName}
                      </Text>
                      <Text style={{ color: '#BDBDBD' }}>{username}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <View style={{ borderColor: '#BDBDBD', borderWidth: 0.5, marginBottom: 20 }} />
                <Button block style={styles.button} onPress={() => Actions.codeConduct()}>
                  <Text>{strings.settings.codeConduct}</Text>
                </Button>
                <Button block style={styles.button} onPress={() => Actions.privacyPolicy()}>
                  <Text>{strings.settings.privacyPolicy}</Text>
                </Button>
                <Button block style={styles.button} onPress={() => this.setModalVisible(true)}>
                  <Text>{strings.settings.feedback}</Text>
                </Button>
                <Button
                  block
                  style={[ styles.button, { backgroundColor: '#BDBDBD' } ]}
                  onPress={() => {
                    this.props.logOut();
                  }}
                >
                  {isLoading ? <Spinner color="#FFFFFF" /> : <Text>{strings.settings.logout}</Text>}
                </Button>
              </View>
            </Content>
          </ScrollView>
          <Modal
            animationType={'slide'}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.modal}>
                <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                  <Icon
                    name={'ios-arrow-dropleft'}
                    size={24}
                    color={'black'}
                    style={{ padding: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <WebView
                automaticallyAdjustContentInsets={false}
                source={{ uri: FEEDBACK_URL }}
                style={{ marginTop: 20 }}
                scalesPageToFit
                ref={'webview'}
                decelerationRate="normal"
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
              />
            </View>
          </Modal>
        </Content>
      </Container>
    );
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isProfileUpdated: selectors.getIsProfileUpdated(),
  avatar: selectors.getAvatar(),
  isAvatarUpdated: selectors.getIsAvatarUpdated(),
  isDisabled: selectors.getIsDisabled(),
  isLoading: selectors.getIsLoading(),
  isLogOut: selectors.getIsLogOut()
});

export default connect(mapStateToProps, actions)(Settings);
