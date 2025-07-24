
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler, Dimensions, TouchableNativeFeedback, Text, StatusBar, Image, Platform, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
//import Orientation from 'react-native-orientation';
import Slider from '@react-native-community/slider';
import { colorScheme, style as getStyles } from '../Values/AppStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { backwardVideo, camera, forwardVideo, fullscreenVideo, minimizeVideo, pauseVideo, playVideo, trophy } from '../store/LocalDataStore';
import { colors } from '../Values/AppColores';
import useBackHandler from '../Global/BackHandler';
import { useSelector } from 'react-redux';

let overlayTimer;
let Timer;


export const VideoPlayer = ({ navigation, route }) => {
   

    return <VideoPlayerScreen navigation={navigation} route={route} onClick={() => { }} />
}

export const VideoPlayerScreen = ({ navigation, route, onClick }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    
        useEffect(() => {
            colorScheme(theme)
            style = getStyles()
        }, [theme])

    let lastTap = null;
    const [Fullscreen, setFullscreen] = useState(false);
    const [paused, setpaused] = useState(false);
    const [currentTime, setcurrentTime] = useState(0);
    const [duration, setduration] = useState(0.1);
    const [overlay, setoverlay] = useState(false);
    const playerRef = useRef();
    const local = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
    let url = route.params ? route.params.url ? route.params.url : local : local
    console.log(url);


    //custom back handling
    useBackHandler(() => {
        if (Fullscreen) {
            onClick(Fullscreen)
            StatusBar.setHidden(false)
            navigation.setOptions({ headerShown: true });
            StatusBar.setBarStyle(colorScheme() != 'dark' ? 'dark-content' : 'light-content')
            StatusBar.setBackgroundColor(colorScheme() == 'dark' ? colors.black : colors.white)
            setFullscreen(false)
        } else {
            navigation.goBack()
        }
        return true;
    });


    const FullscreenToggle = () => {
        onClick(Fullscreen)
        if (Fullscreen) {

            // StatusBar.setTranslucent(false)
            // StatusBar.setHidden(false)
            StatusBar.setBarStyle(colorScheme() != 'dark' ? 'dark-content' : 'light-content')
            StatusBar.setBackgroundColor(colorScheme() == 'dark' ? colors.black : colors.white)

            navigation.setOptions({ headerShown: true });
            setFullscreen(false)
        } else {
            //Orientation.lockToLandscape();
            // StatusBar.setTranslucent(true)
            // StatusBar.setHidden(true)
            StatusBar.setBarStyle('dark-content')
            StatusBar.setBackgroundColor(colors.black)
            navigation.setOptions({ headerShown: false });
            setFullscreen(true);
        }
    }

    const handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            clearTimeout(Timer);
            doubleTapCallback();
        } else {
            lastTap = now;
            Timer = setTimeout(() => {
                singleTapCallback();
            }, DOUBLE_PRESS_DELAY);
        }
    }

    const ShowHideOverlay = () => {
        handleDoubleTap(() => {
        }, () => {
            setoverlay(true)
            overlayTimer = setTimeout(() => setoverlay(false), 5000);
        })
    }
    const backward = () => {
        playerRef.current.seek(currentTime - 10);
        clearTimeout(overlayTimer);
        overlayTimer = setTimeout(() => setoverlay(false), 3000);
    }
    const forward = () => {
        playerRef.current.seek(currentTime + 10);
        clearTimeout(overlayTimer);
        overlayTimer = setTimeout(() => setoverlay(false), 3000);
    }
    const onslide = (slide) => {
        playerRef.current.seek(slide * duration);
        clearTimeout(overlayTimer);
        overlayTimer = setTimeout(() => setoverlay(false), 3000);
    }

    const getTime = (t) => {
        const digit = n => n < 10 ? `0${n}` : `${n}`;
        const sec = digit(Math.floor(t % 60));
        const min = digit(Math.floor((t / 60) % 60));
        const hr = digit(Math.floor((t / 3600) % 60));
        // return hr + ':' + min + ':' + sec; 
        return min + ':' + sec;
    }

    const load = ({ duration }) => setduration(duration);
    const progress = ({ currentTime }) => setcurrentTime(currentTime);

    const [isBuffering, setIsBuffering] = useState(true)

    return <View style={[style.viewBox, { padding: 0, margin: 0 }]}>
        <View style={Fullscreen ? style.fullscreenVideo : style.video}
        >
            <Video
                source={{ uri: url }} //{require('../assets/images/video.mp4')}
                style={{ ...StyleSheet.absoluteFillObject }}
                ref={playerRef}
                paused={paused}
                repeat={true}
                onLoad={(data) => {
                    load(data)
                    setIsBuffering(false)
                }}
                onVideoBuffer={() => { setIsBuffering(true) }}
                onProgress={progress}
                resizeMode={"cover"}
                rate={1.0}
                

            />
            {
                isBuffering ? <ActivityIndicator style={{ position: 'absolute', end: 0, start: 0, top: 0, bottom: 0 }}
                    color={colors.white}
                    size={'large'} /> : null
            }
            <View style={style.overlay}>
                {overlay ?
                    <View style={{ ...style.overlaySet, backgroundColor: '#0006', alignItems: 'center', justifyContent: 'space-around' }}>
                        <VideoPlayerControls image={backwardVideo} onClick={backward} />
                        <VideoPlayerControls image={(paused ? playVideo : pauseVideo)} onClick={() => {
                            setpaused(!paused)
                        }} />
                        <VideoPlayerControls image={forwardVideo} onClick={forward} />
                        <View style={[style.sliderCont, { marginHorizontal: (Fullscreen && (Platform.OS == 'ios') ? 50 : 0) }]}>
                            <View style={{ ...style.timer, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', marginStart: 15 }}>
                                    <Text style={{ color: 'white' }}>{getTime(currentTime)}/</Text>
                                    <Text style={{ color: 'white' }}>{getTime(duration)}</Text>
                                </View>
                                <View style={{ marginRight: 15 }}>
                                    <TouchableOpacity onPress={FullscreenToggle}>
                                        <Image source={Fullscreen ? minimizeVideo : fullscreenVideo} style={{ width: 20, height: 20, tintColor: colors.white }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Slider
                                style={{ margin: 5, marginEnd: Fullscreen && Platform.OS == "ios" ? 25 : 5 }}
                                maximumTrackTintColor='white'
                                minimumTrackTintColor='white'
                                thumbTintColor='white'
                                value={currentTime / duration}
                                onValueChange={onslide}
                            />
                        </View>
                    </View>
                    :
                    <View style={style.overlaySet}>
                        <TouchableNativeFeedback onPress={ShowHideOverlay}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
                    </View>
                }
            </View>
        </View>
    </View>
}

export const VideoPlayerControls = ({ image, onClick }) => {
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
    return <View style={{ width: 50, height: 50 }}>
        <TouchableOpacity onPress={onClick}>
            <Image source={image} style={{ width: 50, height: 50, tintColor: colors.white }} />
        </TouchableOpacity>
    </View>

}