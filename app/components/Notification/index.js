import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Button,
  Item,
  Input,
  Text,
  Label,
  Card,
  Right,
  Separator,
  CardItem,
  Body,
  Fab,
  List,
  ListItem,
  Left
} from 'native-base';
import { Alert, ActivityIndicator, View, Image, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, Modal, ScrollView, Dimensions } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import Moment from 'moment';

import HeaderPoint from '../../components/Header';
import strings from '../../localization';
import ModalComponent from '../../components/ModalComponent';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';
import { PRIMARYCOLOR } from '../../constants';
import { formatDate } from '../../helpers';

const noNotif = require('./../../../assets/images/nonotif.png');
const { height } = Dimensions.get('window');

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    this.props.fetchNotification();
  }

  handleSize = (width, height) => {
    if (this.scroll) {
      const position = this.scroll + height - this.height
      this.refs.sv.scrollTo({ x: 0, y: position, animated: false })
    }
    this.height = height
  }

  render() {
    const { notifications, fetchNextNotification } = this.props;
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };
    Moment.locale(strings.global.lang);
    return (
      <Container style={styles.container}>
        <View style={styles.view}>
          {
            notifications && notifications.length > 0 ?
              <ScrollView
                showsVerticalScrollIndicator={false}
                ref="sv"
                style={{ flex: 1 }}
                onContentSizeChange={this.handleSize}
                onScroll={({ nativeEvent }) => {
                  this.scroll = nativeEvent.contentOffset.y
                  if (isCloseToBottom(nativeEvent)) {
                    if (!this.props.isFetching) {
                      fetchNextNotification()
                    }
                  }
                }}
                scrollEventThrottle={400}>
                <Content>
                  {notifications.map(data => (
                    <List key={data.id}>
                      <ListItem avatar>
                        <Left/>
                        <Body>
                          <Text>{data.type.toUpperCase()}</Text>
                          <Text note>{data.message}</Text>
                        </Body>
                        <Right>
                          <Text note>{Moment(data.created_at).fromNow()}</Text>
                        </Right>
                      </ListItem>
                    </List>
                  ))}
                  {
                    this.props.isFetching
                      ? <ActivityIndicator size="large" color={PRIMARYCOLOR} style={{ marginTop: 20 }} />
                      : <View />
                  }
                </Content>
              </ScrollView> :
              this.props.isFetching
                ? <ActivityIndicator size="large" color={PRIMARYCOLOR} style={{ marginTop: 20 }} />
                :
                <View style={styles.artwork} >
                  <Image source={noNotif} style={{ opacity: 0.5 }} />
                  <Text style={styles.artworkText}>{strings.notification.noNotification}</Text>
                </View>
          }

        </View>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetching: selectors.getIsFetchingNotification(),
  notifications: selectors.getNotification()
});

export default connect(mapStateToProps, actions)(Notification);
