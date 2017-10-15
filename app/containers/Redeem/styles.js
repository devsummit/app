import { StyleSheet } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

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
    marginRight: 15,
    marginTop: 12
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: 6
  },
  buttonText: {
    fontSize: 15,
    backgroundColor: PRIMARYCOLOR,
    padding: 20,
    color: '#FFFFFF'
  }
});

export default styles;
