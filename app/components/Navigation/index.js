import React, { Component } from 'react';
import {
    Text,
    Icon,
    Button,
    FooterTab,
    Footer,
    Content,
    Container
} from 'native-base';
import { View } from 'react-native';
import styles from './styles';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Header';
import { Actions } from 'react-native-router-flux';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Header
                    title={this.props.active}
                >
                    {this.props.headerContent}
                </Header>
                <Content>
                    <View style={styles.content}>
                        {this.props.children}
                    </View>
                </Content>
            </Container>
        );
    }
}