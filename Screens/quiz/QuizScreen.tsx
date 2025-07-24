

import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles } from "../../Values/AppStyles"
import React, { useContext, useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { bulletedList, fontFamily } from "../../store/LocalDataStore"
import { mContect } from "./QuizSummaryScreen"
import useBackHandler from "../../Global/BackHandler"
import { alertConfimationDialog } from "../../utils/AlertsDialogs"
import { HeaderBackButton } from '@react-navigation/elements';
import { colors } from "../../Values/AppColores"
import { toHHMMSS } from "../../utils/Extentions"
import { ScrollView } from "react-native-gesture-handler"
import { CommonButton } from "../../Global/Buttons"
import { Card } from "react-native-paper"
import { useSelector } from 'react-redux';
export const QuizScreen = ({ navigation, route }) => {

      
// Date 19/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])
 const quizQuestions = [
    {
        question: 'Why do we boil the extract with conc. HNO3 in Lassaigne’s test for halogens?',
        selected: -1,
        options: ['To increase the concentration of NO3- ions', 'To increase the solubility product of AgCl',
            'It increases the precipitation of AgCl', 'For the decomposition of Na2S AND NaCN formed']
    },
    {
        question: 'Which of the following process is used to do maximum work done on the ideal gas if the gas is compressed to half of its initial volume?',
        selected: -1,
        options: [
            'Isothermal',
            'Isochoric',
            'Isobaric',
            'Adiabatic'
        ]
    },
    {
        question: 'Why do we boil the extract with conc. HNO3 in Lassaigne’s test for halogens?',
        selected: -1,
        options: ['To increase the concentration of NO3- ions', 'To increase the solubility product of AgCl',
            'It increases the precipitation of AgCl', 'For the decomposition of Na2S AND NaCN formed']
    },
    {
        question: 'Which of the following process is used to do maximum work done on the ideal gas if the gas is compressed to half of its initial volume?',
        selected: -1,
        options: [
            'Isothermal',
            'Isochoric',
            'Isobaric',
            'Adiabatic'
        ]
    },
    {
        question: 'Why do we boil the extract with conc. HNO3 in Lassaigne’s test for halogens?',
        selected: -1,
        options: ['To increase the concentration of NO3- ions', 'To increase the solubility product of AgCl',
            'It increases the precipitation of AgCl', 'For the decomposition of Na2S AND NaCN formed']
    },
    {
        question: 'Which of the following process is used to do maximum work done on the ideal gas if the gas is compressed to half of its initial volume?',
        selected: -1,
        options: [
            'Isothermal',
            'Isochoric',
            'Isobaric',
            'Adiabatic'
        ]
    },
    {
        question: 'Why do we boil the extract with conc. HNO3 in Lassaigne’s test for halogens?',
        selected: -1,
        options: ['To increase the concentration of NO3- ions', 'To increase the solubility product of AgCl',
            'It increases the precipitation of AgCl', 'For the decomposition of Na2S AND NaCN formed']
    },
    {
        question: 'Which of the following process is used to do maximum work done on the ideal gas if the gas is compressed to half of its initial volume?',
        selected: -1,
        options: [
            'Isothermal',
            'Isochoric',
            'Isobaric',
            'Adiabatic'
        ]
    },
    {
        question: 'Why do we boil the extract with conc. HNO3 in Lassaigne’s test for halogens?',
        selected: -1,
        options: ['To increase the concentration of NO3- ions', 'To increase the solubility product of AgCl',
            'It increases the precipitation of AgCl', 'For the decomposition of Na2S AND NaCN formed']
    },
    {
        question: 'Which of the following process is used to do maximum work done on the ideal gas if the gas is compressed to half of its initial volume?',
        selected: -1,
        options: [
            'Isothermal',
            'Isochoric',
            'Isobaric',
            'Adiabatic'
        ]
    },

]

    const [timer, setTimer] = useState(60 * 10);
    const [list, setList] = useState(quizQuestions)
    const [index, setIndex] = useState(0)

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





    useEffect(() => {

        navigation.setOptions({
            headerTitle: route.params.title ? route.params.title : strings.appName,
            headerRight: (() => <Text style={[style.textStyle,
            { marginEnd: 10, fontFamily: fontFamily.robotoBold, color:'black' }]}>{(index + 1) + '/10'}</Text>),
            headerLeft: () => (
                <HeaderBackButton
                    labelVisible={false}
                    allowFontScaling={false}
                    tintColor={ colors.black}
                    onPress={() => customBackPress()}
                    style={{ marginStart: 0 }}
                />
            )

        })

    }, [index])


    const customBackPress = () => {
        alertConfimationDialog(strings.message,
            strings.are_you_sure_you_want_to_quit_the_quiz,
            () => {
                navigation.goBack()
            })
    }

    const submitBeforClickPress = () => {

        index != 9 ?
            alertConfimationDialog(strings.message,
                strings.are_you_sure_you_want_to_submit_the_quiz,
                () => {
                    navigation.replace(routes.quiz_result_screen)
                }) : navigation.replace(routes.quiz_result_screen)
    }

    //custom back handling
    useBackHandler(() => {

        customBackPress()

        return true;
    });

    const onSelect = (select: number) => {
        
        list[index].selected = select
    }

    useEffect(() => {
        if (timer <= 0) {
            navigation.replace(route.quiz_result_screen)
        }
    }, [timer])

    return <View style={[style.viewBox, { padding: 16, paddingTop: 10 }]}>
        <Text style={[style.textStyle, {
            width: '100%', textAlign: 'center', fontSize: 16, color: colorScheme() == 'dark' ? 'yellow' : 'green',
            fontFamily: fontFamily.rotobotMediume
        }]}>{toHHMMSS(timer) + " " + strings.minute_left}</Text>

        <ScrollView>
            <View>
                <Text style={[style.textStyle, { fontFamily: fontFamily.robotoBold, marginVertical: 20 }]}>{(index + 1) + ". " + list[index].question}</Text>
                {list[index].options.map((item, ind) => (
                    <Card style={list[index].selected == ind ? style.quizOption : style.quizOptionUnselect}>
                        <TouchableOpacity style={[style.quizOptionUnselect, { padding: 0, marginVertical: 0, marginHorizontal: 0 }]} onPress={() => {
                            onSelect(ind)
                        }}><View
                            style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    height: 18, width: 18, borderRadius: 12,
                                    borderColor: ind == list[index].selected ? 'green' : colors.black,
                                    borderWidth: 1,
                                    backgroundColor: ind == list[index].selected ? 'green' : colors.white
                                }} />
                                <Text style={{
                                    color: colors.black, fontFamily: fontFamily.robotoRegular,width:'95%'
                                }}>{item}</Text>
                            </View></TouchableOpacity></Card>
                ))}

            </View>
        </ScrollView>


        <View style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "row", paddingBottom: 8 }}>
            {index > 0  ?
                <CommonButton text={strings.previous} onClick={() => {
                    if (index > 0) {
                        setIndex(index - 1)
                    }
                }} custom={style.uploadWorkButton} /> : null
            }                    
            
            <CommonButton text= { index == list.length - 1 ? strings.submit : strings.nextsmall} onClick={() => {
                if (list.length - 1 != index) {
                    setIndex(index + 1)
                } else {
                   submitBeforClickPress()
                }
            }} custom={style.uploadWorkButton}/>
        </View>
    </View>

}