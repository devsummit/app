import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Grid,
  Col,
  Button,
  List,
  ListItem,
  CategoryCard,
  Fab,
  Tabs,
  Tab,
  TabHeading
} from 'native-base';
import { View, Alert, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image, AsyncStorage, Modal, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import CloseO from 'react-native-vector-icons/EvilIcons';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import PhotoGrid from 'react-native-photo-grid';
import { createStructuredSelector } from 'reselect';
import strings from '../../localization';
import { getVisitedRoomId, setVisitedRoomId, getBoothData, addRoomParticipant, getUserRoomList, getProfileData } from '../../helpers';
import Header from '../../components/Header';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

const background = require('./../../../assets/images/background.png');
const noImage = require('./../../../assets/images/noimage.png');


class BoothInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fabActive: false,
      logged_user: null,
      imagePreview: '',
      modalVisible: false,
      room_id: null,
      mainRoom: null
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
    this.getBoothRoom().then(() => {
      getVisitedRoomId().then((rooms) => {
        const { props: { mainRoom, fabVisible } } = this;
        if (rooms.includes(mainRoom.room_id)) {
          this.props.updateFabVisible(!fabVisible);
        }
      });
    });
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isBoothPhotoUpdated !== this.props.isBoothPhotoUpdated) {
      Alert.alert(strings.global.success, strings.booth.imageChanged);
      this.props.updateIsBoothPhotoUpdated(false);
    }
  }


  getBoothRoom = async () => {
    const { props: { user: { email: boothEmail }, title: boothName } } = this;
    const rooms = await getUserRoomList(boothEmail);
    const mainRoom = await rooms.filter(room => room.room_name === boothName)[0];
    this.props.updateMainRoom(mainRoom);
  };

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

  userVisitedThisBooth = async () => {
    const { props: { mainRoom, fabActive } } = this;
    const qiscusRoomId = mainRoom.room_id;
    this.props.userVisitedThisBooth(qiscusRoomId, !fabActive);
  };

  addUserToBoothRoom = async () => {
    const data = await getProfileData();
    const { email: userEmail } = data;
    const { state: { mainRoom } } = this;
    const addUserToRoom = await addRoomParticipant([ userEmail ], mainRoom.room_id_str);
    const room = addUserToRoom.results;
    Actions.chat({
      goto: room
    });
  };

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

   // load chat room
  loadChatRoom = () => {
    this.setState({ fabActive: false });

    // go to chatroom
  }

  renderItem = (images) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.setModalVisible(true, images.url)}>
        <Image
          style={styles.boothImageList}
          source={{ uri: images.url }}
        />
      </TouchableWithoutFeedback>
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
      <View style={{ flex: 1, backgroundColor: '#E0E0E0' }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Image style={styles.imgback} source={{ uri: boothPhoto }}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <TouchableOpacity
                  disabled={!booth}
                  onPress={() => this.changeLogo(this)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Image
                    source={{ uri: boothPhoto }}
                    style={styles.boothImage}
                  />
                </TouchableOpacity>
              </View>
            </Image>
            <Tabs initialPage={0} style={{ backgroundColor: '#E0E0E0' }}>
              <Tab style={{ backgroundColor: '#E0E0E0' }} heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Profile</Text></TabHeading>}>
                <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#FFFFFF' }}>
                  <Text style={styles.summary}>{summary}</Text>
                </View>
              </Tab>
              <Tab style={{ backgroundColor: '#E0E0E0' }} heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Gallery</Text></TabHeading>}>
                { images && images.length > 0 ?
                  <View style={styles.imageWrapper}>
                    <PhotoGrid
                      data={images}
                      itemsPerRow={2}
                      renderItem={this.renderItem}
                    />
                  </View>
                  :
                  <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={noImage} />
                    <Text style={styles.artworkText}>No picture available</Text>
                  </View>
                }
              </Tab>
            </Tabs>
          </View>
        </ScrollView>
        {
          booth && logged_uid === user.id ?
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.uploadImage(this)}
            >
              <Icon name="upload" />
            </Fab> : <View />
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
            {Platform === 'ios' ? (
              <CloseO
                size={30}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                name="close-o"
                style={{
                  flex: 0,
                  flexDirection: 'column',
                  backgroundColor: '#b8d8d8',
                  alignItems: 'center'
                }}
              />
            ) : null}
          </View>
        </Modal>
        { this.props.fabVisible && (
          <Container>
            <View style={{ flex: 1 }}>
              <Fab
                direction="up"
                style={{ backgroundColor: '#f39e21' }}
                onPress={() => this.addUserToBoothRoom()}
              >
                <Icon name="commenting" />
              </Fab>
            </View>
          </Container>
        )}
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isBoothPhotoUpdated: selectors.getIsBoothPhotoUpdated(),
  isBoothGalleryUpdated: selectors.getIsBoothGalleryUpdated(),
  boothPhoto: selectors.getBoothPhoto(),
  boothGalleries: selectors.getBoothGalleries(),
  mainRoom: selectors.getMainRoom(),
  fabVisible: selectors.getFabVisible()
});

export default connect(mapStateToProps, actions)(BoothInfo);
