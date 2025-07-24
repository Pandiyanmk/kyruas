import { FlatList, Image, TouchableOpacity, View } from "react-native"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { boared, classschollList, images, localEnum, quizList, quizSummary, quizSummaryList, quize, studentHomeworkData, studentList, summaryList } from "../../store/LocalDataStore"
import { DashItemWithHorizontalList } from "../home/DashboardScreen"
import { routes } from "../../Values/Routes"
import { ImageSlider } from "../../Components/ImageSlider"
import { CommonHeaderCard, StudendCommonHeaderCard } from "../../Components/CommonHeaderCard"
import { colors } from "../../Values/AppColores"
import { createContext, useContext, useState,useEffect } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { HomeWorkSummaryTabItem, HomeWorkTabs } from "../student/HomeWorkSummaryScreen"
import { useRoute } from "@react-navigation/native"
import { useSelector } from 'react-redux';
const Tab = createMaterialTopTabNavigator();

export const QuizSummaryScreen = ({ navigation }) => {

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
    return <View style={[style.viewBox, { paddingVertical: 10, paddingHorizontal: 0 }]}>
        <StudendCommonHeaderCard totalItem={4} isVisible={false} data={quizSummaryList} />

        <DashItemWithHorizontalList items={quize} onClick={(type: number, item: any) => {
            if (type == 1) {
                navigation.navigate(routes.all_file_screen,
                    { screen: routes.quizInstructionyScreen, data: item })
            } else {
                navigation.navigate(routes.quizInstructionyScreen, { title: item.title })
            }
        }} />

        <Tab.Navigator backBehavior="initialRoute" screenOptions={style.homeWorkSummaryTopBar}>
            <Tab.Screen name={routes.complete} component={QuizTabs} />
            <Tab.Screen name={routes.missed} component={QuizTabs} />

        </Tab.Navigator>


    </View>
}



export const QuizTabs = ({ navigation }) => {
    let style;
    style = getStyles()
    const route = useRoute();
    return <View style={[style.viewBox]}>

        <FlatList
            data={quizList}
            renderItem={({ item, index }) => (
                <HomeWorkSummaryTabItem bgColor={route.name == routes.complete ? colors.mint : colors.lightRed} isVisible={route.name != routes.complete} item={item} onClick={() => {
                    console.log("hello");
                    navigation.navigate(routes.quizInstructionyScreen, { title: item.title })

                }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
        />

    </View>
}

