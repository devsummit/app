import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingLeft: 3,
    paddingRight: 3
  },
  summary: {
    flex: 3
  },
  orderBtn: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
    justifyContent: 'center'
  },
  btnGroup: {
    alignSelf: 'center',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  plusMinus: {
    padding: 8,
    borderColor: '#777',
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
    height: 27
  },
  iconWrapper: {
    flex: 1,
    alignSelf: 'center',
  }
});
