import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  content: {
    marginTop: -40,
    paddingLeft: 5,
    paddingRight: 5
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
  title: {
    color: '#333',
    fontSize: 16,
    marginVertical: 4
  },
  summary: {
    fontSize: 16,
    color: '#333'
  },
  material: {
    fontSize: 12,
    marginRight: 8
  },
  icon: {
    fontSize: 16,
    textAlign:'right',
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
  }
});

export default styles;
