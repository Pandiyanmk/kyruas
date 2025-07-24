import AsyncStorage from "@react-native-async-storage/async-storage";

export const userInformation = {
    "UserId": 4059,
    "DBId": "Data Source = 20.219.161.110; Initial Catalog=ITA_DEV; User ID= sa;Password=Hippo!2k25;Integrated Security=False",
     "rolE_ID":4,
     "UserName":"quest",
     "token":"",
     "AliasID":""
}

export const AsyncStorageKeys = {
    userId: "user_id",
    authToken: "auth_token",
    dbConnectiongString: "DBConnectionString",
    userData: "UserData",
    username:"user_name",
    aliasId:" AliasId"
}



export const saveValue = async (key = AsyncStorageKeys.userData,value: any) => {
    try {
        const jsonValue = JSON.stringify(value);

        await AsyncStorage.setItem(key, jsonValue);

    } catch (e) {
        console.log(e);
    }
};


export const getValue = async (key = AsyncStorageKeys.userData) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
        console.log(e);
    }
};

// Save a password to AsyncStorage
export const saveAliasId= async (key = AsyncStorageKeys.aliasId,value: any) => {
    try {
        const jsonValue = JSON.stringify(value);

        await AsyncStorage.setItem(key, jsonValue);

    } catch (e) {
        console.log(e);
    }
};


// Retrieve a password from AsyncStorage
export const getAliasId = async (key = AsyncStorageKeys.aliasId) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
        console.log(e);
    }
};