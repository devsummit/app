import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    flex: 3
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 90
  },
  buttonText: {
    textAlign: 'left',
    paddingRight: 5,
    flex: 1,
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  btnOrder: {
    alignSelf: 'flex-end',
    bottom: 10,
    right: 25,
    position: 'absolute',
    borderRadius: 20
  }
});

export default styles;
