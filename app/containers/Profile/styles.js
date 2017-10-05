import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)'
  },
  section: {
    alignItems: 'center',
    padding: 10
  },
  section3: {
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
    marginVertical: 20,
    // marginLeft: 17,
    elevation: 5
  },
  errorInput: {
    paddingLeft: 20,
    color: '#FFFFFF'
  },
  section4: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 16
  },
  username: {
    fontWeight: 'bold',
    // textAlign: 'center',
    marginBottom: 12
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    alignSelf: 'center',
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FF8B00',
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
    marginRight: 20,
    marginBottom: 8
  },
  points: {
    // flex: 1,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FF8B00',
  },
  yourPoints: {
    // flex : 4,
    alignSelf: 'center',
  },
  coin: {
    color: '#FF8B00',
    fontSize: 22
  },
  section1: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section2: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    // marginLeft: 10
  },
  sectionPoints: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  sectionImage: {
    flex: 2.8,
    justifyContent: 'flex-start',
  },
});

export default styles;
