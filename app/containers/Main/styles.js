import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)',
    flex: 1
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 25,
    paddingTop: 25,
    marginBottom: 5
  },
  logo: {
    height: 60,
    width: 60
  },
  titleText: {
    fontSize: 10.5,
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold'
  },
  formSection: {
    marginRight: 20,
    marginLeft: 3
  },
  icon: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18
  },
  buttonSection: {
    marginTop: 8,
    paddingBottom: 10,
    paddingTop: 10,
  },
  button: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
    flex: 1
  },
  buttonRegister: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
    marginBottom: 6,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    paddingRight: 26,
    flex: 7
  },
  lineSection: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5
  },
  lineTextOne: {
    flex: 4.5,
    opacity: 0.1,
    backgroundColor: 'black',
    height: 1.5,
    marginTop: 12
  },
  lineTextTwo: {
    textAlign: 'center',
    flex: 1,
    opacity: 0.3
  },
  loginMethod: {
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  registerSection: {
  },
  registerText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#3366BB'
  },
  registerTextBold: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#3366BB'
  }
});

export default styles;
