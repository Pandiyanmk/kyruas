

import { AppState, Image, Platform, Text, View } from "react-native"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import React, { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { URI, fontFamily, refreshData } from "../../store/LocalDataStore"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileEnrolledScreen } from "../student/ProfileEnrolledScreen"
import { setUpPlayer } from "../../Global/Player"
import { AudioPlay } from "../../Components/GameItem"
import { storeAudioData } from "../../store/AudioData"
import TrackPlayer from "react-native-track-player"
import useBackHandler from "../../Global/BackHandler"
import { HomeWork } from "./ClassSumarry"
import studentHWSummary from '../../Testsjson/StudentHomeworkSummary.json';
import { ProgressView } from "../../Global/Modales"
import { RetryWhenErrorOccur } from "../../Components/TitleWithForward"
import { getAPICall, postAPICall } from "../../Netowork/Apis"
import { userInformation } from "../../store/UserStorage"
import { TeacherModule } from "../../Netowork/Constants"
import { StudendCommonHeaderCard } from "../../Components/CommonHeaderCard"
import { strings } from "../../Localization"
import { HeaderBackButton } from '@react-navigation/elements';
import { colors } from "../../Values/AppColores"
import { useIsFocused } from "@react-navigation/native"
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();


export const UserProfileScreen = ({ navigation, route }) => {

      
// Date 19/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])


    const isFocused = useIsFocused()
    const [player, isPlayer] = useState(false)
    const [itemData, setItemData] = useState()
    const [resumeData, setResumeData] = useState("")

    const [data, setData] = useState({ isSuccess: false, data: undefined })
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (refreshData.homeWorkData) {
            setData(undefined)

            callAPI()
            refreshData.homeWorkData = false
        }

    }, [isFocused])


    const [homeworkSumaryList, setHomeworkSumaryList] = useState([
        { title: 'Turned In', count: '10', bgColor: colors.lightBlue },
        { title: 'Graded', count: '3', bgColor: colors.dirtyWhite },
        { title: 'Returned', count: '4', bgColor: colors.mint },
        { title: 'Pending', count: '3', bgColor: colors.lightRed },



    ]);

    useEffect(() => {
        console.log(route.params);

        AppState.addEventListener("change", _handleAppStateChange);

    }, []);

    useEffect(() => {

        navigation.setOptions({
            headerTitle: data.data ? (data.data.StudentName ? data.data.StudentName : strings.appName) : strings.appName,

            headerLeft: () => (
                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "flex-start", justifyContent: "center" }}>
                    <HeaderBackButton
                        labelVisible={false}
                        allowFontScaling={false}
                        tintColor={colors.black}
                        onPress={() => navigation.goBack()}
                        style={{ marginStart: 0, marginEnd: 0 }}
                    />
                    <Image source={require('../../assets/images/user_profile.png')} style={{ height: 40, width: 40, borderRadius: 20, marginStart: Platform.OS == "ios" ? -8 : 8 }} />
                </View>

            )

        })

    }, [data])


    const _handleAppStateChange = (nextAppState: any) => {
        console.log(nextAppState, player);

        if (nextAppState === "background") {

            if (player) {
                TrackPlayer.pause()
            }
            // this condition calls when app goes in background mode
            // here you can detect application is in background, and you can pause your video

        } else if (nextAppState === "active") {
            if (player) {
                TrackPlayer.play()
            }
            // this condition calls when app is in foreground mode
            // here you can detect application is in active state again, 
            // and if you want you can resume your video

        }
    };


    useEffect(() => {
        setUpPlayer()


    }, [])


    useEffect(() => {
        console.log(route.params);

        return () => {
            TrackPlayer.reset()
            storeAudioData({ data: itemData, play: false })
        }
    }, [])


    const callAPI = () => {
        setLoading(true)
        postAPICall({
            ...userInformation,
            ClassId: route.params.id,
            StudentId: route.params.studentId
        }, TeacherModule.getStudentHomeWorkSummary, true, (response: any) => {
            if (response.isSuccess && response.data) {
                const list = [
                    { title: 'Turned In', count: response.data.TotalTurnedInHomeworks.toString(), bgColor: colors.lightBlue },
                    { title: 'Graded', count: response.data.TotalGradedHomeworks.toString(), bgColor: colors.mint },
                    { title: 'Returned', count: response.data.TotalReturnedHomeworks.toString(), bgColor: colors.dirtyWhite },
                    { title: 'Pending', count: response.data.TotalPendingHomeWorks.toString(), bgColor: colors.lightRed },

                ]
                setHomeworkSumaryList(list)
            }

            setData(response)

            setLoading(false)


        })
    }

    useEffect(() => {
        callAPI()

    }, [])

    return (data && data.isSuccess) ? <View style={[style.viewBox, { paddingHorizontal: 0 }]}>


        <StudendCommonHeaderCard totalItem={4.5} data={homeworkSumaryList}
            isVisible={false} title={data.data.ClassName} />


        <Tab.Navigator initialRouteName={route.params.isGrade ? routes.graded_screen : routes.enrolled_screen} backBehavior="initialRoute"
            screenOptions={style.topBar}>
            <Tab.Screen initialParams={{ homeWorkList: data.data.TurnedInHomeworks.HomeWorks, studentId: route.params.studentId }} name={routes.enrolled_screen}
                component={HomeWork}
                options={{ tabBarLabel: 'Turnedin' }} />
            <Tab.Screen initialParams={{ homeWorkList: data.data.GradedHomeworks.HomeWorks, studentId: route.params.studentId }} name={routes.graded_screen} component={HomeWork} />
            <Tab.Screen initialParams={{ homeWorkList: data.data.ReturnedHomeworks.HomeWorks, studentId: route.params.studentId }} name={routes.returened_screen} component={HomeWork} />
            <Tab.Screen initialParams={{ homeWorkList: data.data.PendingHomeworks.HomeWorks, studentId: route.params.studentId }} name={routes.pending} component={HomeWork} />


        </Tab.Navigator>

        {/* {player ? <AudioPlay item={itemData} onClick={() => {
            isPlayer(false)
        }} /> : null} */}
    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur title={""} onClick={() => {
        setData(undefined)
        callAPI()
    }} />

}