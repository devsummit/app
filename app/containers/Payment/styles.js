import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  text: {
    flex: 3
  },
  pickerWrapper: {
    borderColor: '#FFD740',
    borderWidth: 2,
    padding: 3,
    margin: 10,
    borderRadius: 50,
    width: '70%',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  littleText: {
    color: '#FFD740',
    width: '70%',
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    flex: 0.4,
    justifyContent: 'center',
    borderRadius: 30,
    width: '70%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
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
    alignSelf: 'flex-end',
  }
});

export default styles;
