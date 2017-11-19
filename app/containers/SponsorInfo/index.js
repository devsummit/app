import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  Spinner,
  Card,
  CardItem,
  Body
} from 'native-base';
import { connect } from 'react-redux';
import { DevSummitAxios } from '../../helpers';

// @flow
type State = {
  isFetching: boolean,
  sponsors: Array<mixed>
};

class SponsorInfo extends Component<State> {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      sponsors: []
    };
  }
  componentWillMount() {
    this.isFetching(true);
    DevSummitAxios.get('/api/v1/sponsors')
      .then((response) => {
        this.setState({
          sponsors: response.data.data
        });
        this.isFetching(false);
      });
  }
  isFetching(isFetching) {
    this.setState({ isFetching });
  }
  renderLoading = () => {
    return (
      <Container>
        <Content style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Spinner color="orange" />
          </View>
        </Content>
      </Container>
    );
  }
  renderView = (sponsors) => {
    return (
      <Container>
        <Content style={{ paddingHorizontal: 16 }}>
          { sponsors.map((sponsor, index) => (
            <Card key={index}>
              <CardItem cardBody>
                <Image source={{ uri: sponsor.attachment }} style={{ width: '100%', height: 200, resizeMode: Image.resizeMode.contain }} />
              </CardItem>
              <CardItem>
                <Body style={{ alignItems: 'center' }}>
                  <Text>{sponsor.name}</Text>
                  <Text note>{sponsor.note}</Text>
                </Body>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }

  render() {
    const { isFetching, sponsors } = this.state;
    if (isFetching) {
      return this.renderLoading();
    }
    return this.renderView(sponsors);
  }
}

export default connect(null, null)(SponsorInfo);
