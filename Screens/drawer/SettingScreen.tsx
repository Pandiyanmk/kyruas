
import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import {colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect } from "react"
import { routes } from "../../Values/Routes"
import { TitleWithForward } from "../../Components/TitleWithForward"
import { TouchableOpacity } from "react-native-gesture-handler"
import { settingData } from "../../store/LocalDataStore"
import { alertConfimationDialog } from "../../utils/AlertsDialogs"
import { useSelector } from 'react-redux'

// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings

export const SettingScreen = ({ navigation }) => {
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    const contactUsUrl = "https://maantt.com/help.html"
    const aboutUsUrl = "https://maantt.com/banyanpro.html"

    return <View style={[style.viewBox, { padding: 0 }]}>

        <FlatList style={{ marginTop: 10 }}
            data={settingData}
            renderItem={({ item, index }) => (

                <SettingItems item={item} isVisible={index != settingData.length - 1} onClick={() => {
                    if (item == strings.security) {
                        navigation.navigate(routes.securityScreen)

                    } else if (item == strings.about_us) {
                        navigation.navigate(routes.cmsScreen, {url: aboutUsUrl})

                    } else {
                        navigation.navigate(routes.cmsScreen, {url: contactUsUrl})
                    }
                }} />

            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        />

    </View>
}


const SettingItems = ({ item, isVisible = false, onClick }) => {
    let style;
style = getStyles()

    return <View style={{ width: '100%' }}>

        <TitleWithForward title={item} onClick={onClick} custom={style.setting} />
        {isVisible ? <View style={style.errorDialogLine} /> : null}

    </View>

}