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
    alignSelf: 'flex-end'
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
    minWidth: 25,
    textAlign: 'center',
    margin: 2,
    paddingTop: 3,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#777',
    height: 27
  }
});
