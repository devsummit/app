import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  bodySection: {

  },
  profileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  profilePic: {
    height: 110,
    width: 110,
    borderRadius: 500
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    marginBottom: 12,
    fontSize: 17,
    fontWeight: 'bold'
  },
  jobSection: {
    margin: 10
  },
  jobTitle: {
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 10,
  },
  job: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    textAlign: 'justify'
  },
  content: {
    margin: 5
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    opacity: 0.1
  }
});

export default styles;
