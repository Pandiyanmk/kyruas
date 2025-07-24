import { Text, TouchableOpacity } from "react-native"
import { strings } from "../Localization"
import { style as getStyles } from "../Values/AppStyles"

let style;

export const CommonButton = ({ text = strings.login, onClick, custom = {}, disable = false }) => {

    style = getStyles()

    return <TouchableOpacity onPress={onClick} style={[style.buttonStyle, custom]} disabled={disable}>
        <Text style={[style.textStyle, { textAlign: 'center', color: 'white', fontSize: 18 }]}>{text}</Text></TouchableOpacity>
}