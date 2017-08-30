import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 2
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 30
  },
  orderId: {
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  btnCheckOut: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'transparent',
    flexDirection: 'row',
    elevation: 0,
    flex: 1
  }
});

export default styles;
