import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    margin: 5,
    elevation: 3,
    borderRadius: 3
  },
  item: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 2
  },
  right: {
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
    fontSize: 25,
    margin: 5,
    color: '#FFD740'
  },
  buttonText: {
    marginRight: 10,
    fontWeight: 'bold'
  },
  orderId: {
    alignSelf: 'flex-start',
  },
  text: {
    alignSelf: 'flex-end',
    marginRight: 3
  },
  btnCheckOut: {
    borderRadius: 30,
    borderColor: 'transparent',
    elevation: 0,
  },
  viewText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  buttonSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  statusText: {
    fontSize: 12,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 3,
    marginLeft: 10
  }
});

export default styles;