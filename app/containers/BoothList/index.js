import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View, Image, Text, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import strings from '../../localization';
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
          <HeaderPoint title={strings.booth.title} />
          <Button
            style={styles.btnBooth}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 16 }}>{strings.booth.register}</Text>
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
                    <Text style={{ fontSize: 20, textAlign: 'center', color: '#000' }}>{strings.booth.howto}</Text>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                      <Text style={{ fontSize: 16 }}>
                        {strings.booth.info}{'\n'}{strings.booth.find}
                      </Text>
                      <View style={{ margin: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Fajar Adityo</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>081252700655</Text>
                      </View>
                      <Text style={{ fontSize: 16 }}>
                        {strings.booth.alreadyRegister}
                      </Text>
                    </View>
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
                      <Text style={{ color: '#FFF' }}>{strings.global.back}</Text>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          </View>
          <View style={styles.content}>
            {booth.map(data => (
              <TouchableOpacity
                onPress={() => {
                  Actions.boothInfo({
                    title: 'Booth Info',
                    summary: data.summary,
                    user: data.user,
                    booth_photo: data.logo_url,
                    booth_id: data.id
                  });
                }}
              >
                <View style={{ flex: 1, marginVertical: 10 }} key={data.id}>
                  <View style={styles.profileSection}>
                    <Image
                      style={styles.profilePic}
                      source={{ uri: data.logo_url }}
                    />
                    <View style={styles.nameSection}>
                      <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  booth: selectors.getListBooth()
});
export default connect(mapStateToProps, actions)(BoothList);
