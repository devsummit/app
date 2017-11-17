import 'intl';
import 'intl/locale-data/jsonp/en';
import React from 'react';
import QRCode from 'react-native-qrcode';
import { View, Text } from 'native-base';
import styles from './styles';

export default (props) => {
  const { ticketId, ticketCode } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.ticketId}>No. ticket {ticketId}</Text>
      <QRCode
        value={ticketCode}
        size={200}
        bgColor="black"
        fgColor="white"
      />
      <Text style={styles.ticketCode}>{ticketCode}</Text>
    </View>
  );
};
