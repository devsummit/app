import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
    fontSize: 20
  },
  item: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  text: {
    flex: 5
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 90
  },
  refreshButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 90,
    margin: 20
  },
  buttonText: {
    textAlign: 'left',
    paddingRight: 5,
    flex: 7,
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  btnOrder: {
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: -25,
    elevation: 5,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  errorContent: {
    alignItems: 'center'
  },
  errorText: {
    fontSize: 14,
    marginTop: 12
  },
  tabs: {
    marginTop: -50,
  },
  tabHeading: {
    backgroundColor: 'transparent'
  },
  tabTitle: {
    fontSize: 16,
    color: "#FFF"
  },
  tabBarSelectedItemStyle: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  buttonShare: {
    fontSize: 16,
    color: '#0000ff'
  },
  textOption: {
    fontSize: 18,
    marginBottom: 30
  },
  modalComponent: {
    margin: 18,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 2
  },
  modalText: {
    marginLeft: 10
  }
});

export default styles;
