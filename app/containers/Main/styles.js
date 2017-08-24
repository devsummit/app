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
    paddingBottom: 5
  },
  logo: {
    height: 100,
    width: '100%'
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
    marginRight: 5,
    flexDirection: 'row',
    flex: 0.3
  },
  buttonSection: {
    marginTop: 8,
    paddingBottom: 10
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
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center'
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
  lineTextThree: {
    flex: 2,
    opacity: 0.1,
    backgroundColor: 'black',
    height: 1.5,
    marginTop: 12
  },
  lineTextFour: {
    textAlign: 'center',
    flex: 6,
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
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f39e21'
  },
  item: {
    marginBottom: 10
  }
});

export default styles;
