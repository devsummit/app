import React from 'react';
import {
  Content,
  Container
} from 'native-base';
import { View } from 'react-native';
import styles from './styles';
import Header from '../Header';

const Navigation = () => {
  return (
    <Container>
      <Header title={this.props.active}>
        {this.props.headerContent}
      </Header>
      <Content>
        <View style={styles.content}>
          {this.props.children}
        </View>
      </Content>
    </Container>
  );
};

export default Navigation;
