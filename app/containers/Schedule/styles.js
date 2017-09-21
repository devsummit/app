import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        marginRight: 3,
        marginLeft: 3
    },
    cards: {
        flex:1,
        backgroundColor:'white',
        marginTop:5
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabs: {
        marginTop: -50,
    },
    tabHeading: {
        backgroundColor: 'transparent'
    },
    tabTitle: {
        fontSize: 16,
        color: "#FFF"
    },
    icon: {
      color: "#FFF"
    },
    tabBarSelectedItemStyle: {
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    }
});

export default styles;
