import React from 'react';
import { ScrollView } from 'react-native';

import ScheduleCard from '../ScheduleCard';

const ScheduleList = () => {
  const { events } = this.props;
  return (
    <ScrollView>
      { events.length > 0 && events.map((event, index) => (
        <ScheduleCard
          key={index}
          title={event.event.title}
          description={event.event.information}
          stage={event.stage.name}
          first_name={event.user.first_name}
          last_name={event.user.last_name}
          time_start={event.time_start}
          time_end={event.time_end}
        />
      ))}
    </ScrollView>
  );
};

export default ScheduleList;
