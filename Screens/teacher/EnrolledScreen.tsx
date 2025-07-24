

import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { enrolledList, homeworkList } from "../../store/LocalDataStore"
import { HomeWorkInflate, InrolledInflate, NonInrolledInflate } from "../../Components/GameItem"
import { RetryWhenErrorOccur } from "../../Components/TitleWithForward"
import { statusDynamicallyUpdate } from "../../Testsjson/localjsons"
import { colors } from "../../Values/AppColores"
import { useSelector } from 'react-redux';

export const EnrolledScreen = ({ navigation, route }) => {

      
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

    const [data, setData] = useState(route.params ? route.params.StudentDetails : enrolledList)

    const errorMessage = route.params ? route.params.errorMessage : "No ${route.name} Available."

    const bgColor = route.params ? route.params.bgColor : colors.mint

    return data && data.length > 0 ? <View style={[style.viewBox, { paddingVertical: 0 }]}>

        <FlatList style={{ marginTop: 15 }}
            data={data}
            renderItem={({ item, index }) => (
                <InrolledInflate item={item} bgColor={bgColor} onClick={() => {
                    statusDynamicallyUpdate(route.name)
                    if (route.params.classId != undefined) {
                        navigation.navigate(routes.another_user_profile, { id: route.params.classId, studentId: item.StudentId })
                    } else {
                         navigation.navigate(routes.task_view_screen, { id: route.params.id, studentId: item.StudentId })
                    }
                }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        />
    </View> : <RetryWhenErrorOccur isRetry={false} title={errorMessage} onClick={() => {

    }} />
}