import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {
  Container,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Item,
  Input
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import strings from '../../localization';
import * as actions from './actions';
import * as selectors from './selectors';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  onChangeText = (text) => {
    this.props.updateText(text);
  }

  uploadImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true
    })
      .then((image) => {
        this.props.updateImage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  takeImage = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true
    })
      .then((image) => {
        this.props.updateImage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  postFeed = () => {
    this.props.postFeeds(this.props.message, this.props.image);
  };

  render() {
    const { message, image } = this.props;
    return (
      <Container style={{ backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: this.props.profile }} />
            <Body>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>
                {this.props.firstName} {this.props.lastName}
              </Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem>
          <Item regular>
            <Input
              rounded
              placeholder={strings.feed.shareActivity}
              style={{ textAlignVertical: 'top' }}
              multiline
              numberOfLines={8}
              value={message}
              onChangeText={text => this.onChangeText(text)}
            />
          </Item>
        </CardItem>

        <CardItem>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableHighlight onPress={() => this.uploadImage(this)}>
              <View style={{ margin: 10 }}>
                <Icon name="image" size={24} color="grey" />
              </View>
            </TouchableHighlight>
            <TouchableOpacity onPress={() => this.takeImage(this)}>
              <View style={{ margin: 10 }}>
                <Icon name="camera" size={24} color="grey" />
              </View>
            </TouchableOpacity>
            {message !== '' ||
            (image && (image.path || image.sourceURL)) ?
              (
                <TouchableOpacity onPress={() => this.postFeed()}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'blue',
                      borderRadius: 20,
                      width: 75,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ textAlign: 'center', margin: 10, color: 'blue' }}>Post</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={1}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'grey',
                      borderRadius: 20,
                      width: 75,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ textAlign: 'center', margin: 10, color: 'grey' }}>
                    Post
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
          </View>
        </CardItem>
        {image &&
          (image.path || image.sourceURL) && (
            <CardItem cardBody>
              <Image
                source={{
                  uri: image.path || image.sourceURL
                }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
          )}
      </KeyboardAvoidingView>
    </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isPosting: selectors.getIsPostingFeed(),
  image: selectors.getUpdateImage(),
  message: selectors.getUpdateText()
});

export default connect(mapStateToProps, actions)(CreatePost);
