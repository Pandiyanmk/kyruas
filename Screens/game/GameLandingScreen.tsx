
import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect,useState} from "react"
import { routes } from "../../Values/Routes"
import { ImageSlider } from "../../Components/ImageSlider"
import { fontFamily, gamesDetails, getBgColor, images,Gameimages, learn } from "../../store/LocalDataStore"
import { GameItem } from "../../Components/GameItem"
import { TitleWithForward,TitleWith} from "../../Components/TitleWithForward"
import { colors } from "../../Values/AppColores"
import axios from 'axios';
import { userInformation } from "../../store/UserStorage"
import { useSelector } from 'react-redux';
export const GameLandingScreen = ({ navigation }) => {
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
    const [gamesDetails, setGamesDetails] = useState([
        { title: 'Coin Word', list: [] }, { title: 'Crossword', list: [] },{ title: 'Spot difference', list: [] }
      ]);
    
      const storeScoreInDatabase = async (user_id) => {
         const apiUrl = 'https://mobapp.banyanpro.com/api/gameview/UserInterestMapping/';
        //const apiUrl = 'http://192.168.0.100:98/api/gameview/UserInterestMapping/';
        try {
          const response = await axios.post(apiUrl, { user_id }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const interestNames = response.data.interestNames;
          console.log("values",interestNames)


        setGamesDetails((prevGamesDetails) => {
            // Map through each game and update its title, keeping a common list for all games
            const updatedGamesDetails = prevGamesDetails.map((game) => {
              return {
                title: game.title,
                list: ["Tamil",...interestNames] // Set the common list for all games
              };
            });
    
            return updatedGamesDetails;
          });
        } catch (error) {
          console.error('failed to usermapping', error);
        }
      };
      
    console.log(gamesDetails)
      useEffect(() => {
        const user_id = userInformation.UserId; // Replace with your actual logic to get the user ID
        storeScoreInDatabase(user_id);
      }, [userInformation.UserId]);
    
      
    return <View style={[style.viewBox]}>

        <ImageSlider images={Gameimages} />

        <FlatList style={{ marginTop: 10 }}
            data={gamesDetails}
            renderItem={({ item, index }) => (

                <ItemWithHorizontalList  items={item} onClick={(i, items,index) => {
                  
                    if (i == 1) {
                        navigation.navigate(routes.all_file_screen,
                            { screen: routes.play_game_screen, data: item})
                            console.log(i)
                    } else {
                        navigation.navigate(routes.play_game_screen, { gameName: item.title ,interest:item.list[index]})
                    }
                }} />

            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        />
    </View>
}




export const ItemWithHorizontalList = ({ items, onClick}) => {
  let style;
  style = getStyles()
    return <View>
        <TitleWith title={items.title} onClick={() => {
            onClick(1, items)

          //  navigation.navigate(routes.course_landing_screen)

        }} />
       {items.list && items.list.length > 0  ?
            <FlatList
                data={items.list}
                renderItem={({ item, index }) => (

                    <GameItem item={item} bgColor={colors.lightYellow} onClick={() => {
                        onClick(2, item,index)
                    } }  />

                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
            /> : <Text style={[style.textStyle, {
                fontFamily: fontFamily.robotoBold, textAlign: 'center',
                marginVertical: 20, color: colors.blue
            }]}>
                {items.errorMessage ? items.errorMessage : items.title + strings.is_not_alavailable}
            </Text>

        }


    </View>

}
