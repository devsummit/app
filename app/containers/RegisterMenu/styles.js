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
  logo: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    flex: 1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    textAlign: 'center',
    flex: 9,
    marginRight: 24
  },
  buttonRegister: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
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
  icon: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18
  }
});

export default styles;
