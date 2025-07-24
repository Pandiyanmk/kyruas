import { Alert, View, ViewBase } from "react-native"
import { ItemWithHorizontalList } from "../game/GameLandingScreen"
import { courseSummaryList, fontFamily, sumaaryList2 } from "../../store/LocalDataStore"
import { colorScheme, style as getStyles} from "../../Values/AppStyles"
import { ScrollView } from "react-native-gesture-handler"
import { ActivityIndicator, Text } from "react-native-paper"
import { useState, version, useEffect } from "react"
import { colors } from "../../Values/AppColores"
import { routes } from "../../Values/Routes"
import Video, { LoadError, OnBufferData, OnLoadData, OnProgressData } from 'react-native-video';
import { VideoPlayerScreen } from "../../utils/VideoPlayer"
import { useSelector } from 'react-redux';

export const CourseSummaryScreen = ({ navigation}) => {
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
    return <ScrollView style={[style.viewBox, { padding: 0 }]} showsVerticalScrollIndicator={false}>
        <View style={[style.viewBox, { flexDirection: "column", gap: 0, padding: 0, paddingBottom: 30 }]}>
           
            <VideoPlayerScreen navigation={navigation}  onClick={(fullscreen) => {
            }}/>

            <View style={{ padding: 24 ,paddingTop:0}}>

                <TextTitleAndDescription title={"Title"} subTitle={"its a title"} />
                <TextTitleAndDescription title={"Overview"} subTitle={"Overview of the course, Overview of the course, Overview of the course."} />

                <View style={{ flexDirection: "row", gap: 30 }}>
                    <TextTitleAndDescription title={"Author"} subTitle={"John Deo"} />
                    <TextTitleAndDescription title={"Duration"} subTitle={"3 mins"} />
                </View>

            </View>

        </View>

    </ScrollView>
}

export const TextTitleAndDescription = ({ title, subTitle }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    
    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    return <View style={{ flexDirection: "column", gap: 8, paddingVertical: 8 }}>
        <Text style={[style.textStyle, { fontFamily: fontFamily.robotoBold, fontSize: 17 }]}>{title}</Text>
        <Text style={{ color: colors.dark_grey, fontSize: 15 }}>{subTitle}</Text>
    </View>
}

export const VideoView = ({ pause = false }) => {
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)
    
useEffect(() => {
    colorScheme(theme)
    style = getStyles()
}, [theme])

    const [progress, setProgress] = useState(true)

    const onProgressData = (data: OnProgressData) => {
       
    }


    return <View style={{ height: 250 }}>
        <Video
            source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' }}
            controls={true}
            style={{ flex: 1,height: 250, backgroundColor:'black'  }}
            paused={pause}
            resizeMode="contain"
            repeat={true}
            onVideoBuffer={() => {
                console.log("onVideoBuffer");

            }}
            onVideoLoad={() => {
                console.log("onVideoLoad");

            }}
            onLoad={(data: OnLoadData) => {
                setProgress(false)

            }}
            onVideoLoadStart={() => {
                console.log("onVideoLoadStart");

            }}
            onVideoSeek={() => {
                console.log("onVideoSeek");

            }}
            onProgress={onProgressData}
            onError={(error: LoadError) => {
                console.log(error);

                Alert.alert("Error", error.error.errorString)
            }}
            disableFocus={true}
            playInBackground={false}
            hideShutterView={true}
        />

        {
            progress ? <ActivityIndicator style={{ position: 'absolute', end: 0, start: 0, top: 0, bottom: 0 }}
                color={colorScheme() == 'dark' ? colors.white : colors.blue}
                size={'large'} /> : null
        }
    </View>
}