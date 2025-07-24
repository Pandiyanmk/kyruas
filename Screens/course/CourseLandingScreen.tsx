

import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles  } from "../../Values/AppStyles"
import { useEffect } from "react"
import { routes } from "../../Values/Routes"
import { ImageSlider } from "../../Components/ImageSlider"
import { courseDetails, courseDetailsList, gamesDetails, images } from "../../store/LocalDataStore"
import { ItemWithHorizontalList } from "../game/GameLandingScreen"
import { AllItemInflate } from "../../Components/GameItem"
import { useSelector } from 'react-redux';
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const CourseLandingScreen = ({ navigation }) => {
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Computer'
        })
    }, [])
    return <View style={[style.viewBox]}>

        {/* <ImageSlider images={images} text={'New Course\nBanner'} /> */}

        <FlatList style={{ marginTop: 10 }}
            data={courseDetailsList}
            numColumns={2}
            renderItem={({ item, index }) => (
                <AllItemInflate item={item} onClick={() => {
                    navigation.navigate(routes.course_detail_screen)
                }} />

            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        />
    </View>
}