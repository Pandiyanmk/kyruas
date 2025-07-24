import { Alert, BackHandler, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorScheme, style as getStyles  } from "../../Values/AppStyles";
import { colors } from "../../Values/AppColores";
import { checkedBox, fontFamily, gallery, uncheckedBox } from "../../store/LocalDataStore";
import { useState,useEffect } from "react";
import { strings } from "../../Localization";
import { routes } from "../../Values/Routes";
import { useSelector } from 'react-redux';
export const QuizInstructionScreen = ({ navigation,route }) => {

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

  const [isChecked, setIsChecked] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[style.viewBox, { padding: 0 }]}>
        <FlatList
          data={[
            { key: strings.lorym_ipsum },
            { key: 'Quiz insturction 2' },
            { key: 'Quiz insturction 3' },
            { key: 'Quiz insturction 4' },
          ]}
          renderItem={({ item }) => {
            return (
              <View style={{ marginVertical: 10, paddingHorizontal: 16 }}>
                <Text style={[style.textStyle, { fontSize: 16 }]}>{`\u29BF ${" " + item.key}`}</Text>
              </View>
            );
          }}
          ListHeaderComponent={
            <View style={{ backgroundColor: colors.light_grey, paddingVertical: 16, marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontFamily: fontFamily.rotobotMediume, textAlign: "center" }}> {strings.instructions}</Text>
            </View>
          }
          ListFooterComponent={
            <View>
              <View style={{
                width: '90%', marginTop: 30, padding: 16,
                flexDirection: 'row', gap: 2,
                justifyContent: 'flex-start', alignItems: 'center'
              }}>

                <TouchableOpacity onPress={() => {
                  setIsChecked(!isChecked)
                }} style={{
                  padding: 6,
                  justifyContent: 'center'
                }}>
                  <Image source={isChecked ? checkedBox : uncheckedBox}
                    style={{
                      height: 32,
                      width: 32,
                      tintColor: !isChecked ? colorScheme() == 'dark' ? 'white' : 'black' : undefined
                    }} />
                </TouchableOpacity>

                <Text style={[style.textStyle, {
                  fontSize: 14
                }]}>I have read and understood all the instruction provided.</Text>
              </View>
              <TouchableOpacity onPress={() => {
                if (!isChecked) {
                  Alert.alert(strings.message, strings.instructions_read)
                } else {
                  navigation.replace(routes.quiz_screen, { title: route.params.title })
                }
              }} style={[style.gameDashboardRewardItmeCliam, { marginTop: 30, alignSelf: "center", width: 100, backgroundColor: colors.blue }]}>
                <Text style={[style.textStyle, { color: colors.white, alignSelf: "center" }]}> {strings.next} </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}