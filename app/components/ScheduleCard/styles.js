import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0'
  },
  date: {
    flex: 1,
  },
  speaker: {
    fontSize: 20
  },
  title: {
    flex: 1,
    flexWrap: 'wrap'
  },
  type: {
    backgroundColor: '#FF6F00',
    padding: 4,
    marginTop: 8,
    fontSize: 12,
    color: '#FFF',
    borderRadius: 4,
    textAlign: 'center'
  },
  day: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6F00',
    textAlign: 'center'
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF6F00',
    textAlign: 'center'
  },
  month: { fontSize: 15, color: '#0D47A1' },
  eventTitle: { fontSize: 16, fontWeight: '700', marginBottom: 5 },
  description: { textAlign: 'justify' },
  smallText: { fontSize: 14, color: '#3a3a3a' },
  smallIcon: {fontSize: 16, color: '#0D47A1', flex: 1 },
  eventFooter: {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'},
  footerLabel: { fontWeight: '700', marginRight: 10 }
});

export default styles;
