import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import { SECTIONS } from '../../constants';

class AccordionView extends Component {
  state = {
    accordion: false
  };

  renderHeader = (section, index, isActive) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{
          backgroundColor: isActive ? 'rgba(255,255,255,1)' : 'grey'
        }}
      >
        <Card>
          <View
            style={{
              flex: 1,
              padding: 30,
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Text style={{ fontSize: 30, textAlign: 'center' }}>{section.title}</Text>
          </View>
        </Card>
      </Animatable.View>
    );
  };

  renderContent = (section, i, isActive) => {
    const price = section.price;
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)' }}
      >
        <Animatable.View
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : 'zoomInUp'}
          style={{ margin: 16 }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Price: {section.price}</Text>
          {section.gifts &&
            section.gifts.map((item, idx) => (
              <View key={idx}>
                <Text>{item}</Text>
              </View>
            ))}
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
            onPress={() => this.props.setPaymentMethod(price)}
          >
            <Text style={{ color: '#FFF', fontSize: 16 }}>Order</Text>
          </Button>
        </Animatable.View>
      </Animatable.View>
    );
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
      />
    );
  }
}

export default AccordionView;
