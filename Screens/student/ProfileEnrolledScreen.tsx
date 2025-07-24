

import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { style } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { URI, enrolledList, homeworkList, localEnum, nonProfileList } from "../../store/LocalDataStore"
import { AudioPlay, HomeWorkInflate, InrolledInflate, NonInrolledInflate } from "../../Components/GameItem"
import { useRoute } from "@react-navigation/native"
import { AddCommantBottomSheet } from "../../Global/Modales"
import { setUpPlayer } from "../../Global/Player"
import { storeAudioData } from "../../store/AudioData"
import useBackHandler from "../../Global/BackHandler"

export const ProfileEnrolledScreen = ({ navigation, setItemData, isPlayer }) => {
    const route = useRoute();
    console.log(route.name);
    const [show, isShow] = useState(false)

    return <View style={[style.viewBox, { paddingVertical: 0 }]}>

        <FlatList style={{ marginTop: 15 }}
            data={nonProfileList}
            renderItem={({ item, index }) => (
                <NonInrolledInflate item={item}
                    isShow={route.name == routes.enrolled_screen ? true : false}
                    onClick={(type: any) => {
                        if (type == 1) {
                            navigation.navigate(routes.task_view_screen)
                        } else if (type == 3) {
                            if (item.type == localEnum.mp3) {
                                setItemData(item)
                                isPlayer(true)
                                //  storeAudioData({ data: item, play: true })
                            } else if (item.type == localEnum.pdf) {
                                navigation.navigate(routes.pdf_view_screen)
                            } else if (item.type == localEnum.image) {
                                navigation.navigate(routes.image_view_screen, { url: URI })
                            }
                            else if (item.type == localEnum.text) {
                                navigation.navigate(routes.image_view_screen, { url: URI })
                            }
                        } else {
                            isShow(true)
                        }
                    }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        />

        {show ? <AddCommantBottomSheet isShow={true} onClick={() => {
            isShow(false)
        }} /> : null}

    </View>
}