import { DrawerContentScrollView } from "@react-navigation/drawer"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { colorScheme, style as getStyles } from "../Values/AppStyles"
import { URI, gameDashboardIcon, logoutIcon, settingsIcon, user_profile } from "../store/LocalDataStore"
import { routes } from "../Values/Routes"
import { name as app_name, version as app_version } from '../package.json';
import { strings } from "../Localization"
import { alertConfimationDialog } from "../utils/AlertsDialogs"
import { AsyncStorageKeys, getValue, saveValue } from "../store/UserStorage"
import { colors } from "../Values/AppColores"
import { useEffect, useState } from "react"
import { DeviceEventEmitter } from "react-native";
import DeviceInfo from "react-native-device-info"
import { userInformation } from "../store/UserStorage"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector } from 'react-redux';
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
let style;

export const CustomDrawer = (props) => {
    const [userPhoto, setUserPhoto] = useState(null); // Add state for user photo
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        // style = getStyles()
        }, [theme])
let userName;

        useEffect(() => {
            getValue().then(it => {
                if (it) {
                    userInformation.DBId = it.dbId
                    userInformation.UserId = it.userid
                    userInformation.UserName=it.uname
                    userInformation.token=it.token
                    userInformation.AliasID=it.aliasId

                    console.log("name-token",it);
                    console.log("Homepage information",userInformation);
    
                }
            })
        }, [])
        console.log("name",userName);
    useEffect(() => {
        const getUserPhoto = async () => {
            try {
                const storedUserPhoto = await AsyncStorage.getItem('userPhoto');
                console.log('Stored User Photo:', storedUserPhoto);
                setUserPhoto(storedUserPhoto || null);
            } catch (error) {
                console.error('Error retrieving user photo from AsyncStorage', error);
            }
        };

        getUserPhoto();
    }, []);

    useEffect(() => {
        const drawerListener = DeviceEventEmitter.addListener('drawerStateChanged', async ({ isOpen }) => {
          if (isOpen) {
            const storedUserPhoto = await AsyncStorage.getItem('userPhoto');
            console.log('Stored User Photo:', storedUserPhoto);
            setUserPhoto(storedUserPhoto || null);
          }
        });
    
        return () => drawerListener.remove();
      }, []);
     

    const logout = (item: any) => {
        props.navigation.closeDrawer()
        alertConfimationDialog(strings.logout,
            strings.are_you_sure_you_want_to_logout,
            () => {
                 saveValue(AsyncStorageKeys.userData, null)
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: routes.login_screen }],
                })
            })
    }

    return <View style={[style.viewBox, { padding: 0 }]}>

        <TouchableOpacity onPress={() => {
            // props.navigation.navigate(routes.profile_screen)
            props.navigation.closeDrawer();

        }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 10 }}>
                {/* <Image  source={userPhoto ? { uri: userPhoto } : require('../assets/images/user_profile.png')} style={{ height: 80, width: 80, borderRadius: 40, tintColor: colorScheme() == "dark" ? colors.white : colors.black }} /> */}
                {userPhoto !== null ? (
                    <Image
                        source={{ uri: userPhoto }}
                        style={{ height: 80, width: 80, borderRadius: 40 }}
                    />
                ) : (
                    <Image
                        source={require('../assets/images/user_profile.png')}
                        style={{ height: 80, width: 80, borderRadius: 40, tintColor: colorScheme() == "dark" ? 'white' : 'black'}}
                    />
                )}
                <Text style={[style.textStyle, { fontFamily: 'Roboto', fontSize: 22, marginTop: 2 }]}>{userInformation.UserName}</Text>
            </View></TouchableOpacity>

        <View style={style.errorDialogLine} />

        <IconWithText onClick={() => {
         props.navigation.navigate(routes.setting_screen)
            props.navigation.closeDrawer();
        }} />


        <IconWithText icon={logoutIcon} onClick={logout} title={strings.logout} />

        <Text style={[style.textStyle, style.absulates, {
            fontFamily: 'Roboto',
            fontSize: 12, width: '100%', textAlign: 'center'
        }]}>{"Version: " + DeviceInfo.getVersion()+"\nPowered by BanyanPro"}</Text>

    </View>
}

const IconWithText = ({ title = strings.settings, icon = settingsIcon, onClick }) => {
    style = getStyles()
    return <TouchableOpacity onPress={onClick} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 20, marginStart: 20, paddingVertical: 10 }}>
        <Image source={icon} style={style.forwordImage} />
        <Text style={style.letsPlayText}>{title}</Text>
    </TouchableOpacity>
}