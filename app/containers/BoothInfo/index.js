import React, { Component } from 'react';
import {
  Content,
  Text,
  Grid,
  Col,
  Button,
  List,
  ListItem,
  CategoryCard,
  Fab
} from 'native-base';
import { View, Alert, ScrollView, TouchableOpacity, Image, AsyncStorage, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import PhotoGrid from 'react-native-photo-grid';
import { createStructuredSelector } from 'reselect';
import strings from '../../localization';
import { getBoothData } from '../../helpers';
import Header from '../../components/Header';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';


class BoothInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_user: null,
      imagePreview: '',
      modalVisible: false
    };
  }

  componentWillMount() {
    this.props.updateBoothPhoto(this.props.booth_photo);

    AsyncStorage.getItem('profile_data')
      .then((user) => {
        const logged_user = JSON.parse(user);
        this.setState({ logged_user });
      }).catch(() => console.log('Error'));
    this.props.fetchBoothInfo(this.props.booth_id);
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isBoothPhotoUpdated !== this.props.isBoothPhotoUpdated) {
      Alert.alert(strings.global.success, strings.booth.imageChanged);
      this.props.updateIsBoothPhotoUpdated(false);
    }
  }

  changeLogo = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true
    })
      .then((image) => {
        this.props.updateImage(image);
      }).catch(err => console.log(strings.booth.errorImage, err));
  }

  setModalVisible = (visible, image) => {
    this.setState({ modalVisible: visible, imagePreview: image });
  }

  uploadImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true
    })
      .then((image) => {
        this.props.uploadBoothImage(image);
      }).catch(err => console.log(strings.booth.errorImage, err));
  }

  renderItem = (images) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.setModalVisible(true, images.url) }>
          <Image
            style={styles.boothImageList}
            source={{ uri: images.url }}
          />
        </TouchableOpacity>
      </View>
    );
  }


  render() {
    const { logged_user } = this.state || {};
    const { role_id, id } = logged_user || {};
    const booth = role_id === 3;
    const logged_uid = id || null;
    const { fields, summary, user, boothGalleries, boothPhoto} = this.props || {};
    const {
      photoPic
    } = fields || '';
    const images = boothGalleries.data;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Content>
            <LinearGradient
              colors={[ '#f72d48', '#f39e21' ]}
            >
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  disabled={!booth}
                  onPress={() => this.changeLogo(this)}
                >
                  <Image
                    source={{ uri: boothPhoto }}
                    style={styles.boothImage}
                  />
                </TouchableOpacity>
                <View style={styles.info}>
                  <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
                  <Text style={styles.summary}>{summary}</Text>
                </View>
              </View>
            </LinearGradient>
            <View>
              { images ?
                <PhotoGrid
                  data={images}
                  itemsPerRow={2}
                  itemMargin={1}
                  renderItem={this.renderItem}
                />
                :
                <View />}
            </View>
          </Content>
        </ScrollView>
        {
          booth && logged_uid === user.id ?
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.uploadImage(this)}>
              <Icon name="upload" />
            </Fab> : <View></View>
        }
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
        >
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#080808' }}>
            <View style={{ flex: 1, margin: 10 }}>
              <Image source={{ uri: this.state.imagePreview }} resizeMode={'contain'} style={{ flex: 1 }} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isBoothPhotoUpdated: selectors.getIsBoothPhotoUpdated(),
  isBoothGalleryUpdated: selectors.getIsBoothGalleryUpdated(),
  boothPhoto: selectors.getBoothPhoto(),
  boothGalleries: selectors.getBoothGalleries()
});

export default connect(mapStateToProps, actions)(BoothInfo);
