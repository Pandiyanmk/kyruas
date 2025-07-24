
import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import {  colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect,useState } from "react"
import { routes } from "../../Values/Routes"
import { ImageSlider } from "../../Components/ImageSlider"
import { courseDetails, courseDetailsList, gamesDetails, images } from "../../store/LocalDataStore"
import { ItemWithHorizontalList } from "../game/GameLandingScreen"
import { AllItemInflate } from "../../Components/GameItem"
import axios from 'axios';
import { userInformation } from "../../store/UserStorage"
import { colors } from "../../Values/AppColores"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useSelector } from 'react-redux';
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const GameInterestScreen = ({ navigation, route }) => {
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    const { gameName } = route.params;
    useEffect(() => {
        navigation.setOptions({
            headerTitle: gameName
        })
    }, [])

    const [interestNames, setInterestNames] = useState(["Tamil"]);
    const storeScoreInDatabase = async (user_id) => {
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
        storeScoreInDatabase(user_id);
    }, [userInformation.UserId]);
  
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

    return <View style={[style.viewBox]}>

        <ImageSlider images={images} text={homepagecarousel}  /> 
                <FlatList style={{ marginTop: 10 }}
                    data={interestNames}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <AllItemInflate color={colors.lightYellow}item={item} onClick={() => {
                            navigation.navigate(routes.play_game_screen, { gameName:gameName ,interest:interestNames[index]})
                        }} />

                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
                />  

            </View>
}