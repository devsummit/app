import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Footer, CardItem, Spinner } from 'native-base';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import strings from '../../localization';
import Input from '../../components/InputItem';
import styles from './style';
import * as selectors from './selectors';
import * as actions from './actions';

class CommentList extends Component {
  state = {
    text: ''
  };

  componentWillMount() {
    this.props.fetchCommentList(this.props.data.id);
  }

  handleInputChange = (text) => {
    this.props.updateComment(text);
  };

  render() {
    const { comments, data, text, isFetching, isSubmitting, isFetchingMore, links } = this.props;
    return (
      <View style={styles.container}>
        <CardItem style={styles.card}>
          <View>
            <View style={styles.post}>
              <View style={styles.profileSection}>
                <Image style={styles.profilePic} source={{ uri: data.user.photos[0].url }} />
              </View>
              <View style={styles.nameSection}>
                <Text style={styles.name}>
                  {data.user.first_name} {data.user.last_name}
                </Text>
                <Text style={styles.text}>
                  {data.message}
                </Text>
              </View>
            </View>
            {data.attachment ?
              <Image
                source={{ uri: data.attachment }}
                style={styles.images}
              /> : <View />
            }
          </View>
        </CardItem>
        {isFetching ?
          <Spinner style={{ flex: 1 }} color="#FF8B00" /> :
          <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
            <View style={styles.content}>
              {this.props.comments.map(item => (
                <View style={{ flex: 1 }}>
                  <View style={styles.commentWrapper} key={data.id}>
                    <View style={styles.profileSection}>
                      <Image style={styles.profilePic} source={{ uri: item.user.photos[0].url }} />
                    </View>
                    <View style={styles.nameSection}>
                      <Text style={styles.name}>
                        {item.user.first_name} {item.user.last_name}
                      </Text>
                      <Text style={styles.text}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
              {links.next !== null ?
                <Text
                  onPress={() => this.props.fetchMoreComments()}
                  style={styles.moreComments}
                >
                    View older comments
                </Text> : <View />
              }
              {isFetchingMore ? <ActivityIndicator color="#FF8B00" size="small" /> : <View />}
            </View>
          </ScrollView>
        }
        <Footer style={{ height: 50, backgroundColor: '#FFFFFF' }}>
          <Input
            itemStyle={styles.item}
            style={styles.input}
            title={strings.comment.comment}
            placeholder={strings.comment.comment}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={(text) => {
              this.handleInputChange(text);
            }}
            value={text}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.submitComment(data.id);
              this.handleInputChange('');
            }}
          >
            {isSubmitting ?
              <ActivityIndicator color="#FFFFFF" size="small" /> :
              <Icon name="paper-plane" style={{ fontSize: 20, color: '#FFFFFF' }} />
            }
          </TouchableOpacity>
        </Footer>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  comments: selectors.getListComments(),
  isFetching: selectors.getIsFetchingComments(),
  isSubmitting: selectors.getIsSubmittingComment(),
  text: selectors.getIsComments(),
  isFetchingMore: selectors.getIsFetchingMoreComments(),
  links: selectors.getNextLinks()
});
export default connect(mapStateToProps, actions)(CommentList);
