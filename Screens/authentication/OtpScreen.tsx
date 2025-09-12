/**
 * The `OtpScreen.tsx` allows users to enter the OTP sent to their email for verification.
 */
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, Alert ,Image} from 'react-native';
import { strings } from "../../Localization"
import {  colorScheme, style as getStyles } from "../../Values/AppStyles"
import { CommonButton } from "../../Global/Buttons"
import { routes } from "../../Values/Routes"
import { colors } from '../../Values/AppColores';
import { MultiColorTextComponets } from "../../Components/MutiColorComponents"
import { ScrollView } from 'react-native-gesture-handler';
import { postAPICall } from '../../Netowork/Apis';
import { userManagementModule } from '../../Netowork/Constants';
import { ProgressDialog } from '../../Global/Modales';
import { useSelector } from 'react-redux';

export const OTPScreen = ({ navigation, route }) => {
    let style;
    style = getStyles()

    // Access the mobile prop from route.params
    const mobileNumber = route.params?.mobile || '';
    const isRegister = route.params?.isRegister || '';
    const dbId = route.params.dbId || '';
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputRefs = useRef<TextInput[]>([]);
    const [timer, setTimer] = useState(15);
    const [messgae, setMessage] = useState(false);
    const [loading, setLoading] = useState(false)
    const isOtpEntered = otp.every((digit) => digit !== '');
    const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [timer]);

    const handleOtpChange = (index: number, value: string) => {
        if (value) {
            setOtp((prevOtp) => {
                const updatedOtp = [...prevOtp];
                updatedOtp[index] = value;
                return updatedOtp;
            });
            // Move to the next input field
            if (index < otpInputRefs.current.length - 1) {
                otpInputRefs.current[index + 1].focus();
            }
        }
        // Handle backspace/delete key
        if (value === '' && index > 0) {
            otpInputRefs.current[index - 1].focus();
        }
    };

    const handleOtpKeyPress = (index: number, event: any) => {
        if (event.nativeEvent.key === 'Backspace' && index >= 0) {
            if (otp[index] === '') {
                setOtp((prevOtp) => {
                    const updatedOtp = [...prevOtp];
                    updatedOtp[index - 1] = '';
                    otpInputRefs.current[index - 1].setNativeProps({ text: '' }); // Clear the value of the previous input field
                    return updatedOtp;
                });
                otpInputRefs.current[index - 1].focus();
            } else {
                setOtp((prevOtp) => {
                    const updatedOtp = [...prevOtp];
                    updatedOtp[index] = '';
                    otpInputRefs.current[index].clear(); // Clear the value of the current input field
                    return updatedOtp;
                });
            }
        }
    };

    const gotTo = (() => {
        if (isOtpEntered) {
            setMessage(false)
           // navigation.replace(routes.reset_password_screen,  { mobile: mobileNumber, dbId: dbId })

           verifyOtp()
        } else {
            setMessage(true)
        }
    })

    const verifyOtp = (() => {
        setLoading(true)
        const item = {
            UserIdOrEmail: mobileNumber,
            OTP: otp.reduce((x, y) => x + y),
            DBId: dbId
        }
        postAPICall(item, userManagementModule.verifyOtp, true, (response: any) => {
            setLoading(false)
            
            if (response.isSuccess) {
                if (isRegister) {
                    navigation.replace(routes.interest_screen)
                } else {
                     navigation.replace(routes.reset_password_screen,  { mobile: mobileNumber, dbId: response.data.dbId })
                }
            } else {
                Alert.alert("Error", response.data)
            }
        })
    })


    const resendOtp = (() => {
        setLoading(true)
        setTimer(15)
        const item = {
            UserIdOrEmail: mobileNumber,
        }
        postAPICall(item, userManagementModule.sendOtp, true, (response: any) => {
            setLoading(false)
            if (response.isSuccess) {
                Alert.alert(strings.message, "OTP sent successfully", [
                    {
                        text: "OK",
                        onPress: () =>  {}
                    }
                ])
            } else {
                Alert.alert("Error", response.data)
            }
        })
    })

    const convertmask = () => {
        var output = mobileNumber.replace(/^(.{2})[^@]+/, "$1***");
        return output
    }

    return (
        <ScrollView contentContainerStyle={{flex:1}} showsVerticalScrollIndicator={false}><View style={style.viewBox}>
            {/* <Text style={[style.appNameStyle, style.fullWidthWithCenter, { marginTop: 40 }]}>{strings.appName}</Text> */}
             <Image source={require('../../assets/images/itmslogoss.png')} style={style.imageStyle}  />
            <Text style={[style.textStyle, {
                marginTop: 60, marginBottom: 40,
                width: '100%', textAlign: 'center', fontFamily: 'Roboto Medium'
            }]}>{strings.otp_message}{convertmask()}</Text>
            <View style={style.otpContainer}>
                {Array.from({ length: 6 }, (_, index) => (
                    <TextInput
                        key={index}
                        style={style.otpInput}
                        onChangeText={(value) => handleOtpChange(index, value)}
                        onKeyPress={(event) => handleOtpKeyPress(index, event)}
                        value={otp[index]}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(ref) => (otpInputRefs.current[index] = ref)}
                    />
                ))}

            </View>
            {
                messgae ? <Text style={[style.textStyle, style.errorMessage, , { marginStart: 28, marginTop:4 }]}>{strings.please_enter_otp}</Text> : null

            }
            <View style={[style.viewBox]}>
                {timer > 0 ? (
                    <MultiColorTextComponets title={strings.didnt_receive_otp}
                        clickText={` Resend code in ${timer} seconds`} onClick={() => {
                        }} custom={style.alreadyRegister} />
                ) : (
                    <MultiColorTextComponets title={strings.didnt_receive_otp}
                        clickText={strings.resend_now} onClick={() => {
                            resendOtp()
                          

                        }} custom={style.alreadyRegister} />
                )}
                <CommonButton text={strings.verify_otp} onClick={gotTo} />
            </View>
        </View>
        <ProgressDialog isShow={loading} />
        </ScrollView>
    );
};