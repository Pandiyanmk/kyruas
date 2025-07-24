import { Alert } from "react-native";



export const alertConfimationDialog = (
    title = "Delete",
    message = "Are you sure you want to delete the address?",
    onClick, isCancel = false) => {

    Alert.alert(
        title,
        message,
        [
            {
                text: "Yes",
                onPress: () => { onClick(1) }
            },
            {
                text: "No",
                onPress: () => { if (isCancel) { onClick(2) } },
                style: "cancel"
            },

        ],
        { cancelable: true }
    );

}


export const messageDialog = (
    title = "Error",
    message = "Are you sure you want to delete the address?",
) => {

    Alert.alert(
        title,
        message,
    );

}