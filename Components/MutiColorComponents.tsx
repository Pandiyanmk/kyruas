import { KeyboardAvoidingView, Text, TouchableOpacity, View } from "react-native"
import { colorScheme, style as getStyles } from "../Values/AppStyles"
import { colors } from "../Values/AppColores"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
export const MultiColorTextComponets = ({ custom = {}, title = "", clickText = "", onClick }) => {


    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    return <View style={[style.rowStyle, { justifyContent: 'center', alignItems: 'center', marginStart: 20 }, custom,]}>

        <Text style={[style.textStyle, style.multiColorStyle]}>{title}</Text>
        <TouchableOpacity onPress={onClick}><Text style={[style.textStyle, style.multiColorStyle, { color: colors.blue, fontFamily: 'Roboto Medium' }]}>
            {clickText}</Text></TouchableOpacity>


    </View>

}