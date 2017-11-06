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
    flex: 1,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  plusMinus: {
    padding: 8,
    alignSelf: 'center',
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 2
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
    margin: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#777'
  },
  textCount: {
    padding: 5,
    paddingTop: 4,
    paddingRight: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    color: '#777',
    fontSize: 20
  },
  iconWrapper: {
    alignSelf: 'center'
  },
  title: {
    backgroundColor: '#FF6F00',
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
    borderRadius: 4,
    marginBottom: 8
  },
  inputStyle: {
    width: '90%',
    marginBottom: 10,
    borderColor: '#FFD740',
    borderWidth: 1,
    alignSelf: 'center'
  }
});
