import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CommonButton } from '../../Global/Buttons';
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { strings } from "../../Localization"
import { routes } from "../../Values/Routes"
import { colors } from "../../Values/AppColores";
import useBackHandler from '../../Global/BackHandler';
import { interests } from '../../store/LocalDataStore';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { userInformation } from "../../store/UserStorage"
import { useSelector } from 'react-redux';
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const InterestScreen = ({ navigation }) => {
  let style;
  style = getStyles()
  const theme = useSelector(state => state.appState.theme)
  
      useEffect(() => {
          colorScheme(theme)
          style = getStyles()
      }, [theme])

  const [selectedInterests, setSelectedInterests] = useState([]);
  // Function to handle interest selection
  const handleInterestSelection = (interest) => {
    if (selectedInterests.includes(interest)) {
      // Remove interest if already selected
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      // Add interest if not selected
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const showAlert = () => {

    Alert.alert("Message", selectedInterests.length < 3 ? "Please select at least 3 interest" : "You can select at least 3 interest at a time")

  }

  //custom back handling
  useBackHandler(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: routes.home_screen }],
    })

    return true;
  });



  const gotTo = (() => {
    if (selectedInterests.length < 3) {
      showAlert()
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: routes.home_screen }],
      })
    }
  })

  return (
    <View style={style.viewBox}>
      <ScrollView showsVerticalScrollIndicator={false} ><View style={{paddingBottom:60}}>
        <Text style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 40 }]}>{strings.appName}</Text>
        <Text style={[style.appNameStyle, style.for18, {
          marginTop: 60, marginBottom: 40,
          width: '100%', textAlign: 'center'
        }]}>{strings.i_am_interested_in}</Text>
        <View style={style.interestsContainer}>
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest}
              style={[
                style.interestButton,
                selectedInterests.includes(interest) && style.selectedInterestButton,
              ]}
              onPress={() => handleInterestSelection(interest)}
            >
              <Text
                style={[
                  style.textStyle,
                  selectedInterests.includes(interest) && style.selectedInterestText,
                ]}
              >
                {interest}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View></ScrollView>
      <CommonButton text={strings.submit} onClick={gotTo} custom={style.absulateButton20} />

    </View>
  );
};


export const InterestSelectionView = ({ }) => {
  let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interest, setinterest] = useState([]);
  const [error, setError] = useState("")
  const [interestNames, setInterestNames] = useState([]);
    const [editableInterestNames, setEditableInterestNames] = useState([]);

  useEffect(() => {
      const fetchDatas = async () => {
        try {
          const response = await axios.post('http://192.168.1.2:98/api/gameview/GetInterestData');
          const interestList = response.data.InterestCategoryList;
          const gameNames = interestList.map(it => it.interest_name);
          setinterest(gameNames)
        } catch (error) {
          setError(error.message);
          console.error(error);
        }
      };
  
      fetchDatas();
    }, []);

    
    const storeScoreInDatabase = async (user_id) => {
        const apiUrl = 'http://192.168.1.2:98/api/gameview/UserInterestMapping/';

        try {
            const response = await axios.post(apiUrl, { user_id }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const apiInterestNames = response.data.interestNames;
            setInterestNames(apiInterestNames )
            setEditableInterestNames(apiInterestNames);
        } catch (error) {
            console.error('Failed to store score in the database', error);
        }
    };


    useEffect(() => {
        const user_id = userInformation.UserId; // Replace with your actual logic to get the user ID
        storeScoreInDatabase(user_id);
    }, [userInformation.UserId]);
  

  // // Function to handle interest selection
  // const handleInterestSelection = (interest) => {
  //   if (selectedInterests.includes(interest)) {
  //     // Remove interest if already selected
  //     setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  //   } else {
  //     // Add interest if not selected
  //     setSelectedInterests([...selectedInterests, interest]);
     
  //   }
  // };

  const handleInterestSelection = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

 
 
  const showAlert = () => {

    Alert.alert("Message", selectedInterests.length < 3 ? "Please select at least 3 interest" : "You can select at least 3 interest at a time")

  }


  return <View style={style.interestsContainer}>
    {interests.map((interest) => (
      <TouchableOpacity
        key={interest}
        style={[
          style.interestButton,
          selectedInterests.includes(interest) && style.selectedInterestButton,
        ]}
        onPress={() => handleInterestSelection(interest)}
      >
        <Text
          style={[
            style.textStyle,
            selectedInterests.includes(interest) && style.selectedInterestText,
          ]}
        >
          {interest}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
}