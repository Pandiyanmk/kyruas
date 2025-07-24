import { Text, View ,Image} from "react-native"
import {colorScheme, style as getStyles } from "../../Values/AppStyles"
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react"
export const PaymentScreen = () => {
    const [imageSource, setImageSource] = useState(null); // State to store image source
    let style;
    style = getStyles()
    const theme = useSelector(state => state.appState.theme)
    
        // useEffect(() => {
        //     colorScheme(theme)
        //     style = getStyles()
        // }, [theme])
        useEffect(() => {
            colorScheme(theme);
            const getImageForTheme = () => {
                // Logic to determine which image to use based on theme
                switch (theme) {
                    case 'light':
                        return require('../../assets/images/light_mode.png');
                    case 'dark':
                        return require('../../assets/images/dark_mode.png');
                    default:
                        return null; // No default image
                }
            };
            setImageSource(getImageForTheme()); // Set image source based on theme
        }, [theme]);
    return <View style={[style.viewBox, style.centerContent]}>
             {imageSource && (
                <Image
                    source={imageSource}
                    style={{ width: 389, height: 420 }} // Adjust width and height as needed
                />
            )}
    </View>
}