import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 2,
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 22,
    marginRight: 5
  },
  orderId: {
    alignSelf: 'flex-start'
  }
});

export default styles;
