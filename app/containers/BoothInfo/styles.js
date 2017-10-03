import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  info: {
    margin: 12
  },
  icon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: -30,
    marginRight: 5
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
    alignSelf: 'center',
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
    alignSelf: 'center',
    borderRadius: 50,
    width: width * 0.7,
    height: 200,
    margin: 8
  },
  boothImageList: {
    width: width * 0.49,
    height: 150,
    margin: 2
  },
  imageWrapper: {
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default styles;
