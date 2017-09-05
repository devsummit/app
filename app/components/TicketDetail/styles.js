import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  summary: {
    flex: 3
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
  ticketCount: {
    minWidth: 40,
    textAlign: 'center',
    margin: 2,
    padding: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#777',
    fontSize: 20
  }
});
