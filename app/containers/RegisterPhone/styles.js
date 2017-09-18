import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  title: {
    fontSize: 18,
    backgroundColor: '#efefef',
    padding: 8,
    paddingLeft: 20,
    marginBottom: 20
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
  item: {
    marginBottom: 10,
    borderColor: '#FFD740',
    borderWidth: 1
  },
  button: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#FFA726',
    borderColor: 'transparent',
    flexDirection: 'row',
    elevation: 0,
    flex: 1
  },
  buttonLoggin: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
    flex: 1,
    height: 50
  },
  buttonText: {
    textAlign: 'center',
    flex: 9,
    alignSelf: 'center'
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
