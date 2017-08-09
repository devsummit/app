import React, { Component } from 'react';
import {
    Text,
    Button,
    FooterTab,
    Footer,
    Content,
    Container
} from 'native-base';
import { View } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.headerBase}>
                <LinearGradient colors={['#6200EA', '#3F51B5']} style={styles.linearGradient}>
                    <View style={styles.header}>
                        <View style={styles.headerText}>
                            <Text style={styles.pageTitle}>{this.props.title}</Text>
                            <View style={styles.pointSection}>
                                <Icon name="coin" style={styles.coin}/>
                                <Text style={styles.points}> 1000 pts</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            {this.props.children}
                        </View>
                    </View>
                 </LinearGradient>
            </View>
        );
    }
}