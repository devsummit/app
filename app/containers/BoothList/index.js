import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Card,
  CardItem,
  Spinner,
  Body,
  Header,
  Item,
  Icon,
  Input
} from 'native-base';
import {
  View,
  Image,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import strings from '../../localization';
import HeaderPoint from '../../components/Header';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';
import Redeem from '../Redeem';
import AccordionView from './Accordion';

const bgBooth1 = require('./../../../assets/images/bgbooth_1.png');
const bgBooth2 = require('./../../../assets/images/bgbooth_2.png');

class BoothList extends Component {
  state = {
    modalVisible: false,
    boothFilter: this.props.booth,
    url: 'https://api.devsummit.io/static/prospectous.pdf'
  };

  componentWillMount() {
    this.props.fetchBoothList();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps && prevProps.booth && this.props.booth !== prevProps.booth) {
      this.setState({
        boothFilter: prevProps.booth
      });
    }
  }

  setAccordion = (visible) => {
    this.setState({ accordion: visible });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getProspectusFile = () => {
    Linking.openURL(this.state.url);
  };

  handleFilter = (param) => {
    const filteredBooth = [];
    this.props.booth.map((data) => {
      if (
        data.user.first_name.toLowerCase().includes(param.toLowerCase()) ||
        data.user.last_name.toLowerCase().includes(param.toLowerCase())
      ) {
        filteredBooth.push(data);
      }
    });
    this.setState({
      boothFilter: filteredBooth
    });
  };

  setPaymentMethod = (orderedTicketType) => {
    Actions.payment({ orderedTicketType });
  };

  render() {
    const { booth } = this.props;
    return (
      <Container style={styles.container}>
        <HeaderPoint title={strings.booth.title} />
        <Image source={bgBooth2} resizeMode="cover" style={{ flex: 0.21, width: '100%' }}>
          <Button
            style={styles.btnBooth}
            onPress={() => {
              this.setAccordion(!this.state.accordion);
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 16 }}>
              {this.state.accordion ? 'Please select one of options' : strings.booth.register}
            </Text>
          </Button>
        </Image>
        {this.state.accordion ? (
          <View style={styles.searchHeader} />
        ) : (
          <Header searchBar style={styles.searchHeader} androidStatusBarColor="#f39e21">
            <Item>
              <Icon name="ios-search" style={{ color: '#f39e21', fontSize: 30 }} />
              <Input
                style={{ fontSize: 16, alignSelf: 'center' }}
                placeholder={strings.booth.search}
                onChangeText={text => this.handleFilter(text)}
              />
            </Item>
          </Header>
        )}
        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <ScrollView>
              <View style={{ margin: 20 }}>
                <View>
                  <Text style={{ fontSize: 20, textAlign: 'center', color: '#000' }}>
                    {strings.booth.howto}
                  </Text>
                  <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 16 }}>
                      {strings.booth.info}
                      {'\n'}
                      {strings.booth.find}
                    </Text>
                    <View style={{ margin: 20, alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Fajar Adityo</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>081252700655</Text>
                      <Text style={{ marginVertical: 12 }}>OR</Text>
                      <TouchableOpacity
                        style={styles.btnDownload}
                        onPress={() => {
                          this.getProspectusFile();
                        }}
                      >
                        <Text style={{ color: '#FFF', fontSize: 16 }}>
                          {strings.global.download}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 16 }}>{strings.booth.alreadyRegister}</Text>
                  </View>
                  {/* <View style={styles.redeem}>
                    <Redeem />
                  </View> */}
                  <Button
                    style={styles.btnModal}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Text style={{ color: '#FFF', fontSize: 16 }}>{strings.global.back}</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
        <Content>
          {this.props.isFetching ? (
            <Spinner color="#FF8B00" />
          ) : this.state.accordion ? (
            <AccordionView setPaymentMethod={this.setPaymentMethod} />
          ) : (
            <View style={styles.content}>
              {this.state.boothFilter.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Actions.boothInfo({
                      title: data.name,
                      summary: data.summary,
                      user: data.user,
                      booth_photo: data.logo_url,
                      booth_id: data.id
                    });
                  }}
                >
                  <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 10 }} key={data.id}>
                    <View style={styles.profileSection}>
                      <Image style={styles.profilePic} source={{ uri: data.logo_url }} />
                      <View style={styles.nameSection}>
                        <Text style={styles.name}>
                          {data.user.first_name} {data.user.last_name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  booth: selectors.getListBooth(),
  isFetching: selectors.getIsFetchingBooths()
});
export default connect(mapStateToProps, actions)(BoothList);
