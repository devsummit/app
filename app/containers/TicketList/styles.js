import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E0E0E0'
  },
  item: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  text: {
    flex: 5
  },
  button: {
    flex: 3,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 90
  },
  refreshButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 90
  },
  buttonText: {
    textAlign: 'left',
    paddingRight: 5,
    flex: 7,
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  btnOrder: {
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: -25,
    elevation: 5,
    width: '70%',
    margin: 20
  },
  errorContent: {
    alignItems: 'center'
  },
  errorText: {
    fontSize: 14
  },
  card: {
    position: 'relative',
    height: 100,
    margin: 5,
    padding: 10,
    marginTop: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#f8f8f8',
    backgroundColor: '#f8f8f8',
    elevation: 3,
    width: width * 0.45,
    alignSelf: 'center'
  },
  redeem: {
    margin: 20,
    padding: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 2
  }
});

export default styles;
