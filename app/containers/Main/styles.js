import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleText: {
    fontSize: 10.5,
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold'
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
  buttonSocialSection: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 5,
    marginBottom: 5
  },
  buttonSocial: {
    justifyContent: 'center',
    marginLeft: 5,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 5,
    flexDirection: 'row',
    elevation: 0,
    flex: 0.3
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
    marginRight: 'auto',
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
    marginRight: 18,
    marginLeft: 18,
    marginBottom: 5
  },
  lineTextOne: {
    flex: 4.5,
    backgroundColor: '#FFFFFF',
    height: 1.5,
    marginTop: 12
  },
  lineTextTwo: {
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF'
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
  loginMethod: {
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  registerSection: {
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
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f39e21'
  },
  item: {
    marginBottom: 10,
    borderColor: '#FFD740',
    borderWidth: 1
  },
});

export default styles;
