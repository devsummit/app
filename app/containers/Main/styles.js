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
    backgroundColor: '#0D47A1',
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
    marginTop: 14,
    paddingBottom: 20,
    paddingTop: 20
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
  registerSection: {
    marginTop: 0
  },
  registerText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#3366BB'
  },
  registerTextBold: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#3366BB'
  }
});

export default styles;
