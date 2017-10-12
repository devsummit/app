import React, { Component } from 'react';
import { Container, Content, Text, Spinner, Item, Input, Header, Card, CardItem, Left, Thumbnail, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  View,
  Alert,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountKit, { LoginButton } from 'react-native-facebook-account-kit';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

import { createTransition, Fade } from 'react-native-transition';
import { getProfileEmail } from '../../helpers';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import AuthLogo from '../../components/AuthLogo';
import Button from '../../components/Button';
import ModalComponent from '../../components/ModalComponent';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

const Transition = createTransition(Fade);
const background = require('./../../../assets/images/background.png');

class Main extends Component {
  state = {
    modalVisible: true
  };

  componentWillMount() {
    this.configureAccountKit();
    getProfileEmail().then((profileEmail) => {
      if (profileEmail) {
        this.handleInputChange('username', profileEmail);
      } else {
        this.handleInputChange('username', '');
      }
    });
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      Actions.mainTabs();
      this.props.updateIsLogIn(false);
    }
    if (prevProps.isSubscribed !== this.props.isSubscribed) {
      Alert.alert('Success', 'You have been subscribed, we will send update to your email');
      this.props.updateIsSubscribed(false);
    }
  }

  onLoginMobile(token) {
    if (!token) {
      this.setState({});
    } else {
      AccountKit.getCurrentAccessToken().then((_token) => {
        this.props.loginMobile(_token.token);
      });
    }
  }

  onLogin = () => {
    this.props.login();
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  configureAccountKit = () => {
    AccountKit.configure({
      countryWhitelist: [ 'ID' ],
      defaultCountry: 'ID',
      initialPhoneCountryPrefix: '+62',
      initialPhoneNumber: ' '
    });
  };

  loginFacebook = () => {
    this.props.loginFacebook();
  };

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  };

  subscribeNewsletter = () => {
    Alert.alert('lala');
  };

  render() {
    const { fields, isLoading } = this.props;
    const { username, password, email } = fields || '';
    const visible = false;
    return (
      <Image style={styles.background} source={background}>
        <Container style={styles.container}>
          <StatusBar hidden />
          <AuthLogo style={styles.logo} />
          <Content>
            <KeyboardAvoidingView>
              <ScrollView>
                <View style={{marginTop: 22}}>
                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
                    >
                    <ScrollView>
                    <View style={{flex:1}}>
                    <IndicatorViewPager
                        style={{height:600}}
                        indicator={this._renderDotIndicator()}
                    >
                        <View style={{
                          backgroundColor:'black',
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'}}>
                            <Image source={{uri: 'http://media.nationalgeographic.co.id/daily/300/1:1/201609291242819/b/foto-planet-merkurius-kian-menyusut.jpg'}}
                               style={{width: 400, height: 400}} />
                            <Text style={{color: 'white', margin: 3, textAlign: 'center'}}>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </Text>
                            {/* <Text style={{color: 'white', textAlign: 'right'}}>#swipeable</Text> */}
                            <View style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            }}>
                              {/* <Button bordered primary style={{width: 350/3, height: 50}}><Text style={{textAlign: 'center'}}> PREV </Text></Button>
                              <Button bordered primary style={{width: 350/3, height: 50}}><Text style={{textAlign: 'center'}}> NEXT </Text></Button> */}
                              <Button 
                              full 
                              bordered 
                              primary 
                              style={{width: 350/3, height: 50}}
                              onPress={() => {
                                  this.setModalVisible(!this.state.modalVisible)
                                }}
                              ><Text style={{textAlign: 'center'}}> SKIP </Text></Button>
                            </View>
                        </View>
                        <View style={{
                          backgroundColor:'black',
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'}}>
                            <Image source={{uri: 'https://www.astronomiskungdom.se/wp-content/uploads/2017/01/venus-11022_960_720-300x300.jpg'}}
                               style={{width: 400, height: 400}} />
                               <Text style={{color: 'white', margin: 3, textAlign: 'center'}}>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text>
                            {/* <Text style={{color: 'white', textAlign: 'right'}}>#swipeable</Text> */}
                            <View style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            }}>
                              {/* <Button bordered primary style={{width: 350/3, height: 50}}><Text style={{textAlign: 'center'}}> PREV </Text></Button>
                              <Button bordered primary style={{width: 350/3, height: 50}}><Text style={{textAlign: 'center'}}> NEXT </Text></Button> */}
                              <Button 
                                full 
                                bordered 
                                primary 
                                style={{width: 350/3, height: 50}}
                                onPress={() => {
                                  this.setModalVisible(!this.state.modalVisible)
                                }}
                              ><Text style={{textAlign: 'center'}}> SKIP </Text></Button>
                            </View>
                        </View>
                        <View style={{
                          backgroundColor:'black',
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'}}>
                            <Image source={{uri: 'http://www.commongroundgroup.net/wp-content/uploads/2011/10/earth-from-space-western-400x400.jpg'}}
                               style={{width: 400, height: 400}} />
                               <Text style={{color: 'white', margin: 3, textAlign: 'center'}}>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </Text>
                            {/* <Text style={{color: 'white', textAlign: 'right'}}>#swipeable</Text> */}
                            <View style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            }}>
                              {/* <Button bordered primary style={{width: 350/3, height: 50}}><Text style={{textAlign: 'center'}}> PREV </Text></Button>
                              <Button bordered primary style={{width: 350/3, height: 50}}><Text style={{textAlign: 'center'}}> NEXT </Text></Button> */}
                              <Button 
                              full 
                              bordered 
                              primary 
                              style={{width: 350/3, height: 50}}
                              onPress={() => {
                                  this.setModalVisible(!this.state.modalVisible)
                                }}
                              ><Text style={{color: 'white', textAlign: 'center'}}> SKIP </Text></Button>
                            </View>
                        </View>
                    </IndicatorViewPager>
                  </View>
                  </ScrollView>
                  </Modal>

                  {/* <TouchableHighlight onPress={() => {
                    this.setModalVisible(true)
                  }}>
                    <Text>Show Modal</Text>
                  </TouchableHighlight> */}
                  
                </View>
                <View style={styles.formSection}>
                  <Item regular style={styles.item}>
                    <Input
                      style={styles.formInput}
                      placeholder="Username or Email"
                      placeholderTextColor={'#BDBDBD'}
                      keyboardType={'email-address'}
                      autoCapitalize={'none'}
                      onChangeText={usernameText =>
                        this.handleInputChange('username', usernameText)}
                      value={username}
                    />
                  </Item>
                  <Item regular style={styles.item}>
                    <Input
                      style={styles.formInput}
                      placeholder="Password"
                      placeholderTextColor={'#BDBDBD'}
                      secureTextEntry
                      onChangeText={passwordText =>
                        this.handleInputChange('password', passwordText)}
                      value={password}
                    />
                  </Item>
                </View>
                <View>
                  {username.length < 4 || password.length < 4 ? (
                    <Button
                      disabled
                      block
                      style={[ styles.button, { backgroundColor: 'rgba(0,0,0,0.3)' } ]}
                    >
                      <Text>Log In</Text>
                    </Button>
                  ) : (
                    <Button
                      primary
                      block
                      style={styles.button}
                      onPress={() => {
                        this.onLogin();
                      }}
                    >
                      {isLoading ? (
                        <ActivityIndicator size={'large'} color={'#FFFFFF'} />
                      ) : (
                        <Text>Log In</Text>
                      )}
                    </Button>
                  )}
                  <View style={styles.lineSection}>
                    <View style={styles.lineTextThree} />
                    <Text style={styles.lineTextFour}> or </Text>
                    <View style={styles.lineTextThree} />
                  </View>
                  <Button
                    style={[ styles.button, { backgroundColor: '#FFD740', margin: 12 } ]}
                    onPress={() => {
                      this.props.loginTwitter();
                    }}
                  >
                    <LoginButton
                      style={styles.buttonLoggin}
                      type="phone"
                      onLogin={token => this.onLoginMobile(token)}
                      onError={e => this.onLoginMobile(e)}
                      primary
                      block
                    >
                      <Icon name="phone" color="white" style={styles.icon} />
                      <Text style={styles.buttonText}>LOGIN WITH PHONE NUMBER</Text>
                    </LoginButton>
                  </Button>
                  <Button
                    transparent
                    style={styles.buttonRegister}
                    onPress={() => {
                      Actions.registerMenu();
                    }}
                  >
                    <View>
                      <Text style={styles.registerText}>{"Don't have an account?"}</Text>
                      <Text style={styles.registerTextBold}>Register</Text>
                    </View>
                  </Button>
                  {visible ? (
                    <Button
                      hidden
                      transparent
                      style={styles.buttonRegister}
                      onPress={() => {
                        this.setModalVisible();
                      }}
                    >
                      <Text style={styles.registerText}>Subscribe to Newsletter</Text>
                    </Button>
                  ) : (
                    <View />
                  )}
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Content>
        </Container>
      </Image>
    );
  }

_renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
}

}

Main.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  updateIsLogIn: PropTypes.func.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  updateIsSubscribed: PropTypes.func.isRequired,
  loginMobile: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginFacebook: PropTypes.func.isRequired,
  updateFields: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  subscribeNewsletter: PropTypes.func.isRequired,
  loginGoogle: PropTypes.func.isRequired,
  loginTwitter: PropTypes.func.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isSubscribed: selectors.getIsSubscribed(),
  isLoggedIn: selectors.getIsLoggedIn(),
  isLoading: selectors.getIsLoading()
  // @TODO please create the selectors function
  // profileData: selectors.getProfileData()
});

export default connect(mapStateToProps, actions)(Main);
