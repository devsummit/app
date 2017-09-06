import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)'
  },
  section1: {
    // flex: 1,
    alignItems: 'center',
    padding: 10
  },
  section2: {
    flex: 2,
    justifyContent: 'flex-start',
    marginBottom: 15,
    marginRight: 12
  },
  section3: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 16
  },
  username: {
    fontWeight: 'bold'
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 65,
    borderWidth: 1
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 6
  },
  buttonChangePass: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
    marginBottom: 6,
    justifyContent: 'center'
  },
  changePassText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#3366BB'
  },
  iconWrapper: {
    justifyContent: 'flex-end',
    margin: 8
  }
});

export default styles;
