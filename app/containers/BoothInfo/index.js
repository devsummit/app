import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Grid,
  Col
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
import LinearGradient from 'react-native-linear-gradient';

import * as actions from './actions';
import * as selectors from './selectors';

class BoothInfo extends Component {
  state = {
    id: null
  }

  componentWillMount() {
    AsyncStorage.getItem('role_id')
      .then((roleId) => {
        const id = JSON.parse(roleId);
        this.setState({ id });
      }).catch(() => console.log('Error'));
  }

  render() {
    const booth = this.state.id === 3;
    const { fields, avatar } = this.props || {};
    const {
      name,
      boothInfo
    } = fields || '';

    return (
      <ScrollView>
        {booth ? <Header title="BOOTH INFO" /> : <View />}
        <Content>
          <LinearGradient
            colors={[ '#f72d48', '#f39e21' ]}
          ><Image
              source={{ uri: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg' }}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <View style={styles.topView}>
              <Text style={styles.boldedText}>Booth One</Text>
              <Text style={styles.descText}>This one is a very descriptive description about Booth description</Text>
            </View>
          </LinearGradient>
          <Grid style={{ flex: 1 }}>
            <Col style={styles.col1} />
            <Col style={styles.col2} />
            <Col style={styles.col3} />
          </Grid>
          <Grid style={{ flex: 1 }}>
            <Col style={styles.col3} />
            <Col style={styles.col1} />
            <Col style={styles.col2} />
          </Grid>
          <Grid style={{ flex: 1 }}>
            <Col style={styles.col1} />
            <Col style={styles.col2} />
            <Col style={styles.col3} />
          </Grid>
          <Grid style={{ flex: 1 }}>
            <Col style={styles.col3} />
            <Col style={styles.col1} />
            <Col style={styles.col2} />
          </Grid>
          {booth ? <Button warning style={{ width: '100%', justifyContent: 'center' }} onClick={() => Actions.boothList()}><Text>Save</Text></Button> : <View />}
        </Content>
      </ScrollView>
    );
  }
}
/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  // avatar: selectors.getAvatar()
});

export default connect(mapStateToProps, actions)(BoothInfo);
