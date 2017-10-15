import { StyleSheet } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  content: {
    color: 'grey',
    marginVertical: 10
  },
  title: {
    fontWeight: 'bold'
  },
  mainMessage: {
    flexDirection: 'column',
    flex: 2
  },
  bodySection: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  profileSection: {
    flex: 2
  },
  nameSection: {
    marginLeft: 15,
    flex: 8
  },
  sender: {
    color: PRIMARYCOLOR,
    fontWeight: 'bold'
  },
  loader: {
    margin: 20
  },
  photo: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  noMaterial: {
    fontSize: 16,
    padding: 8
  },
  name: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    backgroundColor: 'black',
    marginTop: 5,
    height: 1,
    width: '100%'
  },
  summary: {
    fontSize: 16,
    color: '#333'
  },
  material: {
    fontSize: 12,
    marginRight: 8
  },
  materialUrl: {
    flexDirection: 'row',
    paddingRight: 8
  },
  footerSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  footerButton: {
    borderRadius: 50,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  artwork: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  artworkText: {
    fontSize: 16,
    color: PRIMARYCOLOR,
    fontWeight: 'bold',
    marginTop: 20
  }
});

export default styles;
