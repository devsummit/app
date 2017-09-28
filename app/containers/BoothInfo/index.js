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
import { View, Alert, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
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
    // this.renderRow = this.renderRow.bind(this);
    this.state = {
      id: null
    };
  }

  componentWillMount() {
    getBoothData()
      .then((boothData) => {
        if (boothData) {
          this.handleUpdateBoothPhoto(boothData.logo_url);
        }
      });

    AsyncStorage.getItem('role_id')
      .then((roleId) => {
        const id = JSON.parse(roleId);
        this.setState({ id });
      }).catch(() => console.log('Error'));

    this.props.fetchBoothInfo();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isBoothPhotoUpdated !== this.props.isBoothPhotoUpdated) {
      Alert.alert(strings.global.success, strings.booth.imageChanged);
      this.props.updateIsBoothPhotoUpdated(false);
    }
  }

  handleUpdateBoothPhoto = (value) => {
    this.props.updateBoothPhoto(value);
  }

  changeLogo = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true
    })
      .then((image) => {
        this.props.updateImage(image);
      }).catch(err => console.log(strings.booth.errorImage, err));
  }


  uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
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
        <Image
          style={styles.boothImageList}
          source={{ uri: images.url }}
        />
      </View>
    )
  }

  render() {
    const booth = this.state.id === 3;
    const { fields, summary, user, boothGalleries, boothPhoto, photo } = this.props || {};
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
                    source={{ uri: photo }}
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
                /> : <View />}
            </View>
          </Content>
        </ScrollView>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.uploadImage(this)}
        >
          <Icon name="upload" />
        </Fab>
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
