/**
 * The `StackNavigationScreen.tsx` handles navigation between different screens in the app using stack navigation.
 */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../Values/Routes";
import { SplashScreen } from "../Screens/authentication/SplashScreen";
import { LoginScreen } from "../Screens/authentication/LoginScreen";
import { RegistrationScreen } from "../Screens/authentication/RegistrationScreen";
import { ForgotPasswordScreen } from "../Screens/authentication/ForgotPasswordScreen";
import { OTPScreen } from "../Screens/authentication/OtpScreen";
import { HomeScreen } from "../Screens/home/HomeScreen";
import { ResetPasswordScreen } from "../Screens/authentication/ResetPasswordScreen";
import { InterestScreen } from "../Screens/authentication/InterestScreen";
import { MyBottomBar } from "./BottomNavigation";
import { strings } from "../Localization";
import { Text } from "react-native";
import { colorScheme, style } from "../Values/AppStyles";
import { GameLandingScreen } from "../Screens/game/GameLandingScreen";
import { CourseLandingScreen } from "../Screens/course/CourseLandingScreen";
import { DrawerNavigation } from "./DrawerNavigation";
import { SettingScreen } from "../Screens/drawer/SettingScreen";
import { ProfileScreen } from "../Screens/drawer/ProfileScreen";
import { PlayGameScreen } from "../Screens/game/PlayGameScreen";
import { CourseDetailScreen } from "../Screens/course/CourseDetailScreen";
import { ClassSumarryScreen } from "../Screens/teacher/ClassSumarry";
import { HomeWorkDetailsScreen } from "../Screens/teacher/HomeWorkDetail";
import { UserProfileScreen } from "../Screens/teacher/UserProfileScreen";
import { PDFScreen, PDFViewScreen } from "../Screens/viewfiles/PDFViewScreen";
import { UserTaskViewScreen } from "../Screens/teacher/UserTaskViewScreen";
import { GameDashboardScreen } from "../Screens/game/GameDashboardScreen";
import { LeaderBoaredScreen } from "../Screens/student/LeaderBoaredScreen";
import { HomeWorkSummaryScreen } from "../Screens/student/HomeWorkSummaryScreen";
import { StudentHomeWorkScreen } from "../Screens/student/StudentHomeWorkScreen";
import { StudentViewHomeWorkDetailScreen } from "../Screens/student/StudentViewHomeWorkDetailScreen";
import { SecurityScreen } from "../Screens/drawer/SecurityScreen";
import { ChangePasswordScreen } from "../Screens/authentication/ChangePasswordScreen";
import { CMSScreen } from "../Screens/drawer/CMSScreen";
import { HelpAndSupportScreen } from "../Screens/drawer/HelpAndSupportScreen";
import { QuizSummaryScreen } from "../Screens/quiz/QuizSummaryScreen";
import { QuizInstructionScreen } from "../Screens/quiz/QuizInstructionScreen";
import { QuizScreen } from "../Screens/quiz/QuizScreen";
import { QuizResultScreen } from "../Screens/quiz/QuizResultScreen";
import { CourseSummaryScreen } from "../Screens/course/CourseSummaryScreen";
import { AllFileScreens } from "../Screens/viewfiles/AllFileScreens";
import { ImageViewScreen } from "../Screens/viewfiles/ImageViewScreen";
import { VideoPlayer, VideoPlayerScreen } from "../utils/VideoPlayer";
import { PDFEditorScreen } from "../Screens/viewfiles/PDFEditorScreen";
import { StudentViewTaskDetailScreen } from "../Screens/student/StudentViewTaskDetailScreen";
import { PaymentScreen } from "../Screens/home/Payment";
import { colors } from "../Values/AppColores";
import{GameInterestScreen}from"../Screens/game/Gameinterestscreen";
import {DocViewScreen} from "../Screens/viewfiles/DocViewScreen";
import {TxtViewScreen} from "../Screens/viewfiles/Txtviewscreen";
import { DashboardScreen } from '../Screens/home/DashboardScreen';
const Stack = createNativeStackNavigator();


export const StackNavigation = () => {

    return <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: colors.lightBlue,
        },
        headerTintColor: 'black',
        headerTitleAlign: 'center',
        headerBackTitleStyle: {fontSize: 0}
    }}>

        <Stack.Screen name={routes.splash_screen} component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name={routes.login_screen} component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name={routes.registre_screen} component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name={routes.forgot_password_screen} component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name={routes.otp_screen} component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name={routes.interest_screen} component={InterestScreen} options={{ headerShown: false }} />
        <Stack.Screen name={routes.home_screen} component={DrawerNavigation} options={{ headerShown: false }} />
        <Stack.Screen name={routes.reset_password_screen} component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name={routes.game_landing_screen} component={GameLandingScreen} options={{
            headerTitle: strings.appName,

        }} />
        <Stack.Screen name={routes.dashboard_screen} component={DrawerNavigation} 
        //     options={{
        //     headerTitle: strings.appName,

        // }}
        options={{ headerShown: false }}
           
        />
        <Stack.Screen name={routes.course_landing_screen} component={CourseLandingScreen} options={{
            headerTitle: strings.appName,

        }} />
{/* pravin added new screen for gameinterest_screen */}
<Stack.Screen name={routes.gameinterest_screen} component={GameInterestScreen} options={{
            headerTitle: strings.appName,

        }} />

        <Stack.Screen name={routes.setting_screen} component={SettingScreen} options={{
            headerTitle: strings.settings,
            contentStyle: {
                borderTopColor: 'grey',
                borderTopWidth: 0.5,

            }
        }} />

        <Stack.Screen name={routes.profile_screen} component={ProfileScreen} options={{
            headerTitle: strings.profile,
            contentStyle: {
                borderTopColor: 'grey',
                borderTopWidth: 0.5,

            }
        }} />

        <Stack.Screen name={routes.play_game_screen} component={PlayGameScreen} options={{
            headerTitle: strings.game,
        }} />

        <Stack.Screen name={routes.course_detail_screen} component={CourseDetailScreen} options={{
            headerShown: true,
            headerTitle: strings.appName,
        }} />

        <Stack.Screen name={routes.class_summary_screen} component={ClassSumarryScreen} options={{
            headerTitle: strings.appName,
        }} />

        <Stack.Screen name={routes.home_work_details_screen} component={HomeWorkDetailsScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.another_user_profile} component={UserProfileScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.pdf_view_screen} component={PDFViewScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.task_view_screen} component={UserTaskViewScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.game_dashboard_screen} component={GameDashboardScreen} options={{
            headerTitle: strings.appName,
        }} />

        <Stack.Screen name={routes.leader_boared_screen} component={LeaderBoaredScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.homwwork_summary_sreen} component={HomeWorkSummaryScreen} options={{
            headerTitle: strings.appName,
        }} />

        <Stack.Screen name={routes.student_home_work_screen} component={StudentHomeWorkScreen} options={{
            headerTitle: strings.appName,
        }} />

        <Stack.Screen name={routes.studentViweHomeWorkDetailScreen} component={StudentViewHomeWorkDetailScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.paymentScreen} component={PaymentScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.securityScreen} component={SecurityScreen} options={{
            headerTitle: strings.security,
            contentStyle: style.lineScreen
        }} />
        <Stack.Screen name={routes.changepasswordScreen} component={ChangePasswordScreen} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen
        }} />

        <Stack.Screen name={routes.cmsScreen} component={CMSScreen} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen
        }} />
        <Stack.Screen name={routes.helpAndSupportScreen} component={HelpAndSupportScreen} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen
        }} />
        <Stack.Screen name={routes.quizSummaryScreen} component={QuizSummaryScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.quizInstructionyScreen} component={QuizInstructionScreen} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.quiz_screen} component={QuizScreen} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen

        }} />

        <Stack.Screen name={routes.quiz_result_screen} component={QuizResultScreen} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen

        }} />

        <Stack.Screen name={routes.courseSummaryPage} component={CourseSummaryScreen} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen

        }} />

        <Stack.Screen name={routes.courseDetailScreen} component={CourseDetailScreen} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen

        }} />

        <Stack.Screen name={routes.all_file_screen} component={AllFileScreens} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen
        }} />

        <Stack.Screen name={routes.image_view_screen} component={ImageViewScreen} options={{
            headerTitle: strings.appName,
            contentStyle: style.lineScreen
        }} />
        <Stack.Screen name={routes.videoPlayerScreen} component={VideoPlayer} options={{
            headerTitle: strings.appName,
        }} />
        <Stack.Screen name={routes.student_task_detail_screen} component={StudentViewTaskDetailScreen} options={{
            headerTitle: strings.appName,
        }} />

        <Stack.Screen name={routes.pdf_editer} component={PDFEditorScreen} options={{ headerShown: true, headerTitle: strings.appName, }} />

        <Stack.Screen name={routes.doc_screen} component={DocViewScreen} options={{
            headerTitle: strings.appName,
        }} />

<Stack.Screen name={routes.text_screen} component={TxtViewScreen} options={{
            headerTitle: strings.appName,
        }} />

    </Stack.Navigator>

}