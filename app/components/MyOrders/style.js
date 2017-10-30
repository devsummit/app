import { StyleSheet } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'transparent'
  },
  app: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000'
  },
  content: {
    fontSize: 16,
    color: '#000'
  },
  lastUpdated: {
    fontSize: 12,
    color: '#BDBDBD'
  },
  artworkText: {
    fontSize: 16,
    color: PRIMARYCOLOR,
    fontWeight: 'bold',
    marginTop: 20,
  },
  artwork: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
});

export default styles;
