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
  Input,
  Spinner
} from 'native-base';
import { View, TextInput, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { getAccessToken, DevSummitAxios } from '../../helpers';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: {},
      questionId: 0
    };
  }

  componentWillMount() {
    const { props: { boothId } } = this;
    this.fetchQuestions(16);
  }

  fetchQuestions = async (id) => {
    try {
      const token = await getAccessToken();
      const getQuestions = await DevSummitAxios.get(`api/v1/questioners?booth_id=${id}`, {
        headers: { 'Authorization': token, 'Content-Type': 'application/json' }
      });
      const questionId = getQuestions.data.data[0].id;
      const questions = JSON.parse(getQuestions.data.data[0].questions);
      this.setState({ questions, questionId });
    } catch (error) {
      console.log(error);
    }
  }

  postAnswers = async (questionId, payload) => {
    try {
      const token = await getAccessToken();
      const postAnswers = await DevSummitAxios.post(`api/v1/questioners/${questionId}/answers`, { answers: payload}, {
        headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      });
      return postAnswers;
    } catch (error) {
      console.log(error);
    }
  }

  handleTextInput = (index, text) => {
    const { state: { answers } } = this;
    answers[index] = text;
    this.setState({ answers });
  }

  handleSubmit = () => {
    const { state: { answers, questionId } } = this;
    const payload = [];
    Object.keys(answers).forEach((id) => {
      payload.push({ id, text: answers[id] });
    });
    this.postAnswers(questionId, payload).then( (response) => {
      if (response.status === 200) {
        Alert.alert('Submited!', 'Thanks for your answer!');
        Actions.pop();
      } else {
        Alert.alert('Connection error!', 'Check your connection and submit again.');
      }
    });
  }

  render() {
    const { state: { questions } } = this;
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
            )) : (
              <Spinner color="orange" />
            )}
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
