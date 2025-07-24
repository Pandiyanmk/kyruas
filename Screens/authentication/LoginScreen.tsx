/**
 *Login screen.tsx
 * The `LoginScreen.tsx` contains all the code and functionality related to user login.
 */
import { Alert, Platform, ScrollView, Text, View,Image,Modal,TouchableOpacity,Button,StyleSheet } from "react-native"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { strings } from "../../Localization"
import { MultiColorTextComponets } from "../../Components/MutiColorComponents"
import { routes } from "../../Values/Routes"
import { CommonTextInput } from "../../Global/TextInputs"
import { useEffect, useState } from "react"
import { ForgotPassword } from "../../Components/TextComponents"
import { CommonButton } from "../../Global/Buttons"
import { AppleLogin, GoogleLogin } from "../../Components/GoogleLoginComponents"
import { validCheck } from "../../Global/Validations"
import { localEnum } from "../../store/LocalDataStore"
import { ConfirmationDialog, ErrorMessageDialog, ProgressDialog } from "../../Global/Modales"
import { useDarkMode, useKeyboard } from "../../utils/Extentions"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { onGoogleButtonPress } from "../../utils/google"
import { storeIsTeacher } from "../../store/AudioData"
import DeviceInfo, { getUniqueId } from "react-native-device-info"
//import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import { loginApi, postAPICall } from "../../Netowork/Apis"
import { apiErrorHandling } from "../../Netowork/ApiErrorHandling"
import { useIsFocused } from "@react-navigation/native"
import { modules, userManagementModule } from "../../Netowork/Constants"
import { AsyncStorageKeys, getValue, saveValue, getAliasId, saveAliasId } from "../../store/UserStorage"
import { useSelector } from 'react-redux';
import { colors } from "../../Values/AppColores"
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings


const EroorType = {
    userIdError: "",
    passwordError: ""
}

let style;

export const LoginScreen = ({ navigation }) => {
    //Student  student1@banyanpro.com Changeit@21
    //Teacher demograde2teacher1@gmail.com teacher2@banyanpro.com
    //Welcome@123
    //Santhosh@gmail.com
    //Changeit@21
    ///Devi@gmail.com
    const [userId, setUserID] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(EroorType)
    const isKeyboardOpen = useKeyboard();
    const [credentialStateForUser, updateCredentialStateForUser] = useState<any>();
    const [loading, setLoading] = useState(false)
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const isFocused = useIsFocused()
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [userData, setUsers] = useState([]);
    const [loginpassword, setloginpassword] = useState("")
var outeruser=userId;
var outerpassword=password;
const handleRadioPress = (index, aliasId, decryptedPassword) => {
    console.log("Handling Radio Press:", { index, aliasId, decryptedPassword });
  
    setSelectedRadio(index);
    outeruser=aliasId;
    outerpassword=decryptedPassword;
    
    // Trigger API handling after state updates
    authenticationApiResponseHandling();
  };
  
  // useEffect to monitor state changes and log them
  // Logs whenever userId or password changes
  // useEffect to trigger API call after password is updated
 

  const handleClose = () => {
    setPopupVisible(false);
    setSelectedRadio(null)
  };
  // Example data for demonstration
//   const userData = [
//     { email: 'pravin@example.com', role: 'student', profilePic: require('../../assets/images/user_profile.png') },
//     { email: 'ram@example.com', role: 'student', profilePic: require('../../assets/images/user_profile.png') },
//   ];
    style = getStyles()
    const id = 'catamilacademy.org';
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    useEffect(() => {
        getValue(AsyncStorageKeys.username).then(it => {
            if (it) {
                setUserID(it)
            }
        })
    }, [])
     useEffect(() => {
            getAliasId(AsyncStorageKeys.aliasId).then(it => {
                if (it) {
                    console.log("inside",it)
                    setloginpassword(it)
                }
            })
        }, [])

    useEffect(() => {
        setError({ userIdError: "", passwordError: "" })
    }, [isFocused])
    /** client side Validation check */
    const login = (() => {
        console.log("sss")
        let userIDCheck = validCheck(localEnum.user_id, userId)
        let passwordCheck = validCheck(localEnum.password, password)
        console.log("sss ", userIDCheck, passwordCheck)
        setError({ userIdError: userIDCheck, passwordError: passwordCheck })

        let listError = [userIDCheck, passwordCheck].map(it => it == "")

        //console.log(listError);

        if (!listError.includes(false)) {
            authenticationApiResponseHandling()

        }
        
    })
    // const handleRadioPress = () => {
    //     // Toggle the selection state when the radio button is clicked
    //     setIsSelected(!isSelected);
    //   };

    const loginApiResponseHandling = () => {
        setLoading(true)
        const item = {
            UserName: outeruser,
            Password:outerpassword
        }
       
        postAPICall(item, userManagementModule.login, true, (response: any) => {
            setLoading(false)
            if (response.isSuccess) {
              console.log("logindetails",response)
                handleLoginResponse(response)
            } else {
                Alert.alert("Error", response.data)
    }
        })
    }


    const SocialLoginApiCall = (UserName: string) => {
        setLoading(true)
        const item = {
            UserName: UserName,
        }
        postAPICall(item, userManagementModule.GoogleLogin, true, (response: any) => {
            setLoading(false)
           
            if (response.isSuccess) {
               if(response.data.ROLE_ID==5)
               {
                handleLoginResponse(response)
               }
               else{
                Alert.alert("Error", "Please Login as a student ID.")
               }
            } else {
                Alert.alert("Error", response.data)
            }
        })
    }


    const handleLoginResponse = (response: any) => {
      
        if(response.data.count==2)
        { 
            setUsers(response.data.users);
            
            setPopupVisible(true);
            console.log("sus++++++++++++++++++++++",response.data.users) 
            storeIsTeacher(response.data.rolE_ID == 5)
           
            saveValue(AsyncStorageKeys.userData, response.data)
            saveValue(AsyncStorageKeys.authToken, response.token)
            saveValue(AsyncStorageKeys.username, userId) 
        }
        else{
            saveValue(AsyncStorageKeys.userData, response.data)
            console.log("sus++++++++++++++++++++++",response.data) 
            saveValue(AsyncStorageKeys.authToken, response.token)
            saveValue(AsyncStorageKeys.username, userId)
            saveAliasId(AsyncStorageKeys.aliasId,response.data.aliasId)
            console.log('single user',response.data.aliasId)
            storeIsTeacher(response.data.rolE_ID == 5)
       //navigation.replace(routes.home_screen)
       navigation.replace(routes.dashboard_screen)
       
    
        }  
    }

    const authenticationApiResponseHandling = (data: any) => {
        setLoading(true)
        const item = {
            userName: "Banyanpro@2z23",
            password: "A11!sw311"
        }
        postAPICall(item, userManagementModule.authentication, false, (response: any) => {
            setLoading(false)
            if (response.isSuccess) {
                saveValue(AsyncStorageKeys.authToken, response.data.token)
                if (data) {
                    SocialLoginApiCall(data)
                } else {
                    loginApiResponseHandling()
                }
            } else {
                Alert.alert("Error", response.data)
            }
        })
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: strings.googleApiKey,
        });

    }, [])




    // useEffect(() => {
    //     if (!appleAuth.isSupported) return;

    //     fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
    //         updateCredentialStateForUser(`Error: ${error.code}`),
    //     );
    // }, []);

    /**
    * You'd technically persist this somewhere for later use.
    */
    let user: string | null = null;

    /**
     * Fetches the credential state for the current user, if any, and updates state on completion.
     */
    // async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    //     if (user === null) {
    //         updateCredentialStateForUser('N/A');
    //     } else {
    //         const credentialState = await appleAuth.getCredentialStateForUser(user);
    //         if (credentialState === appleAuth.State.AUTHORIZED) {
    //             updateCredentialStateForUser('AUTHORIZED');
    //         } else {
    //             updateCredentialStateForUser(credentialState);
    //         }
    //     }
    // }

    /**
     * Starts the Sign In flow.
     */
    // async function onAppleButtonPress(updateCredentialStateForUser) {
    //     console.warn('Beginning Apple Authentication');

    //     // start a login request
    //     try {
    //         const appleAuthRequestResponse = await appleAuth.performRequest({
    //             requestedOperation: appleAuth.Operation.LOGIN,
    //             requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //         });

    //         console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    //         const {
    //             user: newUser,
    //             email,
    //             nonce,
    //             identityToken,
    //             realUserStatus /* etc */,
    //         } = appleAuthRequestResponse;

    //         user = newUser;

    //         fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
    //             updateCredentialStateForUser(`Error: ${error.code}`),
    //         );

    //         if (identityToken) {
    //             // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
    //             console.log(nonce, identityToken);
    //         } else {
    //             // no token - failed sign-in?
    //         }

    //         if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
    //             console.log("I'm a real person!");
    //         }
    //         authenticationApiResponseHandling(email)
    //         console.warn(`Apple Authentication Completed, ${user}, ${email}`);
        
    //     } catch (error) {
    //         if (error.code === appleAuth.Error.CANCELED) {
    //             console.warn('User canceled Apple Sign in.');
    //         } else {
    //             console.error(error);
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (!appleAuth.isSupported) return;

    //     return appleAuth.onCredentialRevoked(async () => {
    //         console.warn('Credential Revoked');
    //         fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
    //             updateCredentialStateForUser(`Error: ${error.code}`),
    //         );
    //     });
    // }, []);

    return <View style={[style.viewBox, { paddingBottom: 50 }]}>
        <ScrollView showsVerticalScrollIndicator={false}> 
            <View>
                {/* <Text style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 40 }]}>{strings.appName}</Text> */}
                {/* <Text style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 40 }]}>
                <Text style={{ color: colors.banyanprocolor }}>Banyan</Text>
                <Text style={{ color: colors.banyanprocoloryellow,paddingTop: -5}}>pro</Text> */}
                <View style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 30 }]}>
                <Image source={require('../../assets/images/newbanyan-pro.png')} style={style.imageStyle}  />
                </View>
            {/* </Text> */}
                <Text style={[style.appNameStyles, style.for18, { marginTop: 50 }]}>{strings.hey_login_now}</Text>

                <CommonTextInput value={userId} onChangeText={(text: string) => {
                    setUserID(text)
                }} errorMesssage={error.userIdError} />
                

                {/* <CommonTextInput title={strings.password}
                    placeholder={strings.please_enter_password}
                    value={password} onChangeText={(text: string) => {
                        setPassword(text)
                    }} isPassword={true} errorMesssage={error.passwordError} />

                <ForgotPassword onClick={() => {
                    navigation.navigate(routes.forgot_password_screen)
                }} />


                <CommonButton onClick={login} /> */}
                {/* Extract the domain part of userId */}
        {(() => {
            const domain = userId.split('@')[1]; // Extract part after '@'
            return domain !== id && (
                <>
                    <CommonTextInput
                        title={strings.loginpassword}
                        placeholder={strings.please_enter_password}
                        value={password}
                        onChangeText={(text: string) => {
                            setPassword(text);
                        }}
                        isPassword={true}
                        errorMesssage={error.passwordError}
                    />
               <ForgotPassword onClick={() => {
                    navigation.navigate(routes.forgot_password_screen)
                }} />
                    <CommonButton onClick={login} />
                </>
            );
        })()}
{/* Modal Popup */}
<Modal
  transparent={true}
  visible={isPopupVisible}
  animationType="slide"
  onRequestClose={() => setPopupVisible(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.popupContainer}>
      {/* Close Button */}
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Image
          source={require('../../assets/images/close.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      {/* Header Text */}
      <Text style={styles.headerText}>Select a specific user to log in.</Text>

      {/* Conditionally Render ScrollView */}
      {userData.length > 2 ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {userData.map((user, index) => (
            <View key={index} style={styles.userRow}>
              {/* Profile Image */}
              <Image
                source={require('../../assets/images/user_profile.png')}
                style={styles.profileImage}
              />

              {/* Email and Role */}
              <View style={styles.infoContainer}>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>Name: </Text>
                  {user.uname}
                </Text>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>Id: </Text>
                  {user.aliasId}
                </Text>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: 'bold' }}>Role: </Text>
                  {user.roleName === 'Learner' ? 'Student' : 'Teacher'}
                </Text>
              </View>

              {/* Radio Button */}
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedRadio === index && styles.radioButtonSelected,
                ]}
                onPress={() =>
                  handleRadioPress(index, user.aliasId, user.decryptedPassword)
                }
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        userData.map((user, index) => (
          <View key={index} style={styles.userRow}>
            {/* Profile Image */}
            <Image
              source={require('../../assets/images/user_profile.png')}
              style={styles.profileImage}
            />

            {/* Email and Role */}
            <View style={styles.infoContainer}>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Name: </Text>
                {user.uname}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Id: </Text>
                {user.aliasId}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Role: </Text>
                {user.roleName === 'Learner' ? 'Student' : 'Teacher'}
              </Text>
            </View>

            {/* Radio Button */}
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedRadio === index && styles.radioButtonSelected,
              ]}
              onPress={() =>
                handleRadioPress(index, user.aliasId, user.decryptedPassword)
              }
            />
          </View>
        ))
      )}
    </View>
  </View>
</Modal>

                {/* <CommonButton text="Student" onClick={() => {
                     storeIsTeacher(false)
                    navigation.replace(routes.home_screen)
                }} /> */}

                {/* <GoogleLogin onClick={() => {
                    onGoogleButtonPress().then((it: any) => {
                        //navigation.replace(routes.home_screen)
                        console.log(it);
                        authenticationApiResponseHandling(it.user.email)
                    }).catch(it => {
                        console.log(it);

                    })
                }} /> */}
                <GoogleLogin onClick={() => {
    onGoogleButtonPress().then((it: any) => {
        const email = it.user.email;
        if (email.endsWith('@catamilacademy.org')) {
            // Valid domain, proceed with further actions
            console.log('Valid email:', email);
            authenticationApiResponseHandling(email);
        } else {
            // Invalid domain, show an alert and do not proceed
            Alert.alert("Error",'Access Denied: Only emails with the domain catamilacademy.org are allowed.')
            //alert('Access Denied: Only emails with the domain @catamilacademy.org are allowed.');
        }
    }).catch(it => {
        console.log('Login error:', it);
    });
}} />


                {/* {Platform.OS == 'ios' ?
                    // <View style={{ justifyContent: 'center', alignItems:'center',marginTop:20 }}><AppleButton
                    //     buttonStyle={AppleButton.Style.WHITE}
                    //     buttonType={AppleButton.Type.SIGN_IN}
                    //     style={style.appleButton}
                    //     onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
                    // /></View>
                    <AppleLogin onClick={() => {
                        onAppleButtonPress(updateCredentialStateForUser)
                    }} />
                    : null} */}
            </View>
        </ScrollView>
        <ProgressDialog isShow={loading} />

        {/* {!isKeyboardOpen ? <MultiColorTextComponets custom={style.absulate} title={strings.new_user}
            clickText={strings.register_now} onClick={() => {
                navigation.navigate(routes.registre_screen)
            }} /> : null} */}

    </View>
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: '80%', // Reduced width
    maxHeight: '60%', // Restrict height for scrollable content
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    marginVertical: 2,
    color: 'black',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
    backgroundColor: 'blue',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});