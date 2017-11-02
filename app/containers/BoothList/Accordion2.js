import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Form, Item, Input } from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import strings from '../../localization';
import styles from './styles';
import { SECTIONS2 } from '../../constants';

class AccordionView2 extends Component {
  state = {
    accordion: false,
    groupName: ''
  };

  renderHeader = (section, index, isActive) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{
          backgroundColor: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,1)',
          padding: 8
        }}
      >
        <View
          style={{
            borderWidth: 5,
            borderRadius: 5,
            borderColor: '#BDBDBD',
            flex: 1,
            padding: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Text style={{ color: '#616161', fontSize: 30, textAlign: 'center' }}>{section.title}</Text>
        </View>
      </Animatable.View>
    );
  };

  renderContent = (section, i, isActive) => {
    const name = this.state.groupName;
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{
          backgroundColor: isActive ? '#E0E0E0' : 'rgba(245,252,255,1)',
          borderRadius: 5,
          borderColor: '#FFF',
          marginHorizontal: 16
        }}
      >
        <Animatable.View
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : 'zoomInUp'}
          style={{ marginHorizontal: 16, padding: 8 }}
        >
          <View style={styles.inputItem}>
            <Form>
              <Item>
                <Input
                  placeholder={'Enter group name'}
                  onChangeText={text => this.setState({ groupName: text })}
                />
              </Item>
            </Form>
          </View>
          <Button
            style={{
              width: '70%',
              backgroundColor: '#FF6F00',
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10
            }}
            onPress={() => {
              this.props.setPaymentMethod(name);
              this.props.onPress();
            }
            }
          >
            <Text style={{ color: '#FFF', fontSize: 16 }}>Register</Text>
          </Button>
        </Animatable.View>
      </Animatable.View>
    );
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS2}
        underlayColor={'#FFFFFF'}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
      />
    );
  }
}

export default AccordionView2;
