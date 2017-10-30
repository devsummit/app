import { StyleSheet, Dimensions } from 'react-native';
import { PRIMARYCOLOR } from '../../constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  btnBooth: {
    alignSelf: 'center',
    width: '70%',
    margin: 20,
    backgroundColor: '#FF6F00',
    justifyContent: 'center',
    borderRadius: 5
  },
  btnDownload: {
    backgroundColor: '#F44336',
    alignSelf: 'center',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center'
  },
  btnModal: {
    backgroundColor: '#9E9E9E',
    alignSelf: 'center',
    width: '37%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 10
  },
  formSection: {
    marginTop: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    width: window.width - 30
  },
  formInput: {
    paddingLeft: 20,
    height: 45,
    color: 'black'
  },
  item: {
    marginBottom: 8,
    borderColor: '#FFD740',
    borderWidth: 2
  },
  content: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 10
  },
  modalInfo: {
    borderWidth: 5,
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 2,
    backgroundColor: 'white',
    borderColor: PRIMARYCOLOR
  },
  iconClose: {
    backgroundColor: PRIMARYCOLOR,
    textAlign: 'right',
    padding: 10,
    margin: -20,
    marginBottom: 10,
    color: '#FFFFFF',
    fontSize: 20
  },
  searchHeader: {
    backgroundColor: 'rgb(255,255,255)',
    marginBottom: 8,
    elevation: 5
  },
  bodySection: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  profileSection: {
    flex: 1,
    flexDirection: 'row'
  },
  nameSection: {
    marginLeft: 16,
    flex: 8,
    justifyContent: 'center'
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  profilePic2: {
    height: 150,
    width: 150,
    borderRadius: 25,
  },
  name: {
    color: '#333',
    fontSize: 16,
    fontWeight: '300'
  },
  job: {
    color: '#333',
    fontSize: 14,
    opacity: 0.8
  },
  summary: {
    color: '#333',
    marginTop: 8
  },
  footerSection: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: 20
  },
  seeMoreLine: {
    height: 1,
    opacity: 0.1,
    backgroundColor: 'black'
  },
  footerButton: {
    borderRadius: 10,
    height: 35,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemNameSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
});

export default styles;
