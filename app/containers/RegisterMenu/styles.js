import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  content: {
    marginTop: 10
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
    marginBottom: 10,
    flex: 1,
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
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
    flex: 0.3
  },
  buttonSocialText: {
    textAlign: 'center',
    fontSize: 12
  },
  iconSocial: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18
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
  }
});

export default styles;
