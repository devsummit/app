import React, { Component } from 'react';
import {
  Container,
  Content,
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
        <Content style={styles.content}>
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
                                <Text style={styles.summary}>
                                {data.summary}
                                </Text>
                            </View>
                        </View>
                    </Body>
                </CardItem>
            </Card>
        </Content>
      </Container>
    )
  }
}

export default Speaker;
