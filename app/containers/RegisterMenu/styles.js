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
    marginBottom: 20
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    textAlign: 'center',
    flex: 9
  },
  picker: {
    margin: 12
  },
  labelText: {
    fontSize: 12,
    opacity: 0.6
  },
  icon: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18
  }
});

export default styles;
