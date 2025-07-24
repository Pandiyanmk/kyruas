
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import type {
    AudioSet,
    PlayBackType,
    RecordBackType,
} from 'react-native-audio-recorder-player';
import {
    AppState,
    Dimensions,
    Image,
    Modal,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import {colorScheme, style as getStyles } from '../Values/AppStyles';
import { strings } from '../Localization';
import { ImageWithTextVerticle } from '../Components/TitleWithForward';
import { localEnum, video } from '../store/LocalDataStore';
import { CommonButton } from '../Global/Buttons';
import { audioPermissions } from './Permissions';
import ReactNativeBlobUtil from 'react-native-blob-util'
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

var audioRecorderPlayer: AudioRecorderPlayer | undefined = undefined;
const dirs = ReactNativeBlobUtil.fs.dirs.DocumentDir;


export const AudioRecoderBottomSheet = ({ isShow = false, onClick ,id}) => {
    
    let style;
    style = getStyles()
    const [timePosition, setTimePosition] = useState<RecordBackType>()
    const MAX_RECORDING_DURATION = 600;


    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

    }, []);


    const _handleAppStateChange = (nextAppState: any) => {


        // if (nextAppState === "background" || nextAppState === "inactive") {
        //     console.log(nextAppState);
        //     if (timePosition?.isRecording)
        //         onPauseRecord()
        // } else if (nextAppState === "active" && timePosition != undefined) {
        //     console.log(nextAppState)
        //     if (timePosition?.isRecording)
        //         onPauseRecord()

        // }
    };


    const startAudio = async () => {
        // const path = Platform.select({
        //     ios: `${new Date().getTime()}_sound.m4a`,

        //     // Discussion: https://github.com/hyochan/react-native-audio-recorder-player/discussions/479
        //     // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
        //     // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
        //     // ios: 'hello.m4a',
        //     android: `${dirs}/${new Date().getTime()}_sound.mp3`,
        // });
        // Get the current date and time
            const currentDate = new Date();


            // Format the current date
            const formattedDate = currentDate.toLocaleDateString('en-GB').replace(/\//g, '-'); // Format: DD-MM-YYYY
            const formattedTime = currentDate.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-'); // Format: HH-MM-SS
            const path = Platform.select({
                ios: `${id}_${formattedDate}_${formattedTime}_sound.m4a`,
                android: `${dirs}/${id}_${formattedDate}_${formattedTime}_sound.mp3`,
              });
          
         // Logs something like "12345_1699999999999_sound.mp3"
          
        console.log(path);
        console.log("Path " + path);
        audioRecorderPlayer = new AudioRecorderPlayer()
        audioRecorderPlayer.setSubscriptionDuration(0.1);

        const audioSet: AudioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
            OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
        };

        return await audioRecorderPlayer.startRecorder(
            path,
            audioSet,
            false
        )
    }


    const onStartRecord = () => {



        startAudio().then(it => {
            console.log(`uri sucess: ${it}`);

            // if (it == 'Already recording') {
            //     onStopRecord((d) => {
            //         onStartRecord()
            //     })
            // } else {
                audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
                    const data: RecordBackType = {
                        isRecording: true,
                        currentPosition: e.currentPosition,
                        currentMetering: e.currentMetering
                    }
                    console.log(`uri data: ${data}`);

                    setTimePosition(data)

                     // Convert currentPosition from milliseconds to seconds
                const currentSeconds = Math.floor(e.currentPosition / 1000);
                if (currentSeconds === 540) {
                //console.log("you have Reached 2 mins")
                Toast.show('You have reached 9 minutes of recording!', Toast.SHORT);
                }
                     // Check if recording duration exceeds the maximum limit
            if (Math.floor(e.currentPosition / 1000) >= MAX_RECORDING_DURATION) {
                onStopRecord(() => {
                    Alert.alert(
                        "Recording Stopped",
                        "Maximum recording time reached.If you want to continue, please upload the current recording and start a new recording",
                        [{ text: "OK", onPress: () =>    onClick(it) }]
                    );
                    // After stopping recording, you can proceed to show the file or take any other action
                 
                });
            }
                    return
                });
                console.log(`uri: ${it}`);
        }).catch(error => {
            console.log(`uri error: ${error.code}`);
           // onStartRecord()

            // stopAudio().then(it => {
            //     onStartRecord()

            // }).catch(error => {
            //     console.log("Stop Error " + error);
            // })
        })





    };

    const pauseAudio = async () => {
        return await audioRecorderPlayer.pauseRecorder();
    }

    const onPauseRecord = () => {
        pauseAudio().then(r => {
            console.log(r);

            const e: RecordBackType = {
                isRecording: false,
                currentPosition: timePosition!.currentPosition,
                currentMetering: timePosition?.currentMetering
            }

            setTimePosition(e)
            console.log("pause");
        }).catch(err => {
            console.log('pauseRecord', err);

        })


    };

    const onResumeRecord = async () => {
        await audioRecorderPlayer.resumeRecorder();
        console.log("resume");
        const e: RecordBackType = {
            isRecording: true,
            currentPosition: timePosition!.currentPosition,
            currentMetering: timePosition?.currentMetering
        }

        setTimePosition(e)
    };

    const stopAudio = async () => {

        return await audioRecorderPlayer.stopRecorder();
    }

    const onStopRecord = (onResult) => {
        stopAudio().then(result => {
            audioRecorderPlayer.removeRecordBackListener();
            console.log("stopped");
            setTimePosition(
                undefined
            );
            onResult(result)
            // onClick(result)
            console.log(result);
        }).catch(erro => {
            console.log('Stop Error ' + erro);

        })
    };
     // 22-03-2024 Pravin
// The time formatting function has been added, and the previous use of the math.floor concept has been eliminated. Now, the seconds are functioning correctly.
    // function formatTime(seconds) {
    //     const hours = Math.floor(seconds / 3600);
    //     const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    //     const remainingSeconds = seconds % 60;
    //     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    // }
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return <Modal transparent={true} animationType={'slide'} visible={isShow}  >
        <View style={[style.botton_view]}>

            <View style={[style.bottom_sheet, { paddingVertical: 16 }]}>

                <View style={{ marginHorizontal: 20 }}>
                    <View style={[style.rowContainer, { marginTop: 10 }]}>
                        <Text style={[style.letsPlayText, {}]}>{strings.audioRecorder}</Text>

                        <TouchableOpacity onPress={() => {
                            if (timePosition != undefined) {
                                onStopRecord((result) => {

                                })
                            }
                            onClick()
                        }} style={{

                        }}>
                            <Image source={require('../assets/images/close.png')}
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: colorScheme() == "dark" ? 'white' : 'black',
                                }} /></TouchableOpacity>

                    </View>
                    <Text style={[style.letsPlayText, { paddingVertical: 16, textAlign: 'center', width: "100%" }]}>{timePosition == undefined ? "00:00" : formatTime(Math.floor(timePosition.currentPosition / 1000))}</Text>

                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 10 }}>
                        <CommonButton text={timePosition == undefined ? strings.record : timePosition?.isRecording ? strings.pause : strings.resume} onClick={timePosition == undefined ? onStartRecord : timePosition.isRecording ? onPauseRecord : onResumeRecord} custom={style.gameDashboardButton} />
                        {
                            timePosition == undefined ? null : <CommonButton text={strings.stop} onClick={() => {
                                onStopRecord((result) => {
                                    onClick(result)
                                })
                            }} custom={style.gameDashboardButton} />
                        }
                    
                    </View>
                    <Text style={[style.noteText, {}]}>Note: The Maximum Allowable audio recording duration is 10 minutes per Audio
</Text>
                </View>
            </View>
        </View>
    </Modal>
}