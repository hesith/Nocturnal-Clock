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
        backgroundColor: 'black',
        borderRadius: 20,
        borderWidth: 2,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        marginTop: 10,
        marginLeft: 5
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        //backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white'
      },
      modalTextInside: {
        textAlign: 'center',        
        color: 'white'
      },
      item: {
        padding: 5,
        marginVertical: 0,
        textAlign: 'center',
      },
      modalCloseBtn: {
        textAlign: 'right',        
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
        textAlignVertical: 'center'
      },
      subThemesList: {
        fontSize: 12,
        textAlign: 'right',
        color: 'grey',
        flex: 1,
      }, 
      subTheme: {
        fontSize: 12,
        marginHorizontal: 5,
        borderRadius: 50,
        borderWidth: 2
      },
      Pro: {
        fontSize: 12,
        textAlign: 'right',
        color: 'grey',
        alignContent:'center'
      },
      selectedTheme: {
        fontSize: 12,
        textAlign: 'right',
        color: '#2196F3',
        alignContent:'center'
      },
      modalView2: {
        backgroundColor: '#171717',
        borderRadius: 5,
        padding: 12,
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