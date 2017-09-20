import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modalComponent: {
    margin: 20,
    marginTop: -175,
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 2
  },
  modalTitle: {
    marginLeft: 15,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18
  },
  inputItem: {
    marginRight: 15
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: 6
  },
  buttonText: {
    fontSize: 15
  }
});

export default styles;
