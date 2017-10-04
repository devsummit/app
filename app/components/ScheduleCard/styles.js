import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {flex: 0},
    date: {
        width: 80,
        height: 80,
        padding: 10,
        marginRight: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#FF6F00',
        alignItems: 'center',
    },
    speaker: {
      fontSize: 20,
    },
    title: {
      flex: 1,
      flexWrap: 'wrap'
    },
    type: {
      backgroundColor: '#FF6F00',
      padding: 4,
      fontSize: 12,
      color: '#FFF',
      borderRadius: 4
    },
    day : { fontSize: 20, fontWeight: '700', color: '#FF6F00' },
    month: { fontSize: 15, color: '#0D47A1' },
    eventTitle: { fontSize: 16, fontWeight: '700', marginBottom: 5 },
    description: { textAlign: 'justify' },
    smallText: { fontSize: 14, color: '#3a3a3a' },
    smallIcon: {fontSize: 16, color: '#0D47A1', flex: 1 },
    eventFooter: {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'},
    footerLabel: { fontWeight: '700', marginRight: 10 }
});

export default styles;
