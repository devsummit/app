import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View, Image, Text, Alert, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PhotoGrid from 'react-native-photo-grid';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import strings from '../../localization';
import HeaderPoint from '../../components/Header';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';
import Redeem from '../Redeem';

const noImage = require('./../../../assets/images/noimage.png');

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

  renderItem = (booth) => {
    return (
      <TouchableWithoutFeedback onPress={() => 
        Actions.boothInfo({
          title: 'Booth Info',
          summary: booth.summary,
          user: booth.user,
          booth_photo: booth.logo_url,
          booth_id: booth.id
        })
      }>
      <View>
        <Image
          style={styles.boothImageList}
          source={{ uri: booth.logo_url }}
        />
        <Text style={styles.boothTitle}>{ booth.name }</Text>
      </View>
      </TouchableWithoutFeedback>
    );
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
            { booth && booth.length > 0 ?
              <View style={styles.imageWrapper}>
                <PhotoGrid
                  data={booth}
                  itemsPerRow={2}
                  renderItem={this.renderItem}
                />
              </View>
              :
              <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={noImage} />
                <Text style={styles.artworkText}>booth is not available yet</Text>
              </View>
            }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  booth: selectors.getListBooth()
});
export default connect(mapStateToProps, actions)(BoothList);
