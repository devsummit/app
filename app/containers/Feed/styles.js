import { StyleSheet, Dimensions } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
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
    marginRight: 'auto'
  },
  errorContent: {
    alignItems: 'center'
  },
  errorText: {
    fontSize: 14,
    marginTop: 12
  },
  tabs: {
  },
  tabHeading: {
    flex: 1,
    backgroundColor: '#FF6F00'
  },
  tabTitle: {
    fontSize: 16,
    color: '#FFF'
  },
  tabBarSelectedItemStyle: {
    borderBottomWidth: 2,
    borderBottomColor: 'red'
  },
  buttonShare: {
    fontSize: 16,
    color: '#0000ff'
  },
  buttonReport: {
    fontSize: 15,
    padding: 8,
    textAlign: 'center',
    color: '#000',
    opacity: 0.5
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
  },
  images: {
    height: 200,
    width: width * 0.7
  },
  artworkText: {
    fontSize: 16,
    color: PRIMARYCOLOR,
    fontWeight: 'bold',
    marginTop: 20
  }
});

export default styles;
