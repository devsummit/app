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
  formSection: {
    marginTop: 8,
    marginRight: 18,
    marginLeft: 16
  },
  formInput: {
    paddingLeft: 20,
    height: 45,
    color: '#FFFFFF'
  },
  icon: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    alignSelf: 'center'
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
  buttonRegister: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonText: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingRight: 26,
    flex: 7
  },
  lineSection: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    margin: 12
  },
  lineTextThree: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    height: 1.5,
    marginTop: 12
  },
  lineTextFour: {
    textAlign: 'center',
    flex: 6,
    color: '#FFFFFF'
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
  }
});

export default styles;
