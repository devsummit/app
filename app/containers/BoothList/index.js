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
import { View, Image, Alert, Modal, TouchableHighlight, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HeaderPoint from '../../components/Header';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';
import Redeem from '../Redeem';


class BoothList extends Component {
  state = {
    modalVisible: false
  }

  componentWillMount() {
    this.props.fetchBoothList();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { booth } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <HeaderPoint title="BOOTH" />
          <Button
            primary
            style={styles.btnBooth}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text>Become booth</Text>
          </Button>
          <View style={{ marginTop: 22 }}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => { this.setModalVisible(!this.state.modalVisible); }}
            >
              <ScrollView>
                <View style={{ marginTop: 22, marginLeft: 22, marginRight: 22, marginBottom: 22 }}>
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>This is how to become booth : </Text>
                    <Text />
                    <Text />
                    <Text>1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    <Text />
                    <Text>2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    <Text />
                    <Text>3. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    <Text />
                    <Text>4. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    <Text />
                    <Text>5. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    <View style={styles.redeem}>
                      <Redeem />
                    </View>
                    <Button
                      primary
                      style={styles.btnModal}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    >
                      <Text>Hide</Text>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          </View>
          <Content style={styles.content}>
            {booth.map(data => (
              <Card key={data.id} >
                <Body>
                  <View style={styles.profileSection}>
                    <Image
                      style={styles.profilePic}
                      source={{ uri: data.logo_url }}
                    />
                  </View>
                </Body>
                <CardItem style={styles.itemNameSection}>
                  <Body>
                    <View style={styles.bodySection}>
                      <View style={styles.nameSection}>
                        <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
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
                      Actions.boothInfo({
                        summary: data.summary,
                        user: data.user,
                        photo: data.logo_url
                      });
                    }}
                  >
                    <Text>See more</Text>
                  </Button>
                </CardItem>
              </Card>
            ))}
          </Content>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  booth: selectors.getListBooth()
});
export default connect(mapStateToProps, actions)(BoothList);
