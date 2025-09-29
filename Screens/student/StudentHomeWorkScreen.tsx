/**
 * StudentHomeWorkScreen.tsx
 *
 * This file contains the screen for students to view and submit homework assignments.
 * It provides the following functionalities:
 *
 * 1. Displaying homework details such as title, description, due date, and status.
 * 2. Allowing students to upload files (images, videos, PDFs, audio, etc.) for their homework submission.
 * 3. Providing options to capture images, record audio, select files from the gallery, or scan documents.
 * 4. Displaying a list of uploaded files with options to view, edit title, or delete files.
 * 5. Handling audio playback for uploaded audio files.
 * 6. Allowing students to submit their homework or save it as a draft.
 * 7. Displaying teacher comments and feedback on the homework, if available.
 * 8. Handling API calls for fetching homework details, uploading files, and submitting homework.
 * 9. Managing various modal views and bottom sheets for file uploads, audio recording, and editing file titles.
 * 10. Implementing custom back button handling and confirmation dialogs for unsaved changes.
 *
 * The main components included in this file are:
 *
 * - StudentHomeWorkScreen: The main screen component that handles homework details, file uploads, and submission.
 * - FileModal: A class representing a file modal with properties like title, type, URI, and base64 data.
 * - HomeWorkSummaryTabItem: A reusable component for rendering individual homework items in the list.
 *
 * Additionally, the file imports and uses various utility functions, components, and modules from other parts of the application.
 */

import { Alert, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, Platform } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import React, { useEffect, useRef, useState } from "react"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { routes } from "../../Values/Routes"
import { CommonHeaderCard, StudendCommonHeaderCard } from "../../Components/CommonHeaderCard"
import { colors } from "../../Values/AppColores"
import { RetryWhenErrorOccur, TitleWithForward } from "../../Components/TitleWithForward"
import { audioExtention, camera, eye, fontFamily, gallery, imageExtention, localEnum, mic, refreshData, scan, upload, videoExtention } from "../../store/LocalDataStore"
import { EditFileTitleBottomSheet, MoreInfoBottomSheet, ProgressDialog, ProgressView, SelectImageAndVideoBottomSheet } from "../../Global/Modales"
import { cameraLaunch, selectDocumentFile, selectFile } from "../../utils/SystemsFiles"
import { Asset } from "react-native-image-picker"
import { AudioPlay, FilesInflate, NonInrolledInflate, StudentSubmissions, TeacherComments } from "../../Components/GameItem"
import { alertConfimationDialog } from "../../utils/AlertsDialogs"
import { CommonButton } from "../../Global/Buttons"
import { AudioRecoderBottomSheet } from "../../utils/AudioRecorder"
import { setUpPlayer } from "../../Global/Player"
import { audioPermissions, cameraPermissions } from "../../utils/Permissions"
import subjectSubject from '../../Testsjson/StudentAllStatus.json';
import { getAPICall, postAPICall, postMultipartData } from "../../Netowork/Apis"
import { StudentModule, TeacherModule } from "../../Netowork/Constants"
import { userInformation } from "../../store/UserStorage"
import { TextWithReadMore, TextWithReference } from "../teacher/HomeWorkDetail"
import { teacherHomeworkStatusDetails } from "../../Testsjson/localjsons"
import useBackHandler from "../../Global/BackHandler"
import { HeaderBackButton } from '@react-navigation/elements';
import { useIsFocused } from "@react-navigation/native"
import { toastMessage } from "../../utils/Extentions"
import { useSelector } from 'react-redux';

//TextWithReference
// import { TeacherComments } from "../../Components/GameItem"
import { Buffer } from 'buffer';
import { Video } from "react-native-compressor";
// Class representing a file modal with properties like title, type, URI, and base64 data
export class FileModal {
    constructor(
        public title: string,
        public type: string,
        public uri: string,
        public base64: string = '',
        public isNew: boolean = true,
        public fileId: number = 0,
        public fileName: string = ""
    ) {
    }
}

// Main component for the Student Homework Screen
export const StudentHomeWorkScreen = ({ navigation, route }) => {
    // Date 18/03/2024-Pravin
    // Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
    // Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])


    // State variables for managing various UI states and data
    const [show, setShow] = useState(false)
    const [refresh, sertRefresh] = useState(false)
    const [edit, setEdit] = useState({ isShow: false, title: "", pos: 0 })
    const [showAudioRecorder, setShowAudioRecorder] = useState(false)
    const [isCamera, setIsCamera] = useState(false)
    const [itemList, setItemList] = useState<FileModal[]>([])
    const scrollRef = useRef()
    const [player, isPlayer] = useState(false)
    const [itemData, setItemData] = useState()
    const [data, setData] = useState({ isSuccess: false, data: undefined })
    const [loading, setLoading] = useState(false)
    const [dialogLoading, setDialogLoading] = useState(false)
    const [dueDate, setDueDate] = useState('')
    const [statusDate, setStatusDate] = useState('')
    const [moreInfo, setMoreInfo] = useState(-1)
    const isFocused = useIsFocused();

    var id = userInformation.AliasID
    //     const setvalue = "testing.jpg";
    // const encodedText=encodeURIComponent(setvalue)
    // // const encodedText = Buffer.from(setvalue).toString('base64');

    //  console.log("testing fonts",encodedText);



    // Function to handle bottom sheet click for selecting images/videos
    const bottonSheetClick = (item: any) => {
        if (item != undefined) {
            if (fileUploadValidation(item == localEnum.image ? "image" : "video")) {
                setTimeout(() => {
                    if (isCamera) {
                        cameraLaunch(item == localEnum.image, responseHandling, id)
                    } else {
                        selectFile(item == localEnum.image, responseHandling)
                    }
                    setIsCamera(false), 5000
                })
            }
        }
        setShow(false)
    }

    const getPathExtension = (url) => {
        const lastDotIndex = url.lastIndexOf('.');
        if (lastDotIndex === -1) {
            // URL doesn't contain any dot (.) character
            return null;
        }
        const extension = url.substring(lastDotIndex + 1);
        return extension.toLowerCase(); // Convert to lowercase if needed
    };

    // 09/04/2024- pravin 
    //  changed the alert box msg
    /**
     * Function to upload a file
     */
    const callUploadFile = (file: FileModal) => {
        if (data && data.data) {
            if (data.data.NoofUplodableFiles == itemList.length) {
                Alert.alert("Message", `You have uploaded the maximum ${data.data.NoofUplodableFiles} number of files`)
                return
            }
        }
        //console.log("before send the name",file.title)
        // Encode the file name before uploading
        //   const encodedFileName = encodeURIComponent(file.title);
        setDialogLoading(true)
        // Added the extra parameter DBid:userInformation.DBId
        // file.title =  file.type + itemList.length

        if (Platform.OS === 'ios') {
            // const pathExtension = getPathExtension(file.uri);
            // file.title = (file.type == "image" ? "IMG_" : file.type == "video" ? "VID_" : file.type == "pdf" ? "PDF_" : file.type == "doc" ? "DOC_" : "VOICE_RECORD_") + itemList.length + "." + pathExtension
            const pathExtension = getPathExtension(file.uri);
            file.title = (file.type == "image"
                ? "IMG_"
                : file.type == "video"
                    ? "VID_"
                    : file.type == "pdf"
                        ? "PDF_"
                        : file.type == "doc"
                            ? "DOC_"
                            : file.type == "docx"
                                ? "DOCX_"
                                : file.type == "txt"
                                    ? "TXT_"
                                    : "VOICE_RECORD_") + itemList.length + "." + pathExtension;

        }
        console.log("before fileName.....", file.fileName)
        console.log("before send the name", file.title)

        postMultipartData(file, {
            HomeWorkId: route.params.homeworkId,
            UserId: userInformation.UserId,
            DBid: userInformation.DBId,
        }, StudentModule.UploadHWFilesByStudent, true, (response: any) => {
            if (response.isSuccess) {
                file.base64 = file.uri
                file.uri = response.data.blobFileURL
                file.fileName = response.data.blobFileName
                // file.title = "HomeWork week 32 my favourite leaders" + file.type + itemList.length
                console.log("file.uri ====", file.uri);
                console.log("filename ====", file.fileName);

                setItemList(prevData => [...prevData, file])
            }
            setDialogLoading(false)
        })
    }


    // console.log("number of files",Numberfilesbalance)
    /**
     * Update UI data based on the fetched homework data
     */
    useEffect(() => {
        if (data && data.isSuccess) {
            setDueDate(`/ Due Date: - ${data.data.DueDate}`)
        }

        if (data && data.isSuccess && data.data.SupportingFiles.FileDetails.length > 0
            && data.data.SupportingFiles.FileDetails[0].FileId > 0) {
            const files = data.data.SupportingFiles.FileDetails.map(it =>
                new FileModal(it.FileDisplayName, it.FileType,
                    it.FileURL, '', false, it.FileId, it.BlobFileName))

            console.log("useeffectfiles", files)
            setItemList(files)
        }
    }, [data])

    /**
     * Handle audio record response
     * @param item Audio record response
     */
    const audioRecordClick = (item: any) => {
        if (item != undefined) {
            const list = item.toString().split('/')
            const modle = new FileModal(list[list.length - 1],
                localEnum.mp3,
                item)
            callUploadFile(modle)
        }
        setShowAudioRecorder(false)
    }

    // Function to select a document file
    const selectDoucment = (item) => {
        var types = data.data.AcceptableFileType.split(",")
        // if (fileUploadValidation(fileType)) {
        selectDocumentFile(responseHandling, types);
        //}
    }


    const compressVideo = async (model: { uri: string | null | undefined }, modle: FileModal) => {
        if (!model.uri) {
            console.warn('Video URI is null or undefined');
            Alert.alert('Error', 'Video file URI is missing.');
            return null;
        }
        try {
            setDialogLoading(true)
            const compressedPath = await Video.compress(
                model.uri,   // your file path
                { compressionMethod: 'auto' },
                progress => {
                    console.log('Compression progress:', progress); // 0 → 1
                }
            );

            console.log('Compressed video path:', compressedPath);
            modle.uri = compressedPath;
            setDialogLoading(false)
            callUploadFile(modle)
        } catch (error) {
            setDialogLoading(false)
            console.error('Video compression error:', error);
            Alert.alert(JSON.stringify(error))
            return null;
        }
    };

    /**
     * Handle response from camera, gallery, and PDF selection
     * @param type Type of response (success, failure, PDF)
     * @param response Response data
     */
    const responseHandling = (type: any, response: any) => {
        console.log("filestype", type)
        if (type == localEnum.sucess) {
            const isVideo = response.type?.includes(localEnum.videoType);
            const modle = new FileModal(response.fileName.split(' ').join(' '),

                response.type.includes(localEnum.videoType) ? localEnum.video : localEnum.image,
                response.uri, `data:${response.type};base64,` + response)
            if (isVideo && modle.uri) {
                compressVideo({ uri: modle.uri }, modle);  // ✅ pass as object

            } else if (isVideo) {
                Alert.alert('Video file URI is missing!');
            }  else {
                callUploadFile(modle)
            }

        } else if (type == localEnum.pdf) {
            const types = data.data.AcceptableFileType.split(",")
            if (!types.includes(type)) {
                Alert.alert("Messages", `You can upload ${data.data.AcceptableFileType} files only`)
                return false
            }
            const modle = new FileModal(response.name.split(' ').join(' '),
                localEnum.pdf,
                response.fileCopyUri)
            callUploadFile(modle)
        }
        else if (type === localEnum.office) {
            const types = data.data.AcceptableFileType.split(",")
            if (!types.includes(type)) {
                Alert.alert("Messages", `You can upload ${data.data.AcceptableFileType} files only`)
                return false
            }
            // Handle DOCX files
            const modle = new FileModal(
                response.name.split(' ').join(' '),
                localEnum.office, // Ensure 'office' is correctly defined in localEnum
                response.fileCopyUri
            );
            callUploadFile(modle);
        }
        else if (type === localEnum.text) {
            // Handle DOCX files
            const types = data.data.AcceptableFileType.split(",")
            if (!types.includes(type)) {
                Alert.alert("Messages", `You can upload ${data.data.AcceptableFileType} files only`)
                return false
            }
            const modle = new FileModal(
                response.name.split(' ').join(' '),
                localEnum.text, // Ensure 'office' is correctly defined in localEnum
                response.fileCopyUri
            );
            callUploadFile(modle);
        }
        else if (type === localEnum.audio) {
            // Handle DOCX files
            const types = data.data.AcceptableFileType.split(",")
            const modle = new FileModal(
                response.name.split(' ').join(' '),
                localEnum.audio, // Ensure 'office' is correctly defined in localEnum
                response.fileCopyUri
            );
            callUploadFile(modle);
        }
    }



    // Set up player when the component mounts
    useEffect(() => {
        console.log(route.params);
        setUpPlayer()
    }, [])

    // Function to edit file title
    const editTitle = (title: any) => {
        if (title != undefined) {
            itemList[edit.pos].title = title
        }
        setEdit({ isShow: false, title: "", pos: 0 })
    }

    // Log user information and route params
    useEffect(() => {
        console.log("verify", userInformation, route.params);
    }, [edit])

    // Set up header options
    useEffect(() => {
        navigation.setOptions({
            headerTitle: strings.appName,
            headerLeft: () => (
                <HeaderBackButton
                    labelVisible={false}
                    allowFontScaling={false}
                    tintColor={colors.black}
                    onPress={() => customBackPress()}
                    style={{ marginStart: 0 }}
                />
            )
        })
    }, [])

    // Custom back handler
    useBackHandler(() => {
        if (isFocused) {
            customBackPress()
        } else {
            navigation.goBack()
        }
        return true;
    });

    /**
     * Show confirmation dialog for unsaved changes
     */
    const customBackPress = () => {
        const isNewFile = itemList.filter(it => it.isNew)

        if (isNewFile.length > 0) {
            alertConfimationDialog(strings.message,
                strings.are_you_sure_you_want_to_go_back,
                (click: number) => {
                    if (click == 1) {
                        callSaveAndSubmitAPI()
                    } else {
                        navigation.goBack()
                    }
                }, true)
        } else {
            navigation.goBack()
        }
    }

    // Show success alert for data upload
    const dataUploded = (item: any) => {
        Alert.alert(strings.message, strings.your_data_is_uploded_sucessfully, [
            {
                text: "OK",
                onPress: () => navigation.goBack()
            }
        ])
    }

    // Call API to fetch homework details when the component mounts
    useEffect(() => {
        callAPI()
    }, [])

    /**
     * Call API to get homework details
     */
    const callAPI = () => {
        setLoading(true)
        postAPICall({
            StudentId: userInformation.UserId,
            HomeWorkId: route.params.homeworkId,
            DBId: userInformation.DBId
        },
            TeacherModule.getHWDetailsofStudent, true, (response: any) => {
                setData(response)
                setLoading(false)
            })
    }

    // Function to compare due date with current date
    // const dateComparision = () => {
    //      currentDate = new Date();
    //     const isOverDue = currentDate.getTime() > overDueData.getTime()
    //     // console.log(overDueData, currentDate, isOverDue, data.data.DueDate);

    //     return isOverDue
    // }
    const dateComparision = () => {
        var parts = data.data.DueDate.split("-");
        var overDueData = new Date(parts[2] + "-" + parts[1] + "-" + parts[0]);
        var currentDate = new Date();
        const isOverDue = currentDate.getTime() > overDueData.getTime()
        console.log(overDueData, currentDate, isOverDue, data.data.DueDate);

        return isOverDue
    }

    // Validate if the file type is allowed for upload
    const fileUploadValidation = (type: string) => {
        console.log("accp", type)
        if (data && data.data) {
            const types = data.data.AcceptableFileType.split(",")
            console.log("dbacceptfile", types)
            if (!types.includes(type)) {
                Alert.alert("Messages", `You can upload ${data.data.AcceptableFileType} files only`)
                return false
            }
        }

        return true
    }

    // Call API to delete a file
    const callDeleteFileAPI = (filename: string) => {
        setDialogLoading(true)
        postAPICall({
            ...userInformation,
            BlobFileName: filename
        },
            StudentModule.DeleteHWFileByStudent, true, (response: any) => {
                if (response.isSuccess) {
                    const removeDataList = itemList.filter((it, i) => it.fileName != filename);
                    setItemList(removeDataList)
                } else {
                    Alert.alert("Message", response.data)
                }
                setDialogLoading(false)
            })
    }

    /**
     * Call API to save draft or submit homework
     * @param isSubmit Flag to indicate if the homework should be submitted or saved as draft
     */
    const callSaveAndSubmitAPI = (isSubmit = false) => {
        setDialogLoading(true)
        const files = itemList.map(it => ({ FileURL: it.uri }))

        var status = "Draft"
        if (isSubmit) {
            if (dateComparision()) { // Comparing overdue date with current time
                status = "Turned in Late" // If homework is already overdue
            } else {
                status = "Turned in" // If homework is turned in on time
            }
        }

        postAPICall({
            ...userInformation,
            HomeWorkId: route.params.homeworkId,
            Status: status,
            SupportingFiles: {
                FileDetails: files
            }
        },
            StudentModule.SaveDraftORSubmitHomeWork, true, (response: any) => {
                if (response.isSuccess) {
                    refreshData.homeWorkData = true
                    refreshData.dashboardRefresh = true

                    toastMessage(isSubmit ? strings.your_data_is_uploded_sucessfully : "Your files added in draft")
                    navigation.goBack()
                } else {
                    Alert.alert("Message", response.data)
                }
                setDialogLoading(false)
            })
    }
    console.log("db", itemList)
    // Render the component
    return (data && data.isSuccess) ? <View style={[style.viewBox, { padding: 0, }]}>

        <ScrollView
            ref={scrollRef}
            onContentSizeChange={(contentWidth, contentHeight) => { scrollRef.current.scrollToEnd({ animated: true }) }}
            style={{ marginBottom: itemList.length > 0 ? 180 : 150, backgroundColor: colorScheme() == "dark" ? colors.black : colors.white }}
        >
            <View style={[style.viewBox, { padding: 0 }]}>
                <Text style={[style.letsPlayText, { marginTop: 20, marginHorizontal: 16 }]}>{strings.homework}</Text>
                <View style={[style.enrolledBckground, { alignContent: "center", justifyContent: "flex-start", marginHorizontal: 16, marginTop: 10 }]}>
                    <Text style={[style.textStyle, style.textInput, { paddingStart: 8, color: colors.black }]}>{data.data.HomeWorkName}</Text>
                    <Text style={[style.textStyle, { paddingStart: 8, color: colors.black, fontSize: 12 }]}>{`Start Date: - ${data.data.StartDate} ${dueDate}`}</Text>
                    {/* Component to display referencefiles  with reference files /less functionality New code implemented on December 11, 2024, by Pravin.*/}
                    {Array.isArray(data?.data?.Referencefiles) && data.data.Referencefiles.length > 0 && (
                        <TextWithReference margin={{ padding: 4 }} navigation={navigation} text={data.data.Referencefiles} color="black" />)}
                    {/* Component to display homework description with read more/less functionality */}
                    <TextWithReadMore margin={{ padding: 4 }} text={data.data.HomeWorkDescription} color="black" />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={[style.textStyle, style.textInput, { marginBottom: -4, color: colors.blue, fontSize: 11, textAlign: 'left' }]}>{''}</Text>
                        <Text style={[style.textStyle, style.textInput, { marginBottom: -4, color: colors.blue, fontSize: 11, textAlign: 'right' }]}>{`${data.data.HomeWorkStatus} ${statusDate != '' ? 'on ' + statusDate : ''}`}</Text>
                    </View>
                </View>

                {/* Display teacher comments if homework is graded or returned */}
                {(data.data.HomeWorkStatus == localEnum.Graded || data.data.HomeWorkStatus == localEnum.Returned)
                    && (data.data.HomeWorkHistory.SRGDetails && data.data.HomeWorkHistory.SRGDetails.length > 0) ?
                    <View style={{ paddingHorizontal: 16 }}>
                        <TeacherComments items={data.data.HomeWorkHistory.SRGDetails} onClick={() => { setMoreInfo(1) }} />
                    </View>
                    : null
                }

                <View style={{ paddingHorizontal: 16, marginTop: wp('10%') }}>
                    {/* Display Uploaded files count text */}
                    {itemList.length > 0 ? (
                        <Text style={[style.letsPlayText]}>
                            {data.data.NoofUplodableFiles - itemList.length > 1
                                ? `${strings.files}(Allowed to upload ${data.data.NoofUplodableFiles - itemList.length
                                } more files)`
                                : data.data.NoofUplodableFiles - itemList.length === 1
                                    ? `${strings.files}(Allowed to upload 1 more file)`
                                    : `${strings.files}(No more files can be uploaded)`}
                        </Text>
                    ) : null}
                    {/* Display homework submission item if available */}
                    {
                        itemList.map((item, index) => (
                            <FilesInflate item={item}
                                isShow={false}
                                onClick={(type: any) => {
                                    if (type == 1) {
                                        // Edit file title
                                        const data = { isShow: true, title: item.title, pos: index }
                                        setEdit(data)
                                    } else if (type == 2) {
                                        // View file based on type
                                        if (item.type == localEnum.pdf) {
                                            console.warn(item.uri)
                                            console.log("test type", item.type)
                                            navigation.navigate(routes.pdf_view_screen, { url: item.uri })
                                        }
                                        else if (audioExtention(item.type)) {
                                            setItemData({ title: item.title, uri: item.uri })
                                            isPlayer(true)
                                        } else if (imageExtention(item.type)) {
                                            navigation.navigate(routes.image_view_screen, { url: item.uri })
                                        } else if (videoExtention(item.type)) {
                                            navigation.navigate(routes.videoPlayerScreen, { url: item.uri })
                                        }
                                        else if (item.type == localEnum.text) {
                                            console.warn(item.uri)
                                            console.log("test type", item.type)
                                            navigation.navigate(routes.text_screen, { url: item.uri })
                                        }
                                        else if (item.type == localEnum.txt) {
                                            console.warn(item.uri)
                                            console.log("test type", item.type)
                                            navigation.navigate(routes.text_screen, { url: item.uri })
                                        }
                                        else if (item.type == localEnum.office || item.type == localEnum.doc || item.type == localEnum.docx) {
                                            console.warn(item.uri)
                                            console.log("test type", item.type)
                                            navigation.navigate(routes.doc_screen, { url: item.uri })
                                        }
                                        else if (item.type == localEnum.audio) {
                                            setItemData({ title: item.title, uri: item.uri })
                                            isPlayer(true)
                                        }
                                    } else {
                                        // Delete file
                                        alertConfimationDialog(strings.delete,
                                            strings.are_you_sure_you_want_to_delete_the_item,
                                            () => {
                                                callDeleteFileAPI(item.fileName)
                                            })
                                    }
                                }} />
                        ))
                    }
                </View>
            </View>
        </ScrollView>

        {/* Bottom section for adding files and submitting homework */}
        <View style={{
            backgroundColor: colors.lightGrey, borderRadius: 10, margin: 16, gap: 3, bottom: 0, end: 0, start: 0,
            paddingVertical: itemList.length > 0 ? 5 : 16, paddingHorizontal: 30, position: "absolute", flex: 1
        }}>
            <Text style={[style.textStyle, { color: 'black', textAlign: "center", fontFamily: fontFamily.robotoBold, fontSize: 10 }]}>Note : Allowed file types are {data.data.AcceptableFileType}</Text>
            <Text style={[style.textStyle, { color: 'black', textAlign: "center", fontFamily: fontFamily.robotoBold, fontSize: 20 }]}> Add your work</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => {
                    cameraPermissions()
                    setIsCamera(true)
                    setShow(true)
                }}>
                    <ImageBackground source={camera} style={style.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setIsCamera(false)
                    setShow(true)
                }}><ImageBackground source={gallery} style={style.image} /></TouchableOpacity>

                <TouchableOpacity onPress={selectDoucment}>
                    <ImageBackground source={scan} style={style.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    if (fileUploadValidation("audio")) {
                        audioPermissions().then(async it => {
                            if (it) {
                                setShowAudioRecorder(true)
                            }
                        }).catch(error => {
                            console.log(`error: `, error);
                        })
                    }
                }}><ImageBackground source={mic} style={style.image} /></TouchableOpacity>
            </View>

            {/* Buttons for submitting or saving as draft */}
            {itemList.length > 0 ? <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", paddingBottom: 8 }}>
                <CommonButton text={strings.turnin} onClick={() => {
                    callSaveAndSubmitAPI(true)
                }} custom={style.uploadWorkButton} />
                <CommonButton text={strings.save} onClick={() => {
                    callSaveAndSubmitAPI(false)
                }} custom={style.uploadWorkButton} />
            </View> : null
            }
        </View>

        {/* Modal views and bottom sheets */}
        <SelectImageAndVideoBottomSheet isShow={show} onClick={bottonSheetClick} />
        <AudioRecoderBottomSheet isShow={showAudioRecorder} id={id} onClick={audioRecordClick} />
        <EditFileTitleBottomSheet isShow={edit.isShow} title={edit.title} onClick={editTitle} />
        <MoreInfoBottomSheet isShow={moreInfo != -1} isTeacherComment={moreInfo == 1} data={
            data.data.HomeWorkHistory.SRGDetails} onClick={() => { setMoreInfo(-1) }} />
        <ProgressDialog isShow={dialogLoading} />
        {/* Audio player component */}
        {player ? <AudioPlay item={itemData} tracks={{
            url: itemData.uri,
            title: 'Avaritia',
        }} onClick={() => { isPlayer(false) }} /> : null}
    </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur title={data.data} onClick={() => {
        setData(undefined)
        callAPI()
    }} />
}