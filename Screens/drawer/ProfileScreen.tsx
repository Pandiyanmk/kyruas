

import { ScrollView, FlatList, GestureResponderEvent, Image, ImageBase, ImageBackground, StyleSheet, Modal, Text, TouchableOpacity, View, Alert } from "react-native"
import { strings } from "../../Localization"
import {  colorScheme, style as getStyles  } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { URI, avatar1, avatars, fontFamily, games, user_profile } from "../../store/LocalDataStore"
import { GameItem } from "../../Components/GameItem"
import { colors } from "../../Values/AppColores"
import { CommonTextInput } from "../../Global/TextInputs"
import { InterestScreen, InterestSelectionView } from "../authentication/InterestScreen"
import { CommonButton } from "../../Global/Buttons"
import { Card, Title } from "react-native-paper"
import { UserProfileScreen } from "../teacher/UserProfileScreen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { audioExtention, camera, eye, gallery, imageExtention, localEnum, mic, refreshData, scan, upload, videoExtention } from "../../store/LocalDataStore"
import { useSelector } from 'react-redux';
import { userInformation } from "../../store/UserStorage"
export const ProfileScreen = ({ navigation }) => {
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
    const [mobile, setMobile] = useState("")
    const [error, setError] = useState("")
    const [userId, setUserID] = useState("")
    const [selectedAvatar, setSelectedAvatar] = useState(user_profile)
    const [userPhoto, setUserPhoto] = useState(null);
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);
    const gotTo = async () => {
        try {
          const selectedImage = selectedAvatar || userPhoto;
          // Save the selected image path to AsyncStorage
          await AsyncStorage.setItem('userPhoto',  selectedImage || '');
    
          // Display an alert indicating the profile update
          Alert.alert("Profile Updated", "Your profile updated Successfully", [
            {
              text: "OK",
              onPress: () => navigation.goBack()
            }
          ]);
        } catch (error) {
          console.error('Error saving user photo:', error);
        }
      };
    
      const onAvatartChange = (newAvatar) => {
        setSelectedAvatar(newAvatar);
      };
    
      const handleUserPhotoSelection = () => {
        setShowImagePickerModal(true);
      };
    
      const handleImagePickerOption = async (option) => {
        setShowImagePickerModal(false);
    
        try {
            let image;
            if (option === 'camera') {
              image = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              });
            } else if (option === 'gallery') {
              image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              });
            }
        
            // Handle user cancellation
            if (!image) {
              throw new Error('User cancelled image selection');
            }
            setSelectedAvatar(null);
        
            setUserPhoto(image.path);
          } catch (error) {
            // Check if the error is due to user cancellation
            if (error.message === 'User cancelled image selection') {
              console.log('User cancelled image selection');
            } else {
              console.error('Error selecting image:', error);
            }
          }
        };
    
      // Load the user's previously selected image path from AsyncStorage on component mount
      useEffect(() => {
        const loadUserPhoto = async () => {
          try {
            const storedUserPhoto = await AsyncStorage.getItem('userPhoto');
            setUserPhoto(storedUserPhoto);
          } catch (error) {
            console.error('Error loading user photo:', error);
          }
        };
    
        loadUserPhoto();
      }, []);


    return <View style={{ backgroundColor: colorScheme() == "dark" ? colors.black : colors.white }}>
        <ScrollView style={{ marginBottom: 50 }} showsVerticalScrollIndicator={false} >
            <View style={[style.viewBox, { padding: 0 }]}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <TouchableOpacity onPress={handleUserPhotoSelection}>
                        <View style={styles.profileImageContainer}>
                            <Image source={userPhoto ? { uri: userPhoto } : selectedAvatar} style={styles.profileImage} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[style.textStyle, { fontFamily: 'Roboto', fontSize: 22 }]}>{userInformation.UserName}</Text>
                </View>
                <AvatorsListView onClick={onAvatartChange} />
                <CurrentSubscriptionView />
                <View style={[style.viewBox, { paddingTop: 0 }]}>
                    <CommonTextInput title={strings.user_id_and_email_address}
                        placeholder={strings.please_enter_user_ya_email_id}
                        value={userId} onChangeText={(text: string) => {
                            setUserID(text)
                        }} errorMesssage={""} />

                    <CommonTextInput title={strings.mobile_number}
                        placeholder={strings.please_enter_mobile_number}
                        value={mobile} onChangeText={(text: string) => {
                            setMobile(text)
                        }} isMobile={true} errorMesssage={""} />
                </View>

                <View style={[style.viewBox, { paddingTop: 0 }]}>
                    <Text style={[style.textStyle, { fontFamily: 'Roboto', fontSize: 22 }]}>My Interest</Text>
                    <InterestSelectionView />
                </View>

            </View>
        </ScrollView>
        <View style={[style.viewBox, { paddingBottom: -30 }]}>
            <CommonButton text={strings.update} onClick={gotTo} custom={style.absulateButton20} />
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={showImagePickerModal}
            onRequestClose={() => setShowImagePickerModal(false)}>

            <View style={[style.botton_view]}>

                <View style={[style.bottom_sheet]}>

                    <View style={{ marginHorizontal: 20 }}>
                        <View style={[style.rowContainer, { marginTop: 10, }]}>
                            <Text style={[style.letsPlayText, {}]}>{strings. select_image_Gallery}</Text>

                            <TouchableOpacity onPress={() => {
                           setShowImagePickerModal(false)
                        }}  style={{}}>
                                <Image source={require('../../assets/images/close.png')}
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: colorScheme() == "dark" ? 'white' : 'black',
                                    }} /></TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity
                                onPress={() => handleImagePickerOption('camera')}>
                                <ImageBackground source={camera} style={[style.image, { width: 70, height: 70 }]} />
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => handleImagePickerOption('gallery')}>
                          <ImageBackground source={gallery} style={[style.image, { width: 70, height: 70 }]} />
                          </TouchableOpacity>
              
                         </View>
                    </View>
                </View>
            </View>


        </Modal>

    </View>

}

export const AvatorsListView = ({ onClick }) => {

  let style;
  style = getStyles()
    return <FlatList
        data={avatars}
        renderItem={({ item, index }) => (
            <TouchableOpacity style={[style.avatarItem]} onPress={() => onClick(item)}>
                <Image source={item} style={{ width: 32, height: 32 }}></Image>
            </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
    />
}

export const AvatarView = (item) => {
  let style;
style = getStyles()
    return <TouchableOpacity style={[style.avatarItem]}>
        <Image source={item} style={{ width: 32, height: 32 }}></Image>
    </TouchableOpacity>
}

export const CurrentSubscriptionView = () => {
  let style;
style = getStyles()
    return <View style={[style.viewBox]}>
        <View style={{ width: '100%', marginTop: 10 }}>
            <Text style={[style.textStyle, { fontFamily: 'Roboto', fontSize: 20 }]}>{strings.mySub}</Text>
        </View>
        <Card style={[style.homework, {
            marginVertical: 0,
            marginHorizontal: 0,
            padding: 0,
            paddingHorizontal: 0,
            marginTop: 10
        }]}><View style={[style.homework, { alignItems: "center", paddingHorizontal: 20, paddingVertical: 20 }]}>

                <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontFamily: fontFamily.robotoBold, fontSize: 18, color: 'black'
                    }}>{strings.basic_plan}</Text>
                </View>

                <TouchableOpacity style={style.gameDashboardRewardItmeCliam}>
                    <Text style={[style.textStyle, { color: colors.white }]}>{strings.upgrade}</Text>
                </TouchableOpacity>
            </View></Card>
    </View>
}


const styles = StyleSheet.create({
    profileImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
       tintColor: colorScheme() == "dark" ? 'white' : 'black'

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
    },
    modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    avatarsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
});