import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Button,
  Item,
  Icon,
  Input,
  Text,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View, StyleSheet, Alert, Image, KeyboardAvoidingView } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HeaderPoint from '../../components/Header';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';


class Speaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'John',
      lastName: 'Doe',
      speakerFilter: []
    };
  }

  componentWillMount() {
    this.props.fetchSpeakerList();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps && prevProps.speaker && this.props.speaker !== prevProps.speaker) {
      this.setState({
        speakerFilter: prevProps.speaker
      });
    }
  }


  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  handleFilter = (param) => {
    const filteredSpeaker = [];
    this.props.speaker.map((data) => {
      if (data.user.first_name.toLowerCase().includes(param.toLowerCase()) || data.user.last_name.toLowerCase().includes(param.toLowerCase())) {
        filteredSpeaker.push(data);
      }
    });
    this.setState({
      speakerFilter: filteredSpeaker
    });
  }

  render() {
    return (
      <Container>
        <HeaderPoint title="SPEAKER" />
        <Header searchBar style={styles.searchHeader} androidStatusBarColor="#f39e21">
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search speaker ..."
              onChangeText={text => this.handleFilter(text)}
            />
            <Icon name="ios-calendar" />
          </Item>
        </Header>
        <Content>
          {this.state.speakerFilter.map(data => (
            <Card key={data.id}>
              <CardItem>
                <Body>
                  <View style={styles.bodySection}>
                    <View style={styles.profileSection}>
                      <Image
                        style={styles.profilePic}
                        source={{ uri: data.profile_picture }}
                      />
                    </View>
                    <View style={styles.nameSection}>
                      <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
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

    );
  }
}

const mapStateToProps = createStructuredSelector({
  speaker: selectors.getListSpeaker()
});
export default connect(mapStateToProps, actions)(Speaker);
