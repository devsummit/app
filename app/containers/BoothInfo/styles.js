import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topView: {
    alignItems: 'stretch',
    height: 290,
    margin: 'auto',
    justifyContent: 'center'
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
    fontSize: 30,
    padding: 10
  },
  descText: {
    color: 'white',
    padding: 10,
    fontSize: 14
  },
  profileImage: {
    width: 110,
    height: 110,
    marginTop: 20,
    borderRadius: 65,
    borderWidth: 1,
    alignSelf: 'center'
  },
});

export default styles;
