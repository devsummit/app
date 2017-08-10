import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    color: 'white',
    opacity: 0.5,
    fontSize: 22
  },
  content: {
    marginTop: 40,
    marginBottom: 0
  },
  header: {
    
  },
  headerText: {
    alignItems: 'center',
    height: 100,
  },
  pageTitle: {
    fontFamily: 'Montserrat',
    margin: 12,
    fontSize: 18,
    color: 'white'
  },
  pointSection: {
    flex:1,
    flexDirection: 'row'
  },
  pointTitle: {
    color: 'white',
    fontSize: 12
  },
  points: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 22,
    color: 'yellow',
    marginBottom: 10
  },
  coin: {
    color: 'yellow',
    fontSize: 22
  }
});

export default styles;