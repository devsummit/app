import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 5;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  background: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  logo: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  formSection: {
    marginTop: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    width: window.width - 30
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
    marginTop: 4,
    marginBottom: 4,
    borderWidth: 1,
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
    marginTop: 4,
    marginBottom: 4,
    flexDirection: 'row',
    flex: 1,
    height: 50
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
    color: '#FFD740'
  },
  buttonText: {
    textAlign: 'center',
    marginRight: 24,
    alignSelf: 'center',
    flex: 7,
    fontSize: 12
  },
  lineSection: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    margin: 8,
    backgroundColor: 'transparent'
  },
  lineTextThree: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    height: 1.5,
    marginTop: 8
  },
  lineTextFour: {
    textAlign: 'center',
    flex: 6,
    color: '#FFFFFF'
  },
  item: {
    marginBottom: 8,
    borderColor: '#FFD740',
    borderWidth: 2
  }
});
