import { ActivityIndicator, Dimensions, Image, Pressable, Text, TouchableOpacity, View, ScrollView, Platform } from "react-native";
import { colorScheme, style as getStyles } from "../Values/AppStyles";
import { colors } from "../Values/AppColores";
import { URI, closeIcon, crossword, deleteIcon, document, dummayMp3, eyeImage, getBgColor, localEnum, music, musicgf, pause, pauseIcon, playIcon, refreshData, setColor, useType } from "../store/LocalDataStore";
import { useEffect, useMemo, useState } from "react";
import { addTracs, playerState, setUpPlayer, togglePlayBack } from "../Global/Player";
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { fontFamily } from "../store/LocalDataStore";
import { Card } from "react-native-paper";
import { strings } from "../Localization";
import { black } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import WebView from "react-native-webview";
import DOMParser from 'react-native-html-parser';
import { PlayAudioBottomSheet } from "../Global/Modales";
import { routes } from "../Values/Routes";
import { useSelector } from 'react-redux';
import { RFValue } from "react-native-responsive-fontsize";
// Date 18/03/2024-Pravin 
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
let style;

const parser = new DOMParser.DOMParser();
export const GameItem = ({ item, bgColor = colorScheme() === 'dark' ? colors.light_grey : colors.white, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    console.log(item.ClassName)
    return <Card style={[style.flexBoxText, { backgroundColor: item.HomeWorkName ? colors.mint : bgColor, width: Dimensions.get('window').width / 2.5 }]}>
        <TouchableOpacity style={[style.flexBoxText, { backgroundColor: item.HomeWorkName ? colors.mint : bgColor, width: Dimensions.get('window').width / 2.5 }]} onPress={onClick}>
            <View style={{ justifyContent: 'space-between', }}>

                <Text style={{
                    color: colors.black, fontFamily: fontFamily.robotoRegular, fontSize: 14,
                    textAlign: 'center', paddingHorizontal: 8,
                }} numberOfLines={3} >{(item.HomeWorkName ? item.HomeWorkName : item.ClassName ? item.ClassName : item.SubjectName ? item.SubjectName : item.title ? item.title : item)}</Text>


            </View>

            <Text style={{
                color: colors.black, fontFamily: fontFamily.robotoBold, fontSize: 14,
                position: 'absolute', right: 10, bottom: 0
            }} numberOfLines={1}>{item.NoOfStudents ? item.NoOfStudents : ""}</Text>
        </TouchableOpacity>


    </Card>
}



export const IconWithTitleInflate = ({ item, color = colorScheme() === 'dark' ? colors.lightGreen : colors.white, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    // new image added in the coinword game img-28/03/2024-Pravin
    const gameImages = {
        CoinWord: require('../assets/images/coinwordimg.png'),
        Crossword: require('../assets/images/crossword.png'),
        SpotDifference: require('../assets/images/sp.png'),
    };
    const imageSource = gameImages[item];
    return <Card style={[style.flexBoxText, { width: Dimensions.get('window').width / 2.5, backgroundColor: color }]}>
        <TouchableOpacity style={[style.flexBoxText, { width: Dimensions.get('window').width / 2.5, backgroundColor: color }]} onPress={onClick}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image source={imageSource} style={{ height: 45, width: 45 }} resizeMode="cover" /> */}

                {imageSource && (
                    <Image source={imageSource} style={{ height: 45, width: 45 }} resizeMode="cover" />
                )}
                <Text style={{
                    color: colors.black, fontFamily: fontFamily.rotobotMediume, fontSize: 14,
                    textAlign: 'center', paddingHorizontal: 8,
                }} numberOfLines={2} >{(item.HomeWorkName ? item.HomeWorkName : item.ClassName ? item.ClassName : item.SubjectName ? item.SubjectName : item.title ? item.title : item)}</Text>
            </View></TouchableOpacity></Card>
}

export const AllItemInflate = ({ item, onClick, flex = 2, color }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    console.warn("AllItemInflate", item)
    return <Card style={[style.flexBoxText, { height: Dimensions.get('window').width / 3, flex: 1 / flex, backgroundColor: color }]}>
        <TouchableOpacity style={[style.flexBoxText, { width: Dimensions.get('window').width / 3, backgroundColor: color }]} onPress={onClick}><View>
            <Text style={{ color: colors.black, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center' }}>{item.ClassName ? item.ClassName :
                item.SubjectName ? item.SubjectName : item.HomeWorkName ? item.HomeWorkName : item ? item : ''}</Text>
            <Text style={{
                color: colors.black, fontFamily: fontFamily.robotoBold, fontSize: 14,
                position: 'absolute', end: -20, top: 56
            }} numberOfLines={1}>{item.NoOfStudents ? item.NoOfStudents : ""}</Text>
        </View></TouchableOpacity></Card>
}

export const AllItemIngrade = ({ item, onClick, flex = 2, color }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    console.log("item color", item)
    // return <Card style={[style.flexBoxText, { height: Dimensions.get('window').width / 3, flex: 1 / flex, backgroundColor: item.ActiveOrOverDue === 'OverDue' ? colors.lightRed : item.ActiveOrOverDue === 'DueToday' ?  colors.green : item.ActiveOrOverDue === 'Active' ? colors.yellow : colors.lightRed }]}>
    //     <TouchableOpacity style={[style.flexBoxText, { width: Dimensions.get('window').width / 3.5, backgroundColor: item.ActiveOrOverDue === 'OverDue' ? colors.lightRed : item.ActiveOrOverDue === 'DueToday' ?  colors.green : item.ActiveOrOverDue === 'Active' ? colors.yellow : colors.lightRed }]} onPress={onClick}><View>
    //         <Text style={{ color: colors.black, fontFamily: fontFamily.robotoRegular, marginHorizontal: 16, fontSize: 14, textAlign: 'center' }}>{item.HomeWorkName ? item.HomeWorkName : ''}</Text>
    //     </View></TouchableOpacity></Card>
    return <Card onPress={onClick} style={[style.flexBoxText, { height: width / 3, flex: 0.5, backgroundColor: item.ActiveOrOverDue === 'OverDue' ? colors.lightRed : item.ActiveOrOverDue === 'DueToday' ? colors.green : item.ActiveOrOverDue === 'Active' ? colors.yellow : colors.lightRed }]}>
        <View style={{
            flex: 1,
            padding: 2,
            alignItems: 'center', justifyContent: 'space-between'
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, textAlign: 'center' }} numberOfLines={1}>{''}</Text>
                <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 12, textAlign: 'right', }} numberOfLines={1}>{item.ClassName} </Text>

            </View>
            <View style={{ paddingHorizontal: Platform.OS == "ios" ? 16 : 0 }}>
                <Text style={{ color: colors.black, marginHorizontal: 20, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center', }} numberOfLines={3}>{item.HomeWorkName ? item.HomeWorkName : item.title ? item.title : ''}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%", paddingHorizontal: 4, marginBottom: 8, alignItems: "center" }}>
                {refreshData.isTeacher ? <Text></Text> : null}
                {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.NoofPendingStudents ? item.NoofPendingStudents : ''}</Text> */}
                {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.ActiveOrOverDue}</Text> */}
                {/* {refreshData.isTeacher == false ? <View style={{ padding: 6,  backgroundColor: item.ActiveOrOverDue === 'OverDue' ? 'red' : item.ActiveOrOverDue === 'DueToday' ? 'yellow' : item.ActiveOrOverDue === 'Active' ? 'green' : 'red'
 }} /> : null} */}
                {/* {refreshData.isTeacher == false ? <View style={{ padding: 6, backgroundColor: setColor(item.ActiveOrOverDue) }} /> : null} */}
            </View>
        </View></Card>
}



export const HomeWorkInflate = ({ item, type = localEnum.homework, onClick }) => {

    return <Card style={[style.homework, { backgroundColor: getBgColor(type), padding: 0 }]}>
        <View style={[style.homework, { backgroundColor: getBgColor(type) }]}>

            <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image source={require('../assets/images/new_document.png')}
                    style={{
                        height: 32,
                        width: 32,

                    }} />
                <Text style={{
                    color: 'black', fontFamily: fontFamily.robotoRegular, width: '77%'
                }}>{item.HomeWorkName ? item.HomeWorkName : ''}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{
                    color: 'black', fontFamily: fontFamily.robotoRegular,

                }}>{item.Status ? item.Status : ''}</Text>

                <TouchableOpacity onPress={onClick} style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 6,
                    borderRadius: 100,
                    justifyContent: 'center'
                }}>
                    <Image source={eyeImage}
                        style={{
                            height: 18,
                            width: 18,
                        }} />
                </TouchableOpacity>
            </View>

        </View></Card>
}


// Date 19/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings

export const InrolledInflate = ({ item, bgColor = colors.mint, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    return <Card style={[style.homework, { padding: 0, backgroundColor: bgColor }]}>

        <View style={[style.homework, { backgroundColor: bgColor }]}>

            <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image source={require('../assets/images/user_profile.png')} style={{ height: 32, width: 32, borderRadius: 16 }} />
                <Text style={{
                    color: 'black', fontFamily: fontFamily.robotoRegular, width: '77%'
                }}>{item.StudentName ? item.StudentName : item.title}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={onClick} style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 6,
                    borderRadius: 100,
                    justifyContent: 'center'
                }}>
                    <Image source={eyeImage}
                        style={{
                            height: 18,
                            width: 18,
                        }} />
                </TouchableOpacity>
            </View>

        </View></Card>
}




export const ClassAndSchoolItem = ({ item, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    return <Card style={style.homework}>

        <View style={style.homework}><View style={{ flexDirection: 'row', gap: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
                color: 'black', fontFamily: fontFamily.robotoRegular,
            }}>{item.count}</Text>
            <Image source={require('../assets/images/user_profile.png')} style={{ height: 32, width: 32, borderRadius: 16 }} />
            <Text style={{
                color: 'black', fontFamily: fontFamily.rotobotMediume,
            }}>{item.title}</Text>
        </View>

            <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{
                    color: 'black', fontFamily: fontFamily.robotoRegular,
                }}>{item.rank}</Text>

            </View></View>

    </Card>
}

export const NonInrolledInflate = ({ item, onClick, isShow = false }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    return <Card style={style.homework}><View style={style.homework}>

        <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'flex-start', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {

                onClick(3)
            }}><Image source={useType(item.type ? item.type : item.FileType)} style={{ height: 28, width: 28 }} /></TouchableOpacity>
            <Text numberOfLines={2} style={{
                color: 'black', fontFamily: fontFamily.robotoRegular, width: '80%'
            }}>{item.title ? item.title : item.FileDisplayName ? item.FileDisplayName : ""}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
            {isShow ? <TouchableOpacity onPress={() => {
                onClick(2)
            }} style={{
                borderColor: 'black',
                borderWidth: 1,
                padding: 6,
                borderRadius: 100,
                justifyContent: 'center'
            }}>
                <Image source={require('../assets/images/edit.png')}
                    style={{
                        height: 18,
                        width: 18,
                    }} />
            </TouchableOpacity> : null

            }

            <TouchableOpacity onPress={() => {
                onClick(1)
            }} style={{
                borderColor: 'black',
                borderWidth: 1,
                padding: 6,
                borderRadius: 100,
                justifyContent: 'center'
            }}>
                <Image source={eyeImage}
                    style={{
                        height: 18,
                        width: 18,
                    }} />
            </TouchableOpacity>
        </View>

    </View></Card>
}




export const FilesInflate = ({ item, onClick, isShow = false }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    console.log("tamil type", item.type);
    console.log("audio title", item.title);
    const fileName = useMemo(() => {
        const list = Platform.OS === 'ios' ? item.title : item.fileName.split("/")
        return Platform.OS === 'ios' ? list : list[list.length - 1]
    }, [item])
    // Get the file name based on platform
    const fileNames = Platform.OS === 'ios' ? fileName : item.title;
    return <Card style={[style.homework, { padding: 0 }]}><TouchableOpacity onPress={() => onClick(2)}><View style={style.homework}>

        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignContent: "space-between", flex: 1, alignItems: "center" }}>
            <Image source={useType(item.type)} style={{ height: 28, width: 28, paddingHorizontal: 0 }} />
            <Text style={{
                color: 'black', fontFamily: fontFamily.robotoRegular, paddingHorizontal: 16, flex: 1
            }} >{fileNames}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>


            {/* <TouchableOpacity onPress={() => {
                onClick(1)
            }} style={{
                borderColor: 'black',
                borderWidth: 1,
                padding: 6,
                borderRadius: 100,
                justifyContent: 'center'
            }}>
                <Image source={require('../assets/images/edit.png')}
                    style={{
                        height: 18,
                        width: 18,
                    }} />
            </TouchableOpacity> */}


            <TouchableOpacity onPress={() => {
                onClick(0)
            }} style={{
                borderColor: 'black',
                borderWidth: 1,
                padding: 6,
                borderRadius: 100,
                justifyContent: 'center'
            }}>
                <Image source={deleteIcon}
                    style={{
                        height: 18,
                        width: 18,
                    }} />
            </TouchableOpacity>
        </View>

    </View></TouchableOpacity></Card>
}



export const AudioPlay = ({ item, tracks = {

    url: dummayMp3,
    title: 'Avaritia',
}, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    const playBackState = usePlaybackState()

    console.log(tracks);

    console.log(item);

    useEffect(() => {
        addTracs(tracks)
        TrackPlayer.play()
    }, [tracks])

    console.log(playBackState);


    return <Card style={[style.homework]}><View style={[style.homework]}>

        <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', alignItems: 'center', flex: 0.8 }}>
            <Image source={playBackState == State.Playing ? musicgf : music} style={{ height: 28, width: 28 }} />
            <Text style={{
                color: 'black', fontFamily: fontFamily.robotoRegular,
            }}>{item.title}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
            {playBackState != State.Buffering && playBackState != State.Connecting ? <TouchableOpacity onPress={() => {
                togglePlayBack(playBackState)
            }} style={{
                padding: 6,
                borderRadius: 100,
                justifyContent: 'center'
            }}>
                <Image source={playBackState == State.Playing ? pauseIcon : playIcon}
                    style={{
                        height: 18,
                        width: 18,
                    }} />
            </TouchableOpacity> : <ActivityIndicator color={colors.blue} />}

            <TouchableOpacity onPress={() => {
                TrackPlayer.reset();
                onClick(1)
            }} style={{

                padding: 6,
                borderRadius: 100,
                justifyContent: 'center'
            }}>
                <Image source={closeIcon}
                    style={{
                        height: 18,
                        width: 18,
                    }} />
            </TouchableOpacity>

        </View>

    </View></Card>
}


export const ClassSummmaryTopItem = ({ item, totalItem = 4, isColor = true, bgColor = colors.mint, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    console.log("TeacherCounts", item.title)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    return <TouchableOpacity
        onPress={onClick}
        disabled={true}
        style={[style.flexBoxText1, {
            width: Dimensions.get('window').width / (totalItem + 0.5)
        }]}
    >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={[style.flexBoxText1, {
                width: Dimensions.get('window').width / 5, height: 60,
                justifyContent: 'center', alignItems: 'center', borderRadius: 4,
                backgroundColor: bgColor
            }]}>
                <Text style={{
                    color: 'black', fontFamily: 'Roboto',
                    textAlign: 'center',
                    fontSize: 20,
                }}>{item.count}</Text>
            </View>
            <Text numberOfLines={2}
                ellipsizeMode="tail" style={[, style.textStyle, {
                    fontFamily: 'Roboto', fontSize: RFValue(12),
                    textAlign: 'center',
                    marginTop: 5,
                    color: colors.black,

                }]}>{item.title == 'Enrolled' ? 'Assigned' : item.title}</Text>
        </View></TouchableOpacity>
}



// export const HomeWorkDueItem = ({ item, bgColor, onClick }) => {
//     return <Card style={[style.flexBoxText, { backgroundColor: bgColor, width: Dimensions.get('window').width / 2.5 }]}>
//         <TouchableOpacity
//             onPress={onClick}
//             style={[style.flexBoxText, {
//                 backgroundColor: bgColor,
//                 width: Dimensions.get('window').width / 2.5,
//                 justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between'
//             }]}
//         >
//             <View style={{ width: '100%', padding: 2, height: 100, justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between' }}>
//                 <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', flexDirection: 'row', paddingHorizontal: 4 }}>
//                     <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, textAlign: 'center' }} numberOfLines={1}>{''}</Text>
//                     <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 13, textAlign: 'right', }} numberOfLines={1}>{item.ClassName} </Text>
//                 </View>
//                 <Text style={{ color: colors.black, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center' }} numberOfLines={3}>{item.HomeWorkName}</Text>

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 4, marginBottom: 4, alignItems: "center" }}>
//                     {refreshData.isTeacher ? <Text></Text> : null}
//                     <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 13 }}>{item.NoofStudentsToGrade > 0 ? item.NoofStudentsToGrade : item.NoofPendingStudents}</Text>
//                     {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.ActiveOrOverDue}</Text> */}
//                     {refreshData.isTeacher == false ? <View style={{ padding: 6, backgroundColor: setColor(item.ActiveOrOverDue) }} /> : null}
//                 </View>
//width: Dimensions.get('window').width / 2.5 
//             </View></TouchableOpacity></Card>
// }

export const HomeWorkDueItem = ({ item, bgColor, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    console.log(bgColor)
    return <Card style={[style.flexBoxText, {
        backgroundColor: item.ActiveOrOverDue === 'OverDue' ? colors.lightRed : item.ActiveOrOverDue === 'DueToday' ? colors.green : item.ActiveOrOverDue === 'Active' ? colors.yellow : colors.lightRed, width: Math.max(Dimensions.get('window').width / 2.5, 150)
    }]}>
        <TouchableOpacity
            onPress={onClick}
            style={[style.tocuhableFlexBoxText, {
                backgroundColor: item.ActiveOrOverDue === 'OverDue' ? colors.lightRed : item.ActiveOrOverDue === 'DueToday' ? colors.green : item.ActiveOrOverDue === 'Active' ? colors.yellow : colors.lightRed,
                width: Dimensions.get('window').width / 2.5,
                justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between'
            }]}
        >
            <View style={{ width: '100%', padding: 2, justifyContent: 'center', alignItems: 'center',flex: 1}}>
                <Text allowFontScaling={false} style={{ color: colors.black, fontFamily: 'Roboto', fontSize: RFValue(11), textAlign: 'center', }} numberOfLines={1}>{item.ClassName} </Text>
                <Text allowFontScaling={false} style={{ color: colors.black, fontFamily: fontFamily.robotoRegular, fontSize: RFValue(12), textAlign: 'center' }} numberOfLines={2}>{item.HomeWorkName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 4, marginBottom: 2, alignItems: "center" }}>
                    {refreshData.isTeacher ? <Text></Text> : null}
                    <Text allowFontScaling={false} style={{ color: colors.black, fontFamily: 'Roboto', fontSize: RFValue(12), }}>{item.NoofPendingStudents ? item.NoofPendingStudents : ''}</Text>
                    {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.ActiveOrOverDue}</Text> */}
                    {/* {refreshData.isTeacher == false ? <View style={{ padding: 6, backgroundColor: setColor(item.ActiveOrOverDue) }} /> : null} */}
                    {/* {refreshData.isTeacher == false ? <View style={{ padding: 6,  backgroundColor: item.ActiveOrOverDue === 'OverDue' ? 'red' : item.ActiveOrOverDue === 'DueToday' ? 'yellow' : item.ActiveOrOverDue === 'Active' ? 'green' : 'red' }} /> : null} */}
                </View>
            </View></TouchableOpacity></Card>
}
export const HomeWorkToGradeItem = ({ item, bgColor, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    return <Card style={[style.flexBoxText, { backgroundColor: bgColor, width: Dimensions.get('window').width / 2.5 }]}>
        <TouchableOpacity
            onPress={onClick}
            style={[style.flexBoxText, {
                backgroundColor: bgColor,
                width: Dimensions.get('window').width / 2.5,
                justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between'
            }]}
        >
            <View style={{ width: '100%', padding: 2, height: 100, justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between' }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', flexDirection: 'row', paddingHorizontal: 4 }}>
                    <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, textAlign: 'center' }} numberOfLines={1}>{''}</Text>
                    <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 13, textAlign: 'right', }} numberOfLines={1}>{item.ClassName} </Text>
                </View>
                <Text style={{ color: colors.black, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center' }} numberOfLines={3}>{item.HomeWorkName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingHorizontal: 4, marginBottom: 4, alignItems: "center" }}>
                    {refreshData.isTeacher ? <Text></Text> : null}
                    <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 13 }}>{item.NoofStudentsToGrade ? item.NoofStudentsToGrade : ''}</Text>
                    {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.ActiveOrOverDue}</Text> */}
                    {refreshData.isTeacher == false ? <View style={{ padding: 6, backgroundColor: setColor(item.ActiveOrOverDue) }} /> : null}
                </View>
            </View></TouchableOpacity></Card>
}


//modified by pravin all homework dueitems issues-

const width = Dimensions.get('window').width
export const AllHomeWorkDueItem = ({ item, type, onClick }) => {
    console.log("type of datetype", item)
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    // console.log("fdsfsdfsdfsd")
    let bgColor = getBgColor(type)
    if (refreshData.isTeacher == true) {
        return <Card onPress={onClick} style={[style.flexBoxText, { height: width / 3, flex: 0.5, backgroundColor: item.ActiveOrOverDue === 'OverDue' ? colors.lightRed : item.ActiveOrOverDue === 'DueToday' ? colors.green : item.ActiveOrOverDue === 'Active' ? colors.yellow : colors.lightRed }]}>
            <View style={{
                flex: 1,
                padding: 2,
                alignItems: 'center', justifyContent: 'space-between'
            }}>
                <View style={{ width: '73%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{
                        color: colors.black, fontFamily: 'Roboto',
                        fontSize: 14, textAlign: 'center'
                    }}>{''}</Text>
                    <Text style={{
                        color: colors.black, fontFamily: 'Roboto',
                        fontSize: 14, textAlign: 'right'
                    }} numberOfLines={1}>{item.ClassName ? item.ClassName : item.class ? item.class : ''}</Text>
                </View>
                {/* <View style = {{ paddingHorizontal: Platform.OS == "ios" ? 16 : 5}}>
            <Text style={{ color: colors.black, marginHorizontal:20, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center',}} numberOfLines={3} >{item.HomeWorkName ? item.HomeWorkName : item.title ? item.title : ''}</Text>
            </View> */}
                <Text style={{ color: colors.black, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center', paddingHorizontal: 25 }} numberOfLines={3}>{item.HomeWorkName ? item.HomeWorkName : item.title ? item.title : ''}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%", paddingHorizontal: 4, marginBottom: 8, alignItems: "center" }}>
                    {refreshData.isTeacher ? <Text></Text> : null}
                    <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.NoofPendingStudents ? item.NoofPendingStudents : ''}</Text>
                    {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.ActiveOrOverDue}</Text> */}
                    {/* {refreshData.isTeacher == false ? <View style={{ padding: 6,  backgroundColor: item.ActiveOrOverDue === 'OverDue' ? 'red' : item.ActiveOrOverDue === 'DueToday' ? 'yellow' : item.ActiveOrOverDue === 'Active' ? 'green' : 'red'
 }} /> : null} */}
                    {/* {refreshData.isTeacher == false ? <View style={{ padding: 6, backgroundColor: setColor(item.ActiveOrOverDue) }} /> : null} */}
                </View>
            </View></Card>
    }
    else {
        return <Card onPress={onClick} style={[style.flexBoxText, { height: width / 3, flex: 0.5, backgroundColor: item.ActiveOrOverDue === 'OverDue' ? colors.lightRed : item.ActiveOrOverDue === 'DueToday' ? colors.green : item.ActiveOrOverDue === 'Active' ? colors.yellow : colors.lightRed }]}>
            <View style={{
                flex: 1,
                padding: 2,
                alignItems: 'center', justifyContent: 'space-between'
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, textAlign: 'center' }} numberOfLines={1}>{''}</Text>
                    <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 12, textAlign: 'right', }} numberOfLines={1}>{item.ClassName} </Text>
                </View>

                <View style={{ paddingHorizontal: Platform.OS == "ios" ? 16 : 0 }}>
                    <Text style={{ color: colors.black, marginHorizontal: 20, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center', }} numberOfLines={3}>{item.HomeWorkName ? item.HomeWorkName : item.title ? item.title : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%", paddingHorizontal: 4, marginBottom: 8, alignItems: "center" }}>
                    {refreshData.isTeacher ? <Text></Text> : null}
                    <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.NoofPendingStudents ? item.NoofPendingStudents : ''}</Text>
                    {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.ActiveOrOverDue}</Text> */}
                    {/* {refreshData.isTeacher == false ? <View style={{ padding: 6,  backgroundColor: item.ActiveOrOverDue === 'OverDue' ? 'red' : item.ActiveOrOverDue === 'DueToday' ? 'yellow' : item.ActiveOrOverDue === 'Active' ? 'green' : 'red'
 }} /> : null} */}
                    {/* {refreshData.isTeacher == false ? <View style={{ padding: 6, backgroundColor: setColor(item.ActiveOrOverDue) }} /> : null} */}
                </View>
            </View></Card>
    }
}


export const AllHomeWorkGradeItem = ({ item, type, onClick }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    let bgColor = getBgColor(type)
    console.log(item);
    return <Card onPress={onClick} style={[style.flexBoxText, { height: width / 3, flex: 0.5, backgroundColor: bgColor }]}>
        <View style={{
            flex: 1,
            padding: 2,
            alignItems: 'center', justifyContent: 'space-between'
        }}>
            <View style={{ width: '73%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{
                    color: colors.black, fontFamily: 'Roboto',
                    fontSize: 14, textAlign: 'center'
                }}>{''}</Text>
                <Text style={{
                    color: colors.black, fontFamily: 'Roboto',
                    fontSize: 14, textAlign: 'right'
                }} numberOfLines={1}>{item.ClassName ? item.ClassName : item.class ? item.class : ''}</Text>
            </View>
            <Text style={{ color: colors.black, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center', paddingHorizontal: 25 }} numberOfLines={3}>{item.HomeWorkName ? item.HomeWorkName : item.title ? item.title : ''}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%", paddingHorizontal: 4, marginBottom: 8, alignItems: "center" }}>
                {refreshData.isTeacher ? <Text></Text> : null}
                <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.NoofStudentsToGrade ? item.NoofStudentsToGrade : ''}</Text>
                {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.ActiveOrOverDue}</Text> */}
                {refreshData.isTeacher == false ? <View style={{ padding: 6, backgroundColor: setColor(item.ActiveOrOverDue) }} /> : null}
            </View>
        </View></Card>
}



// const width = Dimensions.get('window').width

// export const AllHomeWorkDueItem = ({ item, type,  onClick }) => {

//     let bgColor = getBgColor(type)

// console.log(item);
//     return <Card onPress={onClick} style={[style.flexBoxText, { height: width / 3, flex: 0.5,   backgroundColor: bgColor }]}>

//         <View style={{
//             flex: 1,
//             padding: 2,
//             alignItems: 'center', justifyContent: 'space-between'
//         }}>

//             <View style={{ width: '73%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

//                 <Text style={{
//                     color: colors.black, fontFamily: 'Roboto',
//                     fontSize: 14, textAlign: 'center'
//                 }}>{''}</Text>
//                 <Text style={{
//                     color: colors.black, fontFamily: 'Roboto',
//                     fontSize: 14, textAlign: 'right'
//                 }} numberOfLines={1}>{item.ClassName ? item.ClassName : item.class ? item.class : ''}</Text>

//             </View>
//             <Text style={{ color: colors.black, fontFamily: fontFamily.robotoRegular, fontSize: 14, textAlign: 'center', paddingHorizontal: 25 }} numberOfLines={3}>{item.HomeWorkName ? item.HomeWorkName : item.title ? item.title : ''}</Text>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%", paddingHorizontal: 4, marginBottom: 8, alignItems: "center" }}>
//                 {refreshData.isTeacher ? <Text></Text> : null}

//                 <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.NoofPendingStudents ? item.NoofPendingStudents : item.NoofStudentsToGrade ? item.NoofStudentsToGrade : ''}</Text>
//                 {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.NoofStudentsToGrade > 0 ? item.NoofStudentsToGrade : item.NoofPendingStudents}</Text> */}
//                 {/* <Text style={{ color: colors.black, fontFamily: 'Roboto', fontSize: 14, }}>{item.ActiveOrOverDue}</Text> */}
//                 {refreshData.isTeacher == false ? <View style={{ padding: 6, backgroundColor: setColor(item.ActiveOrOverDue) }} /> : null}

//             </View>
//         </View></Card>

// }



export const TeacherComments = ({ items, onClick }) => {
    console.log(items);

    return <View style={{ width: '100%' }}>
        <Text style={[style.letsPlayText, { marginTop: 10 }]}>{strings.teacherComments}</Text>
        {
            items ? <TeacherCommentCart it={items[items.length - 1]} isVisible={items.length > 1} onClick={onClick} /> : null

        }
    </View>
}
//homework activity Log Code
// export const TeacherCommentCart = ({ it, srn = 1, isVisible = true, onClick }) => {
//     style = getStyles()
//     const theme = useSelector(state => state.appState.theme)
//     useEffect(() => {
//         colorScheme(theme)
//         style = getStyles()
//     }, [theme])
//     const [comment, setComment] = useState("")
//     const [audioUrl, setAudioUrl] = useState("")
//     const [player, isPlayer] = useState(false)
//     useEffect(() => {
//         if (it.Comments) {
//             let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
//             let isValid = regexForHTML.test(it.Comments);
//             if (isValid) {
//                 var doc = parser.parseFromString(it.Comments, 'text/html')

//                 if (doc) {
//                     let urls = [];
//                     const sources = doc.getElementsByTagName('source');
//                     for (let i = 0; i < sources.length; i++) {
//                         const sourceElement = sources[i];
//                         const audioUrl = sourceElement.getAttribute('src') || sourceElement.getAttribute('ng-src');
//                         if (audioUrl) {
//                             urls.push(audioUrl);
//                         } else {
//                             console.error("Audio source URL not found");
//                         }
//                     }
//                     setAudioUrl(urls);

//                     if (doc.getElementsByTagName('p')[0]) {
//                         const paragraph = doc.getElementsByTagName('p')[0];
//                         if (paragraph.attributes._ownerElement.childNodes[0]) {
//                             setComment(paragraph.attributes._ownerElement.childNodes[0].data);
//                         }
//                     } else {
//                         setComment(it.Comments);
//                     }
//                 } else {
//                     setComment(it.Comments);
//                 }
//             }
//         }
//     }, [it]);


// console.log("audio urls",audioUrl)
//     return <Card style={{
//         borderRadius: 8, backgroundColor: colorScheme() == 'dark' ? colors.light_grey : colors.white, marginTop: 10,
//         padding: 10, gap: 20
//     }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <ItemWithText title={"Date "} value={it.StatusDate ? it.StatusDate : ''} />
//             {isVisible ? <TouchableOpacity onPress={onClick} style={{ justifyContent: 'flex-end' }}>
//                 <Text style={[style.textStyle,
//                 {
//                     color: colors.blue, fontSize: 12, textAlign: 'right',
//                     textDecorationLine: 'underline'
//                 }]}>{"More Info"}</Text>

//             </TouchableOpacity> : null}
//         </View>
//         <ItemWithText title={"Comment "} value={comment} />

//         {
//             /**
//              *   <Text style={[style.textStyle,
//             {
//                 marginEnd: 2, color: colors.black, fontSize: 14,
//                 fontFamily: fontFamily.rotobotMediume,
//             }]} >{"Comment"}
//             </Text>
//             <WebView source={{ html: it.Comments }} style={{ height: 100, marginVertical: 4 }} automaticallyAdjustContentInsets={true} />

//              */
//         }
//         {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <TouchableOpacity onPress={() => {
//                 if (audioUrl.length > 0) {
//                     setAudioUrl(audioUrl)
//                     isPlayer(true)
//                 }
//             }} >

//                 <Text style={[style.textStyle,
//                 {
//                     color: colors.blue, fontSize: 12, textAlign: 'right',
//                 }]}>{audioUrl.length > 0 ? "Voice message" : ""}</Text>
//             </TouchableOpacity>
//             <Text style={[style.textStyle,
//             {
//                 color: colors.blue, fontSize: 12, textAlign: 'right',
//             }]}>{it.Status=='Enrolled'?'Assigned':it.Status}</Text>
//         </View> */}
//  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                 {audioUrl.map((audioUrl, index) => (
//                     <TouchableOpacity key={index} onPress={() => isPlayer(true)}>
//                         <Text style={[
//                             style.textStyle,
//                             {
//                                 color: colors.blue,
//                                 fontSize: 12,
//                                 textAlign: 'right',
//                             }
//                         ]}>{audioUrl === "Voice message" ? "Voice message" : "Voice message " + (index + 1)}</Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         {audioUrl.length > 0 ? <PlayAudioBottomSheet isShow={player} itemData={{
//             url: audioUrl,
//             title: "teacher comment",
//         }}
//             onClick={() => {
//                 isPlayer(false)
//             }} /> : null

//         }
//     </Card>

// }

export const TeacherCommentCart = ({ it, srn = 1, isVisible = true, onClick }) => {
    const theme = useSelector(state => state.appState.theme);
    const [comment, setComment] = useState("");
    const [audioUrl, setAudioUrl] = useState([]);
    const [player, isPlayer] = useState(false);
    const [playAudio, setPlayAudio] = useState(null);
    useEffect(() => {
        colorScheme(theme); // Ensure colorScheme() is correctly invoked
    }, [theme]);
    const handlePress = (url) => {
        console.log("function,url", url)
        setPlayAudio(url);
        isPlayer(true);
    };
    useEffect(() => {
        if (it.Comments) {
            let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
            let isValid = regexForHTML.test(it.Comments);
            if (isValid) {
                // var doc = new DOMParser().parseFromString(it.Comments, 'text/html');
                var doc = parser.parseFromString(it.Comments, 'text/html')
                if (doc) {
                    let urls = [];
                    const sources = doc.getElementsByTagName('source');
                    for (let i = 0; i < sources.length; i++) {
                        const sourceElement = sources[i];
                        const audioUrl = sourceElement.getAttribute('src') || sourceElement.getAttribute('ng-src');
                        if (audioUrl) {
                            urls.push(audioUrl);
                        } else {
                            console.error("Audio source URL not found");
                        }
                    }
                    setAudioUrl(urls);

                    if (doc.getElementsByTagName('p')[0]) {
                        const paragraph = doc.getElementsByTagName('p')[0];
                        if (paragraph.attributes._ownerElement && paragraph.attributes._ownerElement.childNodes[0]) {
                            setComment(paragraph.attributes._ownerElement.childNodes[0].data);
                        }
                    } else {
                        setComment(it.Comments);
                    }
                } else {
                    setComment(it.Comments);
                }
            }
        }
    }, [it]);

    console.log("audio urls", audioUrl);

    return (
        <Card style={{
            borderRadius: 8,
            backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white,
            marginTop: 10,
            padding: 10,
            gap: 20
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <ItemWithText title={"Date "} value={it.StatusDate ? it.StatusDate : ''} />
                {isVisible ? (
                    <TouchableOpacity onPress={onClick} style={{ justifyContent: 'flex-end' }}>
                        <Text style={[style.textStyle, {
                            color: colors.blue,
                            fontSize: 12,
                            textAlign: 'right',
                            textDecorationLine: 'underline'
                        }]}>{"More Info"}</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            <ItemWithText title={"Comment "} value={comment} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {audioUrl.map((audioUrl, index) => (
                    <TouchableOpacity key={index} onPress={() => handlePress(audioUrl)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image
                                source={require('../assets/images/play.png')}
                                style={{ height: 15, width: 15 }}
                            />
                            <Text
                                style={[
                                    style.textStyle,
                                    {
                                        color: colors.blue,
                                        fontSize: 12,
                                        marginLeft: 8, // spacing between image and text
                                    },
                                ]}
                            >
                                {`Voice message ${index + 1}`}
                            </Text>
                        </View>


                    </TouchableOpacity>
                ))}
            </View>

            <Text style={[style.textStyle, {
                color: colors.blue,
                fontSize: 12,
                textAlign: 'right',
            }]}>
                {it.Status === 'Enrolled' ? 'Assigned' : it.Status}
            </Text>
            {audioUrl.length > 0 ? (
                <PlayAudioBottomSheet
                    isShow={player}
                    itemData={{
                        url: playAudio,
                        title: "teacher comment",
                    }}
                    onClick={() => isPlayer(false)}
                />
            ) : null}
        </Card>
    );
};

export const StudentSubmissions = ({ items, onClick }) => {
    console.log(items);

    return <View style={{ width: '100%' }}>
        <Text style={[style.letsPlayText, { marginTop: 10 }]}>{strings.studentSubmission}</Text>
        {
            items ? <DatesCart it={items[items.length - 1]} isVisible={items.length > 1} onClick={onClick} /> : null
        }
    </View>
}

export const DatesCart = ({ it, srn = 1, isVisible = true, onClick }) => {

    return <Card style={{
        borderRadius: 8, backgroundColor: colorScheme() == 'dark' ? colors.light_grey : colors.white, marginTop: 10,
        padding: 10, gap: 20
    }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ItemWithText value={`${srn}`} />
            {isVisible ? <TouchableOpacity onPress={onClick} style={{ justifyContent: 'flex-end' }}>
                <Text style={[style.textStyle,
                {
                    color: colors.blue, fontSize: 12, textAlign: 'right',
                    textDecorationLine: 'underline'
                }]}>{"More Info"}</Text>

            </TouchableOpacity> : null}
        </View>
        <ItemWithText title={"Date "} value={it.SubmittedDate ? it.SubmittedDate : ''} />

    </Card>
}


const ItemWithText = ({ title = 'Submission No. ', value = '1' }) => {

    return (
        <ScrollView style={{ maxHeight: 200 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
                <Text style={[style.textStyle,
                {
                    marginEnd: 2, color: colors.black, fontSize: 14,
                    fontFamily: fontFamily.rotobotMediume,
                }]} >{title + ": - "}<Text style={[style.textStyle,
                { marginEnd: 2, color: colors.black, fontSize: 14, }]} >{value}</Text></Text>
            </View >
        </ScrollView>
    )
}


// const ItemWithText = ({ title = 'Submission No. ', value = '1' }) => { return (<ScrollView style={{ maxHeight: 100 }}> {/* Adjust maxHeight according to your design */}  
//            <View style={{ flexDirection: 'row', gap: 4 }}>
//             <Text style={[style.textStyle, { marginEnd: 2, color: colors.black, fontSize: 14, fontFamily: fontFamily.rotobotMediume, }]} >{title + ": - "}<Text style={[style.textStyle, { marginEnd: 2, color: colors.black, fontSize: 14, }]} >{value}</Text></Text></View></ScrollView>); };



// New code implemented on December 11, 2024, by Pravin.
export const ReferenceFilesInflate = ({ item, onClick, isShow = false }) => {
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    console.log("reference files", item)
    const fileName = useMemo(() => {
        const list = Platform.OS === 'ios' ? item.title : item.FileName.split("/")
        return Platform.OS === 'ios' ? list : list[list.length - 1]
    }, [item])
    // Get the file name based on platform
    const fileNames = Platform.OS === 'ios' ? fileName : item.FileName;
    // const fileNames = item.FileName;
    return <Card style={[style.homework, { padding: 0 }]}><TouchableOpacity onPress={() => onClick(2)}><View style={style.homework}>

        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignContent: "space-between", flex: 1, alignItems: "center" }}>
            <Image source={useType(item.FileType)} style={{ height: 28, width: 28, paddingHorizontal: 0 }} />
            <Text style={{
                color: 'black', fontFamily: fontFamily.robotoRegular, paddingHorizontal: 16, flex: 1
            }} >{fileNames}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
                onClick(2)
            }} style={{
                borderColor: 'black',
                borderWidth: 1,
                padding: 6,
                borderRadius: 100,
                justifyContent: 'center'
            }}>
                <Image source={eyeImage}
                    style={{
                        height: 18,
                        width: 18,
                    }} />
            </TouchableOpacity>
        </View>

    </View></TouchableOpacity></Card>
}