import { Text, TouchableOpacity, View } from "react-native"
import { colorScheme, style as getStyles } from "../Values/AppStyles"
import { colors } from "../Values/AppColores"
import { strings } from "../Localization"
import {useSelector } from 'react-redux';
import { useEffect } from "react"

let style;

export const ForgotPassword = ({ onClick }) => {

    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
    colorScheme(theme)
    style = getStyles()
    }, [theme])

    return <View style={{
        width: "100%", marginTop: 4,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }}>

        <TouchableOpacity onPress={onClick}><Text style={[style.textStyle, style.multiColorStyle, { color: colors.blue, fontFamily: 'Roboto Medium' }]}>
            {strings.forgot_password + "?"}</Text></TouchableOpacity>

    </View>
}