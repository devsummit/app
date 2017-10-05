import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  content: {
    marginTop: 40,
    marginBottom: 0
  },
  header: {
    height: 50,
    backgroundColor: '#FF8B00',
    paddingTop: (Platform.OS === 'ios') ? 10 : 0
  },
  pageTitle: {
    fontFamily: 'Montserrat',
    margin: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default styles;
