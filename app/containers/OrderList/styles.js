import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  item: {
    flex: 1,
    margin: 0,
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
  left: {
    alignSelf: 'flex-start',
    flex: 3
  },
  orderId: {
    alignSelf: 'flex-start'
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
