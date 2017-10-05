import { StyleSheet } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1
  },
  cards: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 5
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabHeading: {
    backgroundColor: '#FF6F00'
  },
  tabTitle: {
    fontSize: 16,
    color: "#FFF"
  },
  icon: {
    color: "#FFF"
  },
  tabBarSelectedItemStyle: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  artworkText: {
    fontSize: 16,
    color: PRIMARYCOLOR,
    fontWeight: 'bold',
    marginTop: 20
  }
});

export default styles;
