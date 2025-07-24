import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"
import { style as getStyles } from "../Values/AppStyles"
import { strings } from "../Localization"
import { fontFamily, forward_arrow, gallery, images, photo } from "../store/LocalDataStore"
import { colors } from "../Values/AppColores"

// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
let style;

export const TitleWithForward = ({ title = strings.lets_play, isForward = true, onClick, custom = {} }) => {
style = getStyles()

    return <TouchableOpacity disabled={!isForward} onPress={onClick}>
        <View style={[style.rowContainer, custom]}>
            <Text style={style.letsPlayText}>{title}</Text>
            {isForward ? <Image source={forward_arrow}
                style={[style.forwordImage, { height: 18, width: 18, }]} /> : null}
        </View></TouchableOpacity>

}

export const TitleWithForwardGame = ({ title = strings.lets_play, isForward = true,  custom = {} }) => {
    style = getStyles()
    
        return <TouchableOpacity disabled={!isForward}>
            <View style={[style.rowContainer, custom]}>
                <Text style={style.letsPlayText}>{title}</Text>
                {/* {isForward ? <Image source={forward_arrow}
                    style={[style.forwordImage, { height: 18, width: 18, }]} /> : null} */}
            </View></TouchableOpacity>
    
    }


export const TitleWith = ({ title = strings.lets_play, isForward = true, custom = {} }) => {
    style = getStyles()

    return <TouchableOpacity disabled={!isForward}>
        <View style={[style.rowContainer, custom]}>
            <Text style={style.letsPlayText}>{title}</Text>
        </View></TouchableOpacity>

}


export const ImageWithTextVerticle = ({ image = photo, title = strings.photo, onClick }) => {
    style = getStyles()
    return <TouchableOpacity style={{ marginEnd: 40 }} onPress={onClick}>
        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <Image source={image}
                style={[style.forwordImage, { height: 50, width: 50 }]} />
            <Text style={[style.letsPlayText, {
                marginTop: 4, fontSize: 14,
                fontFamily: fontFamily.robotoRegular
            }]}>{title}</Text>
        </View></TouchableOpacity>
}

export const RetryWhenErrorOccur = ({ title = "", isRetry = true, onClick }) => {
    style = getStyles()

    return <View style={[style.viewBox, style.centerContent, { gap: 10 }]}>

        <Text style={[style.textStyle,
        style.multiColorStyle,
        { fontFamily: fontFamily.robotoBold, fontSize: 18, textAlign: 'center' }]}>{title ? title.toString() : ""}</Text>
        {isRetry ? <TouchableOpacity style={{ backgroundColor: colors.blue, borderRadius: 100 }} onPress={onClick}>
            <Text style={[style.textStyle,
            {
                color: colors.white,
                fontFamily: fontFamily.rotobotMediume,
                paddingHorizontal: 20,
                paddingVertical: 10
            }]}>
                {"Retry"}</Text></TouchableOpacity> : null}
    </View>

}