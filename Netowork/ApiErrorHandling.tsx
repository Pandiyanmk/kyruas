import { Alert } from "react-native"
import { strings } from "../Localization"
import { routes } from "../Values/Routes"



export const apiErrorHandling = (status: any, onClick, screen = routes.login_screen) => {
    console.log(status.response, " ", status);

    var message = ''
    try {
        if (status.response != undefined) {

            switch (status.response.status) {

                case 404: {
                    if (status.response.data.response.status == "ERROR" || status.response.data.response.status == "Error") {
                        message = status.response.data.response.message
                        break
                    }
                    message = 'Not Found'
                    break
                }
                case 401: {
                    message = strings.something_went_wrong
                    break
                }
                case 413: {

                    message = status.response.data
                    break
                }
                case 400: {
                    message = status.response.data ? status.response.data : strings.check_your_internet_connection
                    break
                }
                default: {
                    message = strings.something_went_wrong
                    break
                }
            }
        } else {
            message = strings.check_your_internet_connection
        }

        if (message != '' && onClick == undefined) {
            Alert.alert(strings.message, message)
        } else {
            onClick(message)
        }
    } catch (error) {

        if (onClick == undefined) {
            Alert.alert(strings.message, strings.check_your_internet_connection)
        } else {
            onClick(strings.check_your_internet_connection)
        }

    }
}


export const apiSucessErrorHandling = (response: any, onSucess, isToast = true, screen = routes.login) => {

    console.log(response);

    var message = ''
    try {
        if (response.data != undefined) {
            if (response.data.status != undefined) {


                switch (response.data.status) {
                    case "ERROR": {
                        message = response.data.message
                        onSucess(false)
                        break
                    }
                    case "OK": {
                        if (isToast) {
                            // notifyMessage(response.data.message)
                        }
                        onSucess(true)
                        break
                    }
                }
            } else {
                if (response.status == 200) {
                    onSucess(true)
                } else {
                    message = response.statusText
                    onSucess(false)
                }
            }
        }

        if (message != '' && onSucess == undefined) {
            Alert.alert(strings.message, message)
        }

    } catch (error) {
        console.log("catch Error ", error);
        if (onSucess == undefined) {
            Alert.alert(strings.message, strings.something_went_wrong)
        } else {

            onSucess(false)
        }

    }
}