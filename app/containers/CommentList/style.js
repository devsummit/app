import { StyleSheet } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  post: {
    flexDirection: 'row'
  },
  card: {
    borderRadius: 10,
    margin: 8
  },
  commentWrapper: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: 'row'
  },
  content: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 10
  },
  profileSection: {
    flex: 1
  },
  nameSection: {
    marginLeft: 16,
    flex: 7,
    justifyContent: 'center'
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  name: {
    color: '#333',
    fontSize: 14,
    fontWeight: '700'
  },
  text: {
    color: '#333',
    fontSize: 14
  },
  item: {
    marginBottom: 10,
    borderColor: '#000000'
  },
  input: {
    paddingLeft: 12
  },
  button: {
    paddingHorizontal: 12,
    backgroundColor: '#FF8B00',
    justifyContent: 'center',
    alignItems: 'center'
  },
  moreComments: {
    fontWeight: '700'
  }
});

export default styles;
