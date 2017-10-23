import { StyleSheet } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)'
  },
  btnModal: {
    alignSelf: 'center',
    borderRadius: 20,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 10
  },
  section1: {
    alignItems: 'center',
    padding: 10
  },
  section2: {
    flex: 2,
    justifyContent: 'flex-start',
    margin: 20
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
  imageProfile: {
    alignSelf: 'center',
    marginTop: -50,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto'
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
    width: 110,
    height: 110,
    borderRadius: 65,
    borderWidth: 1,
    alignSelf: 'center'
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 6,
    backgroundColor: '#FF6F00',
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
  modal: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'whitesmoke'
  },
  version: {
    textAlign: 'center',
    marginTop: 10
  },
  inputItem: {
    height: 130,
    flexWrap: 'wrap',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: PRIMARYCOLOR
  },
  item: {
    borderColor: PRIMARYCOLOR
  },
  parentView: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: ('rgba(0, 0, 0, 0.5)')
  },
  textStyle: {
    backgroundColor: PRIMARYCOLOR,
    alignSelf: 'center',
    color: 'white',
    padding: 8
  },
  textFeedback: {
    alignSelf: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  viewInput: {
    height: 215,
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    borderWidth: 5,
    borderTopWidth: 0,
    borderColor: PRIMARYCOLOR
  },
  iconClose: {
    backgroundColor: PRIMARYCOLOR,
    textAlign: 'right',
    padding: 10,
    color: '#FFFFFF',
    fontSize: 20
  },
  viewHeader: {
    backgroundColor: PRIMARYCOLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default styles;
