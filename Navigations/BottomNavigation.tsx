/**
 * this screen bottomnavigation screen like homescreen and dashboard
 */
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '../Screens/home/HomeScreen';
import { routes } from '../Values/Routes';
import { colors } from '../Values/AppColores';
import { SearchScreen } from '../Screens/home/SearchScreen';
import { DashboardScreen } from '../Screens/home/DashboardScreen';
import { Image } from 'react-native';
import { colorScheme } from '../Values/AppStyles';

const Tab = createMaterialBottomTabNavigator();


export const MyBottomBar = () => {

    return (
        <Tab.Navigator  initialRouteName={routes.dashboard_screen} activeColor={colors.blue} inactiveColor='black'   barStyle={
            {
                backgroundColor: colors.lightBlue,
            }
            
        } >
            
            <Tab.Screen name={routes.home_main_screen} component={HomeScreen} options={{
                tabBarIcon: (tabInfo) => {
                    return <Image source={require('../assets/images/home.png')}
                        style={{ 
                            height: 18,
                            width: 18,
                            tintColor: tabInfo.focused ? colors.blue : 'grey'
                        }} />
                },
                tabBarLabel: 'Home'

            }} />

            {/* <Tab.Screen name={routes.search_screen} component={SearchScreen} options={{
                tabBarIcon: (tabInfo) => {
                    return <Image source={require('../assets/images/search.png')}
                        style={{
                            height: 18,
                            width: 18,
                            tintColor: tabInfo.focused ? colors.blue : 'grey'
                        }} />
                },
                tabBarLabel: 'Search',
            }} /> */}

             <Tab.Screen name={routes.dashboard_screen} component={DashboardScreen} options={{
                tabBarIcon: (tabInfo) => {
                    return <Image source={require('../assets/images/dashboard.png')}
                        style={{
                            height: 18,
                            width: 18,
                            tintColor: tabInfo.focused ? colors.blue : 'grey'
                        }} />
                },
                tabBarLabel: 'Dashboard'
            }} />
        </Tab.Navigator>
    );
}