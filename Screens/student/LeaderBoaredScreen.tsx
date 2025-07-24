

import { Image, Text, TouchableOpacity, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { boared, fontFamily } from "../../store/LocalDataStore"
import { colors } from "../../Values/AppColores"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ClassSchoolScreen } from "../teacher/ClassSchoolScreen"
import { useSelector } from 'react-redux';
const Tab = createMaterialTopTabNavigator();


export const LeaderBoaredScreen = ({ navigation }) => {
      
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
    const [select, setSelect] = useState(1)
    return <View style={[style.viewBox, { padding: 0 }]}>
        <View style={{
            marginHorizontal: 20, paddingVertical: 10, marginTop: 10,
            justifyContent: 'center', borderRadius: 4, alignItems: 'center', backgroundColor: colors.light_grey
        }}>

            <View style={{ width: '100%', justifyContent: 'flex-end', alignContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                {/* <Text style={[style.textStyle, { color: 'white', fontFamily: fontFamily.robotoBold }]}>{"W1 - Essay"}</Text> */}
                <Text style={[style.letsPlayText, { fontFamily: fontFamily.robotoBold, color: 'white' }]}>3A</Text>

            </View>


            <Image source={boared}
                style={{
                    height: 80,
                    width: 80,
                    marginTop: 5
                }} />
        </View>

        <View style={[style.rowStyle, { paddingHorizontal: 22, gap: 30, marginTop: 20 }]}>
            <RadioButtonWithText isVisible={select == 1} onClick={() => {
                setSelect(1)
            }} />
            <RadioButtonWithText title="Quiz" isVisible={select == 2} onClick={() => {
                setSelect(2)

            }} />
        </View>
        <Tab.Navigator backBehavior="initialRoute" screenOptions={style.homeWorkSummaryTopBar}>
            <Tab.Screen name={routes.class_screen} component={ClassSchoolScreen} />
            <Tab.Screen name={routes.school_screen} component={ClassSchoolScreen} />

        </Tab.Navigator>
    </View>
}



export const RadioButtonWithText = ({ title = 'Homework', isVisible = true, onClick }) => {
    let style;
    style = getStyles()

    return <TouchableOpacity
        onPress={() => {
            onClick()

        }}><View style={[style.rowStyle, {
            gap: 20, width: undefined,
            justifyContent: 'flex-start', alignItems: 'center'
        }]}>
            <View style={{
                borderRadius: 10, height: 16, width: 16,
                borderColor: colors.blue,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {isVisible ? <View style={{
                    backgroundColor: colors.blue, width: 8,
                    height: 8, borderRadius: 7

                }} /> : null}
            </View>
            <Text style={[style.textStyle, {
                fontSize: 16,
                fontFamily: fontFamily.robotoBold

            }]}>{title}</Text>
        </View></TouchableOpacity>

}