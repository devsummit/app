import { StyleSheet, Dimensions } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  schedule: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    flex: 1
  },
  detail: {
    flex: 1
  },
  material: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20,
    backgroundColor: PRIMARYCOLOR,
    marginHorizontal: 8,
    padding: 16,
    textAlign: 'center'
  },
  background: {
    width,
    height: 200,
    marginBottom: 12
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  speakerDetail: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '700'
  },
  data: {
    marginBottom: 8
  },
  description: {
    fontSize: 16
  },
  speaker: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '500',
    marginTop: 8
  }
});

export default styles;
