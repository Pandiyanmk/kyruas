import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles} from "../../Values/AppStyles"
import { useEffect, useState, useCallback } from "react"
import { routes } from "../../Values/Routes"
import { URI, avatar2, fontFamily, game_crossword, gamesDetails, teacherList, trophy } from "../../store/LocalDataStore"
import { black } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors"
import { colors } from "../../Values/AppColores"
import { CommonButton } from "../../Global/Buttons"
import * as Progress from 'react-native-progress';
import { Card } from "react-native-paper"
import { userInformation } from "../../store/UserStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { useSelector } from 'react-redux';
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const GameDashboardScreen = ({ navigation }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
       
    //const interest= route.params?.interest || '';
    const [gamePoints, setGamePoints] = useState(0);
    const [userPhoto, setUserPhoto] = useState(null); // Add state for user photo
    const [levels, setlevel] = useState();
    const storeScoreInDatabase = async (user_id) => {
        const apiUrl = 'https://mobapp.banyanpro.com/api/gameview/GetRewardScore/';

        try {
            const response = await axios.post(apiUrl, { user_id }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Score stored successfully!', response.data.rewardscore);
            setGamePoints(response.data.rewardscore)
        } catch (error) {
            console.error('Failed to store score in the database', error);
        }
    };
    // ...

    useEffect(() => {
        const user_id = userInformation.UserId; // Replace with your actual logic to get the user ID
        storeScoreInDatabase(user_id);
        // Retrieve user photo from AsyncStorage
        const getUserPhoto = async () => {
            try {
                const storedUserPhoto = await AsyncStorage.getItem('userPhoto');
                console.log('Stored User Photo:', storedUserPhoto);
                setUserPhoto(storedUserPhoto || null);
            } catch (error) {
                console.error('Error retrieving user photo from AsyncStorage', error);
            }
        };

        getUserPhoto();


    }, []);

    const [interestNames, setInterestNames] = useState(["Tamil"]);
    const storeScoreInDatabases = async (user_id) => {
        const apiUrl = 'https://mobapp.banyanpro.com/api/gameview/UserInterestMapping/';
       //const apiUrl = 'http://192.168.0.100:98/api/gameview/UserInterestMapping/';
        try {
            const response = await axios.post(apiUrl, { user_id }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const apiInterestNames = response.data.interestNames;
            const mergedInterests = Array.from(new Set([...interestNames, ...apiInterestNames]));
            setInterestNames(mergedInterests)
        } catch (error) {
            console.error('Failed to interest the database', error);
        }
    };


    useEffect(() => {
        const user_id = userInformation.UserId; // Replace with your actual logic to get the user ID
        storeScoreInDatabases(user_id);
    }, [userInformation.UserId]);
  
    const [gamesname, setGamesName] = useState([]);
    const [games, setGames] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://mobapp.banyanpro.com/api/gameview/GetGameCategories');
          // const response = await axios.get('http://192.168.0.100:98/api/gameview/GetGameCategories');
            const gameCategoryList = response.data.GameCategoryList;
            setGames(gameCategoryList);
    
            // Extract game names and set the state
            const gameNames = gameCategoryList.map(game => ({ title: game.game_name }));
setGamesName(gameNames);
            console.log(gamesname)
          } catch (error) {
            setError(error.message);
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

      


    return <View style={[style.viewBox]}>

        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            {userPhoto !== null ? (
                <Image
                    source={{ uri: userPhoto }}
                    style={{ height: 80, width: 80, borderRadius: 40 }}
                />
            ) : (
                <Image
                    source={require('../../assets/images/user_profile.png')}
                    style={{ height: 80, width: 80, borderRadius: 40, tintColor: colorScheme() == "dark" ? 'white' : 'black' }}
                />
            )}
            <Text style={[style.textStyle, { fontFamily: 'Roboto', fontSize: 22, marginTop: 2 }]}>{userInformation.UserName}</Text>
        </View>
        <GameDashboardRewardItem gamePoints={gamePoints} onClick={() => { }} />

        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 10 }}>
             {/*25/03/2024 - Pravin  */}
        {/* This functionality is planned for an upcoming build, so this particular build hides the components related to it. hide 25/03/2024 */}
            {/* <CommonButton text={strings.statics} onClick={() => { }} custom={style.gameDashboardButton} />
            <CommonButton text={strings.friends} onClick={() => { }} custom={style.gameDashboardButton} /> */}
        </View>

        {/* <FlatList
            data={gamesname}
            renderItem={({ item, index }) => (
                <GameDashboardLevelProgressItem item={item.title} onClick={() => {
                    navigation.navigate(routes.play_game_screen, { gameName: item.title })
                }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        /> */}
    </View>
}


export const GameDashboardRewardItem = ({ gamePoints, onClick }) => {
    
    let style;
    style = getStyles()
    return <Card style={[style.homework, { alignItems: "center", padding: 8 }]}><View style={[style.homework, { alignItems: "center" }]}>

        <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={trophy} style={{ height: 64, width: 64 }} />
            <Text style={{
                color: 'black', fontFamily: fontFamily.robotoBold, fontSize: 18,
            }}>GameScore {gamePoints}</Text>
        </View>
        {/*25/03/2024 - Pravin  */}
 {/* This functionality is planned for an upcoming build, so this particular build hides the components related to it. hide 25/03/2024 */}
        {/* <TouchableOpacity onPress={onClick} style={style.gameDashboardRewardItmeCliam}>
            <Text style={[style.textStyle, { color: colors.white }]}>{strings.claim} </Text>
        </TouchableOpacity> */}
    </View></Card>
}


// export const GameDashboardLevelProgressItem = ({ item, onClick }) => {
//     let style;
// style = getStyles()
//     const [showTopicDetail, setShowTopicDetail] = useState(false)
    
// // 2024-03-31 - Pravin 
// // The updated approach for implementing the AJAX call to retrieve the progress bar.
//    const[gameprogress,setGameProgress]=useState([])
//     const storeScoreInDatabase = async (user_id) => {
//     const apiUrl = 'https://mobapp.banyanpro.com/api/gameview/GetProgressBar/';
//     // const apiUrl = 'http://192.168.1.5:98/api/gameview/GetProgressBar/';
//         try {
//             const response = await axios.post(apiUrl, { user_id }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             // console.log('Interest stored successfully!', response.data.progresslist);
//             setGameProgress(response.data.progresslist)
//         } catch (error) {
//             console.error('Failed to interest the database', error);
//         }
//     };


//     useEffect(() => {
//         const user_id = userInformation.UserId; // Replace with your actual logic to get the user ID
//         storeScoreInDatabase(user_id);
//     }, [userInformation.UserId]);

//     const gamesData1 = [
//         { name: 'Coinword', level: 3, interest: 'Tamil', progress: 0.85 },
//         { name: 'Coinword', level: 1, interest: 'Music', progress: 0.75 },
//         // Add more game data objects as needed
//     ];

// const gamesData = gameprogress.map(item => ({
//     name: item.game_name,
//     level: item.levels,
//     interest: item.interest,
//     progress: item.score,
//   }));

//     return <Card style={[style.homework, {
//         alignItems: "center", paddingVertical: 16,
//         marginHorizontal: 0,
//         padding: 0,
//         paddingHorizontal: 0,
//     }]}>
//         <TouchableOpacity style={{ margin: 5 }} onPress={() => {
//              console.log('TouchableOpacity clicked');
//              console.log('gamesData:', gamesData);
//             setShowTopicDetail(!showTopicDetail)
//         }} activeOpacity={0.6}>
//             <Text style={[style.textStyle, { color: colors.black, paddingVertical: 16, textAlign: "center" }]}>{item}</Text>
//         </TouchableOpacity>
//         {showTopicDetail ? <TouchableOpacity onPress={() => {console.log('TouchableOpacity clicked')
//         }}>
//               {gamesData.map((game, index) => (
//              <GameView  key={index} id={index} level={game.level} language={game.interest} progress={game.progress} />
//               ))}
//         </TouchableOpacity> : null}
//     </Card>
// }

// // added the new components for the game view-28/03/2024-Pravin
// export const GameView = ({ level, language, progress,id }) => {
//     let style;
//     style = getStyles()
//     return (
//       <View key={id} style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', alignItems: 'center' }}>
//         <Image source={game_crossword} style={{ height: 64, width: 64 }} />
//         <View style={style.gameDashboarLevel}>
//           <Text style={{ fontSize: 14 }}>Level {level}</Text>
//         </View>
//         <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
//           <Text style={[style.textStyle, { color: colors.black, marginBottom: 8 }]}>{language}</Text>
//           <Progress.Bar progress={progress} width={200} unfilledColor={colors.dark_grey} color={colors.blue} borderWidth={1} />
//         </View>
//       </View>
//     );
//   }