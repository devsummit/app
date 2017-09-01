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
  leftMid: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 3
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    flex: 1,
    marginLeft: 10,
    fontSize: 30
  },
  buttonText: {
    marginRight: 10,
    fontWeight: 'bold'
  },
  orderId: {
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  text: {
    alignSelf: 'flex-end'
  },
  roundButton: {
    borderRadius: 90,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    marginRight: 10
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
  },
  statusText: {
    flex: 1,
    fontSize: 8,
    borderRadius: 90,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default styles;

