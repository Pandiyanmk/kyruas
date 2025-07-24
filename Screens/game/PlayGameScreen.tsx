/* ********************************************************************************************************************************
      NAME		: PlayGamescreen
      DESC		:	This code incorporates common functionality from the 'mode' and 'finish' modules, while also introducing new functionality.
      AUTHOR		: Pravin	
      CREATE DATE	: 10/3/2023	
      MODIFIED BY : Pravin
******************************************************************************************************************************** */
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image, TextInput, Modal, TouchableOpacity, Text, FlatList, Appearance, StyleSheet, Dimensions, Share, Alert } from 'react-native';
import { colors } from "../../Values/AppColores";
import { CommonButton } from "../../Global/Buttons";
import { CrossWordGame } from "../../Global/CrossWordGame";
import { SpotDifferenceGame } from "../../Global/SpotDifferenceGame";
import { RadioButton } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { onShare, useDarkMode, useKeyboard } from "../../utils/Extentions";
import { Contactnum } from "../../utils/Permissions";
import { cheersIcon, fontFamily } from "../../store/LocalDataStore"
import { CoinWordGame } from "../../Global/CoinWordGame";
import { userInformation } from "../../store/UserStorage";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlayGameScreen = ({ navigation, route }) => {
  // Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
  let style;
  style = getStyles()
  const theme = useSelector(state => state.appState.theme)
  
      useEffect(() => {
          colorScheme(theme)
          style = getStyles()
      }, [theme])
  const gameName = route.params?.gameName || '';
  const interest = route.params?.interest || '';
  console.log('Game Name:', gameName);
  console.log('Game Name:', interest);
  const isKeyboardOpen = useKeyboard();
  const isTeacher = userInformation.rolE_ID === 5
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("fromclass", isTeacher)
  const [coinwordlevel, setlevel] = useState();



  useEffect(() => {

    navigation.setOptions({ headerTitle: gameName })

  }, [])

  
  const [checked, setChecked] = useState("Single");


  const getGameLevel = async () => {
    try {
      const storedLevel = await AsyncStorage.getItem('gameLevel');
      if (storedLevel !== null) {
        const level = parseInt(storedLevel, 10);
        setlevel(level)
        console.log('Retrieved game level:', level);
        // Use the level variable as needed
      } else {
        console.log('No game level found');
      }
    } catch (error) {
      console.error('Error retrieving game level:', error);
    }
  };

  // Example usage
  getGameLevel();


  return (<View style={[style.viewBoxs,]}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* <Text style={[style.textStyle, { color: colorScheme() == 'dark' ? 'white' : colors.blue, fontFamily: 'Roboto' }]}>Level {coinwordlevel}</Text> */}
      <Text style={[style.textStyle, { color: colorScheme() == 'dark' ? 'white' : colors.blue, fontFamily: 'Roboto' }]}>
        {gameName === 'CoinWord' ? `Level ${coinwordlevel}` : 'Level'}
      </Text>
      {/* <CommonButton custom={style.gameTopButton} text="Level" onClick={() => console.log('Level')} /> */}
      <TouchableOpacity><Text style={[style.textStyle, {
        fontFamily: 'Roboto',
        color: colorScheme() == 'dark' ? 'white' : colors.blue,
      }]}>{checked}</Text></TouchableOpacity>
      {/* <CommonButton custom={style.gameTopButton} text="Mode" onClick={() => console.log('Mode')} /> */}
    </View>
    {/*"In this code, I am introducing the 'coinword' component." */}
    <View style={{ flex: 1, marginTop: 15, paddingBottom: 30}}>
      {gameName === 'Spot difference' ? (
        <SpotDifferenceGame />
      ) : gameName === 'Crossword' ? (
        <CrossWordGame isShow={gameName === "Crossword"} />
      ) : (
        <CoinWordGame interest_name={interest} navigation={navigation} />
      )}
    </View>
  </View>
  );
};

