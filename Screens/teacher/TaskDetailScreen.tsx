/**
 * this screen teacher evulate the student homework  in marks and comments
 */
import { Alert, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles, width } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { ScrollView } from "react-native-gesture-handler"
import { useRoute } from "@react-navigation/native"
import { CommonTextInput } from "../../Global/TextInputs"
import { colors } from "../../Values/AppColores"
import { URI, audioExtention, fontFamily, imageExtention, localEnum, mic, mic1, nonProfileList, refreshData, videoExtention } from "../../store/LocalDataStore"
import { FilesInflate, NonInrolledInflate, StudentSubmissions, TeacherComments } from "../../Components/GameItem"
import { AddCommantBottomSheet, EditFileTitleBottomSheet, MoreInfoBottomSheet, PlayAudioBottomSheet, ProgressDialog } from "../../Global/Modales"
import { RadioButtonWithText } from "../student/LeaderBoaredScreen"
import { CommonButton } from "../../Global/Buttons"
import { RetryWhenErrorOccur } from "../../Components/TitleWithForward"
import { pdfurl } from "../viewfiles/PDFViewScreen"
import { createFormData, postAPICall, postMultipartData } from "../../Netowork/Apis"
import { userInformation } from "../../store/UserStorage"
import { TeacherModule } from "../../Netowork/Constants"
import { validCheck } from "../../Global/Validations"
import RenderHtml from 'react-native-render-html';
import { TextWithReadMore, TextWithReference } from "./HomeWorkDetail"
import { audioPermissions } from "../../utils/Permissions"
import { FileModal } from "../student/StudentHomeWorkScreen"
import { AudioRecoderBottomSheet } from "../../utils/AudioRecorder"
import { alertConfimationDialog } from "../../utils/AlertsDialogs"
import { toastMessage } from "../../utils/Extentions"
import { setUpPlayer } from "../../Global/Player"
import { useSelector } from 'react-redux';

export const TaskDetailScreen = ({ navigation, route }) => {

    // Date 19/03/2024-Pravin
    // Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
    // Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings

    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    // const route = useRoute();
    const [comment, setComment] = useState("")
    const [score, setScore] = useState("")
    const [ConversationScore, setConversationScore] = useState("")
    const [ReadingScore, setReadingScore] = useState("")
    const [WrittenScore, setWrittenScore] = useState("")
    const [projectScore, setProjectScore] = useState("")
    const [player, isPlayer] = useState(false)
    const [itemData, setItemData] = useState()
    const [show, isShow] = useState(false)
    const [select, setSelect] = useState(1)
    const [data, setData] = useState(route.params ? route.params.data : undefined)
    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState({ errorComment: "", erroScore: "" })
    const [error, setError] = useState({
        errorComment: "",
        errorScore: "",
        errorReading: "",
        errorConversation: "",
        errorWritten: "",
        errorProjectScore: ""
    });
    const [errorcon, setconError] = useState({ errorconComment: "", errocon: "" })
    const [dueDate, setDueDate] = useState('')
    const [statusDate, setStatusDate] = useState('')
    const [moreInfo, setMoreInfo] = useState(-1)
    const [showAudioRecorder, setShowAudioRecorder] = useState(false)
    const [audioData, setAudioData] = useState<FileModal>(undefined)
    const [edit, setEdit] = useState({ isShow: false, title: "", pos: 0 })
    var id = userInformation.AliasID
    const audioRecordClick = (item: any) => {
        if (item != undefined) {
            const list = item.toString().split('/')
            const modle = new FileModal(list[list.length - 1],
                localEnum.mp3,
                item,)
            setAudioData(modle)
        }
        setShowAudioRecorder(false)
    }

    console.log("Getteacher", data)
    if (route.name == routes.enrolled_screen || route.name == routes.evaluatedScreen) {
        useEffect(() => {
            // console.log(route.params);

            setUpPlayer()


        }, [])
        useEffect(() => {


            //console.log("ddd", route.params.wordData);

            if (data) {

                setDueDate(`/ Due Date: - ${data.DueDate}`)

                if (data.HomeWorkStatus == localEnum.Graded) {

                    setScore(data.LastGradedScore.toString())
                    setConversationScore(data.ConversationScore.toString())
                    setReadingScore(data.ReadingScore.toString())
                    setWrittenScore(data.WrittenScore.toString())
                    setProjectScore(data.ProjectScore.toString())
                }
            }
        }, [])

        console.log("audio files", audioData)
        const callSubmitData = (fileName: string) => {

            var tempScore = 0
            var tempConversationScore = 0
            var tempProjectScore = 0
            var tempReadingScore = 0
            var tempWrittenScore = 0


            if (data.GradeHSCPFlag == true && select === 1) {
                let hasError = false;
                if (
                    !score || // Empty value
                    isNaN(score) || // Not a number
                    parseFloat(score) <= 0 || // Less than or equal to 0
                    parseFloat(score) > parseFloat(data.TotalHWMarks) || // Exceeds the correct max marks
                    (score.includes(".") && score.split(".")[1].length > 2) // More than 2 decimals
                ) {
                    if (score === "") {
                        setError(prevError => ({ ...prevError, errorScore: "Score cannot be empty" }));
                    } else if (isNaN(score)) {
                        setError(prevError => ({ ...prevError, errorScore: "Enter a valid number" }));
                    } else if (parseFloat(score) <= 0) {
                        setError(prevError => ({ ...prevError, errorScore: "Score must be greater than 0" }));
                    } else if (parseFloat(score) > parseFloat(data.TotalHWMarks)) {
                        setError(prevError => ({ ...prevError, errorScore: `Score cannot exceed the maximum of ${data.TotalHWMarks}` }));
                    } else {
                        setError(prevError => ({ ...prevError, errorScore: "Enter a valid number with up to 2 decimal places" }));
                    }
                    hasError = true; // Set error flag to true
                } else {
                    setError(prevError => ({ ...prevError, errorScore: "" }));
                    tempScore = parseFloat(score); // Assign the valid score
                }

                if (data.IsProjectWeek) {
                    if (
                        !projectScore || // Empty value
                        isNaN(projectScore) || // Not a number
                        parseFloat(projectScore) <= 0 || // Less than or equal to 0
                        parseFloat(projectScore) > parseFloat(data.HWProjMaxMark) || // Exceeds max marks
                        (projectScore.includes(".") && projectScore.split(".")[1].length > 2) // More than 2 decimals
                    ) {
                        if (projectScore === "") {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Project score cannot be empty" }));
                        } else if (isNaN(projectScore)) {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Enter a valid number" }));
                        } else if (parseFloat(projectScore) <= 0) {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Score must be greater than 0" }));
                        }
                        else if (parseFloat(projectScore) > parseFloat(data.HWCMaxMark)) {
                            setError(prevError => ({ ...prevError, errorProjectScore: `Score cannot exceed the maximum of ${data.HWProjMaxMark}` }));
                        }
                        else {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Enter a valid number with up to 2 decimal places" }));
                        }
                        hasError = true; // Set error flag to true
                    } else {
                        setError(prevError => ({ ...prevError, errorProjectScore: "" }));
                        tempProjectScore = parseFloat(projectScore); // Valid score
                    }
                }

                // If there are any errors, do not proceed further
                if (hasError) {
                    return; // Exit the function if any error is found
                }
            }


            if (data.GradeHSCPFlag === false && data.setFlag === false && select === 1) {
                let hasError = false; // Flag to track if there are errors // Regex for up to 2 decimal places
                if (
                    !ConversationScore || // Empty value
                    isNaN(ConversationScore) || // Not a number
                    parseFloat(ConversationScore) <= 0 || // Less than or equal to 0
                    parseFloat(ConversationScore) > parseFloat(data.HWCMaxMark) || // Exceeds max marks
                    (ConversationScore.includes(".") && ConversationScore.split(".")[1].length > 2) // More than 2 decimals
                ) {
                    if (ConversationScore === "") {
                        setError(prevError => ({ ...prevError, errorConversation: "Conversation score cannot be empty" }));
                    } else if (isNaN(ConversationScore)) {
                        setError(prevError => ({ ...prevError, errorConversation: "Enter a valid number" }));
                    } else if (parseFloat(ConversationScore) <= 0) {
                        setError(prevError => ({ ...prevError, errorConversation: "Score must be greater than 0" }));
                    }
                    else if (parseFloat(ConversationScore) > parseFloat(data.HWCMaxMark)) {
                        setError(prevError => ({ ...prevError, errorConversation: `Score cannot exceed the maximum of ${data.HWCMaxMark}` }));
                    }
                    else {
                        setError(prevError => ({ ...prevError, errorConversation: "Enter a valid number with up to 2 decimal places" }));
                    }
                    hasError = true; // Set error flag to true
                } else {
                    setError(prevError => ({ ...prevError, errorConversation: "" }));
                    tempConversationScore = parseFloat(ConversationScore); // Valid score
                }
                if (
                    !ReadingScore || // Empty value
                    isNaN(ReadingScore) || // Not a number
                    parseFloat(ReadingScore) <= 0 || // Less than or equal to 0
                    parseFloat(ReadingScore) > parseFloat(data.HWRMaxMark) || // Exceeds the correct max marks
                    (ReadingScore.includes(".") && ReadingScore.split(".")[1].length > 2) // More than 2 decimals
                ) {
                    if (ReadingScore === "") {
                        setError(prevError => ({ ...prevError, errorReading: "Reading score cannot be empty" }));
                    } else if (isNaN(ReadingScore)) {
                        setError(prevError => ({ ...prevError, errorReading: "Enter a valid number" }));
                    } else if (parseFloat(ReadingScore) <= 0) {
                        setError(prevError => ({ ...prevError, errorReading: "Score must be greater than 0" }));
                    } else if (parseFloat(ReadingScore) > parseFloat(data.HWRMaxMark)) {
                        setError(prevError => ({ ...prevError, errorReading: `Score cannot exceed the maximum of ${data.HWRMaxMark}` }));
                    } else {
                        setError(prevError => ({ ...prevError, errorReading: "Enter a valid number with up to 2 decimal places" }));
                    }
                    hasError = true; // Set error flag to true
                } else {
                    setError(prevError => ({ ...prevError, errorReading: "" }));
                    tempReadingScore = parseFloat(ReadingScore); // Assign the valid score
                }
                if (
                    !WrittenScore || // Empty value
                    isNaN(WrittenScore) || // Not a number
                    parseFloat(WrittenScore) <= 0 || // Less than or equal to 0
                    parseFloat(WrittenScore) > parseFloat(data.HWWMaxMark) || // Exceeds the correct max marks
                    (WrittenScore.includes(".") && WrittenScore.split(".")[1].length > 2) // More than 2 decimals
                ) {
                    if (WrittenScore === "") {
                        setError(prevError => ({ ...prevError, errorWritten: "Written score cannot be empty" }));
                    } else if (isNaN(WrittenScore)) {
                        setError(prevError => ({ ...prevError, errorWritten: "Enter a valid number" }));
                    } else if (parseFloat(WrittenScore) <= 0) {
                        setError(prevError => ({ ...prevError, errorWritten: "Score must be greater than 0" }));
                    } else if (parseFloat(WrittenScore) > parseFloat(data.HWRMaxMark)) {
                        setError(prevError => ({ ...prevError, errorWritten: `Score cannot exceed the maximum of ${data.HWWMaxMark}` }));
                    } else {
                        setError(prevError => ({ ...prevError, errorWritten: "Enter a valid number with up to 2 decimal places" }));
                    }
                    hasError = true; // Set error flag to true
                } else {
                    setError(prevError => ({ ...prevError, errorWritten: "" }));
                    tempWrittenScore = parseFloat(WrittenScore);
                }

                if (data.IsProjectWeek) {
                    if (
                        !projectScore || // Empty value
                        isNaN(projectScore) || // Not a number
                        parseFloat(projectScore) <= 0 || // Less than or equal to 0
                        parseFloat(projectScore) > parseFloat(data.HWProjMaxMark) || // Exceeds max marks
                        (projectScore.includes(".") && projectScore.split(".")[1].length > 2) // More than 2 decimals
                    ) {
                        if (projectScore === "") {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Project score cannot be empty" }));
                        } else if (isNaN(projectScore)) {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Enter a valid number" }));
                        } else if (parseFloat(projectScore) <= 0) {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Score must be greater than 0" }));
                        }
                        else if (parseFloat(projectScore) > parseFloat(data.HWCMaxMark)) {
                            setError(prevError => ({ ...prevError, errorProjectScore: `Score cannot exceed the maximum of ${data.HWProjMaxMark}` }));
                        }
                        else {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Enter a valid number with up to 2 decimal places" }));
                        }
                        hasError = true; // Set error flag to true
                    } else {
                        setError(prevError => ({ ...prevError, errorProjectScore: "" }));
                        tempProjectScore = parseFloat(projectScore); // Valid score
                    }
                }


                // If there are any errors, do not proceed further
                if (hasError) {
                    return; // Exit the function if any error is found
                }
            }


            if (data.GradeHSCPFlag == false && data.setFlag == true && select === 1) {
                let hasError = false; // Flag to track if there are errors

                // Check for empty or invalid ConversationScore
                if (
                    !ConversationScore || // Empty value
                    isNaN(ConversationScore) || // Not a number
                    parseFloat(ConversationScore) <= 0 || // Less than or equal to 0
                    parseFloat(ConversationScore) > parseFloat(data.HWCMaxMark) || // Exceeds max marks
                    (ConversationScore.includes(".") && ConversationScore.split(".")[1].length > 2) // More than 2 decimals
                ) {
                    if (ConversationScore === "") {
                        setError(prevError => ({ ...prevError, errorConversation: "Conversation score cannot be empty" }));
                    } else if (isNaN(ConversationScore)) {
                        setError(prevError => ({ ...prevError, errorConversation: "Enter a valid number" }));
                    } else if (parseFloat(ConversationScore) <= 0) {
                        setError(prevError => ({ ...prevError, errorConversation: "Score must be greater than 0" }));
                    }
                    else if (parseFloat(ConversationScore) > parseFloat(data.HWCMaxMark)) {
                        setError(prevError => ({ ...prevError, errorConversation: `Score cannot exceed the maximum of ${data.HWCMaxMark}` }));
                    }
                    else {
                        setError(prevError => ({ ...prevError, errorConversation: "Enter a valid number with up to 2 decimal places" }));
                    }
                    hasError = true; // Set error flag to true
                } else {
                    setError(prevError => ({ ...prevError, errorConversation: "" }));
                    tempConversationScore = parseFloat(ConversationScore); // Valid score
                }

                // Check for empty or invalid WrittenScore
                if (
                    !WrittenScore || // Empty value
                    isNaN(WrittenScore) || // Not a number
                    parseFloat(WrittenScore) <= 0 || // Less than or equal to 0
                    parseFloat(WrittenScore) > parseFloat(data.HWWMaxMark) || // Exceeds the correct max marks
                    (WrittenScore.includes(".") && WrittenScore.split(".")[1].length > 2) // More than 2 decimals
                ) {
                    if (WrittenScore === "") {
                        setError(prevError => ({ ...prevError, errorWritten: "Written score cannot be empty" }));
                    } else if (isNaN(WrittenScore)) {
                        setError(prevError => ({ ...prevError, errorWritten: "Enter a valid number" }));
                    } else if (parseFloat(WrittenScore) <= 0) {
                        setError(prevError => ({ ...prevError, errorWritten: "Score must be greater than 0" }));
                    } else if (parseFloat(WrittenScore) > parseFloat(data.HWRMaxMark)) {
                        setError(prevError => ({ ...prevError, errorWritten: `Score cannot exceed the maximum of ${data.HWWMaxMark}` }));
                    } else {
                        setError(prevError => ({ ...prevError, errorWritten: "Enter a valid number with up to 2 decimal places" }));
                    }
                    hasError = true; // Set error flag to true
                } else {
                    setError(prevError => ({ ...prevError, errorWritten: "" }));
                    tempWrittenScore = parseFloat(WrittenScore);
                }


                if (data.IsProjectWeek) {
                    if (
                        !projectScore || // Empty value
                        isNaN(projectScore) || // Not a number
                        parseFloat(projectScore) <= 0 || // Less than or equal to 0
                        parseFloat(projectScore) > parseFloat(data.HWProjMaxMark) || // Exceeds max marks
                        (projectScore.includes(".") && projectScore.split(".")[1].length > 2) // More than 2 decimals
                    ) {
                        if (projectScore === "") {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Project score cannot be empty" }));
                        } else if (isNaN(projectScore)) {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Enter a valid number" }));
                        } else if (parseFloat(projectScore) <= 0) {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Score must be greater than 0" }));
                        }
                        else if (parseFloat(projectScore) > parseFloat(data.HWCMaxMark)) {
                            setError(prevError => ({ ...prevError, errorProjectScore: `Score cannot exceed the maximum of ${data.HWProjMaxMark}` }));
                        }
                        else {
                            setError(prevError => ({ ...prevError, errorProjectScore: "Enter a valid number with up to 2 decimal places" }));
                        }
                        hasError = true; // Set error flag to true
                    } else {
                        setError(prevError => ({ ...prevError, errorProjectScore: "" }));
                        tempProjectScore = parseFloat(projectScore); // Valid score
                    }
                }
                // If there are any errors, do not proceed further
                if (hasError) {
                    return; // Exit the function if any error is found
                }
            }

            console.log("still goging")

            console.log("Dataed Turn in late ", data);
            // 21/03/2024-Pravin-Line No:140-141
            // The teacher supervised students to input comment text only after submission. 
            // However, the web text and voice player were both integrated for viewing. Based on the actions taken, if only text was uploaded, 
            // it would display as web text; if both text and voice were uploaded, they would both be shown on the web.
            const dataValues = {
                ...userInformation,
                HomeWorkId: route.params.wordData.id,
                StudentId: route.params.wordData.studentId,
                //ReturnedOrGrade: select == 1 && score != ""  ? 'G' : 'R',
                //ReturnedOrGrade: select == 1 && score != "" && ConversationScore === "" && ReadingScore === "" && WrittenScore === "" ? 'G' : 'R',
                ReturnedOrGrade: select == 1 ? 'G' : 'R',
                // Comments: `<p>${comment}</p><audio controls=""> <source ng-src="${fileName}" src="${fileName}" type="audio/wav" controls=""></audio><p><br></p>`,
                Comments: `<p>${comment}</p>${audioData ? `<audio controls=""><source ng-src="${fileName}" src="${fileName}" type="audio/wav" controls=""></audio>` : ''}<p><br /></p>`,
                Score: score == "" ? 1 : tempScore,
                ConversationScore: ConversationScore == "" ? 1 : tempConversationScore,
                ReadingScore: ReadingScore == "" ? 1 : tempReadingScore,
                WrittenScore: WrittenScore == "" ? 1 : tempWrittenScore,
                ProjectScore: projectScore == "" ? 0 : tempProjectScore,
                IsProjectWeek: data.IsProjectWeek,
                GradeHSCPFlag: data.GradeHSCPFlag,
                setFlag: data.setFlag
            }


            console.log("Dataed-Types----------------------------------", dataValues);
            setLoading(true)
            postAPICall(dataValues, TeacherModule.hWReviewByTeacher, true, (response: any) => {
                //  setData(response)
                if (response.isSuccess) {
                    toastMessage(response.data.message)
                    navigation.goBack()
                } else {
                    Alert.alert("Message", response.data)
                }

                setLoading(false)
            })

        }


        const callUploadFile = () => {

            setLoading(true)

            postMultipartData(audioData, {
                HomeWorkId: route.params.wordData.id,
                UserId: route.params.wordData.studentId
            }, TeacherModule.hwReviewByTeacherAudioComments, true, (response: any) => {
                console.log(response)
                if (response.isSuccess) {
                    // navigation.goBack()blobFileURL
                    callSubmitData(response.data.blobFileURL)
                }
                setLoading(false)
            })
        }

        const editTitle = (title: any) => {
            if (title != undefined) {
                audioData.title = title
                console.log(title);

            }
            setEdit({ isShow: false, title: "", pos: 0 })

        }


        return <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colorScheme() === 'dark' ? 'black' : 'white', }}>
            <View style={[style.viewBox, { paddingBottom: 0 }]}>
                <View style={[style.enrolledBckground, { alignContent: "center", justifyContent: "flex-start" }]}>
                    <Text style={[style.textStyle, style.textInput,
                    { paddingStart: 8, color: colors.black }]}>{data.HomeWorkName}</Text>
                    <Text style={[style.textStyle,
                    {
                        paddingStart: 8, color: colors.black,
                        fontSize: 12
                    }]}>{`Start Date: - ${data.StartDate} ${dueDate}`}</Text>
                    {Array.isArray(data?.Referencefiles) && data.Referencefiles.length > 0 && (
                        <TextWithReference margin={{ paddingLeft: 16 }} navigation={navigation} text={data.Referencefiles} color="black" />)}

                    {/* {Array.isArray(data?.Referencefiles) && data.Referencefiles.length > 0 && (
  <TextWithReference margin={{ padding: 4 }} navigation={navigation} text={data.Referencefiles} color="black" />)}       */}
                    {/* Component to display homework description with read more/less functionality */}

                    <TextWithReadMore margin={{ padding: 8 }} text={data.HomeWorkDescription} color="black" />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

                        <Text style={[style.textStyle, style.textInput,
                        {
                            marginBottom: -4, color: colors.blue, fontSize: 11,
                            textAlign: 'left'
                        }]}>{''}</Text>


                        <Text style={[style.textStyle, style.textInput,
                        { marginBottom: -4, color: colors.blue, fontSize: 11, textAlign: 'right' }]}>{`${data.HomeWorkStatus} ${statusDate != '' ? 'on ' + statusDate : ''}`}</Text>

                    </View>
                </View>


                {(data.HomeWorkStatus == localEnum.Graded || data.HomeWorkStatus == localEnum.Returned)
                    && (data.HomeWorkHistory.SRGDetails && data.HomeWorkHistory.SRGDetails.length > 0) ?
                    <TeacherComments items={data.HomeWorkHistory.SRGDetails} onClick={() => {
                        setMoreInfo(1)
                    }} />
                    : null
                }
                {
                    data && data.HomeWorkStatus != localEnum.Pending && data.HomeWorkStatus != localEnum.draft && data.HomeWorkStatus != 'Not Turned in' ? <View>
                        <View>

                            <View style={{
                                justifyContent: 'space-between', alignItems: 'center',
                                flexDirection: 'row', marginBottom: -14, marginTop: 20
                            }}><Text style={[style.textStyle, style.textInput, {

                            }]}>{"Comment"}</Text>

                                <TouchableOpacity onPress={() => {
                                    audioPermissions().then(async it => {
                                        if (it) {
                                            setShowAudioRecorder(true)
                                        }
                                    }).catch(error => {
                                        console.log(`error: `, error);
                                    })
                                    // selectFile()
                                }}><Image source={mic1} style={
                                    {
                                        width: 24, height: 24, marginEnd: 4,
                                        tintColor: colorScheme() == 'dark' ? colors.white : colors.black
                                    }} /></TouchableOpacity>
                            </View>
                            <CommonTextInput title={''}
                                placeholder={strings.type_a_comment}
                                value={comment} onChangeText={(text: string) => {
                                    setComment(text)
                                }} multiLine={true} custom={{ marginTop: 0 }}
                                lines={6} errorMesssage={error.errorComment} ht={120} />
                            {audioData ? <FilesInflate item={audioData}
                                isShow={false}
                                onClick={(type: any) => {
                                    if (type == 2) {
                                        const item = {
                                            url: audioData.uri,
                                            title: audioData.title,
                                        }
                                        setItemData(item)
                                        isPlayer(true)

                                    } else if (type == 1) {
                                        const data = { isShow: true, title: audioData.title, pos: 0 }
                                        setEdit(data)
                                    } else {
                                        // remove file
                                        alertConfimationDialog(strings.delete,
                                            strings.are_you_sure_you_want_to_delete_the_item,
                                            () => {
                                                setAudioData(undefined)
                                            })
                                    }
                                }} /> : null}
                        </View>
                        {/* {data.HomeWorkStatus == localEnum.Submitted || data.HomeWorkStatus == "Turned in" || data.HomeWorkStatus == "Turned in Late"
                            || data.HomeWorkStatus == "Resubmission" ? <View style={[style.rowStyle, { gap: 30, marginTop: 30 }]}>
                            <RadioButtonWithText title="Grade" isVisible={select == 1} onClick={() => {
                                setSelect(1)
                            }} />
                            <RadioButtonWithText title="Return" isVisible={select == 2} onClick={() => {
                                setSelect(2)
                            }} />
                        </View> : null} */}
                        <View style={[style.rowStyle, { gap: 30, marginTop: 30 }]}>
                            <RadioButtonWithText title="Grade" isVisible={select == 1} onClick={() => {
                                setSelect(1)
                            }} />
                            <RadioButtonWithText title="Return" isVisible={select == 2} onClick={() => {
                                setSelect(2)
                            }} />
                        </View>

                        {/* {data.HomeWorkStatus != localEnum.Returned && select != 2 ? <CommonTextInput title={strings.score + " out of " + data.TotalHWMarks}
                            placeholder={strings.type_a_score}
                            value={score} onChangeText={(text: string) => {
                                setScore(text)
                            }} errorMesssage={error.erroScore} ht={50} isMobile={true}
                        /> : null} */}
                        {/* This score Only Show Data.GradeHSCPFlag is true that time show */}
                        {data.GradeHSCPFlag && select !== 2 ? (
                            <CommonTextInput
                                title={strings.score + " out of " + data.TotalHWMarks}
                                placeholder={strings.type_a_score}
                                value={score}
                                onChangeText={(text: string) => {
                                    setScore(text);
                                    setError({
                                        ...error,
                                        errorScore: "",
                                    });
                                }}
                                errorMesssage={error.errorScore}
                                ht={50}
                                isMobile={true}
                            />
                        ) : null}
                        {select !== 2 && data.GradeHSCPFlag === false && data.setFlag != true ? (
                            <CommonTextInput
                                title={"Reading" + " out of " + data.HWCMaxMark}
                                placeholder={strings.type_a_score}
                                value={ReadingScore}
                                onChangeText={(text: string) => {
                                    setReadingScore(text);
                                    // setError({ errorComment: "", erroScore: "" });
                                    // Clear the error message when user starts typing
                                    if (error.errorReading) {
                                        setError(prevError => ({ ...prevError, errorReading: "" }));
                                    }
                                }}
                                errorMesssage={error.errorReading}
                                ht={50}
                                isMobile={true}
                            />
                        ) : null}

                        {/* {data.HomeWorkStatus != localEnum.Returned && select != 2 ? <CommonTextInput title={"Conversation" + " out of " + data.HWCMaxMark}
                            placeholder={strings.type_a_score}
                            value={score} onChangeText={(text: string) => {
                                setScore(text)
                            }} errorMesssage={error.erroScore} ht={50} isMobile={true}
                        /> : null} */}
                        {select !== 2 && !data.GradeHSCPFlag ? (
                            <CommonTextInput
                                title={"Conversation" + " out of " + data.HWCMaxMark}
                                placeholder={strings.type_a_score}
                                value={ConversationScore}
                                onChangeText={(text: string) => {
                                    setConversationScore(text);
                                    //setconError({ errorconComment: "", errocon: "" })
                                    if (error.errorConversation) {
                                        setError(prevError => ({ ...prevError, errorConversation: "" }));
                                    }
                                }}
                                errorMesssage={error.errorConversation}
                                ht={50}
                                isMobile={true}
                            />
                        ) : null}

                        {select !== 2 && !data.GradeHSCPFlag ? (
                            <CommonTextInput
                                title={"Written" + " out of " + data.HWWMaxMark}
                                placeholder={strings.type_a_score}
                                value={WrittenScore}
                                onChangeText={(text: string) => {
                                    setWrittenScore(text);
                                    if (error.errorWritten) {
                                        setError(prevError => ({ ...prevError, errorWritten: "" }));
                                    }
                                }}
                                errorMesssage={error.errorWritten}
                                ht={50}
                                isMobile={true}
                            />
                        ) : null}

                        {select !== 2 && data.IsProjectWeek ? (
                            <CommonTextInput
                                title={"Project" + " out of " + data.HWProjMaxMark}
                                placeholder={strings.type_a_score}
                                value={projectScore}
                                onChangeText={(text: string) => {
                                    setProjectScore(text);
                                    if (error.errorProjectScore) {
                                        setError(prevError => ({ ...prevError, errorProjectScore: "" }));
                                    }
                                }}
                                errorMesssage={error.errorProjectScore}
                                ht={50}
                                isMobile={true}
                            />
                        ) : null}
                        {/* {data.HomeWorkStatus !== localEnum.Returned && select !== 2 && !data.GradeHSCPFlag && data.setflag ? (
    <CommonTextInput
        title={"Reading" + " out of " + data.HWCMaxMark}
        placeholder={strings.type_a_score}
        value={ReadingScore}
        onChangeText={(text: string) => {
            setReadingScore(text);
        }}
        errorMesssage={error.erroScore}
        ht={50}
        isMobile={true}
    />
) : null}
{data.HomeWorkStatus !== localEnum.Returned && select !== 2 && !data.GradeHSCPFlag && !data.setflag  ? (
    <CommonTextInput
        title={"Reading" + " out of " + data.HWCMaxMark}
        placeholder={strings.type_a_score}
        value={ReadingScore}
        onChangeText={(text: string) => {
            setReadingScore(text);
        }}
        errorMesssage={error.erroScore}
        ht={50}
        isMobile={true}
    />
) : null} */}

                        <CommonButton text={strings.submit} onClick={() => {
                            // dataUploded("")
                            // navigation.goBack()
                            refreshData.homeWorkData = true
                            refreshData.dashboardRefresh = true

                            if (audioData) {
                                callUploadFile()
                            } else {
                                callSubmitData("")
                            }
                        }} custom={{ marginBottom: 20 }} />
                    </View> : null
                }
                <ProgressDialog isShow={loading} />
                <MoreInfoBottomSheet isShow={moreInfo != -1} isTeacherComment={moreInfo == 1} data={
                    data.HomeWorkHistory.SRGDetails
                } onClick={() => {
                    setMoreInfo(-1)
                }} />
                <AudioRecoderBottomSheet isShow={showAudioRecorder} id={id} onClick={audioRecordClick} />
                <PlayAudioBottomSheet isShow={player} itemData={itemData} onClick={() => {
                    isPlayer(false)
                }} />
                <EditFileTitleBottomSheet isShow={edit.isShow} title={edit.title} onClick={editTitle} />

            </View ></ScrollView >
    } else if (route.name == routes.files_screen) {
        console.log("student", data.FileDetails);

        return data && data.FileDetails.length > 0 && data.FileDetails[0].FileId > 0 ? <View style={[style.viewBox]}>
            <FlatList style={{}}
                data={data.FileDetails}
                renderItem={({ item, index }) => (
                    <NonInrolledInflate item={item}
                        isShow={route.params != undefined ? route.params.isEditable : false}
                        onClick={(type: any) => {
                            if (type == 1) {
                                if (audioExtention(item.FileType)) {
                                    const itemData = {
                                        url: item.FileURL,
                                        title: item.FileDisplayName,
                                    }
                                    setItemData(itemData)
                                    isPlayer(true)
                                    //  storeAudioData({ data: item, play: true })
                                } else if (item.FileType == localEnum.pdf) {
                                    navigation.navigate(routes.pdf_view_screen, { url: item.FileURL ? item.FileURL : pdfurl })
                                } else if (imageExtention(item.FileType)) {
                                    navigation.navigate(routes.image_view_screen, { url: item.FileURL ? item.FileURL : URI })
                                } else if (videoExtention(item.FileType)) {
                                    navigation.navigate(routes.videoPlayerScreen, { url: item.FileURL })
                                }
                                else if (item.FileType == localEnum.txt) {
                                    navigation.navigate(routes.text_screen, { url: item.FileURL })
                                }
                                else if (item.FileType == localEnum.docx) {
                                    navigation.navigate(routes.doc_screen, { url: item.FileURL })
                                }
                            } else if (type == 2) {
                                isShow(true)
                            }
                        }} />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />


            <PlayAudioBottomSheet isShow={player} itemData={itemData} onClick={() => {
                isPlayer(false)
            }} />

            {show ? <AddCommantBottomSheet isShow={true} onClick={(text: any) => {
                console.log(text);

                if (text != undefined) {
                    navigation.navigate(routes.home_work_details_screen)
                }
                isShow(false)
            }} /> : null}
        </View> : <RetryWhenErrorOccur isRetry={false} title={"No Files"} onClick={() => {

        }} />
    } else {
        return <View style={[style.viewBox]}>
            <Text style={style.textStyle}>Add on Inst</Text>
        </View>
    }

}