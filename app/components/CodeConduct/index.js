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
        <Text style={styles.content}>{strings.codeConduct.content1} {'\n'} {'\n'}</Text>
        <Text style={styles.content}>{strings.codeConduct.content2} {'\n'} {'\n'}</Text>
        <Text style={styles.content}>{strings.codeConduct.content3} {'\n'} {'\n'}</Text>
        <Text style={styles.content}>{strings.codeConduct.content4} {'\n'} {'\n'}</Text>
        <Text style={styles.content}>{strings.codeConduct.content5} {'\n'} {'\n'}</Text>
        <Text style={styles.content}>{strings.codeConduct.content6} {'\n'} {'\n'}</Text>
        <Text style={[ styles.content, { textAlign: 'center', fontWeight: 'bold', fontSize: 16 } ]}>{strings.codeConduct.content7} {'\n'} {'\n'}</Text>
      </View>
    </ScrollView>
  );
};

export default CodeConduct;
