import React, { Component } from 'react';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { View, Alert, Image, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';

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
  state = {
    id: 4
  }
  componentWillMount() {
    getProfileData().then((profileData) => {
      if (profileData) {
        this.handleUpdateAvatar(profileData.photos[0].url);
        this.handleInputChange('username', profileData.username);
        this.handleInputChange('firstName', profileData.first_name);
        this.handleInputChange('lastName', profileData.last_name);
        this.handleInputChange('boothInfo', profileData.booth_info);
        this.handleInputChange('job', profileData.job);
      }
    });
    AsyncStorage.getItem('role_id')
      .then((roleId) => {
        const id = JSON.parse(roleId);
        console.log(id);
        this.setState({ id:4 }).catch(err => console.log('error', err));
      }).catch(e => console.log('Error'));
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isProfileUpdated !== this.props.isProfileUpdated) {
      Alert.alert('Success', 'Profile has been changed');
      this.props.updateIsProfileUpdated(false);
    }

    if (prevProps.isAvatarUpdated !== this.props.isAvatarUpdated) {
      Alert.alert('Success', 'Avatar has been changed');
      this.props.updateIsAvatarUpdated(false);
    }

    if (prevProps.isLogOut !== this.props.isLogOut) {
      Actions.main();
      this.props.updateIsLogOut(false);
    }
  }

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  }

  handleUpdateAvatar = (value) => {
    this.props.updateAvatar(value);
  }

  uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then((image) => {
      this.props.updateImage(image);
    }).catch(err => console.log('Error getting image from library', err));
  }

  render() {
    // destructure state
    const booth = this.state.id === 3;
    const speaker = this.state.id === 4;
    const { fields, isDisabled, avatar, errorFields } = this.props || {};
    const {
      firstName,
      lastName,
      boothInfo,
      username,
      profilePic,
      job
    } = fields || '';

    return (
      <ScrollView>
        <Header title="PROFILE" />
        <TouchableOpacity style={styles.imageProfile} onPress={() => this.uploadImage(this)}>
          <Image
            source={{ uri: avatar }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
        <Content>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => { this.props.disabled(); }}>
            <Icon name={'edit'} size={24} color={isDisabled ? '#3F51B5' : '#BDBDBD'} />
          </TouchableOpacity>
          <View style={styles.section2}>
            <InputItem
              style={styles.input}
              title="First Name"
              placeholder="First Name"
              disabled={!!isDisabled}
              onChangeText={(text) => { this.handleInputChange('firstName', text); }}
              value={firstName}
            />
            <InputItem
              style={styles.input}
              title="Last Name"
              placeholder="Last Name"
              disabled={!!isDisabled}
              onChangeText={(text) => { this.handleInputChange('lastName', text); }}
              value={lastName}
            />
            {speaker ? <InputItem
              style={styles.inputInfo}
              title="Job"
              placeholder="Job"
              disabled={!!isDisabled}
              onChangeText={(text) => { this.handleInputChange('Job', text); }}
              value={job}
              maxLength={255}
              multiline
            />
            : <View />}
            {speaker ? <InputItem
              style={styles.inputInfo}
              title="Job"
              placeholder="Job"
              disabled={!!isDisabled}
              onChangeText={(text) => { this.handleInputChange('Job', text); }}
              value={job}
              maxLength={255}
              multiline
            />
            : <View />}
            {booth ? <InputItem
              style={styles.inputInfo}
              title="Booth Info"
              placeholder="Booth Info"
              disabled={!!isDisabled}
              onChangeText={(text) => { this.handleInputChange('boothInfo', text); }}
              value={boothInfo}
              maxLength={255}
              multiline
            /> : <View />}
            <Button transparent style={styles.buttonChangePass} onPress={() => { Actions.changePassword(); }}>
              <Text style={styles.changePassText}>Change Password</Text>
            </Button>
            <Button
              block
              rounded
              disabled={this.props.firstName === ''}
              style={styles.button}
              onPress={() => this.props.changeProfile()}
            >
              <Text>Save changes</Text>
            </Button>
            <Button
              block
              light
              rounded
              style={styles.button}
              onPress={() => { this.props.logOut(); }}
            >
              <Text>Log Out</Text>
            </Button>
          </View>
        </Content>
      </ScrollView>
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
  isLogOut: selectors.getIsLogOut()
});

export default connect(mapStateToProps, actions)(Profile);
