import React from 'react';
import { View, ScrollView, Text, Image, Animated } from 'react-native';
import Actions from 'react-native-router-flux';

import Button from '../../components/Button';
import styles from './style';
import strings from '../../localization';

import Bounceable from "react-native-bounceable";
import * as Progress from 'react-native-progress';

const background = require('./../../../assets/images/background.png');
const Aiken = require('../../../assets/images/icon.png');

const LoadingScreen = () => {

    return (
        <ScrollView>
            <Image source={background} style={styles.background}>
            <View style={{margin: 110}}>
                <View style={{
                    flex: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Bounceable
                    onPress={()=>{this.onPress}}
                    level={1.5}>
                    <Image
                    source={Aiken}
                    style={{ 
                        height: 100, margin: 20
                    }}
                    />
                </Bounceable>
                <Progress.Bar indeterminate width={200} />
                {/* <Progress.Pie animated indeterminate size={50} /> */}
                </View>
                <Text style={{fontSize: 25, color : 'white', margin: 10, textAlign: 'center' }}>logging in.....</Text>
            </View>
            </Image>
        </ScrollView>
    );
};

export default LoadingScreen;
