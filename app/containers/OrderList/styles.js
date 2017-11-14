import { StyleSheet, Dimensions } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  item: {
    marginBottom: 10,
    borderColor: '#FFD740',
    borderWidth: 1
  },
  formInput: {
    paddingLeft: 20,
    height: 45,
    color: '#FFFFFF'
  },
  text: {
    flex: 3
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  buttonConfirm: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 6,
    backgroundColor: '#FF6F00',
    marginBottom: 6
  },
  roundButton: {
    borderRadius: 90,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    marginRight: 10
  },
  textButton: {
    color: 'white',
    alignSelf: 'center'
  },
  center: {
    flex: 2
  },
  right: {
    flex: 1,
    alignSelf: 'flex-end'
  },
  artwork: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height,
    marginTop: '-50%'
  },
  artworkText: {
    fontSize: 16,
    color: PRIMARYCOLOR,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center'
  },
  artworkTextConfirm: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  card: {
    flex: 1,
    backgroundColor: '#CFD8DC',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonClaim: {
    flex: 2,
    alignItems: 'center'
  },
  inviteField: {
    flex: 8,
    alignItems: 'center'
  },
  inviteDesc: {
    fontSize: 15,
    color: '#000000',
    marginBottom: 8
  },
  counterText: {
    fontSize: 14,
    marginBottom: 4
  },
  invite: {
    color: '#FFFFFF',
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 3,
    fontWeight: 'bold'
  },
  inviteDisable: {
    color: '#FFFFFF',
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
    borderRadius: 3,
    fontWeight: 'bold'
  },
  modalConfirm: {
    borderWidth: 5,
    margin: 20,
    borderRadius: 2,
    backgroundColor: 'white',
    borderColor: PRIMARYCOLOR
  },
  iconClose: {
    backgroundColor: PRIMARYCOLOR,
    textAlign: 'right',
    padding: 10,
    color: '#FFFFFF',
    fontSize: 20
  },
  viewModalConfirm: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 2
  },
  cardTicket: {
    position: 'relative',
    height: 100,
    margin: 5,
    padding: 10,
    marginTop: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#f8f8f8',
    backgroundColor: '#f8f8f8',
    elevation: 3,
    width: width * 0.45,
    alignSelf: 'center'
  }
});

export default styles;
