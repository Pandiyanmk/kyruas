/**
 *Dashboardscreen.tsx
 *
 * The `DashboardScreen.tsx` renders the dashboard for both teachers and students.
 */
import { FlatList, Image, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { memo, useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { ImageSlider } from "../../Components/ImageSlider"
import { boared, courseDetails, fontFamily, getBgColor, images, localEnum, refreshData } from "../../store/LocalDataStore"
import { ItemWithHorizontalList } from "../game/GameLandingScreen"
import { GameItem, HomeWorkDueItem, HomeWorkToGradeItem, AllItemInflate } from "../../Components/GameItem"
import { RetryWhenErrorOccur, TitleWithForward } from "../../Components/TitleWithForward"
import { getIsTeacher } from "../../store/AudioData"
import { Bar } from "react-native-progress"
import { colors } from "../../Values/AppColores"
import { TouchableOpacity } from "react-native-gesture-handler"
import { userInformation } from "../../store/UserStorage"
import { getAPICall, loginApi, postAPICall } from "../../Netowork/Apis"
import { StudentModule, TeacherModule } from "../../Netowork/Constants"
import { ProgressView } from "../../Global/Modales"
import { useSelector } from 'react-redux';
import teacherResponse from '../../Testsjson/TeacherDashboard.json';
import studentResponse from '../../Testsjson/StudentDashboard.json';

import { fontConfig } from "react-native-paper/lib/typescript/src/styles/fonts"
import { statusDynamicallyStudentUpdate } from "../../Testsjson/localjsons"
import { useIsFocused } from "@react-navigation/native"
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const DashboardScreen = ({ navigation }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    const teacherColums = [
        { title: 'Homework Due by Student', type: localEnum.homework, list: [], errorMessage: "No homework is due" },
        { title: 'Homework To be Graded', type: localEnum.homework_to_be_graded, list: [], errorMessage: "No homework to be graded" },

        { title: 'Classes', type: localEnum.class_summary, list: [], errorMessage: "No class assigned to you" },
        { title: 'Homework Upcoming ( Next 2 Weeks )', type: localEnum.homework_upcoming, list: [], errorMessage: "No upcoming homeworks" },
    ];

    {/*25/03/2024 - Pravin  */ }
    {/* This functionality is planned for an upcoming build, so this particular build hides the components related to it. hide 25/03/2024 */ }
    // Hide the course and quiz section for the student module
    const studentColumn = [
        {
            title: 'Homework to be turned in', type: localEnum.student_by_subject_homework, list: [],
            errorMessage: "No homework assigned to you or All homework turned in"
        },
        {
            title: 'Homework by subject', type: localEnum.student_homework, list: [],
            errorMessage: "No homework assigned for this subject"
        }
        // {
        //     title: 'Courses', type: localEnum.course, list: [
        //         { work: "", class: "", color: '', title: "Tamil" },
        //         { work: "", class: "", color: '', title: "Poem" },
        //         { work: "", class: "", color: '', title: "Grammar" }
        //     ],
        //     errorMessage: "No courses assigned to you"

        // },


        // {
        //     title: 'Quiz', type: localEnum.quiz, list: [
        //         { work: "", class: "3A", color: '', title: "Daily" },
        //         { work: "", class: "3B", color: '', title: "Weekly" },
        //         { work: "", class: "3C", color: '', title: "Monthly" }
        //     ],
        //     errorMessage: "No quiz assigned to you"

        // }

    ];





    var [teacher, setTeacher] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ isSuccess: false, data: undefined })
    const [teacherData, setTeacherData] = useState(teacherColums)
    const [studentData, setStudentData] = useState(studentColumn)
    const [refresh, setRefresh] = useState(false)


    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            setIsTeacher()
        }


    }, [isFocused])


    const setIsTeacher = () => {
        // if (teacher == undefined) {
        getIsTeacher().then(it => {
            const isTeacher = it ? it : false
            refreshData.isTeacher = isTeacher
            setTeacher(isTeacher)
            console.log("before call it ", it)
            console.log("before call ", isTeacher)

            callAPI(isTeacher)
        })


    }



    const getStudentDashboard = () => {
        setLoading(true)
        postAPICall(userInformation, StudentModule.getStudentDashboard, true, (response: any) => {
            if (response.isSuccess) {
                studentData[0].list = response.data.PendingHomeWorks.HomeWorks
                studentData[1].list = response.data.MySubjects.Subjects
                setStudentData(studentData)
            }
            setData(response)
            console.log("student ", response.data.PendingHomeWorks.HomeWorks);
            setLoading(false)
        })
    }

    const getTeacherDashboard = () => {
        setLoading(true)
        postAPICall(userInformation, TeacherModule.getTeacherDashboard, true, (response: any) => {
            if (response.isSuccess) {
                teacherData[0].list = response.data.PendingHomeWorkByStudent.HomeWorks
                teacherData[1].list = response.data.HomeworksForGrading.HomeWorks
                teacherData[2].list = response.data.MyClasses.Classes
                teacherData[3].list = response.data.UpcomingHomework.HomeWorks
            }
            setData(response)
            setLoading(false)
        })
        // console.log("date",response.data.PendingHomeWorkByStudent.HomeWorks)
    }
    const callAPI = (teacher: boolean) => {
        console.log("in call ", teacher)

        if (teacher) {
            getTeacherDashboard()
        } else {
            getStudentDashboard()
        }
    }


    return (data && data.isSuccess && !loading) ?
        <View style={[style.viewBox, { paddingVertical: 10, paddingHorizontal: 0 }]}>
            <FlatList
                data={teacher ? teacherData : studentData}
                renderItem={({ item, index }) => (
                    <DashItemWithHorizontalList items={item} onClick={(type: number, dataItem: any) => {
                        switch (item.type) {
                            case localEnum.class_summary: {

                                if (type == 1) {
                                    navigation.navigate(routes.all_file_screen,
                                        { screen: routes.class_summary_screen, data: item })
                                } else {
                                    navigation.navigate(routes.class_summary_screen, { id: dataItem.ClassId })
                                }
                                break
                            }
                            case localEnum.course: {
                                if (type == 1) {
                                    navigation.navigate(routes.course_landing_screen)
                                } else {
                                    navigation.navigate(routes.course_detail_screen)
                                }
                                break
                            }
                            case localEnum.student_by_subject_homework: {
                                statusDynamicallyStudentUpdate(dataItem.Status)

                                if (type == 1) {
                                    navigation.navigate(routes.all_file_screen,
                                        {
                                            screen: routes.student_home_work_screen, data: item,
                                            classId: data.data.ClassId
                                        })
                                } else {
                                    navigation.navigate(routes.student_home_work_screen, {
                                        homeworkId: dataItem.HomeWorkId,
                                        classId: data.data.ClassId,
                                        subjectId: dataItem.SubjectId
                                    })
                                }
                                break
                            }

                            case localEnum.student_homework: {
                                if (type == 1) {
                                    navigation.navigate(routes.all_file_screen,
                                        { screen: routes.homwwork_summary_sreen, data: item, classid: data.data.ClassId })
                                } else {
                                    navigation.navigate(routes.homwwork_summary_sreen, { id: dataItem.SubjectId, classid: data.data.ClassId })
                                }

                                break
                            }
                            case localEnum.quiz: {
                                if (type == 1) {
                                    navigation.navigate(routes.paymentScreen)
                                } else {
                                    navigation.navigate(routes.paymentScreen)
                                }
                                break
                            }
                            default:
                                if (type == 1) {
                                    navigation.navigate(routes.all_file_screen,
                                        { screen: routes.home_work_details_screen, data: item })
                                } else {
                                    navigation.navigate(routes.home_work_details_screen, {
                                        title: item.title,
                                        isHomeworkUpcoming: item.type == localEnum.homework_upcoming, id: dataItem.HomeWorkId,
                                        ClassId: dataItem.ClassId
                                    })
                                }

                        }

                    }} />
                )}
                ListHeaderComponent={() => <View>
                    {/* <ImageSlider images={images} /> */}
                    {/*25/03/2024 - Pravin  */}
                    {/* This functionality is planned for an upcoming build, so this particular build hides the components related to it. hide 25/03/2024 */}
                    {/* onPress={() => navigation.navigate(routes.leader_boared_screen)} added the student module is top */}
                    {!teacher ? <TouchableOpacity >
                        <View style={{
                            borderRadius: 4, height: 90, justifyContent: 'center', alignItems: 'center',
                            backgroundColor: colors.light_grey, marginHorizontal: 16
                        }}>
                            <Image source={boared}
                                style={{
                                    height: 80,
                                    width: 80,
                                }} />
                        </View></TouchableOpacity> : null}
                </View>}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
            />
            <Text style={[style.textStyle, style.absulates, {
                fontFamily: 'Roboto',
                fontSize: 12, width: '100%', textAlign: 'center'
            }]}>{"Powered by banyanPro"}</Text>
        </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur title={data.data} onClick={() => {
            setData({ isSuccess: false, data: undefined })
            callAPI(teacher)
        }} />


}


export const DashItemWithHorizontalList = ({ items, onClick }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])


    return <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <View style={{ flex: 1 }}>
            <TitleWithForward title={items.title} isForward={items.list.length > 2} onClick={() => {
                onClick(1, items)

                // navigation.navigate(routes.course_landing_screen)

            }} />
            {items.list.length > 0 ? <FlatList
                data={items.list}
                renderItem={({ item, index }) => (

                    <Dynamic items={item} type={items.type} onClick={({ i, values }) => {
                        onClick(2, item)
                    }} />

                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
            /> : <Text style={[style.textStyle, {
                fontFamily: fontFamily.robotoBold, textAlign: 'center',
                marginVertical: 20, color: colors.blue
            }]}>
                {items.errorMessage}
            </Text>
            }
        </View>

    </View>

}


const Dynamic = memo(({ type, items, onClick }) => {
    console.log("Dynamic", type)

    let bgColor = getBgColor(type)
    console.log("color", bgColor)
    // console.log("items",items)
    switch (type) {
        case localEnum.homework:
            return <HomeWorkDueItem item={items} bgColor={bgColor} onClick={() => {
                onClick(2, items)
            }} />

        // case localEnum.student_homework:
        //     return <HomeWorkDueItem item={items} onClick={() => {
        //         onClick(2, items)
        //     }} />
        case localEnum.student_by_subject_homework:
            return <HomeWorkDueItem item={items} bgColor={bgColor} onClick={() => {
                onClick(2, items)
            }} />
        case localEnum.homework_to_be_graded:
            return < HomeWorkToGradeItem item={items} bgColor={bgColor} onClick={() => {
                onClick(2, items)
            }} />
        case localEnum.homework_upcoming:
            return <HomeWorkDueItem item={items} bgColor={bgColor} onClick={() => {
                onClick(2, items)
            }} />
        case localEnum.class_student_summary:
            return <HomeWorkDueItem item={items} bgColor={bgColor} onClick={() => {
                onClick(2, items)
            }} />
        case "homework_to_be_turened_in":
            return <HomeWorkDueItem item={items} bgColor={bgColor} onClick={() => {
                onClick(2, items)
            }} />
        // case "":
        //     return <AllItemInflate color={colors.mint} item={items} onClick={() => {
        //         onClick(2, items) 
        //     }}  />
        default:
            return <GameItem item={items} bgColor={bgColor} onClick={() => {
                onClick(2, items)
            }} />
    }
})
