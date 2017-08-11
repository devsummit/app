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
