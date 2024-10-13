import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    timerText:{
    },
    timerTextSec:{
        textAlign: 'right'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      modalTextInside: {
        textAlign: 'center',
      },
      
      item: {
        backgroundColor: '#171717',
        padding: 5,
        marginVertical: 0,
        textAlign: 'center',
      },
      header: {
        fontSize: 24,
        backgroundColor: '#fff',
        textAlign: 'center',
        display: 'none'
      },
      themeTime: {
        textAlign: 'center',
        marginTop: 5
      },
      themeName: {
        fontSize: 12,
        textAlign: 'left',
        color: 'grey',
      },
      Pro: {
        fontSize: 12,
        textAlign: 'right',
        color: 'grey',
        alignContent:'center'
      },
      modalView2: {
        backgroundColor: '#171717',
        borderRadius: 5,
        padding: 2,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      centeredView2: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }
});