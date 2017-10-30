import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  content: {
    marginTop: 40,
    marginBottom: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  notificationIcon: {
    elevation: 2,
    color: '#FFF',
    fontSize: 20
  }
});

export default styles;
