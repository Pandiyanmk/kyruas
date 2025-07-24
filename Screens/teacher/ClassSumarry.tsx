

import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { ClassSummmaryTopItem, GameItem, HomeWorkInflate } from "../../Components/GameItem"
import { courseDetails, homeworkList, localEnum, studentHomeworkData, sumaaryList2, summaryList, summaryList1, teacherList } from "../../store/LocalDataStore"
import { ItemWithHorizontalList } from "../game/GameLandingScreen"
import { RetryWhenErrorOccur, TitleWithForward } from "../../Components/TitleWithForward"
import { CommonHeaderCard, StudendCommonHeaderCard } from "../../Components/CommonHeaderCard"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { EnrolledScreen } from "./EnrolledScreen"
import teacherClassSummary from '../../Testsjson/TeacherClassSummary.json';
import { userInformation } from "../../store/UserStorage"
import { TeacherModule } from "../../Netowork/Constants"
import { getAPICall, postAPICall } from "../../Netowork/Apis"
import { ProgressView } from "../../Global/Modales"
import { Route } from "react-native-tab-view"
import { statusDynamicallyUpdate } from "../../Testsjson/localjsons"
import { colors } from "../../Values/AppColores"
import { useSelector } from 'react-redux';
// import{DashItemWithHorizontalList}fro
import { DashItemWithHorizontalList } from "../home/DashboardScreen"; 

const Tab = createMaterialTopTabNavigator();

export const ClassSumarryScreen = ({ navigation, route }) => {
      
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


    const classId = route.params ? route.params.id : ""

    const [data, setData] = useState({ isSuccess: false, data: undefined })
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)

    //Enrolled changed to Assigned by meena 26/11/2024
    const [classSumaryList, setClassSummaryList] = useState([
        { title: 'Assigned', count: '10', bgColor: colors.lightBlue },
        { title: 'Pending\nSubmission', count: '3', bgColor: colors.dirtyWhite },
        { title: 'Pending\nGrading', count: '4', bgColor:colors.lightRed  },

        { title: 'Graded', count: '3', bgColor: colors.mint },
    ]);


    var [classHomeworkToGradeList, setClassHomeworkToGradeList] = useState({
        title: 'Homeworks to be graded (for a class)',
        type: localEnum.title,
        list: [],
        errorMessage:'All submitted homeworks are graded'
    })


    useEffect(() => {
        if (data && data.isSuccess && data.data) {
            classSumaryList[0].count = data.data.TotalEnrolledHomeworks.toString()
            classSumaryList[1].count = data.data.TotalPendingSubmission.toString()
            classSumaryList[2].count = data.data.TotalTurnedInHomeworks.toString()
            classSumaryList[3].count = data.data.TotalGradedHomeworks.toString()
            classHomeworkToGradeList.list = data.data.ClassHomeWorksToGrade.ClassHomeWorkTGDetails
        }


    }, [data])

    useEffect(() => {
        console.log(route.params);

        callAPI()
    }, [])

    const callAPI = () => {
        setLoading(true)
        postAPICall({
            ...userInformation,
            ClassId: route.params.id
        }, TeacherModule.getClassHWSummary, true, (response: any) => {
            console.log(response.data.ClassHomeWorks.ClassHomeWorkDetails);

            setData(response)
            setLoading(false)
        })
    }

    return (data && data.isSuccess) ? <View style={[style.viewBox, { padding: 0 }]}>

        <StudendCommonHeaderCard totalItem={3.9} data={classSumaryList}
            isVisible={false} title={data.data.ClassName} />
        <View style={{ paddingHorizontal: 16 }}>
        {/* <TitleWithForward   title ="Homeworks to be graded (for a class)" onClick={(type: number, item: any) => {
                    // navigation.navigate(routes.game_landing_screen)
                    navigation.navigate(routes.all_file_screen,
                        { screen: routes.home_work_details_screen, data: item, ClassId: data.data.ClassId })
                }} /> */}
            <DashItemWithHorizontalList items={classHomeworkToGradeList}  onClick={(type: number, item: any) => {
                if (type == 1) {
                    navigation.navigate(routes.all_file_screen,
                        { screen: routes.home_work_details_screen, data: item, ClassId: data.data.ClassId })
                } else {
                    console.log(item)
                    navigation.navigate(routes.home_work_details_screen, { isGrade: true, id: item.HomeWorkId, ClassId: data.data.ClassId })
                }
            }} />
            {/* <Text style={[style.letsPlayText, { marginTop: 20 }]}>{strings.homework}</Text> */}

        </View>

        <Tab.Navigator backBehavior="initialRoute" screenOptions={style.homeWorkSummaryTopBar}>
            <Tab.Screen initialParams={{
                homeWorkList: data.data.ClassHomeWorks.ClassHomeWorkDetails,
                ClassId: data.data.ClassId
            }} name={'Homework'} component={HomeWork} />
            <Tab.Screen initialParams={{
                StudentDetails: data.data.ClassStudentDetails.Students,
                classId: data.data.ClassId
            }} name={'Student'} component={EnrolledScreen} />

        </Tab.Navigator>

    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur title={data.data.toString()} onClick={() => {
        setData(undefined)
        callAPI()
    }} />
}


export const HomeWork = ({ navigation, route }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    const [data, setData] = useState(route.params ? route.params.homeWorkList : homeworkList)

    return data && data.length > 0 ? <FlatList showsVerticalScrollIndicator={false} style={[style.viewBox, { paddingBottom: 0 }]}
        data={data}
        renderItem={({ item, index }) => (
            <HomeWorkInflate item={item} type = {route.name} onClick={() => {
                statusDynamicallyUpdate(route.name)

                if (route.params.studentId != undefined) {
                    navigation.navigate(routes.task_view_screen, { id: item.HomeWorkId, studentId: route.params.studentId })

                } else {
                    navigation.navigate(routes.home_work_details_screen, { title: item.title, id: item.HomeWorkId, ClassId: route.params.ClassId ? route.params.ClassId : "" })
                }
            }} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator 

    /> : <RetryWhenErrorOccur isRetry={false} title={`No ${route.name == routes.enrolled_screen ? "Turned in" : route.name} homework`} onClick={() => {

    }} />
}