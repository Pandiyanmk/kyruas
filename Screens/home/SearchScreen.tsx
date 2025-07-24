

import { FlatList, Text, View } from "react-native"
import { strings } from "../../Localization"
import { style } from "../../Values/AppStyles"
import { useEffect, useState } from "react"
import { routes } from "../../Values/Routes"
import { CommonTextInput, SearchTextInput } from "../../Global/TextInputs"
import { localEnum, searchList, teacherList } from "../../store/LocalDataStore"
import { DashItemWithHorizontalList } from "./DashboardScreen"

export const SearchScreen = ({ navigation }) => {
    const [search, setSearch] = useState("")


    return <View style={[style.viewBox, { paddingVertical: 10, paddingHorizontal: 0 }]}>

        <SearchTextInput
            value={search} onChangeText={(text: string) => {
                setSearch(text)
            }} />

        {/* <FlatList
            data={searchList}
            renderItem={({ item, index }) => (
                <DashItemWithHorizontalList items={item} onClick={(type: number, data: any) => {
                    if (item.type == localEnum.games) {
                        if (type == 1) {
                            navigation.navigate(routes.game_landing_screen)
                        } else {
                            navigation.navigate(routes.play_game_screen, { gameName: data })
                        }
                    } else if (item.type == localEnum.course) {
                        if (type == 1) {
                            navigation.navigate(routes.course_landing_screen)
                        } else {
                            navigation.navigate(routes.course_detail_screen)
                        }
                    } else if (item.type == localEnum.class_summary) {
                        if (type == 1) {
                            navigation.navigate(routes.all_file_screen,
                                { screen: routes.class_summary_screen, data: item })
                        } else {
                            navigation.navigate(routes.class_summary_screen)
                        }
                    } else {
                        if (type == 1) {
                            navigation.navigate(routes.all_file_screen,
                                { screen: routes.home_work_details_screen, data: item })
                        } else {
                            navigation.navigate(routes.home_work_details_screen, { title: item.title })
                        }
                    }
                }} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false} // Optional: Hide horizontal scroll indicator
        /> */}
    </View>
}