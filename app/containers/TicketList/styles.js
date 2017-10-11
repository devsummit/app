import { StyleSheet, Dimensions } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

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
    borderRadius: 2,
    backgroundColor: PRIMARYCOLOR
  },
  refreshButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 90
  },
  buttonText: {
    flex: 3.5,
    fontSize: 12,
    marginTop: -4,
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
    alignItems: 'center',
    paddingBottom: 0
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center'
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
    borderWidth: 5,
    margin: 20,
    marginTop: 0,
    borderRadius: 2,
    backgroundColor: 'white',
    borderColor: PRIMARYCOLOR
  },
  viewredeem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 2
  },
  free: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold',
    marginTop: 5
  },
  iconClose: {
    backgroundColor: PRIMARYCOLOR,
    textAlign: 'right',
    padding: 10,
    color: '#FFFFFF',
    fontSize: 20
  },
  transferSection: {
    flexDirection: 'row'
  },
  iconTransfer: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalComponent: {
    margin: 18,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    elevation: 10,
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
    justifyContent: 'space-between'
  },
  button1: {
    margin: 6
  },
  buttonText1: {
    fontSize: 15
  },
  buttonUpload: {
    marginVertical: 12,
    alignSelf: 'center',
    borderRadius: 2,
    backgroundColor: '#FB8C00'
  }
});

export default styles;
