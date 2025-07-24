import { Image, Platform, Pressable, Text, TextInput, View } from "react-native"
import { strings } from "../Localization"
import { colorScheme, style as getStyles } from "../Values/AppStyles"
import { colors } from "../Values/AppColores"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useEffect, useState } from "react"
import { invisible, visible } from "../store/LocalDataStore"
import {useSelector } from 'react-redux';

let style;
export const CommonTextInput = ({ custom = {},
    title = strings.user_id_and_email_address,
    placeholder = strings.please_enter_user_id,
    value = "",
    onChangeText,
    errorMesssage = "",
    isPassword = false,
    isMobile = false,
    multiLine = false,
    lines = 1,
    ht = 0,
    editable = true
}) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
    colorScheme(theme)
    style = getStyles()
    }, [theme])

    const [passwordVisibility, setPasswordVisibility] = useState(isPassword)


    return <View style={[{ width: "100%", marginTop: 20 }, custom]}>
        <Text style={[style.textStyle, style.textInput, { marginStart: 4 }]}>{title}</Text>
        <View>
        <TextInput
            style={[style.textStyle, style.textInputBorder, {
                textAlignVertical: multiLine ? 'top' : 'center',
                height: ht > 0 ? ht : undefined,
                paddingRight: isPassword ? 50 : 16
            }]}

            numberOfLines={lines}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            value={value}

            multiline={multiLine}

            editable={editable}

            onChangeText={onChangeText}
            secureTextEntry={passwordVisibility}
            maxLength={isMobile ? 10 : undefined}
            keyboardType={isMobile ? "decimal-pad" : "default"}
        />

        {isPassword ? <Pressable onPress={() => {
            setPasswordVisibility(!passwordVisibility)
        }} style={{ justifyContent: 'center', position: 'absolute', right: 10, top:4, bottom: 0, alignItems: "center",}}>
            <Image source={passwordVisibility ? invisible : visible}
                style={{
                    height: 32,
                    width: 32,
                    tintColor: colorScheme() === 'dark' ? 'white' : "black",
                    alignSelf: "center"
                }} /></Pressable> : null}
        </View>
        {
            // for error message
            errorMesssage ? <Text style={[style.textStyle, style.errorMessage, , { marginStart: 4 }]}>{errorMesssage}</Text> : null
        }
    </View>
}




export const SearchTextInput = ({ custom = {},
    placeholder = strings.search,
    value = "",
    onChangeText,
}) => {


    return <View style={[{ width: "100%", paddingHorizontal: 20 }, custom]}>
        <TextInput
            style={[style.textStyle, style.textInputBorder,
            { backgroundColor: 'white', paddingVertical: Platform.OS == 'ios' ? 16 : undefined, color: 'black', borderRadius: 10, borderWidth: colorScheme() == 'dark' ? 0 : 1, paddingHorizontal: 40 },]}
            numberOfLines={1}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            value={value}
            onChangeText={onChangeText}
        />
        {value ? <Pressable onPress={() => {
            onChangeText("")
        }} style={{ justifyContent: 'flex-end', position: 'absolute', end: 35, top: 20 }}>
            <Image source={require('../assets/images/close.png')}
                style={{
                    height: 16,
                    width: 16,
                    tintColor: 'black'
                }} /></Pressable> : null}

        <Image source={require('../assets/images/search.png')}
            style={{
                height: 18,
                width: 18,
                tintColor: 'grey',
                position: 'absolute',
                start: 35, top: 20,
            }} />

    </View>
}

