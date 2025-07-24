import { ActivityIndicator, Text, View } from "react-native"
import { strings } from "../../Localization"
import { screenHeight, style, width } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import WebView from "react-native-webview"
import { ProgressView } from "../../Global/Modales"

export const CMSScreen = ({ navigation, route }) => {

    const [url, setUrl] = useState(route.params ? route.params.url : "")
    return <WebView source={{ uri: url }}
        style={{ flex: 1 }}
        renderLoading={() => <ProgressView />

        } />
}