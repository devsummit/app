import React, { Component } from 'react';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { View, StyleSheet, Alert, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getProfileData } from '../../helpers';
import InputItem from '../../components/InputItem';
import Button from '../../components/Button';
import Header from '../../components/Header';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

class Profile extends Component {
  componentWillMount() {
    getProfileData().then((profileData) => {
      if (profileData) {
        this.handleInputChange('username', profileData.username)
        this.handleInputChange('firstName', profileData.first_name)
        this.handleInputChange('lastName', profileData.last_name)

        if (profileData.url || profileData.url === '') {
          this.handleInputChange('profilePic', 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg')
        } else {
          this.handleInputChange('profilePic', profileData.url)
        }
      }
    })
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isProfileUpdated !== this.props.isProfileUpdated) {
      Alert.alert('Success', 'Profile changed');
      this.props.updateIsProfileUpdated(false)
    }

    if (prevProps.isLogOut !== this.props.isLogOut) {
      Actions.main()
      this.props.updateIsLogOut(false)
    }
  }

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  }

  render() {
    // destructure state
    const { fields, isDisabled } = this.props || {};
    const {
      firstName,
      lastName,
      username,
      profilePic
    } = fields || '';
    return (
      <Container>
        <Header
          title="PROFILE"
        >
          <View style={styles.section1}>
            <Image
              source={{ uri: profilePic }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
        </Header>
        <Content>
          <View style={styles.section3}>
            <Text style={styles.username}>{username}</Text>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => { this.props.disabled(); }}>
              <Icon name={'edit'} size={24} color={isDisabled ? '#3F51B5' : '#BDBDBD'} />
            </TouchableOpacity>
          </View>
          <View style={styles.section2}>
            <InputItem
              style={styles.input}
              title="First Name"
              disabled={isDisabled ? true : false}
              onChangeText={(text) => { this.handleInputChange('firstName', text) }}
              value={firstName}
            />
            <InputItem
              style={styles.input}
              title="Last Name"
              disabled={isDisabled ? true : false}
              onChangeText={(text) => {this.handleInputChange('lastName', text)}}
              value={lastName}
            />
            <Button transparent style={styles.buttonChangePass} onPress={() => { Actions.changePassword(); }}>
              <Text style={styles.changePassText}>Change Password</Text>
            </Button>
            <Button
              block
              disabled={ this.props.firstName === '' ? true : false }
              style={styles.button}
              onPress={() => this.props.changeProfile()}
            >
              <Text>Save changes</Text>
            </Button>
            <Button block light style={styles.button} onPress={() => { this.props.logOut() }}>
              <Text>Log Out</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isProfileUpdated: selectors.getIsProfileUpdated(),
  isDisabled: selectors.getIsDisabled(),
  isLogOut: selectors.getIsLogOut(),
});

export default connect(mapStateToProps, actions)(Profile);
