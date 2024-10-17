import { styles } from "@/scripts/styles";
import React, { useState, useEffect } from "react";
import { Dimensions, Modal, Pressable, Text, Vibration, View, Switch, TouchableOpacity, SectionList, ScrollView, LogBox, Linking, Alert, ToastAndroid, Button, FlatList } from "react-native";
import { themes } from "./themes";
import { subThemes } from "./subThemes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';


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
const [timerObj, setTimerObj] = useState<any>(null);


const [needFontsReload, setNeedFontsReload] = useState(true);
const [toasterShown, setToasterShown] = useState(false);

const [currentUserConfig, setCurrentUserConfig] = useState<any>(null);


const [isSecondsVisible, setIsSecondsVisible] = useState<any>(null);
const toggleSecondsSwitch = () => {
  let newCurrentUserConfig = ({name: currentUserConfig.name, font: currentUserConfig.font, color: currentUserConfig.color, sizePerc: currentUserConfig.sizePerc, locked: currentUserConfig.locked, isSecondsVisible: !isSecondsVisible, is24hrFormat: currentUserConfig.is24hrFormat, isAwake: currentUserConfig.isAwake})
  setCurrentUserConfig(newCurrentUserConfig);
  modifyData("UserConfig", newCurrentUserConfig);

  setIsSecondsVisible((previousState: any) => !previousState);
  setTimerObj(currentUserConfig);
};

const [is24hrFormat, setIs24hrFormat] = useState<any>(null);
const toggle24hrSwitch = () => {
  let newCurrentUserConfig = ({name: currentUserConfig.name, font: currentUserConfig.font, color: currentUserConfig.color, sizePerc: currentUserConfig.sizePerc, locked: currentUserConfig.locked, isSecondsVisible: currentUserConfig.isSecondsVisible, is24hrFormat: !is24hrFormat, isAwake: currentUserConfig.isAwake})
  setCurrentUserConfig(newCurrentUserConfig);
  modifyData("UserConfig", newCurrentUserConfig);

  setIs24hrFormat((previousState: any) => !previousState);
  setTimerObj(currentUserConfig);
};


const [isKeepAwake, setIsKeepAwake] = useState<any>(null);
const toggleKeepAwakeSwitch = () => {
  if(!isKeepAwake)
  {
    activateKeepAwakeAsync();
  }
  else
  {
    deactivateKeepAwake();
  }

  let newCurrentUserConfig = ({name: currentUserConfig.name, font: currentUserConfig.font, color: currentUserConfig.color, sizePerc: currentUserConfig.sizePerc, locked: currentUserConfig.locked, isSecondsVisible: currentUserConfig.isSecondsVisible, is24hrFormat: currentUserConfig.is24hrFormat, isAwake: !isKeepAwake})
  setCurrentUserConfig(newCurrentUserConfig);
  modifyData("UserConfig", newCurrentUserConfig);

  setIsKeepAwake((previousState: any) => !previousState);
  setTimerObj(currentUserConfig);
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
const storeData = async (key: string,value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
const modifyData = async (key: string,value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

if(needFontsReload){
  getData("UserConfig").then((res)=>{
    if(res==null)
    {
      setCurrentUserConfig({name: 'Digital', font: 'Technology-Italic', color: 'red', sizePerc: 0.2, locked: false, isSecondsVisible: false, is24hrFormat: true, isAwake: true});
      storeData("UserConfig", currentUserConfig);
 
    }
    else
    {
      let newCurrentUserConfig = ({name: res.name, font: res.font, color: res.color, sizePerc: res.sizePerc, locked: res.locked, isSecondsVisible: res.isSecondsVisible, is24hrFormat: res.is24hrFormat, isAwake:res.isAwake})
      setCurrentUserConfig(newCurrentUserConfig) ;     
      setTimerObj({name: res.name, font: res.font, color: res.color, sizePerc: res.sizePerc, locked: res.locked});
      setIs24hrFormat(res.is24hrFormat);
      setIsSecondsVisible(res.isSecondsVisible);
      setIsKeepAwake(res.isAwake);

      if(res.isAwake)
        {
          activateKeepAwakeAsync();
        }
        else
        {
          deactivateKeepAwake();
        }

      setNeedFontsReload(false);

    
    };
    })
}
      
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

const showToast = () => {
  ToastAndroid.show('Touch and hold time indicator to open Settings !', ToastAndroid.SHORT);
};

const showToastLonger = () => {
  if(!toasterShown){
    setTimeout(() => {
      ToastAndroid.showWithGravity('Touch and hold time indicator to open Settings !', ToastAndroid.LONG, ToastAndroid.TOP);
    }, 1000);
    setToasterShown(true);
  }
};
showToastLonger();

function getSubThemes (name : string, isViewOnly : boolean) {  
  if(isViewOnly){
    return (
      <FlatList
      inverted
      style={styles.subThemesList}
      horizontal
      data={subThemes(name.toString())}
      renderItem={(subItem) => (                
            <Text style={[styles.subTheme, {backgroundColor: subItem.item, borderColor: timerObj.color, borderWidth: 0 }]} >     </Text>
      )}
    />)
  }else{
    return(
    <FlatList
      inverted
      style={styles.subThemesList}
      horizontal
      data={subThemes(name.toString())}
      renderItem={(subItem) => (
        <TouchableOpacity style={{flexDirection:'column'}} 
        onPress={()=>{
          let newCurrentUserConfig = ({name: currentUserConfig.name, font: currentUserConfig.font, color: subItem.item, sizePerc: currentUserConfig.sizePerc, locked: currentUserConfig.locked, isSecondsVisible: currentUserConfig.isSecondsVisible, is24hrFormat: currentUserConfig.is24hrFormat, isAwake: currentUserConfig.isAwake});
          setCurrentUserConfig(newCurrentUserConfig);
          modifyData("UserConfig", newCurrentUserConfig);
          setTimerObj(newCurrentUserConfig);
        }}>
            <Text style={[styles.subTheme,{backgroundColor:subItem.item, borderColor: timerObj.color, borderWidth: 2}]} >     </Text>
        </TouchableOpacity>
      )}
    />)
  }
  
}

if(timerObj!=null && is24hrFormat!= null && isSecondsVisible!=null && isKeepAwake!=null){


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
          <Text onLongPress={()=> {
            Vibration.vibrate(100); 
            setModalVisible(!modalVisible);
            }} 
            onPress={()=> showToast()}
            style={[styles.timerText, {fontSize: fixedHeight * 0.65 * timerObj.sizePerc * 1/0.2, fontFamily: timerObj.font, color: timerObj.color}]}>
            {/* {hr} : {min} */}
            12 : 12
          </Text>
          <Text onLongPress={()=> {
            Vibration.vibrate(100); 
            setModalVisible(!modalVisible);
            }} 
            onPress={()=> showToast()}
            style={[styles.timerTextSec, {display: isSecondsVisible? 'flex': 'none', width: fixedWidth * 0.95, fontSize: fixedHeight * 0.2 * timerObj.sizePerc * 1/0.2, fontFamily: timerObj.font, color: timerObj.color }]}>
            {sec}
          </Text> 
        </View>
  
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>

          <View style={styles.centeredView}>
            <View style={[styles.modalView, { opacity: modalThemeVisible? 0.01 : 1, borderColor: timerObj.color }]}>

            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.modalTextInside}>Show Seconds  </Text>
              <Switch
                trackColor={{false: '#767577', true: '#2196F3'}}
                thumbColor={isSecondsVisible ? timerObj.color : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSecondsSwitch}
                value={isSecondsVisible}
              />
            </View>
  
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.modalTextInside}>24 Hour Format  </Text>
              <Switch
                trackColor={{false: '#767577', true: '#2196F3'}}
                thumbColor={is24hrFormat ? timerObj.color : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggle24hrSwitch} 
                value={is24hrFormat}
              />
            </View>

            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.modalTextInside}>Keep Screen Awake  </Text>
              <Switch
                trackColor={{false: '#767577', true: '#2196F3'}}
                thumbColor={isKeepAwake ? timerObj.color : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleKeepAwakeSwitch} 
                value={isKeepAwake}
              />
            </View>
  
            <View style={[{flexDirection: 'row', flexWrap: 'wrap'}]}>
              <TouchableOpacity onPressIn={()=>{
                setModalThemeVisible(!modalThemeVisible);
              }}
              onPressOut={()=>{
                //setModalThemeVisible(!modalThemeVisible);
              }}>
              <View style={[styles.item, {width: fixedWidth * 0.4, borderWidth: 3, borderColor:'#2196F3', borderRadius: 20}]}>
                  <Text style={styles.selectedTheme} >☑ Selected</Text>
                  <Text style={[styles.themeTime, {fontFamily: timerObj.font, color: timerObj.color, fontSize: fixedHeight * timerObj.sizePerc}]} >{hr} : {min}</Text>
                  

                  <View style={{flexDirection: "row"}}>
                  <Text style={styles.themeName} >{timerObj.name}</Text>

                  {getSubThemes(timerObj.name, false)}

                  {/* <FlatList
                      inverted
                      style={styles.subThemesList}
                      horizontal
                      data={subThemes}
                      renderItem={(subItem) => (
                        <TouchableOpacity style={{display: (subItem.item.name == timerObj.name) ? 'flex':'none', flexDirection:'column'}} 
                        onPress={()=>{
                          let newCurrentUserConfig = ({name: currentUserConfig.name, font: currentUserConfig.font, color: subItem.item.color, sizePerc: currentUserConfig.sizePerc, locked: currentUserConfig.locked, isSecondsVisible: currentUserConfig.isSecondsVisible, is24hrFormat: currentUserConfig.is24hrFormat, isAwake: currentUserConfig.isAwake});
                          setCurrentUserConfig(newCurrentUserConfig);
                          modifyData("UserConfig", newCurrentUserConfig);
                          setTimerObj(newCurrentUserConfig);
                        }}>
                            <Text style={[styles.subTheme,{backgroundColor:subItem.item.color, borderColor: timerObj.color}]} >     </Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => item.id}
                    /> */}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
  
          <View style={{flexDirection: 'row'}}>
            <Pressable
                style={[styles.button, styles.buttonClose, {width: fixedWidth * 0.1, backgroundColor: timerObj.color}]}
                onPress={() => {
                  Linking.openURL('mailto:phantomhooklabs@gmail.com?subject=Regarding Nocturnal Clock'); 
                }}>
                <Text style={styles.textStyle}>  Feedback  </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, {width: fixedWidth * 0.3, backgroundColor: timerObj.color}]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>   Okay   </Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
  
  
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalThemeVisible}
          onRequestClose={() => {
            setModalThemeVisible(!modalThemeVisible);
          }}>
          <View style={[styles.centeredView2]}>
            <View style={{width: fixedWidth * 0.5, alignItems: 'flex-end'}}>
              <Text onPress={()=>setModalThemeVisible(false)} style={[styles.modalCloseBtn, {fontSize: fixedHeight * 0.03, color: timerObj.color,width: 'auto', borderWidth: 1, borderColor: timerObj.color, borderRadius: 15, paddingHorizontal: 10}]}>❌Close</Text>
            </View>

            <View style={[styles.modalView2, {height: fixedHeight * 0.8 ,width: fixedWidth * 0.5, borderColor: timerObj.color, borderBottomWidth: 2}]}>
  
            <ScrollView style={[{flexDirection: 'row', flexWrap: 'wrap', width: fixedWidth * 0.5, backgroundColor: 'black'}]}>
            <FlatList
              data={themes}
              keyExtractor={(item, index) => item.name + index}
              renderItem={({item}) => (
                
                <TouchableOpacity onPress={()=> {               
                  if(!item.locked){
                    setTimerObj(item);
                    setModalThemeVisible(!modalThemeVisible);
                    let newCurrentUserConfig = ({name: item.name, font: item.font, color: item.color, sizePerc: item.sizePerc, locked: item.locked, isSecondsVisible: currentUserConfig.isSecondsVisible, is24hrFormat: currentUserConfig.is24hrFormat, isAwake: currentUserConfig.isAwake});
                    setCurrentUserConfig(newCurrentUserConfig);
                    modifyData("UserConfig", newCurrentUserConfig);
                  }
                  else
                  {
                    Linking.openURL("market://details?id=com.phantomHookLabs.nocturnalClockPro");
                  }
                  }}>
                <View style={[styles.item, {width: fixedWidth * 0.5, borderWidth: (timerObj.font==item.font) ? 2 : 0, borderColor: timerObj.color, backgroundColor: item.locked? '#171717' : 'black'}]}>
                <Text style={[styles.Pro, {display: item.locked ? 'flex' : 'none'}]} >Pro Version 👑</Text>
                <Text style={[styles.Pro, {display: !item.locked ? 'flex' : 'none'}]} >Free</Text>
                <Text style={[styles.themeTime, {fontFamily: item.font, color: item.color, fontSize: fixedHeight * item.sizePerc}]} >{hr} : {min}</Text>
                  
                <View style={{flexDirection: 'row'}}>

                  <Text style={styles.themeName} >{item.name}</Text>
                  {getSubThemes(item.name, true)}

                  {/* <FlatList
                      inverted
                      style={styles.subThemesList}
                      horizontal
                      data={subThemes}
                      renderItem={(subItem) => (                
                            <Text style={[styles.subTheme,{display: (subItem.item.name == item.name) ? 'flex':'none',backgroundColor:subItem.item.color, borderColor: timerObj.color}]} >     </Text>
                      )}
                      keyExtractor={item => item.id}
                    /> */}
                </View>

                </View>
                </TouchableOpacity>
  
              )}
       
            />
            </ScrollView>
            </View>
          </View>
        </Modal>
  
  
      </View>
    );
  }
}

