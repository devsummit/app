import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingLeft: 3,
    paddingRight: 3
  },
  summary: {
    alignItems: 'center'
  },
  orderBtn: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
    justifyContent: 'center'
  },
  btnGroup: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  plusMinus: {
    padding: 8,
    borderColor: '#777',
    color: '#777',
    borderWidth: 1,
    borderRadius: 2,
    width: 26,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formInput: {
    paddingLeft: 20,
    height: 45,
    alignSelf: 'flex-start'
  },
  disabledFormInput: {
    paddingLeft: 20,
    height: 45,
    color: 'red',
    alignSelf: 'flex-start'
  },
  ticketCount: {
    minWidth: 25,
    textAlign: 'center',
    margin: 2,
    paddingTop: 3,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#777',
    color: '#777',
    height: 27
  },
  iconWrapper: {
    alignSelf: 'center',
  },
  title: {
    backgroundColor: 'orange',
    color: 'white',
    padding: 8,
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputStyle: {
    width: '90%',
    marginBottom: 10,
    borderColor: '#FFD740',
    borderWidth: 1,
    alignSelf: 'center'
  }
});
