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
import { View, Image, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HeaderPoint from '../../components/Header';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';


class BoothList extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <HeaderPoint title="BOOTH" />
        <Button primary style={styles.btnBooth} onPress={() => Actions.boothInfo()}><Text>Register Booth</Text></Button>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <View style={styles.bodySection}>
                  <View style={styles.bigTextSection}>
                    <Text style={styles.bigText}>Booth One</Text>
                    <View style={styles.descriptionSection}>
                      <Text style={styles.descriptionText}>This one is a very descriptive description about Booth description</Text>
                    </View>
                  </View>
                  <Button bordered style={styles.btnOpen} onPress={() => Actions.boothInfo()}><Text>Open Booth</Text></Button>
                </View>

                <View style={{ padding: 10 }} />

                <View style={styles.bodySection}>
                  <View style={styles.bigTextSection}>
                    <Text style={styles.bigText}>Booth One</Text>
                    <View style={styles.descriptionSection}>
                      <Text style={styles.descriptionText}>This one is a very descriptive description about Booth description</Text>
                    </View>
                  </View>
                  <Button bordered style={styles.btnOpen} onPress={() => Actions.boothInfo()}><Text>Open Booth</Text></Button>
                </View>

                <View style={{ padding: 10 }} />

                <View style={styles.bodySection}>
                  <View style={styles.bigTextSection}>
                    <Text style={styles.bigText}>Booth One</Text>
                    <View style={styles.descriptionSection}>
                      <Text style={styles.descriptionText}>This one is a very descriptive description about Booth description</Text>
                    </View>
                  </View><Button bordered style={styles.btnOpen} onPress={() => Actions.boothInfo()}><Text>Open Booth</Text></Button>
                </View>

                <View style={{ padding: 10 }} />

              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({ });
export default connect(mapStateToProps, actions)(BoothList);
