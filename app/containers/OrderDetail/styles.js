import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  text: {
    flex: 3
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  roundButton: {
    borderRadius: 90,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    marginRight: 10
  },
  textButton: {
    color: 'white',
    alignSelf: 'center'
  },
  center: {
    flex: 2
  },
  right: {
    flex: 1,
    alignSelf: 'flex-end',
  }
});

export default styles;
