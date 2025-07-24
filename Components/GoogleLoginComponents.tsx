import { Image, Text, TouchableOpacity, View } from "react-native"
import { colorScheme, style as getStyles } from "../Values/AppStyles"
import { strings } from "../Localization"
import {useSelector } from 'react-redux';
import { useEffect } from "react"

let style;

export const GoogleLogin = ({ onClick }) => {

    style = getStyles();
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
    colorScheme(theme)
    style = getStyles()
    }, [theme])

    return <TouchableOpacity onPress={onClick}><View style={[style.rowStyle, { marginTop: 40, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }]}>

        <Image source={require('../assets/images/google.png')} style={{ height: 40, width: 40, marginEnd: 8 }} />

        <Text style={[style.textStyle, style.multiColorStyle , {fontSize: 17}]}>{strings.login_with_email}</Text>

    </View>
    <Text style={[style.textStyle, style.multiColorStyle , {fontSize: 15,textAlign:"center"}]}>(Only with Institution Google Ids)</Text>
    </TouchableOpacity>

}




export const AppleLogin = ({ onClick }) => {


    return <TouchableOpacity onPress={onClick}><View style={[style.rowStyle, { marginVertical: 20, justifyContent: 'center', alignItems: 'center' }]}>

        <Image source={require('../assets/images/apple.png')} style={{
            height: 40, width: 40, marginEnd: 8,
            tintColor: colorScheme() == 'dark' ? 'white' : 'black'
        }} />

        <Text style={[style.textStyle, style.multiColorStyle, {fontSize: 17}]}>{strings.login_with_apple}</Text>

    </View></TouchableOpacity>

}