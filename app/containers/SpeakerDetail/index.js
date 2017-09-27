import React, { Component } from 'react';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Body
} from 'native-base';
import { Image, View } from 'react-native'
import strings from '../../localization';
import styles from './styles';

class SpeakerDetail extends Component {
    render () {
        return (
            <Container>
                <Content style={styles.content}>
                    <View style={styles.profileSection}>
                        <Image
                            style={styles.profilePic}
                            source={{uri: this.props.profilePicture}}
                        />
                    </View>
                    <View style={styles.nameSection}>
                        <Text style={styles.name}>{this.props.firstName} {' '}</Text>
                        <Text style={styles.name}>{this.props.lastName}</Text>
                    </View>
                    <Card>
                        <View style={styles.cardSection}>
                            <View style={styles.jobSection}>
                                <Text style={styles.jobTitle}>{strings.speaker.job}</Text>
                                <Text style={styles.job}>{this.props.job}</Text>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.jobSection}>
                                <Text style={styles.jobTitle}>{strings.speaker.summary}</Text>
                                <Text style={styles.job}>{this.props.summary}</Text>
                            </View>
                        </View>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default SpeakerDetail;
