import { ScrollView, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles  } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { CommonTextInput } from "../../Global/TextInputs"
import { CommonButton } from "../../Global/Buttons"
import { MultiColorTextComponets } from "../../Components/MutiColorComponents"
import { validCheck } from "../../Global/Validations"
import { localEnum } from "../../store/LocalDataStore"
import { useSelector } from 'react-redux';

const EroorType = {
    userIdError: "",
    passwordError: "",
    numberError: "",
    cnPasswordError: "",
    firstNameError: "",
    lastNameError: ""
}

export const RegistrationScreen = ({ navigation }) => {

    const [userId, setUserID] = useState("")
    const [password, setPassword] = useState("")
    const [cnPassword, setCNPassword] = useState("")

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [error, setError] = useState(EroorType)

    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    
        useEffect(() => {
            colorScheme(theme)
            style = getStyles()
        }, [theme])


    const register = (() => {
        console.log("sss")
        let userIDCheck = validCheck(localEnum.user_id, userId)
        let passwordCheck = validCheck(localEnum.password, password)
        let cnpasswordCheck = validCheck(localEnum.cnpassword, cnPassword, password)
        let mobileCheck = validCheck(localEnum.number, mobile)
        let firstNameCheck = validCheck(localEnum.first_name, firstName)
        let lastNameCheck = validCheck(localEnum.last_name, lastName)

        console.log(passwordCheck);

        setError({
            userIdError: userIDCheck,
            passwordError: passwordCheck,
            numberError: mobileCheck,
            firstNameError: firstNameCheck,
            lastNameError: lastNameCheck,
            cnPasswordError: cnpasswordCheck
        })

        let listError = [userIDCheck, passwordCheck, cnpasswordCheck, mobileCheck, firstNameCheck, lastNameCheck].map(it => it == "")

        console.log(listError);

        if (!listError.includes(false)) {
            navigation.replace(routes.otp_screen, { mobile: mobile, isRegister: true })
        }

        // 

    })

    return <ScrollView showsVerticalScrollIndicator={false} style={[style.viewBox]} ><View >
        <Text style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 20 }]}>{strings.appName}</Text>
        <Text style={[style.appNameStyle, style.for18, {
            marginTop: 30,
            width: '100%', textAlign: 'center'
        }]}>{strings.register_an_account}</Text>

        <View style={[style.rowStyle, { marginTop: 30 }]}>
            <CommonTextInput custom={style.custom1} title={strings.first_name}
                placeholder={strings.please_enter_first_name}
                value={firstName} onChangeText={(text: string) => {
                    setFirstName(text)
                }} errorMesssage={error.firstNameError} />

            <CommonTextInput custom={style.custom1} title={strings.last_name}
                placeholder={strings.please_enter_last_name}
                value={lastName} onChangeText={(text: string) => {
                    setLastName(text)
                }} errorMesssage={error.lastNameError} />
        </View>


        <CommonTextInput title={strings.user_id_and_email_address}
            placeholder={strings.please_enter_user_ya_email_id}
            value={userId} onChangeText={(text: string) => {
                setUserID(text)
            }} errorMesssage={error.userIdError} />

        <CommonTextInput title={strings.mobile_number}
            placeholder={strings.please_enter_mobile_number}
            value={mobile} onChangeText={(text: string) => {
                setMobile(text)
            }} isMobile={true} errorMesssage={error.numberError} />

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

        <CommonButton text={strings.sign_up} onClick={register} />

        <MultiColorTextComponets custom={style.alreadyRegister} title={strings.already_have_an_account} clickText={strings.sign_in} onClick={() => {
            navigation.navigate(routes.login_screen)
        }} />
    </View></ScrollView>
}