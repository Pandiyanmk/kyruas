import { StyleSheet, Dimensions, Appearance, ColorSchemeName, Platform } from "react-native";
import { colors } from "./AppColores";
import { useCallback, useEffect, useState } from "react";
import { fontFamily } from "../store/LocalDataStore";

export const { width } = Dimensions.get('window');
const height = width * 100 / 60;
export const screenHeight = Dimensions.get('window').height

// You can adjust this value as needed
const CARD_HEIGHT = height * 0.13; // 40% of the screen height

export const colorScheme = (value = Appearance.getColorScheme()) => {
    return value;
}

export const style = () => ({ 

    viewBox: {
        backgroundColor: colorScheme() === 'dark' ? 'black' : 'white',
        flex: 1,
        padding: 16
    },
    viewBoxs: {
        backgroundColor: colorScheme() === 'dark' ? 'lightgray' : 'white',
        flex: 1,
        padding: 16
    },
    textStyle: {
        color: colorScheme() === 'dark' ? 'white' : "black",
        fontSize: 16,
        fontFamily: fontFamily.robotoRegular
    },
    textStyles: {
        color: colorScheme() === 'dark' ? 'white' : "black",
        fontSize: 16,
        fontFamily: fontFamily.robotoRegular,
        
    },
    image: {
        width: 36, height: 36
    },

    topBar: {
        tabBarStyle: {
            backgroundColor: undefined,
            marginTop: 30,
        },
        tabBarLabelStyle: { fontSize: 14, fontFamily: fontFamily.rotobotMediume, textTransform: 'capitalize' },
        tabBarPressColor: colors.blue,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: 'grey',
    },

    homeWorkSummaryTopBar: {
        tabBarStyle: {
            backgroundColor: undefined,
            marginTop: 10,
        },
        tabBarLabelStyle: { fontSize: 14, fontFamily: fontFamily.rotobotMediume, textTransform: 'capitalize' },
        tabBarPressColor: colors.blue,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: 'grey',
    },

    enrolledBckground: {
        fontSize: 16,
        fontFamily: fontFamily.robotoRegular,
        color: 'black',
        padding: 10,
        borderRadius: 10,
        shadowColor: colors.dark_grey,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        shadowOffset: { width: 1, height: 5 },
        backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white
    },
    errorDialogLine: {
        backgroundColor: 'grey',
        marginVertical: 10,
        height: 0.5
    },
    setting: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginTop: 0,
        paddingEnd: 10
    },
    textInputBorder: {
        borderColor: colorScheme() === 'dark' ? 'white' : 'grey',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 4,
        fontSize: 14,
        paddingVertical: Platform.OS == "ios" ? 10 : undefined
    },
    newUser: {
        fontSize: 14,
    },
    for18: {
        fontSize: 18,

    },
    for16: {
        fontSize: 16,

    },
    bowerByTextStyle: {
        position: 'absolute',
        bottom: 20,
    },
   
    appNameStyle: {
        color: colorScheme() === 'dark' ? 'white' : colors.banyanprocolor,
        fontSize: 44,
        fontFamily: 'Roboto'
    },
    appNameStyles: {
        color: colorScheme() === 'dark' ? 'white' : "black",
        fontSize: 44,
        fontFamily: 'Roboto'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 10
    },
    botton_view: {
        flex: 1,
        backgroundColor: 'rgba(0, 0,0, .3 )'
    },
    dialog: {
        borderRadius: 20,
        padding: 10,
        textAlign: 'center',
        alignContent: 'center',
        backgroundColor: colorScheme() === 'dark' ? 'black' : 'white',
        elevation: 10
    },
    bottom_sheet: {
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colorScheme() == 'dark' ?colors.light_black : 'white',
        elevation: 10,
    },
    absulate: {
        // position: 'absolute', bottom: 20,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    absulates: {
        position: 'absolute', bottom: 20,
    },
    classTop: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    lineScreen: {
        borderTopColor: 'grey',
        borderTopWidth: 0.5
    },
    homework: {
        justifyContent: 'space-between',
        alignContent: 'space-between',
        width: '98%',
        flexDirection: 'row',
        marginVertical: 6,
        marginHorizontal: 4,
        padding: 4,
        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: colorScheme() === 'dark' ? colors.white : colors.white,
       
    },
    homeworks: {
        justifyContent: 'space-between',
        alignContent: 'space-between',
        width: '98%',
        flexDirection: 'row',
        marginVertical: 6,
        marginHorizontal: 4,
        padding: 1,
        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: colorScheme() === 'dark' ? colors.white : colors.white,
       
    },

    quizOptionUnselect: {
        justifyContent: 'space-between',
        alignContent: 'space-between',
        width: '98%',
        flexDirection: 'row',
        marginVertical: 6,
        marginHorizontal: 4,
        padding: 15,
        borderColor: 'transparent',
        borderWidth: 3,
        borderRadius: 10,

        backgroundColor: colorScheme() === 'dark' ? colors.white : colors.white
    },
    quizOption: {
        justifyContent: 'space-between',
        alignContent: 'space-between',
        width: '98%',
        flexDirection: 'row',
        marginVertical: 6,
        borderColor: 'green',
        borderWidth: 3,
        marginHorizontal: 4,
        padding: 15,
        borderRadius: 10,
        backgroundColor: colorScheme() === 'dark' ? colors.white : colors.white

    },
    forwordImage: {
        height: 24,
        width: 24,
        tintColor: colorScheme() === 'dark' ? 'white' : 'black'
    },
    userpng:{
        tintColor: colorScheme() === 'dark' ? 'white' : 'black'
    },
    absulateButton: {
        position: 'absolute', bottom: 100, end: 0, start: 22
    },
    absulateButton20: {
        position: 'absolute', bottom: 20, end: 0, start: 16
    },
    absulateButton201: {
        position: 'absolute', bottom: 10, end: 0, start: 18
    },
    alreadyRegister: {
        marginVertical: 30,
        marginStart: 0
    },
    custom: {
        width: "49.6%",
        marginEnd: 8

    },
    custom1: {
        width: "48.8%",
        marginEnd: 8

    },
    fullWidthWithCenter: {
        //  width: '100%',
        //  textAlign: 'center'
        width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    },
    imageStyle: {
        width: 150, // Set the width of your image
        height: 150, // Set the height of your image
        // Add other image styles as needed
      },
    rowStyle: {
        width: '100%',
        flexDirection: 'row'
    },
    textInput: {
        fontFamily: 'Roboto Medium'
    },
    errorMessage: {
        color: 'red',
        fontSize: 12
    },

    multiColorStyle: {
        fontSize: 14,

    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1

    },
    buttonStyle: {
        textAlign: 'center',
        width: "100%",
        padding: 12,
        backgroundColor: colors.blue,
        color: 'white',
        fontSize: 16,
        marginTop: 30,
        borderRadius: 100

    },
    // Interest screen views style
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    interestButton: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 100,
        borderColor: colorScheme() === 'dark' ? 'white' : 'black',
        borderWidth: 1
    },
    selectedInterestButton: {
        backgroundColor: colors.blue,
        borderWidth: 1,
        borderColor: colors.blue

    },
    userInterestButton:{
        backgroundColor: colors.blue,
        borderWidth: 1,
        borderColor: colors.blue
    },
    selectedInterestText: {
        color: colors.white,
    },
    userInterestText:{
        color: colors.white,
    },

    // Otp screen views style
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: colorScheme() === 'dark' ? 'white' : 'black',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 16,
        width: 40,
        color: colorScheme() === 'dark' ? 'white' : colors.black
    },

    //
    homecontainer: {
        flex: 1,

    },
    topContainer: {
        alignItems: 'center',
         justifyContent: 'center',
        height: 200,
        width: '100%',

    },
    homeImage: {
        width,
        height: '100%',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: colors.blue,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 2,
        width: '100%',
        marginBottom: 6
    },
    letsPlayText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: colorScheme() === 'dark' ? 'white' : 'black'
    },
    noteText: {
        fontSize: 12,           // Font size of 10
           padding: 4,  
           // borderRadius:6 ,
           fontWeight: 'bold', 
            fontFamily: 'Roboto',
        color: colorScheme() === 'dark' ? 'white' : 'black'
    },
    arrowText: {
        fontSize: 20,
        fontFamily: 'Roboto',
        color: 'black',
        transform: [{ rotate: '180deg' }]
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexBoxText: {
        flex: 1,
        height: CARD_HEIGHT,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: 4,

        backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white,

    },
    tocuhableFlexBoxText: {
        flex: 1,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: 4,

        backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white,

    },
    cardFlexBoxText: {
        flex: 1,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginVertical: 4,

        backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white,

    },
    flexBoxText1: {

        marginHorizontal: 2
    },
    upgradeButtonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },

    //Game
    gameTopButton: {
        width: '30%',
        borderRadius: 10,
        height: 35,
        marginTop: 10,
        padding: 2
    },
    gameBottomButton: {
        width: '30%',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        paddingVertical: 4
    },
    gameEditTex: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    gameitemContainer: {
        paddingHorizontal: 15,
        paddingVertical: 4,
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 10,
        borderColor: colorScheme() === 'dark' ? 'white' : 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    gameDashboardButton: {
        width: "40%",
        marginHorizontal: 5,
        marginTop: 10,
        borderRadius: 8
    },
    uploadWorkButton: {
        width: "48%",
        marginHorizontal: 5,
        marginTop: 10,
        borderRadius: 8
    },

    gameDashboardRewardItmeCliam: {
        padding: 10,
        justifyContent: 'center',
        shadowColor: colors.dark_grey,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 5 },
        backgroundColor: colors.blue,
        height: 40,
        borderRadius: 8
    },

    gameDashboarLevel: {
        position: 'absolute',
        top: 45,
        left: 30,
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: colors.dark_grey,
        borderRadius: 5
    },

    avatarItem: {
        justifyContent: 'center',
        shadowColor: colors.grey,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        shadowOffset: { width: 1, height: 5 },
        backgroundColor: colors.light_grey,
        padding: 5,
        margin: 15,
        borderRadius: 21,
        width: 42,
        height: 42
    },

    shadowCard: {
        shadowColor: colors.dark_grey,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        borderRadius: 4,
        shadowOffset: { width: 1, height: 5 },
        backgroundColor: colorScheme() === 'dark' ? colors.light_grey : colors.white
    },

    // Video Related styles ----- Start
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
    },
    video: { height: screenHeight / 3, backgroundColor: 'black', transform: [{ rotate: '0deg' }], padding: 0, margin: 0 },
    fullscreenVideo: {
        position: 'absolute',
        width: screenHeight,
        height: width,
        transform: [
            { rotate: '90deg' },
            { translateY: -(width / 2 - screenHeight / 2) },
            { translateX: (width / 2) }],


        elevation: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFill,
    },
    overlaySet: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25
    },
    TextStyle: {
        fontSize: 20, textAlign: 'center',
        marginVertical: 100, color: '#6200ee', fontWeight: 'bold'
    },
    sliderCont: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    timer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    // Video related styles ----- End

    appleButton: {
        height: 50,
        shadowColor: '#555',
        shadowOpacity: 0.5,
        borderRadius: 25,
        shadowOffset: {
            width: 0,
            height: 3
        },
        marginVertical: 15,
        backgroundColor: colors.blue,
    },

    // Mode related styles-----------Start
    invite_contacts: {
        backgroundColor: colors.interest_unselect_grey,
        flex: 1,
        marginLeft: 18,
        marginRight: 11,
        marginTop: 105,
        marginBottom: 10,
      },
      contactessend: {
        height: 55,
        width: 110,
        borderRadius: 20,
        marginHorizontal: 120,
      },
      contact: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: 'black',
        // borderBottomWidth:1
      },
      contactCircles: {
        width: 38,
        height: 38,
        borderRadius: 38 / 2,
        backgroundColor: 'blue',
        marginTop: 10, marginLeft: 5, marginBottom: 6
      },
      contactFirstletter: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        textTransform: 'capitalize'
      },
      contactField: {
        marginLeft: 20,
        marginTop: 10, marginBottom: 6
      },
      contactName: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'capitalize'
      },
      contactNumber: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
      },
      noDataFoundText:{
        marginLeft:-240,
       marginVertical:180,
       color:colors.blue,
       fontFamily:fontFamily.rotobotMediume,
       fontSize:27,
       },

       //finish card style ---------------start
       finishcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      finishcontainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    
      finishmodalBox: {
        width: 300,
        height: 200,
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 10,
      },
      finishmodalBox1: {
        width: 300,
         height: 300,
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 10,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontFamily: fontFamily.robotoRegular,
        color: 'black',
        textTransform:'uppercase'
      },
      modalText1: {
        fontSize:18,
        marginBottom: 20,
        fontFamily: fontFamily.robotoRegular,
        color: colors.light_black,
        textAlign:'center',
        textTransform:'uppercase'
      },
      remainingword:{
        fontSize: 18,
        marginBottom: 20,
        fontFamily: fontFamily.robotoRegular,
        color: colors.blue,
        textAlign:'center',
        lineHeight:35,
        textTransform:'capitalize'
      
      },
      Finishbuttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      closeButton: {
        backgroundColor: 'blue', // or any other color
        padding: 10,
        borderRadius: 5,
        //marginBottom: 10, 
      },
      closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: fontFamily.robotoRegular
      },
    //   Finishbuttons: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    //   }
    //   ,
    //   closeButton: {
    //     backgroundColor: colors.blue,
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     borderRadius: 5,
    //   },
    //   closeButtonText: {
    //     color: 'white',
    //     fontSize: 16,
    //     fontFamily: fontFamily.robotoRegular
    //   },

      //scorecard --------------------------start
      scorecode: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      scoremodalBox: {
        width: 350,
        height: 500,
        backgroundColor: 'white',
        padding: 60,
        borderRadius: 10,
      },
      yourscore: {
        marginTop: -40,
        textAlign: 'center',
        fontFamily: fontFamily.robotoBold,
        color: colors.black,
        fontSize: 31,
        textTransform: 'capitalize'
      },
      point:{
        textAlign: 'center',
        fontFamily: fontFamily.robotoBold,
        color: colors.blue,
        fontSize:31,
        marginTop:20
      },
      gametext:{
        textAlign: 'center',
        marginTop:20,
        fontFamily: fontFamily.robotoBold,
        color: colors.black,
        fontSize:21,
      },
      donebtn:{
        padding:10,
        height: 54,
        width: 169,
        borderRadius: 30,
        marginTop: 40,
        backgroundColor: colors.blue,
        marginLeft: 25
      },
      doneButtonText:{
        textAlign:'center',
        color:colors.white,
       fontFamily: fontFamily.robotoBold,
       fontSize:27,
      },
     //circles values------------ start

     firstcircle: {
        width: 290,
        height: 280,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 270,
        backgroundColor: 'white',
        marginLeft: 45,
        marginTop: 10
      },
      secondcircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'orange',
        borderColor: 'black',
        borderWidth: 2,
        marginLeft: 85,
        marginTop: 80,
        position: 'absolute'
      },
      firstline: {
        width: '32%',
        height: 2,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        transform: [{ rotate: '40deg' }],
        marginTop: 79,
        marginLeft: 19
      },
      secondline: {
        width: '39%',
        height: 2,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        transform: [{ rotate: '90deg' }],
        marginTop: 53,
        marginLeft: 80,
      },
      thirdline: {
        width: '43%',
        height: 2,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        transform: [{ rotate: '144deg' }],
        marginTop: 167,
        marginLeft: 6
      },
      fourthline: {
        width: '39%',
        height: 2,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        transform: [{ rotate: '270deg' }],
        marginTop: 210,
        marginLeft: 80
      },
      linefive: {
        width: '35%',
        height: 2,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        transform: [{ rotate: '220deg' }],
        marginTop: 175,
        marginLeft: 165,
    
      },
      linesix: {
        width: '35%',
        height: 2,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        transform: [{ rotate: '140deg' }],
        marginTop: 85,
        marginLeft: 165,
        // borderColor:'red'
      },
      crosssymbol: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginLeft: 310,
        marginTop: -20,
        position: 'relative'
      },
    
}); 
