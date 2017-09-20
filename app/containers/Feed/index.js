import React, { Component } from 'react';
import {
  Container,
  Content,
  ListItem,
  Button,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Item,
  Thumbnail,
  Input,
  Label,
  Spinner,
  Icon
} from 'native-base';
import PropTypes from 'prop-types';
import { RefreshControl, View, Image } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {PRIMARYCOLOR} from '../../constants';
import HeaderPoint from '../../components/Header';
import * as actions from './actions';
import * as selectors from './selectors';

import TicketList from '../TicketList';

/**
 * Map redux state to component props
 */
const mapStateToProps = () => createStructuredSelector({
  isFetching: selectors.getIsFetchingFeeds(),
  feeds: selectors.getFetchFeeds(),
  isPosting: selectors.getIsPostingFeed(),
  postFeed: selectors.getPostFeed()
});

class Feed extends Component {

  componentWillMount() {
    this.props.fetchFeeds();
  }

  render() {
    return (
      <Container
        style={styles.container}
      >
      <Content>
        <HeaderPoint title="FEED" />
        <Tabs style={styles.tabs}>
          <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>News feed</Text></TabHeading>}>
            <Card style={{flex: 0, marginRight: 10, marginLeft: 8, borderRadius: 3}}>
              <CardItem>
                <Left>
                    <Thumbnail source={{ uri: 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-64.png' }} />
                    <Body>
                    <Text>{ 'Kris' }</Text>
                    <Text note>Feed title</Text>
                    </Body>
                </Left>
              </CardItem>

              <CardItem>
                <Body>
                    <Item regular>
                        <Input
                            rounded
                            placeholder={"Share your activity ..."}
                            multiline={true}
                            numberOfLines={4}
                            value={ '' }
                            disabled={ false }
                            onChangeText={ (text) => {} }
                        />
                    </Item>
                </Body>
              </CardItem>

              <CardItem>
                <Body>
                    <Item fixedLabel>

                    </Item>
                </Body>
                <Right>
                    <Button rounded primary bordered textStyle={{color: '#87838B'}} onPress={ () => {} }>
                        <Text style={{ textAlign: 'center'}}>{ "Post" }</Text>
                    </Button>
                </Right>
              </CardItem>

              {
                this.props.isFetching
                  ? <Spinner color="yellow"/>
                  :
                      this.props.feeds && this.props.feeds.map((feed, index) => {
                        return (
                          <Card style={{flex: 0}} key={index}>
                            <CardItem>
                              <Left>
                                <Thumbnail source={{ uri: feed.user.photos[0].url }} />
                                <Body>
                                  <Text>{ feed.user.username }</Text>
                                  <Text note>{ feed.created_at }</Text>
                                </Body>
                              </Left>
                            </CardItem>
                            <CardItem>
                              <Body>
                                <Image source={{uri: feed.attachment }} style={{height: 200, width: 200, flex: 1}}/>
                                <Text>
                                { feed.message }
                                </Text>
                              </Body>
                            </CardItem>
                            <CardItem>
                              <Left>
                                <Button transparent textStyle={{color: '#87838B'}}>
                                  <Icon name="logo-github" />
                                  <Text>Share</Text>
                                </Button>
                              </Left>
                            </CardItem>
                          </Card>
                        )
                      })

              }

            </Card>
          </Tab>


          <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Ticket</Text></TabHeading>}>
            <TicketList />
          </Tab>

        </Tabs>
      </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, actions)(Feed);
