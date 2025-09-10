import { routes } from "../Values/Routes";
import { localEnum } from "../store/LocalDataStore";

export const BASE_URL = (type = localEnum.development) => {
    if (type == localEnum.development) {
        return apiUrls.development
    } else if (type == localEnum.testing) {
        return apiUrls.testing
    } else {
        return apiUrls.production
    }
}

export const apiUrls = {
    //  development: 'https://mobapp.banyanpro.com/api',
    development: 'https://mobappuat.banyanpro.com/api',
    testing: '',
    production: ''
}

export const modules = {
    userManagement: "/usermanagement/",
    teacherModule: "/teacherview",
    studentModule: '/studentview/',
    gameModule: "/gameview"
}

export const userManagementModule = {
    authentication: modules.userManagement + "Authenticate",
    login: modules.userManagement + "login",
    sendOtp: modules.userManagement + "SendORResendOTP",
    verifyOtp: modules.userManagement + "VerifyOTP",
    resetPass: modules.userManagement + "ResetPassword",
    GoogleLogin: modules.userManagement + "GoogleLogin",
    useremaildetails: modules.userManagement + "GetuserEmailDetails",
    userpassworddetails: modules.userManagement + "GetuserPassword",
}

export const TeacherModule = {
    getTeacherDashboard: modules.teacherModule + "/GetTeacherDashboard",
    getHWkSummaryForTeacher: modules.teacherModule + "/GetHWSummaryForTeacher",
    getClassHWSummary: modules.teacherModule + "/GetClassHWSummary",
    getHWDetailsofStudent: modules.teacherModule + "/GetHWDetailsofStudent",
    hWReviewByTeacher: modules.teacherModule + "/hWReviewByTeacher",

    getStudentHomeWorkSummary: modules.teacherModule + "/GetStudentHWSummary",

    hwReviewByTeacherAudioComments: modules.teacherModule + "/HWReviewByTeacherAudioComments"
}


export const StudentModule = {
    getStudentDashboard: modules.studentModule + 'GetMyDashboard',
    getMyHomeWorksBySubject: modules.studentModule + 'GetMyHomeWorksBySubject',
    getHWDetailsAllStatus: modules.studentModule + 'GetHWDetailsofStudent',
    SaveDraftORSubmitHomeWork: modules.studentModule + 'SaveDraftORSubmitHomeWork',
    UploadHWFilesByStudent: modules.studentModule + 'UploadHWFilesByStudent',
    DeleteHWFileByStudent: modules.studentModule + 'DeleteHWFileByStudent',
}

export const gameModule = {
    GetGameCategories: modules.gameModule + 'GetGameCategories',
    GetCoinWordMaster: modules.gameModule + 'GetCoinwordMaster'
}