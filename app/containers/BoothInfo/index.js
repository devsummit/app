import React, { Component } from 'react';
import {
  Content,
  Text,
  Grid,
  Col,
  Button,
  List,
  ListItem,
  CategoryCard
} from 'native-base';
import { View, Alert, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { 
  GridRow, 
  Screen, 
  ListView, 
  Tile, 
  Title, 
  Subtitle, 
  Divider, 
  Card, 
  Caption 
} from '@shoutem/ui';
import Header from '../../components/Header';
import styles from './styles';



import * as actions from './actions';
import * as selectors from './selectors';

class BoothInfo extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      id : null,
      boothImages: [{
        "name": "Gaspar Brasserie",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      }, {
        "name": "Chalk Point Kitchen",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      }, {
        "name": "Gaspar Brasserie",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      }, {
        "name": "Gaspar Brasserie",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      }, {
        "name": "Chalk Point Kitchen",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      }, {
        "name": "Gaspar Brasserie",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      },{
        "name": "Chalk Point Kitchen",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      },{
        "name": "Gaspar Brasserie",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      }],
    }
  }

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow
    const cellViews = rowData.map((boothImage, id) => {
    return (
            <Image
              style={styles.boothImageList}
              source={{ uri: rowData[0].image.url  }}
            />
      );
    });
    return (
      <GridRow columns={3}>
        {cellViews}
      </GridRow>
    );
  }


  componentWillMount() {
    AsyncStorage.getItem('role_id')
      .then((roleId) => {
        const id = JSON.parse(roleId);
        this.setState({ id });
      }).catch(() => console.log('Error'));
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
    console.log('landing here', this.props);
    const booth = this.state.id === 3;
    const { summary, user } = this.props;
    let items = [ 'Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can' ];
    let isFirstArticle = true;
    console.log('landing here boothImages',this.state.boothImages);
    const groupedData = GridRow.groupByRows(this.state.boothImages, 3, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 1;
      }

      return 1;
    });
    return (
      <ScrollView>
        {booth ? <Header title="BOOTH INFO" /> : <View />}
        <Content>
          <LinearGradient
            colors={[ '#f72d48', '#f39e21' ]}
          >
            <Image
              source={{ uri: this.props.avatar }}
              style={styles.boothImage}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
              <Text style={styles.summary}>{summary}</Text>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end'
            }}
            >
              <Button
                bordered
                style={styles.footerButton}
                onPress={() => this.uploadImage(this)}
              >
                <Text style={styles.footerButtonText}>Upload Photo</Text>
              </Button>
            </View>
          </LinearGradient>
        </Content>
        <Screen>
          <ListView
            data={groupedData}
            renderRow={this.renderRow}
          />
        </Screen>
      </ScrollView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isProfileUpdated: selectors.getIsProfileUpdated(),
  avatar: selectors.getAvatar(),
  isAvatarUpdated: selectors.getIsAvatarUpdated(),
  isDisabled: selectors.getIsDisabled(),
  isLogOut: selectors.getIsLogOut()
});

export default connect(mapStateToProps, actions)(BoothInfo);

