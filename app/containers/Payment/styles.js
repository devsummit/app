import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke'
  },
  text: {
    flex: 3
  },
  pickerWrapper: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 3,
    margin: 10,
    width: '70%',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  littleText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    flex: 0.4,
    justifyContent: 'center',
    width: '70%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  roundButton: {
    borderRadius: 90,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    marginRight: 1
  },
  textButton: {
    color: 'white',
    alignSelf: 'center'
  },
  center: {
    flex: 2
  },
  right: {
    flex: 1,
    alignSelf: 'flex-end'
  },
  card: {
    flex: 1,
    backgroundColor: '#CFD8DC',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'column'
  },
  textTitle: {
    fontSize: 18,
    color: '#000000'
  },
  textTitleBold: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold'
  },
  buttonPayment: {
    borderColor: '#BDBDBD',
    borderBottomWidth: 1
  }
});

export default styles;
