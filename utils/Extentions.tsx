import { useCallback, useEffect, useState } from "react";
import { Alert, Appearance, Keyboard, Share } from "react-native";
import { colorScheme } from "../Values/AppStyles";
import Toast from 'react-native-simple-toast';



export const onShare = async (mess = 'React Native | A framework for building native apps using React') => {
    try {
        const result = await Share.share({
            message: mess,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error: any) {
        Alert.alert(error.message);
    }
};


export const toHHMMSS = (total: number) => {
    var sec_num = total // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds;
}


export const useKeyboard = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return isKeyboardVisible;
};




export const useDarkMode = () => {
    const [theme, setTheme] = useState(Appearance.getColorScheme())
    const themeChangeListener = useCallback(() => {
        let them = Appearance.getColorScheme()
        setTheme(them)
        colorScheme(them)
    }, []);

    useEffect(() => {
        Appearance.addChangeListener(themeChangeListener);
    }, [themeChangeListener]);

    return theme
}



export const toastMessage = (message: any) => {

    Toast.show(message.toString(), Toast.SHORT)
}

