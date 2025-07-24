import { View, Button, Image, TextInput, TouchableOpacity, Text, FlatList, Appearance, StyleSheet, Dimensions,Modal } from "react-native"
import { strings } from "../Localization"
import { colorScheme, style as getStyles } from "../Values/AppStyles"
import { colors } from "../Values/AppColores"
import React, { useState, useEffect } from 'react';
import { fontFamily,cheersIcon } from "../store/LocalDataStore";
import { GameprogressView } from "./Modales";
import { getAPICall, postAPICall } from "../Netowork/Apis"
import { onShare, useDarkMode, useKeyboard } from "../utils/Extentions";
import { CommonButton } from "../Global/Buttons";
import { StudentModule, TeacherModule } from "../Netowork/Constants"
import { useSelector } from 'react-redux';
import axios from "axios";

// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings

export const CrossWordGame = ({ isShow = false }) => {
  let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    const isKeyboardOpen = useKeyboard();
    const [text, setText] = useState('');
    const [listData, setListData] = useState([""]);
    const [data, setData] = useState([]);
    const [apiData, setApiData] = useState(null);
    const [gameFinish, setfinish] = useState(false);
    // Declare a state variable of finish button  and its initial value is false
    const [newgame, setnew] = useState(false);
    // Declare a state variable of score card  and its initial value is false
    const [scorecard, setscorecode] = useState(false);


    const handleSend = () => {
        if (text.trim() !== '') {
            setListData(prevData => [...prevData, text]);
            setText('');
        }
    };

    const windowWidth = Dimensions.get('window').width;

    const RenderItem = ({ item }) => {
        const containerWidth = windowWidth * 0.25; // Adjust the percentage as needed

        return (
            <View style={[style.gameitemContainer, { width: containerWidth }]}>
                <Text style={[style.textStyle]}>{item}</Text>
            </View>
        );
    };
    return <View>
        <View style={{ width: '100%', height: 260, overflow: 'hidden', borderWidth: 1 }}>
            {/* <Image source={{ uri: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                style={{ width: '100%', height: 240, overflow: 'hidden' }} resizeMode="stretch" /> */}

            {/* <ProgressView/> */}
        </View>


        {
            isShow ? <View>
                <Text style={[style.appNameStyle, {
                    marginTop: 25,
                    fontSize: 16
                }]}>Top to Bottom</Text>
                <Text style={[style.shadowCard, style.gameEditTex, {
                    color: 'black',
                    marginTop: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    fontFamily: fontFamily.robotoRegular,
                    fontSize: 16
                }]}>1. Sample word clue</Text></View> : null}


        <View style={[style.shadowCard, style.gameEditTex, { marginTop: isShow ? 15 : 25, marginBottom: 15 }]}>


            <TextInput
                style={[style.textStyle, {
                    flex: 1,
                    padding: 10,
                    color: 'black'
                }]}
                placeholder="Type Something....."
                placeholderTextColor={'grey'}
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity
                onPress={handleSend}
            >
                <Image source={require('../assets/images/send.png')}
                    style={[{
                        tintColor: 'black',
                        height: 24,
                        width: 24,
                        marginEnd: 10
                    }]} />
            </TouchableOpacity>
        </View>
        {
            listData.map((it) => (
                <RenderItem item={it} />
            ))
        }
        {/* <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        /> */}
        
{!isKeyboardOpen ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
      <CommonButton custom={style.gameBottomButton} text="Finish" onClick={() => {
        setfinish(true)
      }} />
      {/*In this code, I have implemented the Finish functionality */}
      <Modal animationType='slide' transparent={true} visible={gameFinish}>
        <View style={style.finishcontainer}>
          <View style={style.finishmodalBox}>
            <Text style={style.modalText}>Are you certain you wish to finish?</Text>
            <View style={style.Finishbuttons}>
              <TouchableOpacity style={style.closeButton} onPress={() => setfinish(false)}>
                <Text style={style.closeButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.closeButton} onPress={() => setscorecode(true)}>
                <Text style={style.closeButtonText}>Yes</Text>
              </TouchableOpacity>
              <Modal animationType='slide' transparent={true} visible={scorecard}>
                <View style={style.scorecode}>
                  <View style={style.scoremodalBox}>
                    <Text style={style.yourscore}>your Score</Text>
                    <Text style={style.point}>8/10</Text>
                    <Image source={cheersIcon} style={{ height: 120, width: 120, marginLeft: 60, marginTop: 10 }} />
                    <Text style={style.gametext}>You have successfully completed level</Text>
                    <TouchableOpacity style={style.donebtn} onPress={() =>
                      navigation.goBack()
                    }>
                      <Text style={style.doneButtonText}>DONE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </Modal>
      {/*In this code, I have implemented the New Game functionality */}
      <CommonButton custom={style.gameBottomButton} text="New" onClick={() => {
        // navigation.goBack()
        setnew(true)
      }} />
      <Modal animationType='slide' transparent={true} visible={newgame}>
        <View style={style.finishcontainer1}>
          <View style={style.finishmodalBox1}>
            <Text style={style.remainingword}>Just  more words, and victory is yours in the game!</Text>
            <Text style={style.modalText1}>Do you really wish to begin a new game?</Text>
            <View style={style.Finishbuttons}>
              <TouchableOpacity style={style.closeButton} onPress={() => setnew(false)}>
                <Text style={style.closeButtonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.closeButton}>
                <Text style={style.closeButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View> : null}
    </View>
}