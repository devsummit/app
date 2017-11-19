import React, { Component } from 'react';
import {
  Container,
  Content,
  Body,
  Header,
  Text,
  Button,
  Footer,
  FooterTab,
  Form,
  Item,
  Label,
  Input
} from 'native-base';
import { View, TextInput } from 'react-native';

import { getAccessToken, DevSummitAxios } from '../../helpers';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: {}
    };
  }

  componentWillMount() {
    const { props: { boothId } } = this;
    this.fetchQuestions(boothId);
  }

  fetchQuestions = async (id) => {
    try {
      const token = await getAccessToken();
      const getQuestions = await DevSummitAxios.get(`api/v1/questioners?booth_id=${id}`, {
        headers: { 'Authorization' : token, 'Content-Type': 'application/json' }
      });
      const questions = JSON.parse(getQuestions.data.data[0].questions);
      this.setState({ questions });
    } catch (error) {
      console.log(error);
    }
  }

  handleTextInput = (index, text) => {
    console.log(text);
    const { state: { answers } } = this;
    answers[index] = text;
    console.log(answers);
    this.setState({ answers });
  }

  handleSubmit = () => {
    const { state: { answers } } = this;
    console.log(answers);
  }

  render() {
    const { state: { questions } } = this;
    const defaultQuestions = [
      { id: 1, text: 'Profile Github anda :' },
      { id: 2, text: 'Latar belakang pendidikan anda:' },
      { id: 3, text: 'Social media anda: (linkedid, facebook, twitter, dll):' }
    ];
    // profile github, latarberlakang pendidikan, social media
    return (
      <Container>
        <Header style={{ backgroundColor: '#FFC107' }}>
          <Body>
            <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 32 }}>Questioner</Text>
          </Body>
        </Header>
        <Content style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <Form>
            {questions.length > 0 ? questions.map((question, index) => (
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontWeight: 'bold' }}>{question.text}</Text>
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}
                  onChangeText={text => this.handleTextInput(question.id, text)}
                />
              </View>
            )) : defaultQuestions.map((question, index) => (
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontWeight: 'bold' }}>{question.text}</Text>
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}
                  onChangeText={text => this.handleTextInput(question.id, text)}
                />
              </View>
            ))}
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button style={{ backgroundColor: '#FFC107' }} onPress={() => this.handleSubmit()}>
              <Text style={{ color: '#666', fontSize: 21 }}>Submit</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Quiz;
