import { Alert, Image, View } from "react-native"
import {colorScheme, style as getStyles } from "../../Values/AppStyles"
import { URI } from "../../store/LocalDataStore"
import FastImage from "react-native-fast-image";
import { useState,useEffect } from "react";
import { ProgressView } from "../../Global/Modales";
import { useSelector } from 'react-redux';
export const ImageViewScreen = ({ navigation, route }) => {
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    
        useEffect(() => {
            colorScheme(theme)
            style = getStyles()
        }, [theme])
    console.log(route.params);
    const [loading, setLoading] = useState(false)
    return <View style={[style.viewBox, style.centerContent]}>

        {/* <Image source={{ uri: route.params.url ? route.params.url : URI }} style={{
            height: '100%', width: '100%', resizeMode: 'contain', overflow:'hidden'
        }} /> */}
        <FastImage
            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
            source={{
                uri: route.params.url ? route.params.url : URI,
                priority: FastImage.priority.normal,
            }}
            onLoadStart={() => {
                console.log("onLoadStart");
                setLoading(true)
            }}
            onLoad={() => {
                console.log("onLoad");

            }}
            onError={() => {
                console.log("onError");
                setLoading(false)

                Alert.alert("Error", "Image is not valid")

            }}
            onLoadEnd={() => {
                console.log("onLoadEnd");
                setLoading(false)

            }}

            resizeMode={FastImage.resizeMode.contain}
        />
        {loading ? <View style={{ position: 'absolute' }}><ProgressView /></View> : null}
    </View>
}