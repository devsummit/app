import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  bodySection: {
    flex: 1,
    flexDirection: 'row',
  },
  bigTextSection: {
    flex: 1
  },
  descriptionSection: {
    flex: 3
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  },
  descriptionText: {
    fontSize: 14,
    opacity: 0.5
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
  btnOpen: {
    alignSelf: 'center',
    width: '30%',
  }
});

export default styles;
