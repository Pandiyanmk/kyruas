/**
 *Homescreen.tsx
 *
 * The HomeScreen.tsx page serves as the main entry point, loading the home screen of the app..
 * 
 */
import React, { useEffect,useState} from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, Text, Button, BackHandler } from 'react-native';
import { colors } from '../../Values/AppColores';
import { colorScheme, style as getStyles } from '../../Values/AppStyles';
import { strings } from '../../Localization';
import { CommonButton } from '../../Global/Buttons';
import { TitleWithForward,TitleWithForwardGame } from '../../Components/TitleWithForward';
import { routes } from '../../Values/Routes';
import { ImageSlider } from '../../Components/ImageSlider';
import { games, images, learn} from '../../store/LocalDataStore';
import { GameItem, IconWithTitleInflate } from '../../Components/GameItem';
import { ScrollView } from 'react-native-gesture-handler';
import { getValue, userInformation } from '../../store/UserStorage';
import useBackHandler from '../../Global/BackHandler';
import { useIsFocused } from '@react-navigation/native';
import { getAPICall, postAPICall } from "../../Netowork/Apis"
import { StudentModule, TeacherModule,gameModule } from "../../Netowork/Constants"
import axios from 'axios';
import {useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const height = width * 100 / 60;
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
let style;

export const HomeScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
        }, [theme])

    useEffect(() => {
        getValue().then(it => {
            if (it) {
                userInformation.DBId = it.dbId
                userInformation.UserId = it.userid
                userInformation.AliasID=it.aliasId
                console.log("name",it.UserName);
                console.log("Homepage information",userInformation);

            }
        })
    }, [])

    //custom back handling
    // useBackHandler(() => {

    //     if (isFocused) {
    //         BackHandler.exitApp()
    //     } else {
    //         navigation.goBack()
    //     }
    //     return true;

    // });
    const [games, setGames] = useState([]);
    const [gamesname, setGamesName] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://mobapp.banyanpro.com/api/gameview/GetGameCategories');
        // const response = await axios.get('http://192.168.0.100:98/api/gameview/GetGameCategories');
          const gameCategoryList = response.data.GameCategoryList;
          setGames(gameCategoryList);
  
          // Extract game names and set the state
          const gameNames = gameCategoryList.map(game => game.game_name);
          setGamesName(gameNames);
          console.log(gameNames)
        } catch (error) {
          setError(error.message);
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

// Loading the database texts onto the new home Page carousel now.
    const [tamilQuotes, setTamilQuotes1] = useState([]);
    useEffect(() => {
      const AdvDate  = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
      console.log(AdvDate )
     const apiUrl = 'https://mobapp.banyanpro.com/api/gameview/GetHomescreencarousel'; // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    //   const apiUrl = 'http://192.168.1.5:98/api/gameview/GetHomescreencarousel'; 
      axios.post(apiUrl, { AdvDate:AdvDate})
        .then(response => {
            const transformedArray = response.data.homescreencarouselList
            const thirukkuralLines = transformedArray.map(obj => [obj.thirukkural]);
            const quotespath =transformedArray.map(obj => [obj.quotes_path]);
            const combinedArray = [thirukkuralLines, quotespath];
             console.log("thirukkural",combinedArray);
            setTamilQuotes1(combinedArray);
        })
        .catch(error => {
          console.error('Error fetching quotes:', error);
        });
    }, []);
    
    const homepagecarousel = tamilQuotes.flat();

    return (
        <View style={[style.viewBox, { paddingTop: 0, paddingBottom: 70 }]}>

            <ScrollView showsVerticalScrollIndicator={false}>
            {images && images.length > 0 && (
        <ImageSlider images={images} text={homepagecarousel} />
      )}

                <TitleWithForwardGame onClick={() => {
                    navigation.navigate(routes.game_landing_screen)

                }} />
                <View style={style.bottomContainer}>
                    <FlatList
                        data={gamesname}
                        renderItem={({ item, index }) => (
                            <IconWithTitleInflate color={colors.lightYellow} item={item} onClick={() => {
                                navigation.navigate(routes.gameinterest_screen, { gameName: item }) 
                            }} />
                        
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
                    />
                </View>
               {/* This functionality is planned for an upcoming build, so this particular build hides the components related to it. hide 25/03/2024 */}
                {/* <TitleWithForward title={strings.explore_to_learn} onClick={() => {
                    navigation.navigate(routes.course_landing_screen)

                }} /> */}

                {/* <View style={style.bottomContainer}>
                    <FlatList
                        data={learn}
                        renderItem={({ item, index }) => (

                            <IconWithTitleInflate item={item} color={colors.lightGreen} onClick={() => {
                                navigation.navigate(routes.course_landing_screen);
                            }} />

                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
                    />
                </View> */}

            </ScrollView>
            {/* <CommonButton text={strings.upgrade} onClick={() => {
                navigation.navigate(routes.paymentScreen)
            }} custom={style.absulateButton201} /> */}
        </View>
    );
};

