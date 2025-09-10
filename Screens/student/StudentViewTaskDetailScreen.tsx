/**
 * StudentViewTaskDetails.tsx
 *
 * The `StudentViewTaskDetails.tsx` screen displays the graded marks and comments for student homework. 
 * Additionally, it shows the files that the student has already submitted.
 * 
 */

import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { ScrollView } from "react-native-gesture-handler"
import { useRoute } from "@react-navigation/native"
import { CommonTextInput } from "../../Global/TextInputs"
import { colors } from "../../Values/AppColores"
import { URI, fontFamily, localEnum, nonProfileList } from "../../store/LocalDataStore"
import { NonInrolledInflate, StudentSubmissions, TeacherComments } from "../../Components/GameItem"
import { AddCommantBottomSheet, MoreInfoBottomSheet, PlayAudioBottomSheet } from "../../Global/Modales"
import { TextWithReadMore, TextWithReference } from "../teacher/HomeWorkDetail"
import { useSelector } from 'react-redux';
export const StudentViewTaskDetailScreen = ({ navigation, route }) => {
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
    // const route = useRoute();
    const [comment, setComment] = useState("")
    const [score, setScore] = useState("")
    const [conscore, consetScore] = useState("")
    const [redaingscore, redaingsetScore] = useState("")
    const [writtenscore, writtensetScore] = useState("")
    const [projectScore, setProjectScore] = useState("")
    const [player, isPlayer] = useState(false)
    const [itemData, setItemData] = useState()
    const [show, isShow] = useState(false)
    const [data, setData] = useState(route.params ? route.params.data : undefined)

    const [dueDate, setDueDate] = useState('')
    const [statusDate, setStatusDate] = useState('')
    const [moreInfo, setMoreInfo] = useState(-1)




    console.log("routes11", route.params)
    if (route.name == routes.enrolled_screen || route.name == routes.evaluatedScreen) {

        useEffect(() => {

            console.log("ddd", route.params.wordData);

            if (data) {

                // if (data.Status == localEnum.Pending || data.Status == localEnum.Returned) {
                setDueDate(`/ Due Date: - ${data.DueDate}`)
                //  }



                // if (data.Status == localEnum.Returned) {
                //     setComment(data.ReturnedDetails.ReturnedComments)
                //     setStatusDate(data.ReturnedDetails.ReturnedDate)
                // } else
                if (data.HomeWorkStatus == localEnum.Graded) {

                    setScore(data.LastGradedScore + '/' + data.TotalHWMarks)
                    consetScore(data.ConversationScore + '/' + data.HWCMaxMark)
                    redaingsetScore(data.ReadingScore + '/' + data.HWRMaxMark)
                    writtensetScore(data.WrittenScore + '/' + data.HWWMaxMark)
                    setProjectScore(data.ProjectScore + '/' + data.HWProjMaxMark)
                    setComment(data.LastGradedComments)
                }
                // else if (data.Status == localEnum.Submitted) {
                //     setStatusDate(data.TurnedInDate)
                // }

            }
        }, [])


        return <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colorScheme() === 'dark' ? 'black' : 'white', }}>
            <View style={[style.viewBox]}>
                {/* now change the Start Date is data.StartDate */}
                <View style={[style.enrolledBckground, { alignContent: "center", justifyContent: "flex-start" }]}>
                    <Text style={[style.textStyle, style.textInput,
                    { paddingStart: 8, color: colors.black }]}>{data.HomeWorkName}</Text>
                    <Text style={[style.textStyle,
                    {
                        paddingStart: 8, color: colors.black,
                        fontSize: 12
                    }]}>{`Start Date: - ${data.StartDate} ${dueDate}`}</Text>

                    {Array.isArray(data?.Referencefiles) && data.Referencefiles.length > 0 && (
                        <TextWithReference margin={{ padding: 4 }} navigation={navigation} text={data.Referencefiles} color="black" />)}
                    {/* Component to display homework description with read more/less functionality */}
                    <TextWithReadMore margin={{ padding: 4 }} text={data.HomeWorkDescription} color="black" />

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

                {data.GradeHSCPFlag && data.Status != localEnum.Submitted ? <View>
                    {/* <Text style={[style.textStyle, style.textInput, {
                    marginBottom: 9, marginTop: 20
                }]}>{strings.comments}</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle, { height: 120, padding: 8, color: 'black' }]}>{comment}</Text>
                    </View> */}
                    <Text style={[style.textStyle, style.textInput, {
                        marginBottom: 8, marginTop: 20
                    }]}>{strings.score}</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle,
                        {
                            textAlign: "center", fontSize: 32, color: colors.blue, fontFamily: fontFamily.robotoBold,
                        }]}>{score}</Text>
                    </View></View> : null}

                {!data.GradeHSCPFlag && data.Status != localEnum.Submitted ? <View>
                    {/* <Text style={[style.textStyle, style.textInput, {
                    marginBottom: 9, marginTop: 20
                }]}>{strings.comments}</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle, { height: 120, padding: 8, color: 'black' }]}>{comment}</Text>
                    </View> */}
                    <Text style={[style.textStyle, style.textInput, {
                        marginBottom: 8, marginTop: 20
                    }]}>Conversation Score</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle,
                        {
                            textAlign: "center", fontSize: 32, color: colors.blue, fontFamily: fontFamily.robotoBold,
                        }]}>{conscore}</Text>
                    </View></View> : null}
                {!data.GradeHSCPFlag && data.Status != localEnum.Submitted ? <View>
                    {/* <Text style={[style.textStyle, style.textInput, {
                    marginBottom: 9, marginTop: 20
                }]}>{strings.comments}</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle, { height: 120, padding: 8, color: 'black' }]}>{comment}</Text>
                    </View> */}
                    <Text style={[style.textStyle, style.textInput, {
                        marginBottom: 8, marginTop: 20
                    }]}>Written Score</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle,
                        {
                            textAlign: "center", fontSize: 32, color: colors.blue, fontFamily: fontFamily.robotoBold,
                        }]}>{writtenscore}</Text>
                    </View></View> : null}

                {data.GradeHSCPFlag === false && data.setFlag != true && data.Status != localEnum.Submitted ? <View>
                    {/* <Text style={[style.textStyle, style.textInput, {
                    marginBottom: 9, marginTop: 20
                }]}>{strings.comments}</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle, { height: 120, padding: 8, color: 'black' }]}>{comment}</Text>
                    </View> */}
                    <Text style={[style.textStyle, style.textInput, {
                        marginBottom: 8, marginTop: 20
                    }]}>Reading Score</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle,
                        {
                            textAlign: "center", fontSize: 32, color: colors.blue, fontFamily: fontFamily.robotoBold,
                        }]}>{redaingscore}</Text>
                    </View></View> : null}

                {data.IsProjectWeek && data.Status != localEnum.Submitted ? <View>
                    {/* <Text style={[style.textStyle, style.textInput, {
                    marginBottom: 9, marginTop: 20
                }]}>{strings.comments}</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle, { height: 120, padding: 8, color: 'black' }]}>{comment}</Text>
                    </View> */}
                    <Text style={[style.textStyle, style.textInput, {
                        marginBottom: 8, marginTop: 20
                    }]}>Project Score</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle,
                        {
                            textAlign: "center", fontSize: 32, color: colors.blue, fontFamily: fontFamily.robotoBold,
                        }]}>{projectScore}</Text>
                    </View></View> : null}

                {!data.GradeHSCPFlag && data.Status != localEnum.Submitted ? <View>
                    {/* <Text style={[style.textStyle, style.textInput, {
                    marginBottom: 9, marginTop: 20
                }]}>{strings.comments}</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle, { height: 120, padding: 8, color: 'black' }]}>{comment}</Text>
                    </View> */}
                    <Text style={[style.textStyle, style.textInput, {
                        marginBottom: 8, marginTop: 20
                    }]}>Total Score</Text>
                    <View style={[style.enrolledBckground, { height: 120, alignContent: "center", justifyContent: "center" }]}>
                        <Text style={[style.textStyle,
                        {
                            textAlign: "center", fontSize: 32, color: colors.blue, fontFamily: fontFamily.robotoBold,
                        }]}>{score}</Text>
                    </View></View> : null}

                <MoreInfoBottomSheet isShow={moreInfo != -1} isTeacherComment={moreInfo == 1} data={
                    data.HomeWorkHistory.SRGDetails
                } onClick={() => {
                    setMoreInfo(-1)
                }} />
            </View></ScrollView>
    } else if (route.name == routes.files_screen) {
        return <View style={[style.viewBox]}>
            <FlatList style={{}}
                data={nonProfileList}
                renderItem={({ item, index }) => (
                    <NonInrolledInflate item={item}
                        isShow={route.params != undefined ? route.params.isEditable : true}
                        onClick={(type: any) => {
                            if (type == 1) {
                                if (item.type == localEnum.mp3) {
                                    setItemData(item)
                                    isPlayer(true)
                                    //  storeAudioData({ data: item, play: true })
                                } else if (item.type == localEnum.pdf) {
                                    navigation.navigate(routes.pdf_view_screen)
                                } else if (item.type == localEnum.image) {
                                    navigation.navigate(routes.image_view_screen, { url: URI })
                                }
                                else if (item.type == localEnum.txt) {
                                    // navigation.navigate(routes.image_view_screen, { url: URI })
                                    navigation.navigate(routes.text_screen, { url: URI })
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
        </View>
    } else {
        return <View style={[style.viewBox]}>
            <Text style={style.textStyle}>Add on Inst</Text>
        </View>
    }

}