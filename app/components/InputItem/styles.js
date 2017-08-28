import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorOnFocus: {
    color: 'red',
    marginTop: 5,
    fontSize: 14
  },
  errorOnBlur: {
    color: 'red',
    fontSize: 16
  },
  normalOnFocus: {
    color: 'grey',
    marginTop: 5,
    fontSize: 14
  },
  item: {
    marginBottom: 10,
    borderColor: '#FFD740',
    borderWidth: 1,
    alignItems: 'center'
  },
  normalOnBlur: {
    color: 'grey',
    fontSize: 16
  }
});

export default styles;
