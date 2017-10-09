import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  monthPicker: {
    width: 100,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  yearPicker: {
    width: 100,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  container: {
    backgroundColor: '#fff'
  },
  text: {
    color: '#000',
    width: '90%',
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    flex: 0.4,
    justifyContent: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  roundButton: {
    borderRadius: 90,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    marginRight: 10
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
  },
  item: {
    marginBottom: 10,
    borderColor: '#000000',
    borderWidth: 1
  },
  datePicker: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.7,
    borderColor: '#000',
    width: '90%',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export default styles;
