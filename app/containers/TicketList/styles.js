import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
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
    borderRadius: 90,
    margin: 20
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
    fontSize: 14,
    marginTop: 12
  },
  card: {
    position: 'relative',
    height: 100,
    width: 240,
    margin: 10,
    padding: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#f8f8f8',
    backgroundColor: '#f8f8f8',
    elevation: 3
  },
  ticketCard: {
    position: 'relative',
    height: 100,
    width: 80,
    margin: 10,
    padding: 10,
    marginLeft: 4,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#f8f8f8',
    backgroundColor: '#f8f8f8',
    elevation: 3
  }
});

export default styles;
