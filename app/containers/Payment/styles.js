import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  text: {
    flex: 3
  },
  button: {
    flex: 0.4,
    justifyContent: 'center',
    borderRadius: 30,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
