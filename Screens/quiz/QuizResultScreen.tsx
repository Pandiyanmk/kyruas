import { Image, View } from "react-native"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { Card, Text } from "react-native-paper"
import { cheersIcon, fontFamily } from "../../store/LocalDataStore"
import { CommonButton } from "../../Global/Buttons"
import { colors } from "../../Values/AppColores"
import { strings } from "../../Localization"
import { useSelector } from 'react-redux';
import { createContext, useContext, useState,useEffect } from "react"
export const QuizResultScreen = ({navigation}) => {

    
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

    return <View style={[style.viewBox, { justifyContent: "center", alignContent: "center" }]}>
        <Card><View style={[ { borderRadius: 16,
             padding: 16, gap: 30,  alignItems: "center" }]}>
            <Text style={[style.textStyle, {color:'black',
             fontFamily: fontFamily.robotoBold, fontSize: 20 }]}>{strings.your_score}</Text>
            <Text style={[style.textStyle,
            {
                textAlign: "center", fontSize: 32, 
                color: colors.blue, fontFamily: fontFamily.robotoBold, fontWeight: "bold"
            }]}>8/10</Text>
            <Image source={cheersIcon} style={{ height: 120, width: 120 }} />
            <Text style={[style.textStyle, { textAlign: "center",color:'black',
             fontFamily: fontFamily.rotobotMediume, color: "#F24822", fontSize: 18 }]}>{strings.you_have_successfully_completed_quiz}</Text>
            <View style={{ width: 150, marginBottom: 30 }}>
                <CommonButton text="DONE" onClick={() => {
                    navigation.goBack()
                }} ></CommonButton>
            </View>

        </View></Card>

    </View>
}

