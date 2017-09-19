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
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    borderColor: '#FFD740',
    borderWidth: 2,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center'
  },
  normalOnBlur: {
    color: 'grey',
    fontSize: 16
  },
  icon: {
    fontSize: 25,
    paddingRight: 10
  }
});

export default styles;
