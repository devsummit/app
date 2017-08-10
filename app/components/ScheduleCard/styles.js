import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {flex: 0},
    date: {
        width: 80,
        height: 80,
        padding: 10,
        marginRight: 20,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: '#0D47A1',
        alignItems: 'center',
    },
    day : { fontSize: 25, fontWeight: '700', color: '#0D47A1' },
    month: { fontSize: 15, color: '#0D47A1' },
    eventTitle: { fontSize: 16, fontWeight: '700', marginBottom: 5 },
    description: { textAlign: 'justify' },
    smallText: { fontSize: 14, color: '#3a3a3a' },
    smallIcon: {fontSize: 14, color: '#0D47A1'},
    eventFooter: {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'},
    footerLabel: { fontWeight: '700', marginRight: 10 }
});

export default styles;