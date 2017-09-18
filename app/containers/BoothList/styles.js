import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  btnBooth: {
    alignSelf: 'center',
    borderRadius: 20,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: -25
  },
  content: {
    marginTop: 20,
    marginHorizontal: 10
  },
  searchHeader: {
    marginTop: -30,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 50
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
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 50
  },
  name: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  job: {
    color: '#333',
    fontSize: 14,
    opacity: 0.8
  },
  summary: {
    color: '#333',
    paddingTop: 10
  },
  footerSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  seeMoreLine: {
    height: 1,
    opacity: 0.1,
    backgroundColor: 'black'
  },
  footerButton: {
    borderRadius: 50,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
