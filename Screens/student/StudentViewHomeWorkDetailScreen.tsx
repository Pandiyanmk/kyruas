/**
 * StudentViewHomeworkdetailscreen.tsx
 *
 * The `StudentViewHomeworkDetailsScreen.tsx` displays the graded homework along with detailed task information.
 * 
 */
import { AppState, Image, Text, View } from "react-native"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { URI } from "../../store/LocalDataStore"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileEnrolledScreen } from "./ProfileEnrolledScreen"
import { setUpPlayer } from "../../Global/Player"
import { AudioPlay } from "../../Components/GameItem"
import { storeAudioData } from "../../store/AudioData"
import TrackPlayer from "react-native-track-player"
import { CommonHeaderCard, StudendCommonHeaderCard } from "../../Components/CommonHeaderCard"
import { TaskDetailScreen } from "../teacher/TaskDetailScreen"
import { StudentViewTaskDetailScreen } from "./StudentViewTaskDetailScreen"
import { useSelector } from 'react-redux';
import subjectSubject from '../../Testsjson/StudentAllStatus.json';
import { getAPICall, postAPICall } from "../../Netowork/Apis"
import { userInformation } from "../../store/UserStorage"
import { StudentModule, TeacherModule } from "../../Netowork/Constants"
import { ProgressView } from "../../Global/Modales"
import { RetryWhenErrorOccur } from "../../Components/TitleWithForward"


const Tab = createMaterialTopTabNavigator();


export const StudentViewHomeWorkDetailScreen = ({ navigation, route }) => {

    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    const [data, setData] = useState({ isSuccess: false, data: undefined })
    const [loading, setLoading] = useState(false)
    const [player, isPlayer] = useState(false)
    const [itemData, setItemData] = useState()
    const [resumeData, setResumeData] = useState("")

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

    }, []);
    console.log("Iseditable", route.params.isEditable)

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

        return () => {
            TrackPlayer.reset()
            storeAudioData({ data: itemData, play: false })
        }
    }, [])

    useEffect(() => {
         callAPI()
    }, [])


    console.log(route.params);


    const callAPI = () => {
        setLoading(true)
        postAPICall({
            StudentId: userInformation.UserId,
            HomeWorkId: route.params.homeworkId,
            DBId:userInformation.DBId
        },
            TeacherModule.getHWDetailsofStudent, true, (response: any) => {
                setData(response)

                setLoading(false)
            })
    }

    return (data && data.isSuccess) ? <View style={[style.viewBox, { paddingHorizontal: 0, paddingTop: 0 }]}>
        {/* <StudendCommonHeaderCard isVisible={false} /> */}

        <Tab.Navigator initialRouteName={route.params.isGrade ? routes.graded_screen : routes.enrolled_screen}
            backBehavior="initialRoute"
            screenOptions={style.homeWorkSummaryTopBar}>
            <Tab.Screen initialParams={{ data: data.data }} name={routes.evaluatedScreen}
                component={StudentViewTaskDetailScreen} options={{ tabBarLabel: 'Graded' }} />
            <Tab.Screen name={routes.files_screen} component={TaskDetailScreen}
                initialParams={{
                    isEditable: route.params.isEditable,
                    data: { FileDetails: data.data.SupportingFiles.FileDetails }
                }} />
        </Tab.Navigator>

        {player ? <AudioPlay item={itemData} onClick={() => {
            isPlayer(false)
        }} /> : null}
    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur title={data.data} onClick={() => {
        setData(undefined)
        callAPI()
    }} />

}