import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 5;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    textAlign: 'center',
    flex: 9
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
  errorInput: {
    paddingLeft: 20,
    color: '#F44336'
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
    color: '#FFD740',
    marginLeft: -24
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
