/**
 *Forgotpasswordscreen.tsx
 * The `Forgotpasswordscreen.tsx` contains all the code and functionality related to Forgotpassword.
 */
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import { Alert, Text, View,Image ,TouchableOpacity,Modal,ScrollView,StyleSheet} from "react-native"
import { strings } from "../../Localization"
import { style } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { CommonTextInput } from "../../Global/TextInputs"
import { CommonButton } from "../../Global/Buttons"
import { MultiColorTextComponets } from "../../Components/MutiColorComponents"
import { validCheck } from "../../Global/Validations"
import { localEnum } from "../../store/LocalDataStore"
import { useKeyboard } from "../../utils/Extentions"
import { postAPICall } from "../../Netowork/Apis"
import { userManagementModule } from "../../Netowork/Constants"
import { ProgressBar } from "react-native-paper"
import { ProgressDialog } from "../../Global/Modales"
import { useSelector } from 'react-redux';
import { colors } from "../../Values/AppColores"
export const ForgotPasswordScreen = ({ navigation }) => {
    let style;
    
    style = getStyles()
     const theme = useSelector(state => state.appState.theme)
     useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    const [error, setError] = useState({ numberError: '' })
    const [getmobile, setMobile] = useState("")
    const isKeyboardOpen = useKeyboard();
    const [loading, setLoading] = useState(false)
    const [userData, setUsers] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState(null);
    var mobile=getmobile;

const handleRadioPress = (index, aliasId,email,roleid) => {
    console.log("Handling Radio Press:", { index, aliasId});
    console.log("Aliasid",aliasId)
  
    setSelectedRadio(index);
    mobile=aliasId;
    if(email.endsWith('catamilacademy.org') && roleid === 5)
    {
      Alert.alert(
        "Message",
        "Teacher login on catamilacademy.org is not allowed for forgot password",
        [
            {
                text: "OK",
                onPress: () => navigation.navigate("LoginScreen") // Replace with your actual login screen name
            }
        ]
    );
    }
    else{
      callAPI()
    }
   
  };

  const handleClose = () => {
    setPopupVisible(false);
    setSelectedRadio(null)
  };
    const register = (() => {
        console.log("sss")
        let mobileCheck = validCheck(localEnum.email_mobile, mobile)
        console.log("values email",mobileCheck)
        setError({ numberError: mobileCheck })
        // if (mobileCheck == "") {
        //    callAPI()
        // }

        // if (mobile.endsWith('catamilacademy.org')) {
        //    Alert.alert("Message","This type of ID is not allowed for forgot password.");
        //    //navigation.navigate(routes.login_screen);
        //     // Redirect to login page after alert
        //     return;
        // }
        
        // if(mobile.endsWith('com'))
        // {
        //     GetUserEmailcallAPI()
        //     console.log("mobile endwith gmail")
        // }
        // else if (mobileCheck == "") {
        //        callAPI()
        //     }
        if (mobile.endsWith('com') || mobile.endsWith('catamilacademy.org')) {
          GetUserEmailcallAPI();
          console.log("mobile ends with 'com' or 'catamilacademy.org'");
      } else if (mobileCheck === "") {
          callAPI();
      }
      
    })

    // const GetUserEmailcallAPI = (() => {
    //     setLoading(true) 
    //     const item = {
    //         UserIdOrEmail: mobile,
    //     }
    //     console.log("values outer",mobile)
    //     postAPICall(item, userManagementModule.useremaildetails, true, (response: any) => {
    //         setLoading(false)
    //         if (response.isSuccess) {
    //             //console.log("Response-data",response)
    //             if(response.data.count==2)
    //                 { 
    //                     console.log("inside",response)
    //                     setUsers(response.data.users);
    //                     setPopupVisible(true);
    //                 }
    //                 else{
    //                     callAPI()
    //                 }
    //         } else {
    //             Alert.alert("Error", response.data)
    //         }
    //     })
    // })
    const GetUserEmailcallAPI = (() => {
      setLoading(true);
      const item = {
          UserIdOrEmail: mobile,
      };
      console.log("values outer", mobile);
      postAPICall(item, userManagementModule.useremaildetails, true, (response: any) => {
          setLoading(false);
          if (response.isSuccess) {
              // Check if response has the required count
              if (response.data.count == 2) {
                  console.log("inside", response);
                  setUsers(response.data.users);
                        setPopupVisible(true);
                    
              } else {
                  // Check if response.data satisfies the condition
                  const data = response.data;
                  if (
                      data.email &&
                      data.email.endsWith('catamilacademy.org') &&
                      data.rolE_ID === 5
                  ) {
                    // Alert.alert("Message","Teacher login on catamilacademy.org is not allowed for forgot password");
                    Alert.alert(
                      "Message",
                      "Teacher login on catamilacademy.org is not allowed for forgot password",
                      [
                          {
                              text: "OK",
                              onPress: () => navigation.navigate("LoginScreen") // Replace with your actual login screen name
                          }
                      ]
                  );
                  } else {
                      callAPI();
                  }
              }
          } else {
              // Alert.alert("Error", response.data);
              Alert.alert("Error", response.data ? "Not a valid user id" : "Not found");

          }
      });
  });
  
  //   const GetUserEmailcallAPI = (() => {
  //     setLoading(true);
     
  //     const item = {
  //         UserIdOrEmail: mobile,
  //     };
  //     console.log("values outer", mobile);
  //     postAPICall(item, userManagementModule.useremaildetails, true, (response: any) => {
  //         setLoading(false);
  //         if (response.isSuccess) {
  //             // Check if response has the required count
  //             if (response.data.count == 2) {
  //                 console.log("inside", response);
  //                 var userEmails = response.data.users; // Assuming 'users' contains user details
  
  //                 // Check if any user meets the criteria
  //                 const shouldPreventCallAPI = userEmails.some(
  //                     (user: any) =>
  //                         user.useremail.endsWith('catamilacademy.org') && user.roleId === 5
  //                 );
  
  //                 if (!shouldPreventCallAPI) {
  //                     setUsers(response.data.users);
  //                     setPopupVisible(true);
  //                 } else {
  //                     console.log("Condition met: Preventing callAPI");
  //                 }
  //             } else {
  //               if (!shouldPreventCallAPI) {
  //                 callAPI();
  //               }
  //               else{
  //                 console.log("Condition met: Preventing callAPI");
  //               }
  //             }
  //         } else {
  //             Alert.alert("Error", response.data);
  //         }
  //     });
  // });
  
    
    const callAPI = (() => {
        setLoading(true)
        
        const item = {
            UserIdOrEmail: mobile,
        }
        console.log("values outer",mobile)
        postAPICall(item, userManagementModule.sendOtp, true, (response: any) => {
            setLoading(false)
            if (response.isSuccess) {
                navigation.navigate(routes.otp_screen, { mobile: mobile, isRegister: false, dbId: response.data.dbId })
            } else {
                Alert.alert("Error", response.data)
            }
        })
    })
    const ToLogin = () => {
        navigation.navigate(routes.login_screen);
    };
   
    return <View style={[style.viewBox]}>
       <View style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 30 }]}>
                <Image source={require('../../assets/images/itmslogoss.png')} style={style.imageStyle}  />
                </View>
        <Text style={[style.appNameStyle, style.for18, {
            marginTop: 30,
            width: '100%', textAlign: 'center'
        }]}>{strings.forgot_password}</Text>

        {/* <Text style={[style.textStyle, { marginTop: 50 }]}>{strings.enter_your_register_user_id_ya_email}</Text> */}


        <CommonTextInput title={strings.user_id_and_email_address}
            placeholder={strings.please_enter_user_ya_email_id}
            value={mobile} onChangeText={(text: string) => {
                setMobile(text)
            }} isMobile={false} errorMesssage={error.numberError} />


        <CommonButton text={strings.submit} onClick={register} />
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
              <Text style={styles.headerText}>Select a User to Reset Password</Text>
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
                          handleRadioPress(index, user.aliasId,user.email,user.rolE_ID)
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
                        handleRadioPress(index, user.aliasId,user.email,user.rolE_ID)
                      }
                    />
                  </View>
                ))
              )}
            </View>
          </View>
        </Modal>


        {/* {!isKeyboardOpen ? <MultiColorTextComponets custom={style.absulate} title={strings.already_have_an_account} clickText={strings.sign_in} onClick={() => {
            navigation.navigate(routes.login_screen)
        }} /> : null} */}
  {/* <Text style={[style.textStyle, style.multiColorStyle , {fontSize: 15,textAlign:"center",marginTop:20}]}>{strings.already_have_an_account}</Text>
  <TouchableOpacity onPress={onclick}><Text style={[style.textStyle, style.multiColorStyle, { color: colors.blue, fontFamily: 'Roboto Medium' }]}>
 signin</Text></TouchableOpacity> */}
 <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={[style.textStyle, style.multiColorStyle, { fontSize: 15 }]}>
                    {strings.already_have_an_account}
                </Text>
                <TouchableOpacity onPress={ToLogin}>
                    <Text style={[style.textStyle, style.multiColorStyle, { color: colors.blue, fontFamily: 'Roboto Medium' }]}>
                        {strings.sign_in}
                    </Text>
                </TouchableOpacity>
            </View>
        <ProgressDialog isShow={loading} />
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