import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    paddingTop: 20
  },
  title: {
    fontSize: 18,
    backgroundColor: '#efefef',
    padding: 8,
    paddingLeft: 20,
    marginBottom: 20,
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    marginTop: 12,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    textAlign: 'center',
    flex: 9,
  },
  labelText: {
    fontSize: 12,
    opacity: 0.6
  },
  errorLabel: {
    color: 'red'
  },
  normalLabel: {
    color: 'grey'
  },
  normalLabelActive: {
    color: 'grey'
  },
  newPassValidator: {
    marginLeft: 20,
    fontSize: 12,
    color: 'red'
  },
  input: {
    paddingLeft: 20
  }
});

export default styles;
