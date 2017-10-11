'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  AlertIOS,
  TouchableHighlight
} from 'react-native';

var ViewPager = require('react-native-viewpager');
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var PAGES = [
  'Event IT tersebut bernama Indonesia Developer Summit. Event Indonesia Dev Summit ini rencananya akan diselenggarakan pada tanggal 21-23 November 2017 berlokasi di Bandung Jawa Barat.',
  'Pada Event Indonesia Dev Summit nanti ada 3 topik besar yang akan diangkat yaitu Artificial Intelligence, Blockchain, dan Open Source. Namun sebelum event besar nanti berlangsung. CodePolitan, Refactory dan PHP Indonesia akan melaksanakan beberapa event pendahuluan nih coders.',
  'Event pendahuluan ini bernama Road to DevSummit. Merupakan event meetup yang akan diadakan di 3 kota besar yaitu Bandung, Jakarta dan Jogja.',
  'Diawali dengan Road to DevSummit di kota bandung. Di event pendahuluan ini kita akan pemanasan bertemakan Artificial Intelligence dan Blockchain.',
  'Segera register dan jangan sampai terlambat coders!',
];

var count = 0;

function notifyMessage(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
}

var ImagesScreen = React.createClass({
  getInitialState: function() {
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      dataSource: dataSource.cloneWithPages(PAGES),
    };
  },

  render: function() {
    return (
    //   <ViewPager
    //     style={this.props.style}
    //     dataSource={this.state.dataSource}
    //     renderPage={this._renderPage}
    //     onChangePage={this._onChangePage}
    //     isLoop={false}
    //     autoPlay={false}/>
        <View style={styles.container}>
            <ViewPager
            ref={(viewpager) => {this.viewpager = viewpager}}
            style={this.props.style}
            dataSource={this.state.dataSource}
            renderPage={this._renderPage}
            onChangePage={this._onChangePage}
            isLoop={false}
            autoPlay={false}/>

            <View style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
                <TouchableHighlight style={styles.button} onPress={() => {
                    if (count <= 0) {
                        count = PAGES.length;
                    } 
                    this.viewpager.goToPage(count - 1);
                    count = count - 1;
                    
                }}>
                <Text>Prev</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => {
                    if (count + 1 >= PAGES.length) {
                        count = -1;
                    } 
                    this.viewpager.goToPage(count + 1);
                    count = count + 1;
                    
                }}>
                <Text>Next</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
  },

  _renderPage: function(
    data: Object,
    pageID: number | string,) {
    return (
      <View style={styles.page}>
        <Text style={styles.text}>{data}</Text>
      </View>
    );
  },

  _onChangePage: function(
    page: number | string
  ) {
    // notifyMessage('Current page: ' + page);
  },

});

var styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  page: {
    width: deviceWidth,
  },
  button: {
    padding: 10,
  },
});

module.exports = ImagesScreen;
