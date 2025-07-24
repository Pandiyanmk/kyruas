import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, screenHeight, style as getStyles  } from "../../Values/AppStyles"
import React, { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { Card } from "react-native-paper"
import { courseDetails, courseSummaryList, fontFamily } from "../../store/LocalDataStore"
import { TextTitleAndDescription, VideoView } from "./CourseSummaryScreen"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors } from "../../Values/AppColores"
import { ItemWithHorizontalList } from "../game/GameLandingScreen"
import { HeaderBackButton } from '@react-navigation/elements';
import { VideoPlayerScreen } from "../../utils/VideoPlayer"
import { useSelector } from 'react-redux';
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const CourseDetailScreen = ({ navigation, route }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    
        useEffect(() => {
            colorScheme(theme)
            style = getStyles()
        }, [theme])

    const [pause, setPause] = useState(false)
    const [Fullscreen, setFullscreen] = useState(true)


    return <View style={[style.viewBox, { gap: 0, padding: 0, paddingBottom: 30 }]}>
        <View style={{ height: screenHeight / 3 }}>
            <VideoPlayerScreen navigation={navigation} route={route} onClick={(fullscreen) => {
                setFullscreen(fullscreen)
            }} />

        </View>
        {
            Fullscreen ? 
                <FlatList style={{ marginTop: 10, paddingHorizontal:14, }}
                    data={courseDetails}
                    renderItem={({ item, index }) => (
                        <TopicCard onClick={() => {
                            //  setPause(true)
                            //  navigation.navigate(routes.videoPlayerScreen)

                        }} />
                    )}
                    ListHeaderComponent={() =>
                        <View style={{ paddingBottom: 16 }}>
                            <Text style={[style.textStyle, { fontFamily: fontFamily.robotoBold, fontSize: 17 }]}>It's Title</Text>

                            <Text style={{ color: colors.dark_grey, fontSize: 15 }}>{strings.lorym_ipsum}</Text>

                            <ItemWithHorizontalList items={courseSummaryList} onClick={() => {
                                //  navigation.navigate(routes.courseDetailScreen)
                            }} /></View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
                />
            : null}
    </View>
}

export const TopicCard = ({ onClick }) => {
    let style;
style = getStyles()
    const [showTopicDetail, setShowTopicDetail] = useState(false)

    return <Card style={{ marginBottom: 16, 
    backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white, marginHorizontal:2 }}>
        <TouchableOpacity style={{ margin: 5 }} onPress={() => {
            setShowTopicDetail(!showTopicDetail)
        }} activeOpacity={0.6}>
            <Text style={[style.textStyle, { color: colors.black, paddingVertical: 16, textAlign: "center" }]}>Topic/ Sub Topic</Text>
        </TouchableOpacity>
        {showTopicDetail ? <TouchableOpacity onPress={() => {
            onClick()
        }}><View style={{ flexDirection: "row", flex: 1, gap: 16, padding: 16 }}>
                <View style={{ height: 120, width: 120, backgroundColor: colorScheme() === 'dark' ? colors.white : colors.light_grey, borderRadius: 16, }}></View>
                <View style={{ flexDirection: "column", gap: 8, paddingVertical: 8 }}>
                    <Text style={[style.textStyle, { color: colors.black, fontFamily: fontFamily.robotoBold, fontSize: 17 }]}>Title</Text>
                    <Text style={{ color: colors.dark_grey, fontSize: 15 }}>Descroption</Text>
                </View>
            </View></TouchableOpacity> : null}
    </Card>

}