import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  content: {
    marginTop: -40,
    paddingLeft: 5,
    paddingRight: 5
  },
  bodySection: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  profileSection: {
    flex: 2
  },
  nameSection: {
    marginLeft: 15,
    flex: 8
  },
  name: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  summary: {
    color: '#333',
    paddingTop: 10
  },
  footerSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  footerButton: {
    borderRadius: 50,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    alignSelf: 'center'
  },
  buttonSocialSection: {
    flex: 1,
    flexDirection: 'column',
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
    flex: 0.3,
    marginTop: 5,
  },
  buttonText: {
    textAlign: 'center',
    alignSelf: 'center'
  }
});

export default styles;
