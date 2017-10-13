import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
    marginLeft: 12,
    fontSize: 30
  },
  buttonText: {
    marginRight: 12,
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
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 6,
    marginHorizontal: 20
  },
  statusText: {
    flex: 1,
    fontSize: 12,
    borderRadius: 4,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonSubmit: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  image: {
    width: width * 0.8,
    height: 400,
    alignSelf: 'center'
  }
});

export default styles;
