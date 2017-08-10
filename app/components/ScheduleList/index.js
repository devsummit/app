import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import ScheduleCard from '../ScheduleCard';
import styles from './styles';

class ScheduleList extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        const { events } = this.props;
        return (
            <ScrollView>
                { events.length > 0 && events.map((event, index)=> (
                    <ScheduleCard
                        key={index}
                        title={event.title}
                        description={event.description}
                        stage={event.stage}
                        time_start={event.time_start}
                        time_end={event.time_end}
                    />
                ))}
            </ScrollView>
        )
    }
};

export default ScheduleList;
