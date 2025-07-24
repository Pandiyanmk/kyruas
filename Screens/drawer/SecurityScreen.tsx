

import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles  } from "../../Values/AppStyles"
import { useEffect } from "react"
import { routes } from "../../Values/Routes"
import { TitleWithForward } from "../../Components/TitleWithForward"
import { TouchableOpacity } from "react-native-gesture-handler"
import { securityData, settingData } from "../../store/LocalDataStore"
import { alertConfimationDialog } from "../../utils/AlertsDialogs"
import { useSelector } from 'react-redux';

// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
export const SecurityScreen = ({ navigation }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    
        useEffect(() => {
            colorScheme(theme)
            style = getStyles()
        }, [theme])

  
    const deleteAccount = (item: any) => {
        alertConfimationDialog(strings.delete_account,
            strings.are_you_sure_you_want_to_delete_acccount,
            () => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: routes.login_screen }],
                  })
            })
    }

    return <View style={[style.viewBox, { padding: 0 }]}>

        <FlatList style={{ marginTop: 10 }}
            data={securityData}
            renderItem={({ item, index }) => (

                <SettingItems item={item} isVisible={index != settingData.length - 1} onClick={(items) => {
                    if (item == strings.delete_account) {
                        deleteAccount(item)
                    } else {
                        navigation.navigate(routes.changepasswordScreen)
                    }
                }} />

            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        />

    </View>
}


const SettingItems = ({ item, isVisible = false, onClick }) => {
    let style;
    style = getStyles()
    return <View style={{ width: '100%' }}>

        <TitleWithForward title={item} onClick={() => {
            onClick()
        }} custom={style.setting} />
        {isVisible ? <View style={style.errorDialogLine} /> : null}

    </View>

}