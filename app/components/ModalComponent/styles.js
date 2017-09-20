import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalComponent: {
    margin: 18,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    elevation: 10,
    borderRadius: 2
  },
  modalTitle: {
    marginLeft: 15,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18
  },
  inputItem: {
    marginRight: 15
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    margin: 6
  },
  buttonText: {
    fontSize: 15
  },
  buttonUpload: {
    marginVertical: 12,
    alignSelf: 'center',
    backgroundColor: '#FB8C00'
  }
})

export default styles;
