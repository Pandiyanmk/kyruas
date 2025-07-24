import { FlatList } from "react-native-gesture-handler"
import { games, getBgColor, localEnum } from "../../store/LocalDataStore"
import { AllHomeWorkDueItem, AllItemInflate,AllItemIngrade, GameItem, HomeWorkDueItem ,AllHomeWorkGradeItem} from "../../Components/GameItem"
import { routes } from "../../Values/Routes"
import { colorScheme, style as getStyles  } from "../../Values/AppStyles"
import { memo, useEffect } from "react"
import { statusDynamicallyStudentUpdate } from "../../Testsjson/localjsons"
import { colors } from "../../Values/AppColores"
import { useSelector } from 'react-redux';
export const AllFileScreens = ({ navigation, route }) => {
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
    const screenName = route.params?.screen || '';
    const data = route.params?.data;
    console.log("screen",screenName)
    console.log("screen",data.title)
    console.log("screen",data.list)
    //let bgColor = getBgColor(data.type)
    const color = route.params?.color;
    // Now you can use the 'color' variable wherever needed in the component.


    const onClick = (type: number, item: any) => {
        if (screenName == routes.quizInstructionyScreen) {
            navigation.navigate(screenName, { title: item.title })
        } else if (screenName == routes.home_work_details_screen) {

            navigation.navigate(screenName, {
                id: item.HomeWorkId,
                ClassId: route.params.ClassId ? route.params.ClassId : item.ClassId })

        }
        else if (screenName == routes.class_summary_screen) {

            navigation.navigate(screenName, { id: item.ClassId })

        }
        else if (screenName == route.another_user_profile) {
            navigation.navigate(screenName, { isGrade: true })
        } else if (screenName == routes.student_home_work_screen) {

            statusDynamicallyStudentUpdate(item.Status)

            navigation.navigate(routes.student_home_work_screen, {
                homeworkId: item.HomeWorkId,
                classId: route.params.classId,
                subjectId: item.SubjectId ? item.SubjectId : route.params.subjectId
            })
        } else if (screenName == routes.homwwork_summary_sreen) {
            navigation.navigate(routes.homwwork_summary_sreen, {
                id: item.SubjectId, classid: route
                    .params.classid
            })

        } else {
            navigation.navigate(screenName,{ gameName: data.title })
        }
    }


    return <FlatList showsVerticalScrollIndicator={false} style={[style.viewBox, { padding: 10 }]}
        data={data.list}
        numColumns={2}
        renderItem={({ item, index }) => (
            <Dynamic items={item} type={data.type} onClick={({ i, values }) => {
                onClick(2, item)
            }} />)
        } />
      
}



export const Dynamic = memo(({ type, items, onClick}) => {

    switch (type) {
        
        case localEnum.homework:
            return <AllHomeWorkDueItem item={items} type={type} onClick={() => {
                onClick(2, items)
            }} />
        case localEnum.homework_to_be_graded:
            return <AllHomeWorkGradeItem item={items} type={type} onClick={() => {
                onClick(2, items)
            }} />
        // case localEnum.student_homework:
        //     return <AllHomeWorkDueItem item={items} onClick={() => {
        //         onClick(2, items)
        //     }} />
        case localEnum.student_by_subject_homework:
            console.warn("fsfsdfsdfsd")
            return <AllHomeWorkDueItem item={items} type={type} onClick={() => {
                onClick(2, items)
            }} />
        case localEnum.homework_upcoming:
            return <AllHomeWorkDueItem item={items} type={type} onClick={() => {
                onClick(2, items)
            }} />
        case localEnum.class_student_summary:
            return <AllHomeWorkDueItem item={items} type={type} onClick={() => {
                onClick(2, items)
            }} />
        case localEnum.quiz:
            return <AllHomeWorkDueItem item={items} type={type} onClick={() => {
                onClick(2, items)
            }} />
            case localEnum.homework_to_be_turened_in:
                return <AllItemIngrade color={colors.lightRed} item={items} type={type} onClick={() => {
                    onClick(2, items)
                }} />
        default:
            return <AllItemInflate color={colors.mint} item={items} onClick={() => {
                onClick(2, items) 
            }}  />
    }
})