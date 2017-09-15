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
import { Alert, View, Image, KeyboardAvoidingView, TouchableOpacity,TouchableHighlight,  Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HeaderPoint from '../../components/Header';
import ModalComponent from '../../components/ModalComponent';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';

class MaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'John',
      lastName: 'Doe',
      materialFilter: this.props.material,
      fileName: '',
      invisible: false
    };
  }

  componentWillMount() {
    this.props.fetchMaterialList();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps && prevProps.material && this.props.material !== prevProps.material) {
      this.setState({
        materialFilter: prevProps.material
      });
    }

    if (prevProps && prevProps.visible && this.props.visible !== prevProps.visible) {
      this.setState({
        visible: prevProps.visible
      });
    }
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
  }

  handleFilter = (param) => {
    const filteredMaterial = [];
    this.props.material.map((data) => {
        filteredMaterial.push(data);
    });
    this.setState({
      materialFilter: filteredMaterial
    });
  }

  openPicker = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,res) => {
      this.setState({  fileName: res.fileName });
      this.handleInputChange('file', res);
    });
  }

  saveMaterialList = () => {
    this.props.saveMaterialList();
    this.setState({invisible: !this.state.invisible});
    Toast.show('Saved');
  }

  render() {
    const { material } = this.props;
    return (
      <Container>
        <HeaderPoint title="MATERIAL" />
        {material.length > 0 ?
          <Content>
            {this.state.materialFilter.map(data => (
              <Card key={data.id}>
                <CardItem>
                  <Body>
                    <View style={styles.bodySection}>
                      <View style={styles.profileSection}>
                        <Image
                          source={{ uri: data.user.photos[0].url }}
                          style={styles.photo}
                        />
                      </View>
                      <View style={styles.nameSection}>
                        <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
                        <Text style={styles.title}>{data.title}</Text>
                        <Text numberOfLines={3} style={styles.summary}>
                          {data.summary}
                        </Text>
                        <View style={styles.materialUrl}>
                          <Text style={styles.material} numberOfLines={1}>{data.material}</Text>
                          <Icon name="download" color="red" style={styles.icon} />
                        </View>
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            ))}
          </Content> :
          <Text style={styles.noMaterial}>You don't have any material.</Text>
        }
        <Fab
          active={this.state.invisible}
          style={{ backgroundColor: '#FFA726' }}
          position="bottomRight"
          onPress={() => this.setState({ invisible: !this.state.invisible })}>
          <Icon name="plus" />
        </Fab>
        <ModalComponent
          visible={this.state.invisible}
          modalTitle={'Create Material'}
          inputTitle={'Title'}
          onChangeTitle={text => this.handleInputChange('title', text)}
          inputSummary={'Summary'}
          onChangeSummary={text => this.handleInputChange('summary', text)}
          onSubmit={() => this.saveMaterialList()}
          onUpload={() => this.openPicker()}
          onModalPress={() => this.setState({ invisible: !this.state.invisible })}
          fileName={this.state.fileName}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  material: selectors.getListMaterial(),
  visible: selectors.getModalStatus()
});
export default connect(mapStateToProps, actions)(MaterialList);
