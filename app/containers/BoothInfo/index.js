import React, { Component } from 'react';
import {
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
import LinearGradient from 'react-native-linear-gradient';

import Header from '../../components/Header';
import styles from './styles';

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
    console.log('landing here', this.props);
    const booth = this.state.id === 3;
    const { summary, user } = this.props;

    return (
      <ScrollView>
        <Content>
          <LinearGradient
            colors={[ '#f72d48', '#f39e21' ]}
          >
            <Image
              source={{ uri: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg' }}
              style={styles.boothImage}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
              <Text style={styles.summary}>{summary}</Text>
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
        </Content>
      </ScrollView>
    );
  }
}

export default BoothInfo;
