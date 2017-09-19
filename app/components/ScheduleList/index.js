import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import ScheduleCard from '../ScheduleCard';

export default class ScheduleList extends Component {
  // Use constructor to get event props
  constructor (props) {
    super(props);
  }

  render() {
    const { events } = this.props;
    return (
      <ScrollView>
        { events.length > 0 && events.map((event, index) => (
          <ScheduleCard
            key={index}
            event={event.event}
            speaker={event.speaker}
            stage={event.stage.name}
            user={event.user}
            time_start={event.time_start}
            time_end={event.time_end}
          />
        ))}
      </ScrollView>
    );
  }
}
