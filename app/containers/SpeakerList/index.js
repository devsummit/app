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
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class SpeakerList extends Component {
    render () {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <View style={styles.bodySection}>
                                    <View style={styles.profileSection}>
                                        <Image 
                                            style={styles.profilePic}
                                            source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/bc/f0/4e/bcf04eafebdf707b8d900f02e6d8bd70--photo-tag-touch-me.jpg'}}
                                        />
                                    </View>
                                    <View style={styles.nameSection}>
                                        <Text style={styles.name}>Elon Musk</Text>
                                        <Text style={styles.job}>CEO of SpaceX, Tesla</Text>
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <View style={styles.iconSection}>
                                <Icon name="chevron-down" color="black" style={styles.icon}/>
                            </View>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default SpeakerList;