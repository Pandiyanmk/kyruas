import { strings } from "../Localization"
import { localEnum } from "../store/LocalDataStore"




export const validCheck = (type: string, text: string, cnPassword: string = "234") => {

    


    if (text.trim() == '') {
        if (type == localEnum.user_id) {
            return strings.please_enter_user_id
        } else if (type == localEnum.password) {
            return strings.please_enter_password
        }
        else if (type == localEnum.cnpassword) {
            return strings.please_enter_confirm_password
        }
        else if (type == localEnum.first_name) {
            return strings.please_enter_first_name
        }
        else if (type == localEnum.last_name) {
            return strings.please_enter_last_name
        }
        else if (type == localEnum.number) {
            return strings.please_enter_mobile_number
        }
        else if (type == localEnum.comment) {
            return strings.please_type_a_Comment
        }
        else if (type == localEnum.score) {
            return strings.please_type_a_score
        }
        else if (type == localEnum.title) {
            return strings.please_type_a_title
        }
        else if (type == localEnum.oldpassword) {
            return strings.please_enter_old_passworda
        }
        else if (type == localEnum.email_mobile) {
            return strings.please_enter_user_ya_email_id
        }
    }

    if (type == localEnum.password && text.length < 8) {
        return strings.password_should_be_at_least_8_characher
    }

    if (type == localEnum.password && text.search(/[a-z]/i) < 0) {
        return strings.your_password_must_contain_at_least_one_letter
    }

    if (type == localEnum.password && text.search(/[0-9]/) < 0) {
        return strings.your_password_must_contain_at_least_one_digit
    }

    if (type == localEnum.password && text.search(/[!@#\$%\^&\*_]/) < 0) {
        return strings.your_password_must_contain_at_least_a_special_cha
    }

    if (type == localEnum.cnpassword && text != cnPassword) {
        return strings.password_and_confirm_password_does_not_matched
    }

    if (type == localEnum.number && text.length < 10) {
        return strings.please_enter_valid_mobile_number
    }

    return ""

}