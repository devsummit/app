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
  Fab
} from 'native-base';
import { Alert, ActivityIndicator, View, Image, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, Modal, ScrollView, Dimensions } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import HeaderPoint from '../../components/Header';
import ModalComponent from '../../components/ModalComponent';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';
import { PRIMARYCOLOR } from '../../constants'
import { formatDate } from '../../helpers'
let ScreenHeight = Dimensions.get("window").height;

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
    return (
      <View style={styles.container}>
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
                  <Card key={data.id}>
                    <CardItem style={{ margin: 5 }}>
                      <Body>
                        <View style={styles.bodySection}>
                          <View style={styles.mainMessage}>
                            <Text style={styles.title}>{data.type.toUpperCase()}</Text>
                            <View style={styles.separator} />
                            <Text style={styles.content}>{data.message}</Text>
                            <Text style={{ color: PRIMARYCOLOR }}>{formatDate(data.created_at)}</Text>
                          </View>
                          <Right style={{ flex: 1 }}>
                            <Text style={styles.sender}>{data.sender.first_name}</Text>
                          </Right>
                        </View>
                      </Body>
                    </CardItem>
                  </Card>
                ))}
                {
                  this.props.isFetching
                    ? <ActivityIndicator size="large" color={PRIMARYCOLOR} />
                    : <View />
                }
              </Content>
            </ScrollView> :
            this.props.isFetching
              ? <ActivityIndicator size="large" color={PRIMARYCOLOR} />
              :
              <View style={{ flex: 1, height: ScreenHeight, backgroundColor: PRIMARYCOLOR, alignItems:'center', justifyContent:'center'}}>
                <Icon name={'bell-slash-o'} color={'#fff'} style={styles.icon} />
                <Text style={{ color: 'white', fontWeight: 'bold' }}> NO NOTIFICATIONS </Text>
              </View>
        }

      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetching: selectors.getIsFetchingNotification(),
  notifications: selectors.getNotification()
});
export default connect(mapStateToProps, actions)(Notification);
