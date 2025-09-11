/**
 *Splashscreen.tsx
 * The SplashScreen.tsx is the first screen loaded when the app is opened, displaying the splash screen content.
 */

import { StatusBar, Text, View,Image } from "react-native"
import { strings } from "../../Localization"
import {  colorScheme, style as getStyles} from "../../Values/AppStyles"
import { useEffect } from "react"
import { routes } from "../../Values/Routes"
import { getValue, userInformation } from "../../store/UserStorage"
import { useSelector } from 'react-redux';
import { colors } from "../../Values/AppColores"
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const SplashScreen = ({ navigation }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    useEffect(() => {
        setTimeout(() => {
            getValue().then(it => {
                if (it) {
                    userInformation.DBId = it.dbId
                    userInformation.UserId = it.userid
                    userInformation.rolE_ID=it.rolE_ID
                    userInformation.UserName=it.Uname
                    console.log(userInformation);
                      //navigation.replace(routes.home_screen)
                    navigation.replace(routes.dashboard_screen)
                   
                } else {
                    navigation.replace(routes.login_screen)
                }
            })
        }, 3000);
    }, []) 

    return <View style={[style.viewBox, style.centerContent]}>
        {/* <Text style={style.appNameStyle}>{strings.appName}</Text> */}
        {/* <Text style={style.appNameStyle}>
                <Text style={{ color: colors.banyanprocolor }}>Banyan</Text>
                <Text style={{ color: colors.banyanprocoloryellow }}>Pro</Text>
            </Text> */}
            <View style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 40 }]}>
                <Image source={require('../../assets/images/itmslogoss.png')} style={style.imageStyle} />
                </View>
        <Text style={[style.textStyle, style.bowerByTextStyle]}>{strings.powered_by_banyanpro}</Text>
    </View>
}