'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';

import ViewPager from 'react-native-viewpager';
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var IMGS = [
  'https://static.cdn-cdpl.com/700x350/b8e29e8f0b15aab3473fed5df06c9186/cover-jakarta-devsummit.jpg',
  'https://static.cdn-cdpl.com/700x350/b8e29e8f0b15aab3473fed5df06c9186/cover-bandung-devsummit.jpg',
  'https://static.cdn-cdpl.com/700x350/b8e29e8f0b15aab3473fed5df06c9186/cover-jogja-devsummit.jpg'
];

var count = 0;

var TopScreen = React.createClass({
  getInitialState: function() {
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      dataSource: dataSource.cloneWithPages(IMGS),
    };
  },
  

  render: function() {
    console.log("landing here IMGS length", IMGS.length);
    return (
    //   <ViewPager
    //     style={this.props.style}
    //     dataSource={this.state.dataSource}
    //     renderPage={this._renderPage}
    //     isLoop={true}
    //     autoPlay={false}/>
        <View style={styles.container}>
            <ViewPager
            ref={(viewpager) => {this.viewpager = viewpager}}
            style={this.props.style}
            dataSource={this.state.dataSource}
            renderPage={this._renderPage}
            isLoop={false}
            autoPlay={false}/>
            <Text>Some cuks</Text>
            <View style={{
                      flex: 0,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                <TouchableHighlight style={styles.button} onPress={() => {
                    if (count <= 0) {
                        count = IMGS.length;
                    } 
                    this.viewpager.goToPage(count - 1);
                    count = count - 1;
                    
                }}>
                <Text>Prev</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => {
                    if (count + 1 >= IMGS.length) {
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
      <Image
        source={{uri: data}}
        style={styles.page} />
    );
  },
});

var styles = StyleSheet.create({
  page: {
    width: deviceWidth,
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

module.exports = TopScreen;
