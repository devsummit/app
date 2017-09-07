import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View, StyleSheet, Alert, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';

class Speaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'John',
      lastName: 'Doe'
    };
  }

  componentWillMount() {
    this.props.fetchSpeakerList();
  }


  render() {
    return (
      <Container>
        <Header title="SPEAKER" />
        <Content style={styles.content}>
          {this.props.speaker.map(data => (
            <Card key={data.id}>
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
                      <Text numberOfLines={3} style={styles.summary} >
                        {data.summary}
                      </Text>
                    </View>
                  </View>
                </Body>
              </CardItem>
              <CardItem footer style={styles.footerSection}>
                <Button
                  bordered
                  style={styles.footerButton}
                  onPress={() => {
                    Actions.speakerDetail({
                      profilePicture: data.profile_picture,
                      nameTitle: data.full_name,
                      job: data.job,
                      summary: data.summary
                    });
                  }}
                >
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

const mapStateToProps = createStructuredSelector({
  speaker: selectors.getListSpeaker()
})
export default connect(mapStateToProps, actions)(Speaker);
