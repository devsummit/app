import { StyleSheet, Dimensions } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  text: {
    flex: 3
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end'
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
    marginTop: 20,
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
    fontSize: 12,
    marginBottom: 4
  },
  invite: {
    color: '#FFFFFF',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'skyblue',
    fontWeight: 'bold'
  }
});

export default styles;
