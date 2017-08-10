import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  List,
  ListItem,
  Picker,
  Item,
  Label,
  Input,
  Button,
  Text,
  Title,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View, StyleSheet, Alert, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Header from '../../components/Header';
import styles from './styles';
const speakers = [
  {
    id: 1,
    profile_picture:'https://s-media-cache-ak0.pinimg.com/736x/bc/f0/4e/bcf04eafebdf707b8d900f02e6d8bd70--photo-tag-touch-me.jpg',
    full_name:'Elon Musk',
    job:'CEO of SpaceX, Tesla',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  },
  {
    id: 2,
    profile_picture:'https://s-media-cache-ak0.pinimg.com/736x/bc/f0/4e/bcf04eafebdf707b8d900f02e6d8bd70--photo-tag-touch-me.jpg',
    full_name:'Elon Musk',
    job:'CEO of SpaceX, Tesla',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  },
  {
    id: 3,
    profile_picture:'https://s-media-cache-ak0.pinimg.com/736x/bc/f0/4e/bcf04eafebdf707b8d900f02e6d8bd70--photo-tag-touch-me.jpg',
    full_name:'Elon Musk',
    job:'CEO of SpaceX, Tesla',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  },
  {
    id: 4,
    profile_picture:'https://s-media-cache-ak0.pinimg.com/736x/bc/f0/4e/bcf04eafebdf707b8d900f02e6d8bd70--photo-tag-touch-me.jpg',
    full_name:'Elon Musk',
    job:'CEO of SpaceX, Tesla',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  }
]

class Speaker extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: 'John',
      lastName: 'Doe',
    }
  }

  render(){
    return (
      <Container>
        <Header
            title="SPEAKER"
        >
        </Header>
        <Content style={styles.content}>
          {speakers.map(data => (
            <Card>
                <CardItem>
                    <Body>
                        <View style={styles.bodySection}>
                            <View style={styles.profileSection}>
                                <Image 
                                    style={styles.profilePic}
                                    source={{uri: data.profile_picture}}
                                />
                            </View>
                            <View style={styles.nameSection}>
                                <Text style={styles.name}>{data.full_name}</Text>
                                <Text style={styles.job}>{data.job}</Text>
                                <Text numberOfLines={3}
                                      style={styles.summary}
                                >
                                {data.summary}
                                </Text>
                            </View>
                        </View>
                    </Body>
                </CardItem>
                <CardItem footer style={styles.footerSection}>
                    <Button bordered style={styles.footerButton} onPress={() => {Actions.speaker_detail()}}>
                      <Text style={styles.footerButtonText}>See more</Text>
                    </Button>
                </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    )
  }
}

export default Speaker;
