

import { Image, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { URI } from "../../store/LocalDataStore"
import { colors } from "../../Values/AppColores"
import { AudioPlay } from "../../Components/GameItem"
import { TaskDetailScreen } from "./TaskDetailScreen"
import { teacherHomeworkStatusDetails } from "../../Testsjson/localjsons"
import { getAPICall, postAPICall } from "../../Netowork/Apis"
import { userInformation } from "../../store/UserStorage"
import { TeacherModule } from "../../Netowork/Constants"
import { ProgressView } from "../../Global/Modales"
import { RetryWhenErrorOccur } from "../../Components/TitleWithForward"
import { setUpPlayer } from "../../Global/Player"
import { HeaderBackButton } from '@react-navigation/elements';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();


export const UserTaskViewScreen = ({ navigation, route }) => {
      
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

    const [player, isPlayer] = useState(false)
    const [itemData, setItemData] = useState()
    const [data, setData] = useState({ isSuccess: false, data: undefined })
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(route.params);
        callAPI()
    }, [])

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
                </View>

            )

        })

    }, [data])

    const callAPI = () => {
        console.log("detailsofstudent",route.params.id,route.params.studentId)
        setLoading(true)
        postAPICall({
            ...userInformation,
            HomeWorkId: route.params.id,
            StudentId: route.params.studentId
        }, TeacherModule.getHWDetailsofStudent, true, (response: any) => {
            setData(response)
            setLoading(false)
        })
    }

    useEffect(() => {
        console.log(route.params);

        setUpPlayer()


    }, [])


    return (data && data.isSuccess) && data.data ? <View style={[style.viewBox, { padding: 0 }]}>

        <Text style={[style.textStyle, style.appNameStyle,
        {
            textAlign: 'right',
            fontSize: 18, marginEnd: 20
        }]}>{data.data.ClassName}</Text>

        <Tab.Navigator backBehavior="initialRoute" screenOptions={style.topBar}>
            <Tab.Screen initialParams={{ data: data.data, wordData: route.params, errorMessage: "No summary to display" }} name={routes.enrolled_screen}
                component={TaskDetailScreen} options={{ tabBarLabel: 'Summary' }} />
            <Tab.Screen initialParams={{ data: data.data.SupportingFiles, errorMessage: "No files available " }} name={routes.files_screen}
                component={TaskDetailScreen} />
            {/* <Tab.Screen name={routes.add_on_Inst_screen} component={TaskDetailScreen} /> */}
        </Tab.Navigator>

        {player ? <AudioPlay item={itemData} onClick={() => {
            isPlayer(false)
        }} /> : null}
    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur title={data.data} onClick={() => {
        setData(undefined)
        callAPI()
    }} />
}