import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)'
  },
  section1: {
    alignItems: 'center',
    padding: 10
  },
  section2: {
    flex: 2,
    justifyContent: 'flex-start',
    marginBottom: 15,
    marginRight: 12
  },
  input: {
    paddingLeft: 12
  },
  inputInfo: {
    height: 200,
    paddingLeft: 12,
    textAlignVertical: 'top'
  },
  inputJob: {
    height: 100,
    paddingLeft: 12,
    flexWrap: 'wrap',
    textAlignVertical: 'top'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageProfile: {
    alignSelf: 'center',
    marginTop: -50
  },
  errorInput: {
    paddingLeft: 20,
    color: '#FFFFFF'
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    alignSelf: 'center'
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
    alignItems: 'flex-end',
    marginRight: 20
  },
  points: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
    marginTop: -85,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  coin: {
    color: 'white',
    fontSize: 22,
  },
  pointSection: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default styles;
