import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import Actions from 'react-native-router-flux';

import Button from '../../components/Button';
import styles from './style';
import strings from '../../localization';

const icon = require('./../../../assets/images/icon.png');

const CodeConduct = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={icon}
            resizeMode="center"
          />
          <Text style={styles.app}>Devsummit</Text>
        </View>
        <Text style={styles.content}>{strings.privacyPolicy.content1} {'\n'} {'\n'}</Text>
        <Text style={styles.title}>{strings.privacyPolicy.title2} {'\n'}</Text>
        <Text style={styles.content}>{strings.privacyPolicy.content2} {'\n'} {'\n'}</Text>
        <Text style={styles.title}>{strings.privacyPolicy.title3} {'\n'}</Text>
        <Text style={styles.content}>{strings.privacyPolicy.content3} {'\n'} {'\n'}</Text>
        <Text style={styles.title}>{strings.privacyPolicy.title4} {'\n'}</Text>
        <Text style={styles.content}>{strings.privacyPolicy.content4} {'\n'} {'\n'}</Text>
        <Text style={styles.title}>{strings.privacyPolicy.title5} {'\n'}</Text>
        <Text style={styles.content}>{strings.privacyPolicy.content5} {'\n'} {'\n'}</Text>
        <Text style={styles.title}>{strings.privacyPolicy.title6} {'\n'}</Text>
        <Text style={styles.content}>{strings.privacyPolicy.content6} {'\n'} {'\n'}</Text>
        <Text style={styles.title}>{strings.privacyPolicy.title7} {'\n'}</Text>
        <Text style={styles.content}>{strings.privacyPolicy.content7} {'\n'} {'\n'}</Text>
        <Text style={styles.title}>{strings.privacyPolicy.title8} {'\n'}</Text>
        <Text style={styles.content}>{strings.privacyPolicy.content8} {'\n'} {'\n'}</Text>
        <Text style={styles.lastUpdate}>{strings.privacyPolicy.lastUpdated} {'\n'} {'\n'}</Text>
      </View>
    </ScrollView>
  );
};

export default CodeConduct;
