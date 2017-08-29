import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    backgroundColor: '#FFA726',
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    textAlign: 'center',
    flex: 9
  },
  picker: {
    margin: 12,
    color: '#FFFFFF'
  },
  formSection: {
    marginTop: 8,
    marginRight: 18,
    marginLeft: 16
  },
  formInput: {
    paddingLeft: 20,
    color: '#FFFFFF'
  },
  item: {
    marginBottom: 10,
    borderColor: '#FFD740',
    borderWidth: 1
  },
  buttonRegister: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  registerText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  registerTextBold: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 8,
    color: '#FFD740'
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
