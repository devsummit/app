import React, { Component } from 'react';
import { View } from 'react-native';
import { 
    Container,
    Header,
    Content,
    Item,
    Input,
    Icon,
    Button,
    Text,
    Label
} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import ScheduleList from '../../components/ScheduleList';
import styles from './styles';

// import redux components
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import * as actions from './actions';
import * as selectors from './selectors'

class Schedule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const events = [
            {
                title: 'Grand Opening Devsummit',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
                stage: 'Main Stage',
                time_start: '2017-08-09 10:00:00',
                time_end: '2017-08-09 13:00:00',
            },
            {
                title: 'Launch and ISOMA',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
                stage: 'Eduplex lt.1',
                time_start: '2017-08-09 13:00:00',
                time_end: '2017-08-09 14:00:00',
            },
            {
                title: 'Talkshow 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
                stage: 'Main Stage',
                time_start: '2017-08-09 14:00:00',
                time_end: '2017-08-09 16:00:00',
            },
            {
                title: 'Interactive Game 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
                stage: 'Eduplex lt.3',
                time_start: '2017-08-09 16:00:00',
                time_end: '2017-08-09 17:00:00',
            }
        ];
        return (
            <View style={styles.container}>
                <Container>
                    <Header searchBar rounded style={styles.searchHeader}>
                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder="Search event ..."/>
                        <Icon name="ios-calendar"/>
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                    </Header>
                    <View style={{flex:1, backgroundColor:'#eee'}}>
                        { true ? (<ScheduleList events={events} />) : (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#3a3a3a'}}>- No Event -</Text>
                            </View>
                        )}
                    </View>
                </Container>
            </View>
        );    
    }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, actions)(Schedule);