import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  info: {
    margin: 12
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 24
  },
  summary: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 8
  },
  col1: {
    backgroundColor: '#EB9532',
    height: 110
  },
  col2: {
    backgroundColor: '#F5AB35',
    height: 110
  },
  col3: {
    backgroundColor: '#F9BF3B',
    height: 110
  },
  boldedText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    padding: 10
  },
  boothImage: {
    width,
    height: 200
  }
});

export default styles;
