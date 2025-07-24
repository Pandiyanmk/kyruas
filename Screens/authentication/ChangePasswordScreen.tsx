/**
 * The `ChangePasswordScreen.tsx` allows users to update their current 
 * password by entering the old password and a new password.
 */
import { Alert, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles  } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { CommonTextInput } from "../../Global/TextInputs"
import { CommonButton } from "../../Global/Buttons"
import { validCheck } from "../../Global/Validations"
import { localEnum } from "../../store/LocalDataStore"
import { ProgressDialog } from "../../Global/Modales"
import { postMultipartData,postAPICall } from "../../Netowork/Apis"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncStorageKeys, getValue, userInformation, getAliasId } from "../../store/UserStorage"
import { userManagementModule } from "../../Netowork/Constants"
import { useSelector } from 'react-redux';
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
const EroorType = {
    passwordError: "",
    cnPasswordError: "",
    oldPasswordError: "",

}

export const ChangePasswordScreen = ({ navigation }) => {
    let style;
    style = getStyles()

    const [password, setPassword] = useState("")
    const [cnPassword, setCNPassword] = useState("")
    const [oldPassword, setoldPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [userId, setUserID] = useState("")
    const [getaliasidvalue, setloginaliasid] = useState("")
    const [getpassword, setcPassword] = useState("")
    const [error, setError] = useState(EroorType)


    useEffect(() => {
        getValue(AsyncStorageKeys.username).then(it => {
            if (it) {
                console.log("inside----",it)
                setUserID(it)
            }
        })
    }, [])

    useEffect(() => {
        getAliasId(AsyncStorageKeys.aliasId).then(it => {
            if (it) {
                console.log("inside",it)
                setloginaliasid(it)
            }
        })
    }, [])


       
       useEffect(() => {
        const item = {
                        useridoremail: userInformation.AliasID,
                     }
                   console.log("values",item)
                     postAPICall(item, userManagementModule.userpassworddetails, true, (response: any) => {
                         setLoading(false)
                        if (response.isSuccess) {
                             console.log("Response-data",response)
                             setcPassword(response.data.password)
                         }
                     })
    }, [])
       
  
   
    const resetPassword = () => {
        
        let hasError = false; // Flag to track if there are errors
            
        // Check for empty or invalid ConversationScore
        if (
            !oldPassword
        ) {
            if (oldPassword === "") {
                setError(prevError => ({ ...prevError, oldPasswordError: "Old Password cannot be empty" }));
            }
            hasError = true; // Set error flag to true
        } else {
            setError(prevError => ({ ...prevError, oldPasswordError: "" }));
        }
    
        if (
            !cnPassword
        ) {
            if (cnPassword === "") {
                setError(prevError => ({ ...prevError, cnPasswordError: "Confirm Password cannot be empty" }));
            }
            hasError = true; // Set error flag to true
        } else {
            setError(prevError => ({ ...prevError, cnPasswordError: "" }));
        }
        if (
            !password
        ) {
            if (password === "") {
                setError(prevError => ({ ...prevError, passwordError: "New Password cannot be empty" }));
            }
            hasError = true; // Set error flag to true
        } else {
            setError(prevError => ({ ...prevError, passwordError: "" }));
        }
        // If there are any errors, do not proceed further
        if (hasError) {
            return; // Exit the function if any error is found
        }








      
        if (oldPassword === password) {
            setError({
                ...error,
                passwordError: "New password cannot be the same as the old password.",
            });
            return; // Exit the function to prevent further processing
        }
        if (oldPassword !== getpassword) {
            setError({
                ...error,
                oldPasswordError: "Your existing password does not match the old password.",
            });
            return; // Exit the function to prevent further processing
        }

        let passwordCheck = validCheck(localEnum.password, password)
        let cnpasswordCheck = validCheck(localEnum.cnpassword, cnPassword, password)
        let oldpasswordCheck = validCheck(localEnum.oldpassword, oldPassword)

        setError({
            passwordError: passwordCheck,
            cnPasswordError: cnpasswordCheck,
            oldPasswordError: oldpasswordCheck
        })

        let listError = [passwordCheck, cnpasswordCheck, oldpasswordCheck].map(it => it == "")

        console.log(listError);

        if (!listError.includes(false)) {
           callAPI()
        }
    }

    


    const callAPI = (() => {
        setLoading(true)
        console.log("useridddddddddd", userId)
        const item = {
            useridoremail: userInformation.AliasID,
            newpassword: cnPassword,
            oldpassword: oldPassword,
            DBid: userInformation.DBId
        }
        console.log("RestPasslog",item)
        postMultipartData(undefined, item, userManagementModule.resetPass, true, (response: any) => {
            console.log(response)
            setLoading(false)
            if (response.isSuccess) {
                
                Alert.alert(strings.message, "Your password changed Successfully", [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                        
                    }
                ])
            } else {
                Alert.alert("Error", response.data)
            }
        })
    })


    return <View style={[style.viewBox]}>
        {/* <Text style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 20 }]}>{strings.appName}</Text>
        <Text style={[style.appNameStyle, style.for18, {
            marginTop: 30,
            width: '100%', textAlign: 'center'
        }]}>{strings.reset_password}</Text> */}


        <CommonTextInput title={strings.old_password}
            placeholder={strings.please_enter_old_password}
            value={oldPassword} onChangeText={(text: string) => {
                setoldPassword(text)
                setError({
                    ...error,
                    oldPasswordError: "",
                });
            }} isPassword={true} errorMesssage={error.oldPasswordError} />


        <CommonTextInput title={strings.password}
            placeholder={strings.please_enter_password}
            value={password} onChangeText={(text: string) => {
                setPassword(text)
                setError({
                    ...error,
                    passwordError: "",
                });
            }} isPassword={true} errorMesssage={error.passwordError} />

        <CommonTextInput title={strings.confirm_password}
            placeholder={strings.please_enter_confirm_password}
            value={cnPassword} onChangeText={(text: string) => {
                setCNPassword(text)
                setError({
                    ...error,
                    cnPasswordError: "",
                });
            }} isPassword={true} errorMesssage={error.cnPasswordError} />

        <CommonButton text={strings.change_password} onClick={resetPassword} />
        <ProgressDialog isShow={loading} />

    </View>
}