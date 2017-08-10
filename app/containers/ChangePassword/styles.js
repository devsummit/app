import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
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
    margin: 8,
    marginLeft: 16,
    fontSize: 12,
    color: 'red'
  } 
});

export default styles;