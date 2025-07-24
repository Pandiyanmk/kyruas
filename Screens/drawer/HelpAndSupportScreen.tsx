

import { Image, Linking, Text, TouchableOpacity, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style } from "../../Values/AppStyles"
import { useEffect } from "react"
import { routes } from "../../Values/Routes"
import { emailIcon } from "../../store/LocalDataStore"
import { colors } from "../../Values/AppColores"

export const HelpAndSupportScreen = ({ navigation }) => {


    return <View style={[style.viewBox, { paddingVertical: 50 }]}>
        <Text style={[style.appNameStyle, { fontSize: 32, width: '100%', textAlign: 'center'}]}>{strings.support_us}</Text>

        <Text style={[style.textStyle, {
            width: '100%',
            textAlign: 'center', marginTop: 40, color:'grey'
        }]}>{strings.need_help_for_solution_or_lost_something}</Text>

        <Text style={[style.textStyle, {
            width: '100%',
            textAlign: 'center', paddingVertical: 20, color:'grey'
        }]}>{strings.feel_free_to_message_us}</Text>

        <View style={{ width: '100%', alignItems: 'center', marginTop:10 }}>
            <Image source={emailIcon} style={{
                height: 120, width: 120,
                tintColor: colorScheme() == 'dark' ? colors.white : colors.black
            }} />

            <TouchableOpacity onPress={() => {
                Linking.openURL('mailto:' + strings.email_address)
            }}>
                <Text style={[style.textStyle, {
                    marginTop: 10, color: 'green', fontSize: 28,
                    textDecorationLine:'underline'
                }]}>{strings.email_address}</Text>
            </TouchableOpacity>
        </View>


    </View>
}