import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  icon: {
    fontSize: 20
  }
});

export default styles;
