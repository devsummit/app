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
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';


class MaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'John',
      lastName: 'Doe',
      materialFilter: [],
      visible: false,
      fileName: ''
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
  }


  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
  }

  handleFilter = (param) => {
    const filteredMaterial = [];
    this.props.material.map((data) => {
      if (data.user.first_name.toLowerCase().includes(param.toLowerCase())
      || data.user.last_name.toLowerCase().includes(param.toLowerCase())) {
        filteredMaterial.push(data);
      }
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
    });
  }

  saveMaterialList = () => {
    this.props.saveMaterialList();
  }

  render() {
    return (
      <Container>
        <HeaderPoint title="MATERIAL" />
        <Content>
          {this.state.materialFilter.map(data => (
            <Card key={data.id}>
              <CardItem>
                <Body>
                  <View style={styles.bodySection}>
                    <View style={styles.profileSection}>
                      <Image
                        style={styles.profilePic}
                        source={{ uri: data.profile_picture }}
                      />
                    </View>
                    <View style={styles.nameSection}>
                      <Text style={styles.name}>{data.user.first_name} {data.user.last_name}</Text>
                      <Text style={styles.job}>{data.job}</Text>
                      <Text numberOfLines={3} style={styles.summary} >
                        {data.summary}
                      </Text>
                    </View>
                  </View>
                </Body>
              </CardItem>
            </Card>
          ))}
        </Content>
        <Fab
          active={this.state.active}
          style={{ backgroundColor: '#FFA726' }}
          position="bottomRight"
          onPress={() => this.setState({ visible: !this.state.visible })}>
          <Icon name="plus" />
        </Fab>
        <ModalComponent
          visible={this.state.visible}
          modalTitle={'Create Material'}
          inputTitle={'Title'}
          onChangeTitle={text => this.handleInputChange('title', text)}
          inputSummary={'Summary'}
          onChangeSummary={text => this.handleInputChange('summary', text)}
          onSubmit={() => this.saveMaterialList()}
          onUpload={() => this.openPicker()}
          onModalPress={() => this.setState({ visible: !this.state.visible })}
          fileName={this.state.fileName}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  material: selectors.getListMaterial()
});
export default connect(mapStateToProps, actions)(MaterialList);
