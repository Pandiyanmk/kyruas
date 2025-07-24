/**
 * drawernavigation screen in sidebar
 */
import { View } from "react-native"
import { colorScheme, style } from "../Values/AppStyles"

import { createDrawerNavigator } from '@react-navigation/drawer';
import { SettingScreen } from "../Screens/drawer/SettingScreen";
import { routes } from "../Values/Routes";
import { MyBottomBar } from "./BottomNavigation";
import { strings } from "../Localization";
import { colors } from "../Values/AppColores";
import { CustomDrawer } from "../Components/DrawerContent";

const Drawer = createDrawerNavigator();



export function DrawerNavigation() {

    return (<Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={
        {
            drawerContentStyle: {
                backgroundColor: colors.lightBlue,
            },

            drawerLabelStyle: {
                color:  'black'
            },
            headerStyle: {
                backgroundColor: colors.lightBlue,
            },
            headerTitleStyle: {
                color:  'black'

            },
            headerTintColor:  'black',
            headerTitleAlign: 'center',

        }
    }>
        {/* <Drawer.Screen name={routes.drawer_screen} component={MyBottomBar} options={{
            headerTitle: strings.appName,
            drawerLabel: "Home"
        }} /> */}
        <Drawer.Screen name={routes.drawer_screen} component={MyBottomBar} options={{
            headerTitle: strings.appName,
            drawerLabel: "Dashboard"
        }} />
       
    </Drawer.Navigator>)


}