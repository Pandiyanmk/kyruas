import AsyncStorage from "@react-native-async-storage/async-storage";


export const storeAudioData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('audio_data', jsonValue);
        console.log(jsonValue);

    } catch (e) {
        console.log(e);
    }
};


export const getAudioData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('audio_data');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
};





export const storeIsTeacher = async (value = false) => {
    try {

        await AsyncStorage.setItem('is_teacher', value.toString());
        
    } catch (e) {
        console.log(e);
    }
};


export const getIsTeacher = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('is_teacher');
        return jsonValue == "true";
    } catch (e) {
        console.log(e);
    }
};


