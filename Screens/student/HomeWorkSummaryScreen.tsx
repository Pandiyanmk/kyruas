/**
 * HomeWorkSummaryScreen.tsx
 *
 * This file contains the main screen for displaying homework summaries for students.
 * It provides the following functionalities:
 *
 * 1. Fetching homework data from an API for a specific class and subject.
 * 2. Displaying counts for enrolled, pending, turned-in, and graded homework assignments.
 * 3. Rendering a top tab navigation with tabs for graded, turned-in, and pending homework assignments.
 * 4. Displaying a list of homework assignments for the selected tab category.
 * 5. Handling navigation to detailed homework screens based on the selected homework item.
 * 6. Providing a reusable component for rendering individual homework items in the list.
 * 7. Handling loading and error states during API calls.
 * 8. Updating local data stores based on the fetched homework data.
 *
 * The main components included in this file are:
 *
 * - HomeWorkSummaryScreen: The main screen component that handles data fetching, rendering the header, and the top tab navigation.
 * - HomeWorkTabs: A component that renders the content for each top tab, displaying a list of homework assignments.
 * - HomeWorkSummaryTabItem: A reusable component for rendering an individual homework item in the list.
 */


// Import required components and modules
import { View, ScrollView, FlatList, Image, Pressable, TouchableOpacity, Dimensions } from "react-native"
import { colorScheme, style as getStyles  } from "../../Values/AppStyles"
import { colors } from "../../Values/AppColores"
import { Card, Text } from "react-native-paper"
import { bulletedList, classschollList, document, eyeImage, fontFamily, localEnum, refreshData, studentHomeworkData, studentList, studentworkUploadList } from "../../store/LocalDataStore"
import { DashItemWithHorizontalList } from "../home/DashboardScreen"
import { routes } from "../../Values/Routes"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import { CommonHeaderCard, StudendCommonHeaderCard } from "../../Components/CommonHeaderCard"
import { useIsFocused, useRoute } from "@react-navigation/native"
import subjectsDetails from '../../Testsjson/StudentHomeworkBySubject.json';
import { useEffect, useState } from "react"
import { ProgressView } from "../../Global/Modales"
import { RetryWhenErrorOccur } from "../../Components/TitleWithForward"
import { getAPICall, postAPICall } from "../../Netowork/Apis"
import { userInformation } from "../../store/UserStorage"
import { StudentModule, TeacherModule } from "../../Netowork/Constants"
import { statusDynamicallyStudentUpdate } from "../../Testsjson/localjsons"
import { useSelector } from 'react-redux';
// Create a top tab navigator
const Tab = createMaterialTopTabNavigator();

// HomeWorkSummaryScreen component
export const HomeWorkSummaryScreen = ({ navigation, route }) => {
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
    // State variables
    const [data, setData] = useState({ isSuccess: false, data: undefined })
    const [loading, setLoading] = useState(false)

    // Get the isFocused value from the useIsFocused hook
    const isFocused = useIsFocused()

    // UseEffect hook to handle data fetching when refreshData.homeWorkData changes or component is focused
    useEffect(() => {
        if (refreshData.homeWorkData) {
            setData(undefined)
            callAPI()
            refreshData.homeWorkData = false
        }
    }, [isFocused])

    // UseEffect hook to update studentworkUploadList and studentHomeworkData when data changes
    useEffect(() => {
        if (data && data.isSuccess && data.data) {
            studentworkUploadList[0].count = data.data.TotalEnrolledHomeworks.toString()
            studentworkUploadList[1].count = data.data.TotalPendingHomeWorks.toString()
            studentworkUploadList[2].count = data.data.TotalTurnedInHomeworks.toString()
            studentworkUploadList[3].count = data.data.TotalGradedHomeworks.toString()
            studentHomeworkData.list = data.data.PendingHomeWorks.HomeWorks
        }
    }, [data])

    // UseEffect hook to call the API when the component mounts
    useEffect(() => {
        console.log("routes",route.params);
        callAPI()
    }, [])

    // Function to call the API
    const callAPI = () => {
        setLoading(true)
        postAPICall({
            ...userInformation,
            SubjectId: route.params.id,
            ClassId: route.params.classid
        },
            StudentModule.getMyHomeWorksBySubject, true, (response: any) => {
                console.log("homework data st 1",response)
                setData(response)
                setLoading(false)
            })
    }

    // Render the component based on data and loading state
    return (data && data.isSuccess) ? <View style={[style.viewBox, { padding: 0 }]}>

        <StudendCommonHeaderCard data={studentworkUploadList} subject={data.data.SubjectName}
            title={data.data.ClassName}
            isStudentVisible={false} totalItem={4} />
        <DashItemWithHorizontalList items={studentHomeworkData} onClick={(type: number, item: any) => {
            statusDynamicallyStudentUpdate(item.Status)

            if (type == 1) {
                navigation.navigate(routes.all_file_screen,
                    {
                        screen: routes.student_home_work_screen, data: item,
                        classId: data.data.ClassId,
                        subjectId: data.data.SubjectId
                    })
            } else {
                navigation.navigate(routes.student_home_work_screen, {
                    homeworkId: item.HomeWorkId,
                    classId: data.data.ClassId,
                    subjectId: data.data.SubjectId
                })
            }
        }} />

        <Tab.Navigator backBehavior="initialRoute" screenOptions={style.homeWorkSummaryTopBar}>
            <Tab.Screen initialParams={{
                data: data.data.GradedHomeWorks.HomeWorks, subjectId: route.params.id,
                classId: data.data.ClassId, errorMessage: 'Your homework grading is in progress'
            }}
                name={routes.graded_screen} component={HomeWorkTabsGraded } />
            <Tab.Screen initialParams={{
                data: data.data.TurnedInHomeWorks.HomeWorks, subjectId: route.params.id
                , classId: data.data.ClassId, errorMessage: 'No homework assigned to you or All homework turned in'
            }}
                name={routes.turned_in_screen} component={HomeWorkTabsTurnedin} />
            <Tab.Screen initialParams={{
                data: data.data.PendingHomeWorks.HomeWorks, subjectId: route.params.id
                , classId: data.data.ClassId, errorMessage: 'No homework is pending from you'
            }}
                name={routes.returened_screen} component={HomeWorkTabs} options={{ tabBarLabel: 'Pending' }} />
            {/* <Tab.Screen name={routes.draft_Screen} component={HomeWorkTabs} /> */}
        </Tab.Navigator>
    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur title={data.data} onClick={() => {
        setData(undefined)
        callAPI()
    }} />
}

// HomeWorkTabs component
export const HomeWorkTabs = ({ navigation, route }) => {
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    const [data, setData] = useState(route.params ? route.params.data ? route.params.data : classschollList : classschollList)
    const isEditable = route.name == routes.graded_screen || route.name == routes.turned_in_screen ? false : true
    return <View style={[style.viewBox]}>

        {data.length > 0 ? <FlatList
            data={data}
            renderItem={({ item, index }) => (
                <HomeWorkSummaryTabItem bgColor={colors.lightRed} item={item} onClick={() => {
                    statusDynamicallyStudentUpdate(route.name == routes.returened_screen ? item.Status : route.name)
                    navigation.navigate(route.name == routes.graded_screen ?
                        routes.studentViweHomeWorkDetailScreen : routes.student_home_work_screen,
                        {
                            title: item.title, isEditable: isEditable, homeworkId: item.HomeWorkId,
                            classId: route.params.classId,
                            subjectId: route.params.subjectId
                        })
                }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
        /> : <Text style={[style.textStyle, {
            fontFamily: fontFamily.robotoBold, textAlign: 'center',
            marginVertical: 20, color: colors.blue
        }]}>
            {route.params.errorMessage}
        </Text>
        }

    </View>
}


// HomeWorkTabs component
export const HomeWorkTabsTurnedin = ({ navigation, route }) => {
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    const [data, setData] = useState(route.params ? route.params.data ? route.params.data : classschollList : classschollList)
    const isEditable = route.name == routes.graded_screen || route.name == routes.turned_in_screen ? false : true
    return <View style={[style.viewBox]}>

        {data.length > 0 ? <FlatList
            data={data}
            renderItem={({ item, index }) => (
                <HomeWorkSummaryTabItem bgColor={colors.dirtyWhite} item={item} onClick={() => {
                    console.log("fsdfsdfsfsdfsd ----- ", route.name);
                    statusDynamicallyStudentUpdate(route.name == routes.returened_screen ? item.Status : route.name)
                    navigation.navigate(route.name == routes.graded_screen ?
                        routes.studentViweHomeWorkDetailScreen : routes.student_home_work_screen,
                        {
                            title: item.title, isEditable: isEditable, homeworkId: item.HomeWorkId,
                            classId: route.params.classId,
                            subjectId: route.params.subjectId
                        })
                }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
        /> : <Text style={[style.textStyle, {
            fontFamily: fontFamily.robotoBold, textAlign: 'center',
            marginVertical: 20, color: colors.blue
        }]}>
            {route.params.errorMessage}
        </Text>
        }

    </View>
}

// HomeWorkTabs component
export const HomeWorkTabsGraded = ({ navigation, route }) => {
    console.log("homework to be graded",route)
    let style;
style = getStyles() 
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    const [data, setData] = useState(route.params ? route.params.data ? route.params.data : classschollList : classschollList)
    console.log("testing",data)
    const isEditable = route.name == routes.graded_screen || route.name == routes.turned_in_screen ? false : true
    return <View style={[style.viewBox]}>

        {data.length > 0 ? <FlatList
            data={data}
            renderItem={({ item, index }) => (
                <HomeWorkSummaryTabItem bgColor={colors.mint} item={item} onClick={() => {
                    console.log("fsdfsdfsfsdfsd ----- ", route.name);
                    console.log("homework details ----- ",item);
                    statusDynamicallyStudentUpdate(route.name == routes.returened_screen ? item.Status : route.name)
                    navigation.navigate(route.name == routes.graded_screen ?
                        routes.studentViweHomeWorkDetailScreen : routes.student_home_work_screen,
                        {
                            title: item.title, isEditable: isEditable, homeworkId: item.HomeWorkId,
                            classId: route.params.classId,
                            subjectId: route.params.subjectId
                        })
                }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
        /> : <Text style={[style.textStyle, {
            fontFamily: fontFamily.robotoBold, textAlign: 'center',
            marginVertical: 20, color: colors.blue
        }]}>
            {route.params.errorMessage}
        </Text>
        }

    </View>
}


// HomeWorkSummaryTabItem component
export const HomeWorkSummaryTabItem = ({ isVisible = true, item, onClick,
    bgColor = colorScheme() === 'dark' ? colors.white : colors.white }) => {
        let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    return <Card onPress={onClick} style={[style.homeworks, { backgroundColor: bgColor, width: Dimensions.get('window').width - 40 }]}>
        <View style={[style.homeworks, { backgroundColor: bgColor, justifyContent: "space-between", alignItems: "center" }]}>
        <View
                style={[
                    style.homeworks,
                    { backgroundColor: bgColor, justifyContent: "space-between", alignItems: "center" },
                ]}
            >
                {/* Homework Name */}
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: "flex-start",
                        width: "85%",
                        paddingRight: 10
                     
                    }}
                >
                    <Image
                        source={document}
                        style={{
                            marginLeft:-14,
                            height: 28,
                            width: 28,
                            tintColor: bgColor === colors.mint ? colors.black : colors.black,
                            
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                color: bgColor === colors.mint ? colors.black : colors.black,
                                fontFamily: fontFamily.robotoRegular,
                            }}
                            numberOfLines={2} // Wraps text to two lines if it's too long
                            //ellipsizeMode="tail"
                        >
                            {item.HomeWorkName ? item.HomeWorkName : item.title}
                        </Text>

                        {/* Status */}
                        {item.Status !== 'Graded' &&
                            item.Status !== 'Turned in Late' &&
                            item.Status !== 'Turned in' && (
                                <Text
                                    style={{
                                        color: bgColor === colors.mint ? colors.black : colors.black,
                                        fontFamily: fontFamily.robotoRegular,
                                        marginTop: 4,
                                    }}
                                >
                                    Status: {item.Status}
                                </Text>
                            )}
                    </View>
                </View>

                {/* Eye Icon */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {isVisible && (
                        <TouchableOpacity
                            onPress={onClick}
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                padding: 6,
                                borderRadius: 100,
                                height: 30,
                                width: 30,
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={eyeImage}
                                style={{
                                    height: 18,
                                    width: 18,
                                    
                                }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View> 
    </View>
    </Card>
}