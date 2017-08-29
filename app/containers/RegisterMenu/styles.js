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
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
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
  buttonSocialSection: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 5,
    marginBottom: 5
  },
  buttonSocial: {
    height: '100%',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
    flex: 0.3
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
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonSocialText: {
    textAlign: 'center',
    fontSize: 12
  },
  iconSocial: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    padding: 8
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
  },
  lineSection: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    marginRight: 18,
    marginLeft: 18,
    marginTop: 20,
    marginBottom: 20
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
  }
});

export default styles;
