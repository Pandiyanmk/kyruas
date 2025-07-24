/**
 * The `ResetPasswordScreen.tsx` allows users to reset their password by entering a new password.
 */

import { Alert, Text, View,Image } from "react-native"
import { strings } from "../../Localization"
import {colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { CommonTextInput } from "../../Global/TextInputs"
import { CommonButton } from "../../Global/Buttons"
import { validCheck } from "../../Global/Validations"
import { localEnum } from "../../store/LocalDataStore"
import { userManagementModule } from "../../Netowork/Constants"
import { postAPICall, postMultipartData } from '../../Netowork/Apis';
import { ProgressDialog } from "../../Global/Modales"
import { useSelector } from 'react-redux';

const EroorType = {
    passwordError: "",
    cnPasswordError: "",

}

export const ResetPasswordScreen = ({ navigation, route }) => {

    const mobileNumber = route.params?.mobile || '';
    const dbId = route.params.dbId || '';

    const [password, setPassword] = useState("")
    const [cnPassword, setCNPassword] = useState("")
    const [error, setError] = useState(EroorType)
    const [loading, setLoading] = useState(false)

    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    
        useEffect(() => {
            colorScheme(theme)
            style = getStyles()
        }, [theme])


    const resetPassword = () => {

        let passwordCheck = validCheck(localEnum.password, password)
        let cnpasswordCheck = validCheck(localEnum.cnpassword, cnPassword,password)

        setError({
            passwordError: passwordCheck,
            cnPasswordError: cnpasswordCheck
        })

        let listError = [passwordCheck, cnpasswordCheck].map(it => it == "")

        console.log(listError);

        if (!listError.includes(false)) {
           callAPI()
        }
    }

    

    const callAPI = (() => {
        setLoading(true)
        const item = {
            useridoremail: mobileNumber,
            newpassword: password,
            DBid: dbId
        }
        postMultipartData(undefined, item, userManagementModule.resetPass, false, (response: any) => {
            console.log(response)
            setLoading(false)
            if (response.isSuccess) {
                Alert.alert(strings.message, "Your password changed Successfully", [
                    {
                        text: "OK",
                        onPress: () =>  navigation.navigate(routes.login_screen)
                    }
                ])
               
            } else {
                Alert.alert("Error", response.data)
            }
        })
    })

    
    return <View style={[style.viewBox]}>
        {/* <Text style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 20 }]}>{strings.appName}</Text> */}
        <Image source={require('../../assets/images/newbanyan-pro.png')} style={style.imageStyle}  />
        <Text style={[style.appNameStyle, style.for18, {
            marginTop: 30,
            width: '100%', textAlign: 'center'
        }]}>{strings.reset_password}</Text>



        <CommonTextInput title={strings.password}
            placeholder={strings.please_enter_password}
            value={password} onChangeText={(text: string) => {
                setPassword(text)
            }} isPassword={true} errorMesssage={error.passwordError} />

        <CommonTextInput title={strings.confirm_password}
            placeholder={strings.please_enter_confirm_password}
            value={cnPassword} onChangeText={(text: string) => {
                setCNPassword(text)
            }} isPassword={true} errorMesssage={error.cnPasswordError} />

        <CommonButton text={strings.reset} onClick={resetPassword} />

        <ProgressDialog isShow={loading} />
    </View>
}