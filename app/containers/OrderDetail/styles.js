import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 2
  },
  leftMid: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 3
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    flex: 1,
    marginLeft: 12,
    fontSize: 30
  },
  buttonText: {
    marginRight: 12,
    fontWeight: 'bold'
  },
  orderId: {
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  text: {
    alignSelf: 'flex-end'
  },
  roundButton: {
    borderRadius: 90,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    marginRight: 10
  },
  btnCheckOut: {
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 6,
    marginHorizontal: 20
  },
  statusText: {
    flex: 1,
    fontSize: 12,
    borderRadius: 4,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonSubmit: {
    width: '97%',
    alignSelf: 'center'
  },
  image: {
    width: width * 0.8,
    height: 400,
    alignSelf: 'center'
  },
  pickerWrapper: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 3,
    margin: 10,
    width: '70%',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  littleText: {
    color: '#000',
    width: '70%',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    flex: 0.4,
    justifyContent: 'center',
    width: '70%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  roundButton: {
    borderRadius: 90,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    marginRight: 1
  },
  textButton: {
    color: 'white',
    alignSelf: 'center'
  },
  center: {
    flex: 2
  },
  right: {
    flex: 1,
    alignSelf: 'flex-end'
  },
  card: {
    flex: 1,
    backgroundColor: '#CFD8DC',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'column'
  },
  textTitle: {
    fontSize: 18,
    color: '#000000'
  },
  textTitleBold: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold'
  },
  noImageText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 5
  }
});

export default styles;
