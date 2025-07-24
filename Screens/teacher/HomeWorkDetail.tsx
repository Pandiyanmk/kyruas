

import { Text, TouchableOpacity, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles, width } from "../../Values/AppStyles"
import React, { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { EnrolledScreen } from "./EnrolledScreen"
import { GradedScreen } from "./GradedScreen"
import { ReturnedScreen } from "./ReturenedScreen"
import { colors } from "../../Values/AppColores"
import { fontFamily, refreshData, summaryList, summaryList1, teacherHomwWork } from "../../store/LocalDataStore"
import { ClassSummmaryTopItem } from "../../Components/GameItem"
import { teacherHomeworkJson } from "../../Testsjson/localjsons"
import { getAPICall, postAPICall } from "../../Netowork/Apis"
import { userInformation } from "../../store/UserStorage"
import { TeacherModule } from "../../Netowork/Constants"
import { MoreInfoBottomSheet, ProgressView, ReadMoreBottomSheet,ReadMoreBottomSheetreference ,TextReadMoreBottomSheet} from "../../Global/Modales"
import { RetryWhenErrorOccur } from "../../Components/TitleWithForward"
import RenderHtml from 'react-native-render-html';
import { useIsFocused } from "@react-navigation/native"
import { Card } from "react-native-paper"
import { useSelector } from 'react-redux';
import {  FilesInflate } from "../../Components/GameItem"
const Tab = createMaterialTopTabNavigator();

export const HomeWorkDetailsScreen = ({ navigation, route }) => {

      
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

    console.log("-------------", route.params.id)

    const isFocused = useIsFocused()

    useEffect(() => {

        if (refreshData.homeWorkData) {
            setData(undefined)
            callAPI()
            refreshData.homeWorkData = false
        }

    }, [isFocused])

    let date = new Date();
    /* Date format you have */
    let dateMDY = `Date:- ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const [data, setData] = useState({ isSuccess: false, data: undefined })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        //console.log(route.params.id);
        //comanly I'm Passing homework id to diffferent screens
        if (data && data.isSuccess && data.data) {
            teacherHomwWork[0].count = data.data.EnrolledStudents.toString()
            teacherHomwWork[1].count = data.data.TurnedInStudents.toString()
            teacherHomwWork[3].count = data.data.PendingStudents.toString()
            teacherHomwWork[2].count = data.data.GradedStudents.toString()
        }
    }, [data])

    useEffect(() => {
        //console.log(" mydetails",route.params);
        callAPI()
    }, [])

    const callAPI = () => {
        setLoading(true)
        postAPICall({
            ...userInformation,
            HomeWorkId: route.params.id,
            ClassId: route.params.ClassId
        }, TeacherModule.getHWkSummaryForTeacher, true, (response: any) => {
            setData(response)
            console.log("getHWkSummaryForTeacher",response)
            setLoading(false)
        })
    }

    return (data && data.isSuccess) && data.data ? <View style={[style.viewBox, { paddingHorizontal: 0 }]}>
        {!route.params.isHomeworkUpcoming ? <Card style={{
            marginBottom: 10,
            paddingVertical: 10, marginHorizontal: 16, borderRadius: 4, backgroundColor: colors.lightGrey
        }}>
            <View style={[style.classTop,]}>
                <ClassSummmaryTopItem isColor={false} bgColor={colors.lightBlue} item={teacherHomwWork[0]} onClick={() => { }} />
                <ClassSummmaryTopItem isColor={false} bgColor={colors.dirtyWhite} item={teacherHomwWork[1]} onClick={() => { }} />
                <ClassSummmaryTopItem isColor={false} bgColor={colors.mint} item={teacherHomwWork[2]} onClick={() => { }} />
                <ClassSummmaryTopItem isColor={false} bgColor={colors.lightRed} item={teacherHomwWork[3]} onClick={() => { }} />

            </View></Card>
            : null}
        <Card style={{ paddingVertical: 10, marginHorizontal: 16, borderRadius: 4, backgroundColor: colors.lightGrey }}>
            <View style={[style.rowStyle, { alignContent: 'center', justifyContent: 'space-between' }]}>
                <Text style={[style.letsPlayText, { marginHorizontal: 20, fontSize: 14, color: colors.black }]} numberOfLines={2}>{data.data.HomeWorkName + '\n'}

                    <Text style={[style.letsPlayText, { marginHorizontal: 20, fontSize: 14, color: colors.black }]} numberOfLines={2}>{data.data.ClassName}</Text>

                </Text>

            </View>
            {Array.isArray(data?.data?.Referencefiles) && data.data.Referencefiles.length > 0 && (
  <TextWithReference margin={{ paddingRight: 16,paddingLeft: 16, }} navigation={navigation} text={data.data.Referencefiles} color="black" />)} 

            <TextWithReadMore text={data.data.HomeWorkDescription} color={colors.black} />

        </Card>
        {/* <RenderHtml

            contentWidth={width}
            baseStyle={{ marginHorizontal: 20 }}
            defaultTextProps={{ numberOfLines: 1, ellipsizeMode: 'tail', maxFontSizeMultiplier: 20 }}
            defaultWebViewProps={{}}
            defaultViewProps={{}}
            source={{
                html: `${data.data.HomeWorkDescription}`
            }}
        /> */}
        {!route.params.isHomeworkUpcoming ?
            <Tab.Navigator backBehavior="initialRoute" screenOptions={style.homeWorkSummaryTopBar}>
                <Tab.Screen initialParams={{
                    StudentDetails: data.data.TurnedInStudentDetails.StudentDetails,
                    id: data.data.HomeWorkId,
                    errorMessage: "No homework turned in",
                    bgColor: colors.dirtyWhite
                }}
                    name={routes.enrolled_screen} component={EnrolledScreen} options={{ tabBarLabel: 'Turnedin' }} />
                <Tab.Screen
                    initialParams={{
                        StudentDetails: data.data.GradedStudentDetails.StudentDetails,
                        id: data.data.HomeWorkId,
                        errorMessage: "No homework to be graded",
                        bgColor: colors.mint
                    }}
                    name={routes.graded_screen} component={EnrolledScreen} />
                <Tab.Screen
                    initialParams={{
                        StudentDetails: data.data.ReturnedStudentDetails.StudentDetails,
                        id: data.data.HomeWorkId,
                        errorMessage: "No returned homework",
                        bgColor: colors.lightBlue
                    }}
                    name={routes.returened_screen} component={EnrolledScreen} />
                <Tab.Screen
                    initialParams={{
                        StudentDetails: data.data.PendingStudentDetails.StudentDetails,
                        id: data.data.HomeWorkId,
                        errorMessage: "No pending homework",
                        bgColor: colors.lightRed
                    }}
                    name={routes.pending} component={EnrolledScreen} options={{ tabBarLabel: 'Pending' }} />

            </Tab.Navigator> : <Text style={[style.letsPlayText, { margin: 20 }]}> {dateMDY} </Text>}

    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur title={data.data} onClick={() => {
        setData(undefined)
        callAPI()
    }} />
}


export const TextWithReadMore = ({ text, margin = { marginHorizontal: 20 }, color = colorScheme() === 'dark' ? 'white' : "black" }) => {

    let style;
    style = getStyles()
    const [show, setShow] = useState(false)
    
    return <View style={margin}>
        <Text style={[style.textStyle, { fontSize: 14, color: color }]} numberOfLines={2} ellipsizeMode="tail">{
            text.replace(/<\/?[^>]+(>|$)/g, '').replaceAll('&nbsp;', '') .replaceAll('&ndash;', '–')}

        </Text>
        <TouchableOpacity onPress={() => {
            setShow(true)
        }}><Text style={[style.textStyle, style.textInput,
        { color: colors.blue, fontSize: 14, textAlign: 'right', textDecorationLine: 'underline' }]}>{`Read more`}</Text>
        </TouchableOpacity>

        <ReadMoreBottomSheet isShow={show} data={
            text} onClick={() => {
                setShow(false)
            }} />
    </View>
}

//New code implemented on December 11, 2024, by Pravin for the referencfiles comp
export const TextWithReference = ({ text, navigation, margin = { marginHorizontal: 20 }, color = colorScheme() === 'dark' ? 'white' : "black" }) => {

    let style;
    style = getStyles()
    const [show, setShow] = useState(false)
    console.log("textfiles",text)
    return <View style={margin}>
        <TouchableOpacity onPress={() => { 
            setShow(true)
        }}><Text style={[style.textStyle, style.textInput,
        { color: colors.blue, fontSize: 14, textAlign: 'left', textDecorationLine: 'underline' }]}>{`Reference Files`}</Text>
        </TouchableOpacity>
             <TextReadMoreBottomSheet navigation ={ navigation} isShow={show} data={
            text} onClick={() => {
                setShow(false)
            }} />
             
    </View>
}