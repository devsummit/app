import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Button,
  Item,
  Input,
  Text,
  Label,
  Card,
  CardItem,
  Body,
  Fab
} from 'native-base';
import { Alert, ActivityIndicator, View, Image, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import HeaderPoint from '../../components/Header';
import ModalComponent from '../../components/ModalComponent';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';

class MaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      invisible: false,
      isLoading: true
    };
  }

  componentWillMount() {
    this.props.fetchMaterialList();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps && prevProps.visible && this.props.visible !== prevProps.visible) {
      this.setState({
        visible: prevProps.visible
      });
    }
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
  }

  openPicker = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()]
    }, (error, res) => {
      this.setState({ fileName: res.fileName });
      this.handleInputChange('file', res);
    });
  }

  saveMaterialList = () => {
    this.props.saveMaterialList(this.props.inputFields);
    this.setState({ invisible: !this.state.invisible });
    Toast.show('Saved');
    this.setState({ fileName: '' });
  }

  showAlert = (id) => {
    Alert.alert('Remove Material', 'Are you sure ?',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => this.removeItem(id)}
      ],
      {cancelable: false}
    );
  }

  removeItem = (id) => {
    this.props.deleteMaterialList(id);
    Toast.show('Deleted');
  }

  setModal = () => this.setState({ invisible: !this.state.invisible });


  render() {

    const { material } = this.props;

    return (
      <Container>
        <Content>
          <HeaderPoint title="MATERIAL" />
          {
            this.props.isFetching
              ? <ActivityIndicator size="large" color="#f39e21" style={styles.loader}/>
              : (
                  material && material.length > 0 ?
                    <Content>
                    {material.map(data => (
                      <Card key={data.id}>
                        <CardItem>
                          <Body>
                            <View style={styles.bodySection}>
                              <View style={styles.profileSection}>
                                <Image
                                  source={{ uri: data.user.photos[0].url || ''}}
                                  style={styles.photo}
                                />
                              </View>
                              <View style={styles.nameSection}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
                                  <TouchableOpacity onPress={() => this.showAlert(data.id)}>
                                    <Icon name="remove" color="red" style={styles.icon} />
                                  </TouchableOpacity>
                                </View>
                                <Text style={styles.title}>{data.title}</Text>
                                <Text numberOfLines={3} style={styles.summary}>
                                  {data.summary}
                                </Text>
                                <View style={styles.materialUrl}>
                                  <Text style={styles.material} numberOfLines={1}>{data.material}</Text>
                                </View>
                              </View>
                            </View>
                          </Body>
                        </CardItem>
                      </Card>
                    ))}
                  </Content> :
                  <Button
                    block
                    rounded
                    style={{ marginVertical: 20, alignSelf: 'center', backgroundColor: '#FFA726' }}
                    onPress={() => this.setState({ invisible: !this.state.invisible })}
                  >
                    <Text style={styles.buttonText}>Upload File</Text>
                  </Button>
                )
          }
          <ModalComponent
            visible={this.state.invisible}
            modalTitle={'Create Material'}
            inputTitle={'Title'}
            onChangeTitle={text => this.handleInputChange('title', text)}
            inputSummary={'Summary'}
            onChangeSummary={text => this.handleInputChange('summary', text)}
            onSubmit={this.saveMaterialList}
            onUpload={this.openPicker}
            onModalPress={this.setModal}
            fileName={this.state.fileName}
          />
        </Content>
        <Fab
          active={this.state.invisible}
          style={{ backgroundColor: '#FFA726' }}
          position="bottomRight"
          onPress={() => this.setModal()}>
          <Icon name="plus" />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  material: selectors.getListMaterial(),
  visible: selectors.getModalStatus(),
  isFetching: selectors.getIsFetchingMaterial(),
  inputFields: selectors.getInputFields()
});
export default connect(mapStateToProps, actions)(MaterialList);
