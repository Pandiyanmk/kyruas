import { strings } from "../Localization";
import { colors } from "../Values/AppColores";
import { colorScheme } from "../Values/AppStyles";
import { routes } from "../Values/Routes";


export const localEnum = {
    user_id: "user_id",
    password: "password",
    first_name: 'first_name',
    last_name: "last_name",
    number: "number",
    cnpassword: "cnpassword",
    oldpassword: "oldpassword",
    email_mobile: 'email_mobile',
    homework: 'homeWork',
    games: 'games',
    course: 'course',
    mp4: 'mp4',
    mov: 'mov',
    audio:'audio',
    homework_upcoming: 'homework_upcoming',
    homework_to_be_graded: "homework_to_be_graded",
    homework_to_be_turened_in: "homework_to_be_turened_in",

    class_summary: 'class_summary',
    class_student_summary: 'class_student_summary',
    quiz: 'quiz',
    active_quiz: 'active_quiz',

    student_homework: 'student_homework',
    student_by_subject_homework: 'student_by_subject_homework',
    draft: 'Draft',
    image: 'image',
    pdf: 'pdf',
   doc : 'doc',
   docx : 'docx',
   office : 'office',
   text:'text',
   txt:'txt',
    mp3: 'mp3',
    wav: 'wav',
    comment: 'comment',
    score: 'score',
    video: 'video',
    error: 'error',
    sucess: 'sucess',
    videoType: 'video',
    title: 'title',
    development: 'Development',
    testing: 'Testing',
    production: 'Production',
    apierror: 'ERROR',
    apisucess: 'SUCCESS',
    Pending: 'Pending',
    Submitted: 'Submitted',
    Returned: 'Returned',
    Graded: 'Graded',
    webm: "webm"
}

export const fontFamily = {
    robotoRegular: "Roboto-Regular",
    robotoBold: "Roboto",
    rotobotMediume: "Roboto Medium",
    tamil:"Latha"
}

export const pdf = require('../assets/images/pdf.png')
export const photo = require('../assets/images/photo.png')
export const music = require('../assets/images/music.png')
export const document = require('../assets/images/new_document.png')
export const playIcon = require('../assets/images/play.png')
export const pauseIcon = require('../assets/images/pause.png')
export const closeIcon = require('../assets/images/close.png')
export const trophy = require('../assets/images/trophy.png')
export const game_crossword = require('../assets/images/game_crossword.png')
export const gameDashboardIcon = require('../assets/images/joystick.png')
export const settingsIcon = require('../assets/images/settings.png')
export const avatar1 = require('../assets/images/avatar1.png')
export const avatar2 = require('../assets/images/avatar2.png')
export const avatar3 = require('../assets/images/avatar3.png')
export const avatar4 = require('../assets/images/avatar4.png')
export const avatar5 = require('../assets/images/avatar5.png')
export const avatar6 = require('../assets/images/avatar6.png')
export const avatar7 = require('../assets/images/avatar7.png')
export const avatar8 = require('../assets/images/avatar8.png')
export const avatar9 = require('../assets/images/avatar9.png')
export const boared = require('../assets/images/boared.png')
export const bulletedList = require('../assets/images/bulletedList.png')
export const eye = require('../assets/images/eye.png')
export const eyeWithCircle = require('../assets/images/eyeWithCircle.png')
export const scan = require('../assets/images/scan.png')
export const camera = require('../assets/images/camera.png')
export const upload = require('../assets/images/upload.png')
export const mic = require('../assets/images/mic.png')
export const mic1 = require('../assets/images/mic1.png')
export const documents = '../assets/images/document.pdf'
export const video = require('../assets/images/video.png')
export const gallery = require('../assets/images/gallery.png')
export const deleteIcon = require('../assets/images/delete.png')
export const checkedBox = require('../assets/images/checked.png')
export const uncheckedBox = require('../assets/images/unchecked.png')
export const cheersIcon = require('../assets/images/cheers.png')
export const emailIcon = require('../assets/images/email.png')
export const pauseVideo = require('../assets/images/pauseVideo.png')
export const playVideo = require('../assets/images/playVideo.png')

export const forwardVideo = require('../assets/images/forwardVideo.png')
export const backwardVideo = require('../assets/images/backwardVideo.png')
export const fullscreenVideo = require('../assets/images/fullscreenVideo.png')
export const minimizeVideo = require('../assets/images/minimizeVideo.png')
export const forward_arrow = require('../assets/images/forward_arrows.png')
export const logoutIcon = require('../assets/images/LogOut.png')
export const musicgf = require('../assets/images/musicgf.gif')
export const visible = require('../assets/images/visible.png')
export const invisible = require('../assets/images/invisible.png')
export const eyeImage = require('../assets/images/eye.png')
export const crossword = require('../assets/images/crossword.png')
export const user_profile = require('../assets/images/user_profile.png')
export const tamil=require('../assets/images/finalbanner.png')
export const bannerimg=require('../assets/images/newbanner.png')
export const banner=require('../assets/images/bannerpost_png.png')
export const notepad=require('../assets/images/notepad.png')
export const useType = (type: string) => {
 console.log("type_image",type)
    if (type == localEnum.pdf) {
        return pdf;}
    // } 
    else if(type == localEnum.txt || type == localEnum.text)
    {
        return notepad;
    }
    else if (imageExtention(type)) {
        return photo;
    }
    else if (audioExtention(type)) {
        return music;
    }
    else if (videoExtention(type)) {
        return video;
    }
    else if (type == localEnum.audio) {
        return music;
    }
    else {
        return document;
    }

}

export const refreshData = {
    homeWorkData: false,
    dashboardRefresh: false,
    isTeacher: false
}

// pdf,jpeg,docx,doc,m4a,mp3,wav,ogg,mp3,jpg,mov,tif,webm,HEIC,PNG
export const videoExtention = (type: any) => {

    switch (type) {

        case localEnum.video: {
            return true;
        }
        case localEnum.mov: {
            return true;
        }
        case localEnum.mp4: {
            return true

        }
        case localEnum.webm: {
            return true
        }
        case localEnum.video: {
            return true
        }
        default: {
            return false
        }

    }
}


export const audioExtention = (type: any) => {

    switch (type) {
        case "wav": {
            return true;

        }
        case "m4a": {
            return true;
        }
        case localEnum.mp3: {
            return true
        }
        case  "ogg": {
            return true
        }
        case  "mov": {
            return true
        }
        case  "mpg": {
            return true
        }
        default: {
            return false
        }

    }
}


export const imageExtention = (type: any) => {

    switch (type) {
        case "png": {
            return true;

        }
        case "jpg": {
            return true;

        }
        case "jpeg": {
            return true;
        }
        case "gif": {
            return true

        }
        case "tif": {
            return true

        }
        case "heic": {
            return true

        }
        case localEnum.image: {
            return true

        }
        default: {
            return false
        }

    }
}


// Previously, images were loaded into the database. Now, changes have been made to load the images locally for proper display.
// 25/03/2024 - Pravin
export const images = [
    tamil,
    bannerimg, 
    banner
]


export const Gameimages = [
    'https://play-lh.googleusercontent.com/AufZTCsNC5C19qCvVKN4jGb-yWxwsf5m04wDt7XAEKhiHBoRwUBONgPB1_9lj-MPdLk=w2560-h1440-rw',
    'https://cn.i.cdn.ti-platform.com/content/691/air-hockey-scramble/game/uk/air-hockey-scramble-en-1600x900.e78ce67f.jpg?imwidth=300',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsrCLWVA7zwfHx55MF4lGZN-j7cCLJWdbo7Q&usqp=CAU'
];

export const games = [
    'Crossword',
    'Coin word',
    'Spot Difference',

];

export const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
]

export const learn = [
    'Languages',
    'Computer',
    'Robotics',


];
export const summaryList = [
    { title: 'Enrolled', count: '30' },
    { title: 'Pending Submission', count: '10' },
    { title: 'Graded', count: '11' },
    { title: 'Pending Grading', count: '9' },
];


export const summaryList1 = [
    { title: 'Enrolled', count: '10' },
    { title: 'Pending Submission', count: '3' },
    { title: 'Pending Grading', count: '4' },

    { title: 'Graded', count: '3' },
];

export const teacherHomwWork = [
    { title: 'Enrolled', count: '10' },
    { title: 'Turned in​', count: '3' },
    { title: 'Graded', count: '4' },

    { title: 'Pending', count: '3' },
];

export const quizSummaryList = [
    { title: 'Enrolled', count: '10', bgColor: colors.lightBlue },

    { title: 'Active', count: '5', bgColor: colors.dirtyWhite },
    { title: 'Completed', count: '10', bgColor: colors.mint },
    { title: 'Missed', count: '7', bgColor: colors.lightRed },

];

export const workUploadList = [
    { title: 'Enrolled', count: '10' },
    { title: 'Turned in', count: '3' },
    { title: 'Graded', count: '7' },
];

// 13/3/2024 Pravin
// now changed the studentcontainer colors.previously pending submission  color is mint color now changed the lightRed color and
// also changed the Graded color is lightRed color now changed the mint color in line number 296 to 299
export const studentworkUploadList = [
    { title: 'Enrolled', count: '10', bgColor: colors.lightBlue },
    { title: 'Pending Submission', count: '5', bgColor: colors.lightRed },
    { title: 'Pending Grading', count: '3', bgColor: colors.dirtyWhite },
    { title: 'Graded', count: '2', bgColor: colors.mint },

];

export const settingData = [
    strings.security,
    strings.support_us,
    strings.about_us
];

export const securityData = [
    strings.change_password,
    // strings.delete_account,
];

export const URI = "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1LzQ0NS1tY2tpbnNleS0wNDc3LXBhaV8xLmpwZw.jpg"

export const gamesDetails = [
    { title: 'Coin Word', list: ["Tamil", "AI", "Robotics"] }
];

export const courseDetails = [
    { title: 'Trending', list: ["Learn Tamil", "AI", "How to Cook"] },
    { title: 'Tamil', list: ["9th Tamil", "10th Tamil", "??"] },
    { title: 'Computer', list: ["AI in Tamil", "Programming", "??"] },
];


export const courseDetailsList = [
    'HTML',
    'CSS',
    'C',
    'C++',
    'Javascript',
    'PHP',
    '. Net'
];

export const homeworkList = [
    { title: 'Essay', status: 'Completed' },
    { title: 'Conversation', status: 'In progress' },
    { title: 'Climate Change', status: 'Yet to start' },
];

export const enrolledList = [
    { title: 'Jone Doe', status: 'Completed' },
    { title: 'Benny', status: 'In progress' },
    { title: 'Don', status: 'Yet to start' },
    { title: 'Rose', status: 'Yet to start' },

];
export const classschollList = [
    { title: 'Jone Doe', count: '1', rank: 94 },
    { title: 'Jone Doe', count: '2', rank: 91 },
    { title: 'Jone Doe', count: '3', rank: 89 },
    { title: 'Jone Doe', count: '4', rank: 86 },
    { title: 'Jone Doe', count: '5', rank: 81 },
    { title: 'Jone Doe', count: '6', rank: 65 },


];

export const quizList = [
    { title: 'Quiz 1', count: '1', rank: 94 },
    { title: 'Quiz 2', count: '2', rank: 91 },
    { title: 'Quiz 3', count: '3', rank: 89 },



];

export const nonProfileList = [
    { title: 'W1 - Essay', status: 'Completed', type: localEnum.image },
    { title: 'W1 - Conversation', type: localEnum.pdf },
    { title: 'W1 – About me', status: 'Yet to start', type: localEnum.image },
    { title: 'W1 - Rhyme', status: 'Yet to start', type: localEnum.mp3 },
];


export const dummayMp3 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"

export const teacherList = [
    { title: 'Homework Due by Student', type: localEnum.homework, list: [{ work: "W1", class: "3A", color: 'red', title: "Conversation", subtitle: "5" }, { work: "W2", class: "3B", color: 'yellow', title: "Conversation", subtitle: "10" }, { work: "W3", class: "3C", color: 'green', title: "Conversation", subtitle: "15" }] },
    { title: 'Homework To be Graded', type: localEnum.homework_to_be_graded, list: [{ work: "W1", class: "3A", color: 'red', title: "Conversation", subtitle: "5" }, { work: "W2", class: "3B", color: 'yellow', title: "Conversation", subtitle: "10" }, { work: "W3", class: "3C", color: 'green', title: "Conversation", subtitle: "15" }] },

    { title: 'Classes', type: localEnum.class_summary, list: ["3A", "3B", "3C"] },
    { title: 'Homework Upcoming', type: localEnum.homework_upcoming, list: [{ work: "W1", class: "3A", color: '', title: "Conversation", subtitle: "" }, { work: "W2", class: "3B", color: '', title: "Conversation", subtitle: "" }, { work: "W3", class: "3C", color: '', title: "Conversation", subtitle: "" }] },

];

export const setColor = (type: any) => {
    switch (type) {
        case 'OverDue': {
            return 'red'
        }
        case 'Active': {
            return 'green'
        }
        default: {
            return 'green'
        }
    }
}

export const quize = {
    title: 'Active Quiz', type: localEnum.active_quiz, list: [
        { work: "Active", class: "", color: '', title: "Quiz 1" },
        { work: "Active", class: "", color: '', title: "Quiz 2" },
        { work: "Upcoming", class: "", color: '', title: "Quiz 3" }
    ]
}


export const studentHomeworkData = {
    title: 'Homework to be turned in', type: localEnum.homework_to_be_turened_in, list: [
        { work: "W1", class: "3A", color: '', title: "Essay", subtitle: "Overdue" },
        { work: "W2", class: "3B", color: '', title: "Circle", subtitle: "Active" },
        { work: "W3", class: "3C", color: '', title: "Speech", subtitle: "Overdue" }],
    errorMessage: 'All homework turned in by you'
}

export const studentList = [
    {
        title: 'Homework to be turned in', type: localEnum.student_by_subject_homework, list: [
            { work: "W1", class: "3A", color: '', title: "Essay", subtitle: "Overdue" },
            { work: "W2", class: "3B", color: '', title: "Circle", subtitle: "Active" },
            { work: "W3", class: "3C", color: '', title: "Speech", subtitle: "Overdue" }]
    },
    {
        title: 'Homework by subject', type: localEnum.student_homework, list: [
            { work: "", class: "3A", color: '', title: "Essay" },
            { work: "", class: "3B", color: '', title: "Circle" },
            { work: "", class: "3C", color: '', title: "Speech" }]
    },
    {
        title: 'Courses', type: localEnum.class_student_summary, list: [
            { work: "", class: "", color: '', title: "Tamil" },
            { work: "", class: "", color: '', title: "Poem" },
            { work: "", class: "", color: '', title: "Grammar" }
        ]
    },
    {
        title: 'Quiz', type: localEnum.quiz, list: [
            { work: "", class: "3A", color: '', title: "Daily" },
            { work: "", class: "3B", color: '', title: "Weekly" },
            { work: "", class: "3C", color: '', title: "Monthly" }
        ]
    }

];


export const quizSummary = [
    {
        title: 'Active', type: localEnum.student_homework, list: [
            { work: "W1", class: "3A", color: 'red', title: "Essay" },
            { work: "W2", class: "3B", color: 'yellow', title: "Circle" },
            { work: "W3", class: "3C", color: 'green', title: "Speech" }]
    },
    {
        title: 'Upcoming', type: localEnum.class_student_summary, list: [
            { work: "W1", class: "3A", color: '', title: "Tamil" },
            { work: "W2", class: "3B", color: '', title: "Poem" },
            { work: "W3", class: "3C", color: '', title: "Grammar" }
        ]
    },
    {
        title: 'Completed', type: localEnum.quiz, list: [
            { work: "W1", class: "3A", color: '', title: "Daily" },
            { work: "W2", class: "3B", color: '', title: "Weekly" },
            { work: "W3", class: "3C", color: '', title: "Monthly" }
        ]
    }

];
export const sumaaryList2 = { title: 'Homeworks to be graded (for a class)', type: localEnum.title, list: ["Tamil", "Science", "English"] }

export const courseSummaryList = { title: 'Course Enrolled', type: localEnum.homework, list: ["Tamil", "Grammar", "Maths"] }

export const searchList = [
    { title: strings.lets_play, type: localEnum.games, list: games },
    { title: strings.explore_to_learn, type: localEnum.course, list: learn },

    { title: 'Homework Due', type: localEnum.homework, list: [{ work: "W1", class: "3A", color: 'red', title: "Conversation" }, { work: "W2", class: "3B", color: 'yellow', title: "Conversation" }, { work: "W3", class: "3C", color: 'green', title: "Conversation" }] },
    { title: 'Homework Upcoming', type: localEnum.homework_upcoming, list: [{ work: "W1", class: "3A", color: '', title: "Conversation" }, { work: "W2", class: "3B", color: '', title: "Conversation" }, { work: "W3", class: "3C", color: '', title: "Conversation" }] },

    { title: 'Classes', type: localEnum.class_summary, list: ["3A", "3B", "3C"] },
    { title: 'Homework Completed', list: ["Conversation", "Conversation", "Conversation"] },

];

// List of available interests
export const interests = [
    'Technology',
    'Sports',
    'Art',
    'Music',
    'Cooking',
    'Travel',
    'Robotics',
    'Computer',
    'Science',
    'Astronomy',
    'Energy'
    // Add more interests as needed
];



export const getBgColor = (type: any) => {

    switch (type) {

        case localEnum.class_summary: case localEnum.course: case localEnum.homework_to_be_turened_in: case localEnum.Returned:
            return colors.dirtyWhite
        case localEnum.homework_to_be_graded: case localEnum.student_homework:  case localEnum.Graded:
            return colors.mint
        case localEnum.homework_upcoming: case localEnum.quiz:
            return colors.lightGreen
         case localEnum.student_by_subject_homework: case localEnum.Pending:  case localEnum.homework: 
            return colors.lightRed
        case routes.turned_in_screen: case routes.enrolled_screen: case "Homework" :
            return colors.lightBlue
            case localEnum.title:
                return colors.lightYellow
        default:
            return colorScheme() === 'dark' ? colors.light_grey : colors.white
    }
}