import { styles } from "@/scripts/styles";
import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Modal, Pressable, Text, Vibration, View, Switch, TouchableOpacity, SectionList, ScrollView, LogBox } from "react-native";
import { themes } from "./themes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

const [dt, setDt] = useState(new Date().toLocaleString());
const [yr, setYr] = useState(new Date().getFullYear().toLocaleString());
const [mnth, setMnth] = useState(new Date().getMonth().toLocaleString());
const [day, setDay] = useState(new Date().getDay().toLocaleString());
const [hr, setHr] = useState(parseInt(new Date().getHours().toLocaleString()) >= 10 ? (new Date().getHours().toLocaleString()) : ("0".concat(new Date().getHours().toLocaleString())) );
const [min, setMin] = useState(parseInt(new Date().getMinutes().toLocaleString()) >= 10 ? (new Date().getMinutes().toLocaleString()) : ("0".concat(new Date().getMinutes().toLocaleString())));
const [sec, setSec] = useState(parseInt(new Date().getSeconds().toLocaleString()) >= 10 ? (new Date().getSeconds().toLocaleString()) : ("0".concat(new Date().getSeconds().toLocaleString())));

const [orientation, setOrientation] = useState('LANDSCAPE');
const [modalVisible, setModalVisible] = useState(false);
const [modalThemeVisible, setModalThemeVisible] = useState(false);
const [timerObj, setTimerObj] = useState({name: 'Digital', font: 'Technology-Italic', color: 'red', sizePerc: 0.2, locked: false});

const [isSecondsVisible, setIsSecondsVisible] = useState(false);
const toggleSecondsSwitch = () => {
  setIsSecondsVisible(previousState => !previousState);
};

const [is24hrFormat, setIs24hrFormat] = useState(true);
const toggle24hrSwitch = () => {
  setIs24hrFormat(previousState => !previousState);
};

const [selectedTheme, setSelectedTheme] = useState('1');


useEffect(() => {
    let secTimer = setInterval( () => {
      var dateTime = new Date();
      setDt(dateTime.toLocaleString());
      setYr(dateTime.getFullYear().toLocaleString());
      setMnth(dateTime.getMonth().toLocaleString());
      setDay(dateTime.getDay().toLocaleString());

      let hours = is24hrFormat? dateTime.getHours().toLocaleString() : (((parseInt(dateTime.getHours().toLocaleString()) > 12) || (parseInt(dateTime.getHours().toLocaleString()) == 0)) ? Math.abs((parseInt(dateTime.getHours().toLocaleString())-12)).toLocaleString() : dateTime.getHours().toLocaleString());
      if(hours != hr){
        (parseInt(hours) >= 10) ? setHr(hours) : setHr("0".concat(hours));
      }
      (parseInt(dateTime.getMinutes().toLocaleString()) >= 10) ? setMin(dateTime.getMinutes().toLocaleString()): setMin("0".concat(dateTime.getMinutes().toLocaleString()));
      (parseInt(dateTime.getSeconds().toLocaleString()) >= 10) ? setSec(dateTime.getSeconds().toLocaleString()) : setSec("0".concat(dateTime.getSeconds().toLocaleString()));
    },1000)


    return () => clearInterval(secTimer);
}, [is24hrFormat]);

useEffect(() => {

  determineAndSetOrientation();
  var listener = Dimensions.addEventListener('change', determineAndSetOrientation);

  return () => {
    listener.remove();
  }
}, []);

useEffect(() => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

let fixedWidth = Dimensions.get('window').width;
let fixedHeight = Dimensions.get('window').height;

const determineAndSetOrientation = () => {
  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;

  if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
}



  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black" 
      }}
    >
      <View>
        <Text onLongPress={()=> {Vibration.vibrate(100); setModalVisible(!modalVisible);}} style={[styles.timerText, {fontSize: fixedHeight * 0.65 * timerObj.sizePerc * 1/0.2, fontFamily: timerObj.font, color: timerObj.color}]}>
          {hr} : {min}
        </Text>
        <Text onLongPress={()=> {Vibration.vibrate(100); setModalVisible(!modalVisible);}} style={[styles.timerTextSec, {display: isSecondsVisible? 'flex': 'none', width: fixedWidth * 0.95, fontSize: fixedHeight * 0.2, fontFamily: timerObj.font, color: timerObj.color }]}>
          {sec}
        </Text> 
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { opacity: modalThemeVisible? 0.01 : 1 }]}>
            <Text style={styles.modalText}>Clock Settings</Text>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={styles.modalTextInside}>Show seconds  </Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isSecondsVisible ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSecondsSwitch}
              value={isSecondsVisible}
            />
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={styles.modalTextInside}>24 Hour Format  </Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={is24hrFormat ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggle24hrSwitch} 
              value={is24hrFormat}
            />
          </View>

          <View style={[{flexDirection: 'row', flexWrap: 'wrap'}]}>
            <TouchableOpacity onPressIn={()=>{
              setModalThemeVisible(!modalThemeVisible);
            }}
            onPressOut={()=>{
              //setModalThemeVisible(!modalThemeVisible);
            }}>
              <Text style={styles.modalTextInside}>Selected Theme</Text>
            <View style={[styles.item, {width: fixedWidth * 0.3}]}>
                <Text style={[styles.themeTime, {fontFamily: timerObj.font, color: timerObj.color, fontSize: fixedHeight * timerObj.sizePerc}]} >{hr} : {min}</Text>
                <Text style={styles.themeName} >{timerObj.name}</Text>
              </View>
            </TouchableOpacity>
          </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>   Okay   </Text>
            </Pressable>

          </View>
        </View>
      </Modal>


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalThemeVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalThemeVisible(!modalThemeVisible);
        }}>
        <View style={styles.centeredView2}>
          <View style={[styles.modalView2, {height: fixedHeight * 0.8 ,width: fixedWidth * 0.5}]}>

          <ScrollView style={[{flexDirection: 'row', flexWrap: 'wrap', width: fixedWidth * 0.5, backgroundColor: 'black'}]}>
          <SectionList
            sections={themes}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({item}) => (
              <TouchableOpacity onPress={()=> {
                setTimerObj(item);
                setModalThemeVisible(!modalThemeVisible);
                }}>
              <View style={[styles.item, {width: fixedWidth * 0.5, borderWidth: (timerObj.font==item.font) ? 2 : 0, borderColor: timerObj.color}]}>
              <Text style={[styles.Pro, {display: item.locked ? 'flex' : 'none'}]} >Pro Version 👑</Text>
                <Text style={[styles.themeTime, {fontFamily: item.font, color: item.color, fontSize: fixedHeight * item.sizePerc}]} >{hr} : {min}</Text>
                
                <Text style={styles.themeName} >{item.name}</Text>
              </View>
              </TouchableOpacity>

            )}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
          </ScrollView>
          </View>
        </View>
      </Modal>


    </View>
  );
}
