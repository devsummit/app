import React, { Component } from 'react';
import { 
    Card,
    CardItem,
    Body,
    Right,
    Text,
} from 'native-base';
import { View, TouchableHighlight } from 'react-native';
import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class ScheduleCard extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false }
    }

    handleToggle = () => {
        const isOpen = ! this.state.isOpen;
        this.setState({ isOpen });
    }

    render() {
        const { isOpen } = this.state;
        const { title, description, stage, first_name, last_name, time_start, time_end } = this.props;
        const start = new moment(time_start);
        const end = new moment(time_end);
        const dayStart = start.format('DD');
        const monthStart = start.format('MMM');
        const timeStart = start.format('hh:mm A');
        const dateEnd = end.format('MMM DD');
        const timeEnd = end.format('hh:mm A');        
        return (
            <Card style={styles.container}>
                <TouchableHighlight onPress={()=> this.handleToggle() }>
                    <CardItem>
                        <View style={styles.date}>
                            <Text style={styles.day}>{ dayStart }</Text>
                            <Text style={styles.month}>{ monthStart }</Text>
                        </View>
                        <View>
                            <Text style={styles.eventTitle}>{ title }</Text>
                            <Text style={styles.smallText}><Icon name="home" style={styles.smallIcon}/> { stage }</Text>
                            <Text style={styles.smallText}><Icon name="clock-o" style={styles.smallIcon }/> { timeStart }</Text>
                            <Text style={styles.smallText}><Icon name="user" style={styles.smallIcon }/> { first_name } { last_name }</Text>
                        </View>
                        <Right>
                        <Icon name={isOpen ? "chevron-up" : "chevron-down"}/>
                        </Right>
                    </CardItem>
                </TouchableHighlight>
                { isOpen && (
                    <View>
                        <CardItem>
                            <Text style={styles.description}>
                                { description }
                            </Text>
                        </CardItem>
                        <CardItem footer>
                            <Body style={styles.eventFooter}>
                                <Text style={styles.footerLabel}>End on: </Text>
                                <Icon name="calendar" style={styles.smallIcon}/>
                                <Text style={styles.smallText}> { dateEnd } </Text>
                                <Icon name="clock-o" style={styles.smallIcon}/>
                                <Text style={styles.smallText}> { timeEnd }</Text>
                            </Body>
                        </CardItem>
                    </View>
                )}
            </Card>
        );
    }
}

export default ScheduleCard;